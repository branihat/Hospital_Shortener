from flask import Flask, request, jsonify, render_template, redirect, session, url_for, send_file
import google.generativeai as genai
import re
import bcrypt
import jwt
import datetime
from functools import wraps
from config import PROMPTS, load_api_key, load_mongo_uri
from flask_pymongo import PyMongo
import logging
import os
import uuid
import secrets
import base64
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from config import get_secret_key

# Configure logging for audit trail
logging.basicConfig(
    filename='hipaa_audit.log', 
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = get_secret_key()
# Set session timeout to 1 hour
app.config["PERMANENT_SESSION_LIFETIME"] = datetime.timedelta(hours=1)

# Configure Rate Limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["100 per day", "30 per hour"]
)

# Load MongoDB URI first
MONGO_URI = load_mongo_uri()
app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)  # Initialize MongoDB connection

# Load API keys
GEMINI_API_KEY = load_api_key()
genai.configure(api_key=GEMINI_API_KEY)

# HIPAA Encryption Class with deterministic hashing for emails
class HIPAAEncryption:
    @staticmethod
    def generate_key(password, salt):
        """Generate a secure encryption key using PBKDF2."""
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
            backend=default_backend()
        )
        return kdf.derive(password.encode())

    @staticmethod
    def encrypt_data(data, password):
        """Encrypt sensitive data with a password."""
        salt = os.urandom(16)
        key = HIPAAEncryption.generate_key(password, salt)
        iv = os.urandom(16)
        
        cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())
        encryptor = cipher.encryptor()
        
        encrypted_data = encryptor.update(data.encode()) + encryptor.finalize()
        
        return base64.b64encode(salt + iv + encryptor.tag + encrypted_data).decode()

    @staticmethod
    def decrypt_data(encrypted_text, password):
        """Decrypt sensitive data with a password."""
        decoded = base64.b64decode(encrypted_text.encode())
        salt = decoded[:16]
        iv = decoded[16:32]
        tag = decoded[32:48]
        encrypted_data = decoded[48:]
        
        key = HIPAAEncryption.generate_key(password, salt)
        
        cipher = Cipher(algorithms.AES(key), modes.GCM(iv, tag), backend=default_backend())
        decryptor = cipher.decryptor()
        
        return (decryptor.update(encrypted_data) + decryptor.finalize()).decode()
    
    @staticmethod
    def hash_email(email):
        """Create a deterministic hash of an email for consistent lookups."""
        # Use a fixed salt for email hashing to ensure consistent results
        fixed_salt = b'EmailHashingSalt1234'
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=fixed_salt,
            iterations=100000,
            backend=default_backend()
        )
        
        hashed = kdf.derive(email.lower().encode())  # Lowercase for case-insensitive matching
        return base64.b64encode(hashed).decode()

# Function to anonymize confidential data
def anonymize_text(text):
    """Replace doctor and patient names with generic placeholders."""
    text = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '[SSN REDACTED]', text)  # Social Security Number
    text = re.sub(r'\b\d{10}\b', '[MRN REDACTED]', text)  # Medical Record Number
    text = re.sub(r'\b\d{4}-\d{4}-\d{4}-\d{4}\b', '[INSURANCE REDACTED]', text)  # Insurance Number
    text = re.sub(r'\b\d{1,2}/\d{1,2}/\d{4}\b', '[DATE REDACTED]', text)  # Specific Dates
    text = re.sub(r'\b\d+\s+[A-Z][a-z]+\s+(Street|St\.|Avenue|Ave\.|Road|Rd\.)\b', '[ADDRESS REDACTED]', text)
    text = re.sub(r'\bDr\.?\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Dr. XYZ', text)  # Doctor names
    text = re.sub(r'\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Patient XYZ', text)  # Patient names
    return text

# Function to clean AI-generated output text
def clean_output(text):
    """Removes unnecessary characters and trims extra spaces."""
    return text.replace("*", "").strip()

# Admin authentication decorator - uses sessions instead of tokens
def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'admin_logged_in' not in session or not session['admin_logged_in']:
            logger.warning(f"Unauthorized access attempt to admin panel")
            return redirect(url_for('admin_login'))
        
        return f(*args, **kwargs)
    return decorated

# Token authentication for API routes
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            logger.warning(f"Unauthorized access attempt: Missing token")
            return jsonify({"error": "Token is missing"}), 401
        
        try:
            token = token.split(" ")[1]  # Remove "Bearer" prefix
            decoded_token = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            
            # Use hashed email for lookup
            email_hash = decoded_token.get("email_hash")
            current_user = mongo.db.users.find_one({"email_hash": email_hash})
            
            if not current_user:
                logger.warning(f"Unauthorized access attempt: Invalid token")
                return jsonify({"error": "Invalid token"}), 401

            # Log access attempt
            logger.info(f"Authorized access by user: {current_user.get('user_id', 'Unknown')}")
        except jwt.ExpiredSignatureError:
            logger.warning("Unauthorized access attempt: Expired token")
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            logger.warning("Unauthorized access attempt: Invalid token")
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated

# Admin login route
@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "GET":
        return render_template("admin_login.html")
    
    # Handle POST request for login
    username = request.form.get("username")
    password = request.form.get("password")
    
    # You can hardcode admin credentials or fetch from database
    # For security, consider using environment variables for credentials
    admin_username = os.environ.get("ADMIN_USERNAME", "admin")
    admin_password = os.environ.get("ADMIN_PASSWORD", "adminpassword")
    
    if username == admin_username and password == admin_password:
        session.permanent = True
        session['admin_logged_in'] = True
        logger.info(f"Admin login successful")
        return redirect(url_for('admin_prompts'))
    else:
        logger.warning(f"Failed admin login attempt with username: {username}")
        return render_template("admin_login.html", error="Invalid credentials")

# Admin logout route
@app.route("/admin/logout")
def admin_logout():
    session.pop('admin_logged_in', None)
    logger.info(f"Admin logged out")
    return redirect(url_for('admin_login'))

# Keep your existing routes, but change admin routes to use admin_required instead of token_required
@app.route("/")
def home():
    return render_template("landing.html")

@app.route("/login")
def show_login_page():
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    return render_template("index.html")

# Update to the register route to handle additional user data
@app.route("/register", methods=["POST"])
@limiter.limit("3 per minute")
def register():
    """Handle user registration with enhanced security and additional medical professional data."""
    email = request.json.get("email")
    password = request.json.get("password")
    firstName = request.json.get("firstName")
    lastName = request.json.get("lastName")
    degree = request.json.get("degree")
    profession = request.json.get("profession")
    specialization = request.json.get("specialization")
    agreeToEula = request.json.get("agreeToEula")  # Get EULA agreement value

    # Validate required fields
    if not email or not password or not firstName or not lastName or not degree or not profession:
        logger.warning("Registration attempt with missing required fields")
        return jsonify({"error": "All required fields must be completed"}), 400

    # Validate EULA agreement
    if not agreeToEula:
        logger.warning("Registration attempt without EULA agreement")
        return jsonify({"error": "You must agree to the End User License Agreement"}), 400

    # Validate email format
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        logger.warning(f"Invalid email format: {email}")
        return jsonify({"error": "Invalid email format"}), 400

    # Validate password strength
    if len(password) < 8:
        logger.warning("Registration attempt with weak password")
        return jsonify({"error": "Password must be at least 8 characters long"}), 400

    try:
        # Create a deterministic hash of the email for lookup
        email_hash = HIPAAEncryption.hash_email(email)
        
        # Encrypt email for storage (separate from the hash used for lookups)
        encrypted_email = HIPAAEncryption.encrypt_data(email, app.config["SECRET_KEY"])

        # Check if user already exists using the deterministic hash
        existing_user = mongo.db.users.find_one({"email_hash": email_hash})
        if existing_user:
            logger.warning(f"Registration attempt for existing email: {email}")
            return jsonify({"error": "An account with this email already exists"}), 409

        # Enhanced password hashing
        salt = bcrypt.gensalt(rounds=12)
        hashed_pw = bcrypt.hashpw(password.encode("utf-8"), salt)
        
        # Generate unique user ID for audit trail
        user_id = str(uuid.uuid4())

        # Encrypt personal information
        encrypted_firstName = HIPAAEncryption.encrypt_data(firstName, app.config["SECRET_KEY"])
        encrypted_lastName = HIPAAEncryption.encrypt_data(lastName, app.config["SECRET_KEY"])

        # Save user to database with professional information
        user_doc = {
            "user_id": user_id,
            "email": encrypted_email,
            "email_hash": email_hash,
            "password": hashed_pw,
            "firstName": encrypted_firstName,
            "lastName": encrypted_lastName,
            "degree": degree,
            "profession": profession,
            "specialization": specialization,
            "eula_accepted": True,
            "eula_accepted_date": datetime.datetime.utcnow(),
            "created_at": datetime.datetime.utcnow(),
            "last_login": None
        }
        mongo.db.users.insert_one(user_doc)

        logger.info(f"New user registered: {user_id}")
        return jsonify({"message": "User registered successfully", "user_id": user_id}), 201

    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({"error": "Registration failed"}), 500
        
@app.route("/api/login", methods=["POST"])
@limiter.limit("5 per minute")
def login():
    """Handle user login with enhanced security and audit logging."""
    email = request.json.get("email")
    password = request.json.get("password")

    # Validate input
    if not email or not password:
        logger.warning("Login attempt with missing email or password")
        return jsonify({"error": "Email and password are required"}), 400

    try:
        # Get email hash for lookup
        email_hash = HIPAAEncryption.hash_email(email)
        
        # Find user by email hash
        user = mongo.db.users.find_one({"email_hash": email_hash})

        if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
            # Create JWT token with shorter expiration for security
            token = jwt.encode(
                {
                    "email_hash": email_hash,  # Store hash in token instead of encrypted email
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
                    "user_id": user.get("user_id")
                },
                app.config["SECRET_KEY"],
                algorithm="HS256"
            )

            # Update last login timestamp
            mongo.db.users.update_one(
                {"user_id": user["user_id"]},
                {"$set": {"last_login": datetime.datetime.utcnow()}}
            )

            logger.info(f"Successful login for user: {user['user_id']}")
            return jsonify({"token": token, "user_id": user["user_id"]}), 200
        else:
            logger.warning(f"Failed login attempt for email: {email}")
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({"error": "Authentication failed"}), 500

# API routes that need tokens can still use token_required
@app.route("/process", methods=["POST"])
@token_required
@limiter.limit("20 per hour")
def process_text():
    """Handle AI processing requests (protected by JWT authentication)."""
    data = request.json
    action = data.get("action")
    text = data.get("text")

    if not action or not text:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        anonymized_text = anonymize_text(text)
        
        prompt_text = get_prompt(action)
        if not prompt_text:
            return jsonify({"error": "Invalid action"}), 400

        response = model.generate_content(prompt_text + "\n\n" + anonymized_text)
        output_text = getattr(response, "text", "No response generated.")
        
        # Return result with flag to trigger frontend shortening
        return jsonify({
            "result": clean_output(output_text),
            "shouldShorten": True
        })
    
    except Exception as e:
        logger.error(f"AI processing error: {str(e)}")
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# Modified admin routes to use admin_required instead of token_required
@app.route("/admin/prompts", methods=["GET"])
@admin_required
def admin_prompts():
    """Admin panel for managing system prompts."""
    # Load active prompts from the database
    prompts = list(mongo.db.prompts.find({"active": True}).sort("key", 1))
    return render_template("admin_prompts.html", prompts=prompts)

@app.route("/admin/prompt/update", methods=["POST"])
@admin_required
def update_prompt():
    """Update an existing prompt with version history."""
    prompt_key = request.json.get("key")
    prompt_text = request.json.get("text")
    
    if not prompt_key or not prompt_text:
        return jsonify({"error": "Missing required fields"}), 400
    
    # Get the current prompt
    current_prompt = mongo.db.prompts.find_one({"key": prompt_key, "active": True})
    
    if current_prompt:
        # Deactivate current version
        mongo.db.prompts.update_one(
            {"_id": current_prompt["_id"]},
            {"$set": {"active": False}}
        )
        
        # Create new version with incremented version number
        new_version = current_prompt.get("version", 1) + 1
    else:
        # If no current prompt exists, start at version 1
        new_version = 1
    
    # Create new version (use session admin ID if available)
    admin_id = session.get('admin_id', 'admin')
    mongo.db.prompts.insert_one({
        "key": prompt_key,
        "text": prompt_text,
        "active": True,
        "created_at": datetime.datetime.utcnow(),
        "created_by": admin_id,
        "updated_at": datetime.datetime.utcnow(),
        "updated_by": admin_id,
        "version": new_version
    })
    
    logger.info(f"Prompt '{prompt_key}' updated to version {new_version} by admin")
    return jsonify({"message": "Prompt updated successfully", "version": new_version}), 200

@app.route("/admin/prompt/history/<prompt_key>", methods=["GET"])
@admin_required
def prompt_history(prompt_key):
    """View version history for a specific prompt."""
    # Get all versions of the prompt
    prompt_versions = list(mongo.db.prompts.find({"key": prompt_key}).sort("version", -1))
    
    if not prompt_versions:
        return redirect(url_for('admin_prompts'))
    
    return render_template("prompt_history.html", versions=prompt_versions, prompt_key=prompt_key)
def initialize_default_prompts():
    """Initialize default prompts in MongoDB if they don't exist."""
    # Default prompts - these were previously in config.py
    default_prompts = {
        "short_signout": """You are an experienced and efficient physician in the USA.
        Create an executive summary of the gist of the medical problem from this medical SOAP note using only two or three lines to use as a hand-off.
        Use standard medical acronyms & medical shorthand. Include medical history & relevant lab results:""",
        
        "hospital_summary": """You are an experienced physician and English language expert.
        Convert my input into the shortest clinical summary in a single paragraph using standard medical acronyms and minimal words.
        Preserve the logical and temporal sequence of medical events. Skip negative reviews of systems. Remove normal labs and duplication.
        Replace hospital names with 'XYZ'. Convert everything into past tense:""",
        
        "cleanup": """You are an experienced Physician in the USA.
        The input is a standard SOAP or medical progress note that is too long. Clean it up with simple formatting but preserve critical information.
        Maintain dates, timeline, and logical flow. Keep the template intact, remove duplications, and make it more concise:""",
        
        "discharge_summary": """You are an experienced veteran physician fluent in American English.
        Create a concise discharge summary from the following Medical SOAP note.
        List actively managed problems as 'Discharge Diagnoses' in descending order of criticality.
        Summarize the hospital course in past tense. Mention chronic conditions at the beginning under 'past medical history'.
        Ignore negative reviews of systems and absent symptoms. Remove duplications:""",
        
        "diagnoses": """Extract the main diagnoses from the following medical notes.
        Use standard medical terminology and abbreviations. List in descending order of severity:""",
        
        "emergencies": """You are a veteran physician and a statistician.
        Study this Medical progress note and predict the five most likely emergency situations that could arise.
        Provide a one-line reasoning for each and list red flag symptoms to monitor.
        Use medical acronyms and shorthand to keep it short:""",
        
        # New prompts added
        "insurance_denial": """You are an experienced American physican. Here is a medical progress note you can use or use any clinical information given as input for understanding the patient. Please review it and decipher the clinical context with the main and critical issues. Their medical Insurance company has unfortunately denied their care. Please write a letter to the insurance company challenging their denial. Start the letter very brielfy going over the important clinical events. Then explaining the medical reasons why patient absolutely needed this medical care and the dangers of denying the care. Explain to the insurance company why they need to cover the costs. Make the letter maximum 600 words, make it sound passionate, firm, formal yet friendly""",
        
        "impression_ap": """You are an experienced American physican. Here is a history of medical illness note of HPI for a patient. Use this to generate the following output format:
        Impression: (create a short concise clinical signout using standard medical acronyms capturing the essence of the medical picture only and main clinical issues)
        Assessment/Plan: (Create a list of active diagnosis, next to each diagnosis create a short plan to include for further investigation to rule out differential diagnoses and suggest treaments. At the botton create a list of chronic issues. Start every diagnosis and plan suggestion on a new line using the "-" character):""",
        
        "improve_los": """You are an experienced American physican and a medical case manager and medical social worker. Here is a medical progress note you can use or use any clinical information given as input for understanding the patient. Please review it and decipher the clinical context and the psychosocial issues. Give me the following output only:
        Enlist brief practical actionable suggestions for improving this patient's length of stay. Start every suggestion on a new line using the "-" character""",
        
        "cut_readmission": """You are an experienced American physican and a medical case manager and medical social worker. Here is a medical progress note you can use or use any clinical information given as input for understanding the patient. Please review it and decipher the clinical contexgt and the psychosocial issues. Give me the following output only:
        Enlist brief practical actionable suggestions for reducing risk of admission in the next 30 days for this patient. Start every suggestion on a new line using the "-" character.""",
        
        "improve_care": """You are an experienced American physican, Medical case manager and a expert clinical pharmacist. Here is a medical progress note or any clinical information on a patient. Understand it as a whole to create a clear clinical story and context in your mind. For output give me a list of suggestions to improve the quality of my clinical care, reduce readmission risk and reduce medical errors. Base your suggestions on the latest evidence-based guidelines from American medical societies and CDC. Do not imagine new information only work with input provided. For output formatting, start every suggestion with a "-" character followed by your very short reasoning. OK to use standard medical acronyms and shorthand:"""
    }
    
    # Check existing prompts in the database
    existing_prompts = list(mongo.db.prompts.find({}, {"key": 1}))
    existing_keys = [p["key"] for p in existing_prompts]
    
    # Add default prompts that don't exist yet
    for key, text in default_prompts.items():
        if key not in existing_keys:
            mongo.db.prompts.insert_one({
                "key": key,
                "text": text,
                "active": True,
                "created_at": datetime.datetime.utcnow(),
                "created_by": "system",
                "updated_at": datetime.datetime.utcnow(),
                "updated_by": "system",
                "version": 1
            })
            logger.info(f"Added default prompt: {key}")
    
    logger.info("Default prompts initialized in MongoDB")
# Function to get a prompt from MongoDB
def get_prompt(key):
    """Get an active prompt from MongoDB by key."""
    prompt = mongo.db.prompts.find_one({"key": key, "active": True})
    if prompt:
        return prompt["text"]
    return None
@app.route("/admin/prompt/restore/<prompt_id>", methods=["POST"])
@admin_required
def restore_prompt_version(prompt_id):
    """Restore a previous version of a prompt."""
    # Get the prompt version to restore
    from bson.objectid import ObjectId
    prompt_to_restore = mongo.db.prompts.find_one({"_id": ObjectId(prompt_id)})
    
    if not prompt_to_restore:
        return jsonify({"error": "Prompt version not found"}), 404
    
    # Deactivate all current active versions of this prompt
    mongo.db.prompts.update_many(
        {"key": prompt_to_restore["key"], "active": True},
        {"$set": {"active": False}}
    )
    
    # Create new version based on the old one
    new_version = mongo.db.prompts.find_one(
        {"key": prompt_to_restore["key"]}, 
        sort=[("version", -1)]
    ).get("version", 0) + 1
    
    # Insert restored version as new active version
    admin_id = session.get('admin_id', 'admin')
    mongo.db.prompts.insert_one({
        "key": prompt_to_restore["key"],
        "text": prompt_to_restore["text"],
        "active": True,
        "created_at": datetime.datetime.utcnow(),
        "created_by": admin_id,
        "updated_at": datetime.datetime.utcnow(),
        "updated_by": admin_id,
        "restored_from": prompt_to_restore["version"],
        "version": new_version
    })
    
    logger.info(f"Prompt '{prompt_to_restore['key']}' restored to version {prompt_to_restore['version']} by admin")
    return jsonify({"message": "Prompt version restored successfully"}), 200

@app.route("/admin/prompt/create", methods=["POST"])
@admin_required
def create_new_prompt():
    """Create a new prompt type."""
    prompt_key = request.json.get("key")
    prompt_text = request.json.get("text")
    
    if not prompt_key or not prompt_text:
        return jsonify({"error": "Missing required fields"}), 400
    
    # Check if prompt key already exists
    existing = mongo.db.prompts.find_one({"key": prompt_key})
    if existing:
        return jsonify({"error": "Prompt key already exists"}), 409
    
    # Create new prompt
    admin_id = session.get('admin_id', 'admin')
    mongo.db.prompts.insert_one({
        "key": prompt_key,
        "text": prompt_text,
        "active": True,
        "created_at": datetime.datetime.utcnow(),
        "created_by": admin_id,
        "updated_at": datetime.datetime.utcnow(),
        "updated_by": admin_id,
        "version": 1
    })
    
    logger.info(f"New prompt '{prompt_key}' created by admin")
    return jsonify({"message": "New prompt created successfully"}), 201

# Add route to serve the JavaScript file
@app.route('/static/English_salad.js')
def serve_js():
    return send_file('English_salad.js', mimetype='application/javascript')

# Error Handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    initialize_default_prompts()
    app.run(debug=False, ssl_context='adhoc')  # Enable HTTPS
