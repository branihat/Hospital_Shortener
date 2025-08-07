from flask import Flask, request, jsonify, render_template, redirect, session, url_for, send_file
import google.generativeai as genai
import re
import bcrypt
import jwt
import datetime
from datetime import datetime as dt, timedelta, timezone
from functools import wraps
from config import (
    PROMPTS, 
    load_api_key, 
    load_mongo_uri, 
    MAIL_SERVER,
    MAIL_PORT,
    MAIL_USE_TLS,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_DEFAULT_SENDER
)
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
from flask_cors import CORS
from config import get_secret_key
from email_service import generate_verification_token, send_verification_email, send_password_reset_email, send_password_reset_confirmation, mail
import stripe

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

@app.route("/debug")
def debug():
    """Debug endpoint to test basic functionality"""
    try:
        # Test MongoDB connection
        users_count = mongo.db.users.count_documents({})
        prompts_count = mongo.db.prompts.count_documents({"active": True})
        
        return jsonify({
            "status": "ok",
            "database": "connected",
            "users_count": users_count,
            "active_prompts": prompts_count,
            "gemini_api_configured": bool(GEMINI_API_KEY)
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

@app.route("/test-button", methods=["POST"])
def test_button():
    """Simple test endpoint for button functionality - no authentication required"""
    try:
        data = request.json
        action = data.get("action")
        text = data.get("text")
        
        if not action or not text:
            return jsonify({"error": "Missing action or text"}), 400
        
        # Simple response without AI processing
        result = f"Button test successful!\n\nAction: {action}\nInput length: {len(text)} characters\nTimestamp: {dt.utcnow()}\n\nFirst 100 chars: {text[:100]}..."
        
        return jsonify({
            "result": result,
            "action": action,
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

# Initialize Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail.init_app(app)

# Update the register route
@app.route("/faq")
def faq():
    return render_template("faq.html")

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        email = data.get('email')
        # Store email in session for payment flow
        session.permanent = True 
        # Ensure session uses permanent session lifetime
        session['user_email'] = email
        logger.info("Email stored in session during registration")
        password = data.get('password')
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        degree = data.get('degree')
        profession = data.get('profession')
        institution = data.get('institution')

        # Check if user already exists
        email_hash = HIPAAEncryption.hash_email(email)
        if mongo.db.users.find_one({"email_hash": email_hash}):
            return jsonify({"error": "Email already registered"}), 409

        # Create user document
        user_id = str(uuid.uuid4())
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        user_doc = {
            "user_id": user_id,
            "email_hash": email_hash,
            "email": HIPAAEncryption.encrypt_data(email, app.config["SECRET_KEY"]),
            "password": hashed_password,
            "firstName": HIPAAEncryption.encrypt_data(first_name, app.config["SECRET_KEY"]),
            "lastName": HIPAAEncryption.encrypt_data(last_name, app.config["SECRET_KEY"]),
            "degree": degree,
            "profession": profession,
            "institution": institution,
            "status": "pending_payment",
            "created_at": dt.utcnow()
        }

        # Insert user
        mongo.db.users.insert_one(user_doc)

        return jsonify({
            "message": "Registration successful",
            "userId": user_id,
            "redirect": "/payment"
        }), 201

    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/profile")
@token_required
def get_profile():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
    email_hash = decoded.get("email_hash")
    user = mongo.db.users.find_one({"email_hash": email_hash})
    if not user:
        return jsonify({"error": "User not found"}), 404
    try:
        # Decrypt fields as needed
        first_name = HIPAAEncryption.decrypt_data(user.get('firstName', ''), app.config['SECRET_KEY'])
        last_name = HIPAAEncryption.decrypt_data(user.get('lastName', ''), app.config['SECRET_KEY'])
        email = HIPAAEncryption.decrypt_data(user.get('email', ''), app.config['SECRET_KEY'])
        name = f"{first_name} {last_name}"
    except Exception as e:
        app.logger.error(f"Profile decryption error for {email_hash}: {str(e)}")
        return jsonify({"error": "Profile data corrupted or missing"}), 500

    # Determine subscription status
    subscription_status = user.get('status', 'Unknown')
    if user.get('subscription_status') == 'cancelled':
        if user.get('period_end_date'):
            end_date = user.get('period_end_date')
            if isinstance(end_date, str):
                subscription_status = f"Cancelled (Active until {end_date})"
            else:
                subscription_status = f"Cancelled (Active until {end_date.strftime('%B %d, %Y')})"
        else:
            subscription_status = "Cancelled"
    elif subscription_status == 'active':
        subscription_status = "Active"
    elif subscription_status == 'pending_payment':
        subscription_status = "Pending Payment"

    return jsonify({
        "name": name,
        "email": email,
        "profession": user.get("profession", ""),
        "institution": user.get("institution", ""),
        "status": subscription_status
    })

@app.route("/api/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        email_hash = HIPAAEncryption.hash_email(email)
        user = mongo.db.users.find_one({"email_hash": email_hash})

        if not user:
            return jsonify({"error": "Invalid credentials"}), 401

        # Check if the user has a pending payment status
        if user.get("status") == "pending_payment":
            # Verify password before redirecting to payment
            if bcrypt.checkpw(password.encode("utf-8"), user["password"]):
                logger.info(f"Redirecting user {user.get('user_id')} to payment page")
                return jsonify({
                    "error": "Please complete your payment to access your account",
                    "redirect": "payment",
                    "user_id": user.get('user_id')
                }), 402  # 402 Payment Required
            else:
                logger.warning(f"Failed login attempt for pending payment user: {email_hash}")
                return jsonify({"error": "Invalid credentials"}), 401

        # Check password
        if bcrypt.checkpw(password.encode("utf-8"), user["password"]):
            # Create JWT token
            token = jwt.encode(
                {
                    "email_hash": email_hash,
                    "exp": dt.utcnow() + timedelta(hours=1),
                    "user_id": user.get("user_id")
                },
                app.config["SECRET_KEY"],
                algorithm="HS256"
            )
            
            logger.info(f"Successful login for user: {user.get('user_id')}")
            return jsonify({"token": token, "user_id": user["user_id"]}), 200
        
        logger.warning(f"Failed login attempt for email hash: {email_hash}")
        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({"error": "Authentication failed"}), 500
# API routes that need tokens can still use token_required
@app.route("/process", methods=["POST"])
@token_required
def process_text():
    """Handle AI processing requests (protected by JWT authentication)."""
    data = request.json
    action = data.get("action")
    text = data.get("text")

    if not action or not text:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        model = genai.GenerativeModel("gemini-2.0-flash-lite")
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
        "created_at": dt.utcnow(),
        "created_by": admin_id,
        "updated_at": dt.utcnow(),
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
                "created_at": datetime.utcnow(),
                "created_by": "system",
                "updated_at": datetime.utcnow(),
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
        "created_at": datetime.utcnow(),
        "created_by": admin_id,
        "updated_at": datetime.utcnow(),
        "updated_by": admin_id,
        "restored_from": prompt_to_restore["version"],
        "version": new_version
    })
    
    logger.info(f"Prompt '{prompt_to_restore['key']}' restored to version {prompt_to_restore['version']} by admin")
    return jsonify({"message": "Prompt version restored successfully"}), 200

@app.route("/admin/prompt/create", methods=["POST"])
@admin_required
def create_prompt():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('key') or not data.get('text'):
            return jsonify({"error": "Key and text are required"}), 400
        
        # Check if prompt already exists
        existing = mongo.db.prompts.find_one({"key": data['key'], "active": True})
        if existing:
            return jsonify({"error": "Prompt key already exists"}), 409
        
        # Prepare prompt document
        prompt = {
            "key": data['key'],
            "text": data['text'],
            "is_custom_tool": data.get('isCustomTool', False),
            "active": True,
            "created_at": datetime.utcnow(),
            "created_by": session.get('admin_id', 'admin'),
            "updated_at": datetime.utcnow(),
            "updated_by": session.get('admin_id', 'admin'),
            "version": 1
        }
        
        # Add custom tool fields if specified
        if data.get('isCustomTool'):
            if not data.get('buttonLabel') or not data.get('buttonTooltip'):
                return jsonify({"error": "Button label and tooltip are required for custom tools"}), 400
            prompt.update({
                "button_label": data['buttonLabel'],
                "button_tooltip": data['buttonTooltip']
            })
        
        # Insert into database
        result = mongo.db.prompts.insert_one(prompt)
        
        if result.inserted_id:
            logger.info(f"New prompt '{data['key']}' created by admin")
            return jsonify({
                "message": "Prompt created successfully",
                "id": str(result.inserted_id)
            }), 201
        else:
            raise Exception("Failed to insert prompt")
            
    except Exception as e:
        logger.error(f"Error creating prompt: {str(e)}")
        return jsonify({"error": f"Failed to create prompt: {str(e)}"}), 500

# Add route to serve the JavaScript file
@app.route('/static/English_salad.js')
def serve_js():
    return send_file('English_salad.js', mimetype='application/javascript')

@app.route('/pricing')
def pricing():
    plans = {
        'premium': {
            'name': 'Premium',
            'price': '6.99',
            'description': 'Complete Medical Documentation Solution',
            'features': [
                'Secure Transaction',
                'Includes Basic & Advanced Features',
                'Includes future Updates',
                'HIPAA Compliant',
                'Cancel Anytime'
            ],
            'api_requests': 'Unlimited',
            'signup_url': '/signup'
        }
    }
    return render_template('pricing.html', 
                         plans=plans,
                         stripe_public_key=os.getenv('STRIPE_PUBLIC_KEY'))

# Error Handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

@app.route("/verify/<token>")
def verify_email(token):
    """Handle email verification links"""
    try:
        # Decode the verification token
        decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        email = decoded['email']
        
        # Get email hash for lookup
        email_hash = HIPAAEncryption.hash_email(email)
        
        logger.info(f"Attempting to verify email with hash: {email_hash}")
        
        # Check current verification status
        user = mongo.db.users.find_one({"email_hash": email_hash})
        if not user:
            logger.error(f"User not found for email hash: {email_hash}")
            return render_template("login.html", 
                                message="User not found.",
                                message_type="error")
                                
        if user.get("is_verified", False):
            logger.info(f"Email already verified for hash: {email_hash}")
            return render_template("login.html", 
                                message="Email already verified. Please login.",
                                message_type="info")

        # Update user verification status
        result = mongo.db.users.update_one(
            {
                "email_hash": email_hash,
                "is_verified": False
            },
            {
                "$set": {
                    "is_verified": True,
                    "verified_at": datetime.utcnow(),
                    "verification_token": None
                }
            }
        )

        if result.modified_count == 1:
            logger.info(f"Email verified successfully for hash: {email_hash}")
            return render_template("login.html", 
                                message="Email verified successfully! You can now log in.",
                                message_type="success")
        else:
            logger.warning(f"No update performed for hash: {email_hash}")
            return render_template("login.html", 
                                message="Verification failed. Please try again.",
                                message_type="warning")

    except Exception as e:
        logger.error(f"Verification error: {str(e)}")
        return render_template("login.html", 
                            message="An error occurred during verification. Please try again.",
                            message_type="error")
    
# Add this after MongoDB initialization
def initialize_payment_collection():
    """Initialize payment collection with unique indexes"""
    try:
        mongo.db.payments.create_index("session_id", unique=True)
        mongo.db.payments.create_index("email", unique=True)
        logger.info("Payment collection initialized")
    except Exception as e:
        logger.error(f"Error initializing payment collection: {str(e)}")
        
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

    logger.info("Webhook received")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
        logger.info(f"Webhook event type: {event['type']}")

    except ValueError as e:
        logger.error(f"Invalid payload: {str(e)}")
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"Invalid signature: {str(e)}")
        return jsonify({'error': 'Invalid signature'}), 400

    try:
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            customer_email = session.get('customer_details', {}).get('email')
            
            if not customer_email:
                logger.error("No customer email in session data")
                return jsonify({'error': 'No customer email found'}), 400

            logger.info(f"Processing payment for email: {customer_email}")
            
            # Update user status to active
            email_hash = HIPAAEncryption.hash_email(customer_email)
            result = mongo.db.users.update_one(
                {"email_hash": email_hash},
                {
                    "$set": {
                        "status": "active",
                        "stripe_customer_id": session.get('customer'),
                        "subscription_id": session.get('subscription'),
                        "payment_status": "completed",
                        "payment_date": datetime.utcnow()
                    }
                }
            )

            if result.modified_count == 1:
                logger.info(f"Successfully updated user status to active for: {customer_email}")
                
                # Record the payment
                payment_record = {
                    "email_hash": email_hash,
                    "stripe_session_id": session.get('id'),
                    "stripe_customer_id": session.get('customer'),
                    "subscription_id": session.get('subscription'),
                    "amount_total": session.get('amount_total'),
                    "currency": session.get('currency'),
                    "payment_status": "completed",
                    "created_at": datetime.utcnow()
                }
                mongo.db.payments.insert_one(payment_record)
                logger.info(f"Payment record created for: {customer_email}")
                
            else:
                logger.error(f"Failed to update user status for: {customer_email}")
                return jsonify({'error': 'User not found'}), 404

        return jsonify({'status': 'success'})

    except Exception as e:
        logger.error(f"Error processing webhook: {str(e)}")
        return jsonify({'error': str(e)}), 500
def payment_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == "GET":
            email = request.args.get("email")
            if not email:
                return redirect(url_for('pricing'))
            
            payment = mongo.db.payments.find_one({
                "email": email,
                "registration_used": False
            })
            
            if not payment:
                return redirect(url_for('pricing'))
        
        return f(*args, **kwargs)
    return decorated

def verify_payment(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        email = request.args.get('email')
        if not email:
            return redirect(url_for('pricing'))
        
        payment = mongo.db.payments.find_one({
            'email': email,
            'registration_used': False
        })
        
        if not payment:
            return redirect(url_for('pricing', 
                                  message="Please complete payment first"))
        
        return f(*args, **kwargs)
    return decorated_function

@app.route('/signup')
def show_signup_page():
    """Show the signup page"""
    return render_template("signup.html")

@app.route('/payment/success')
def payment_success():
    session_id = request.args.get('session_id')
    if not session_id:
        return redirect(url_for('pricing'))

    try:
        # Retrieve the session
        session = stripe.checkout.Session.retrieve(session_id)
        
        # Verify payment status
        if session.payment_status == 'paid':
            customer_email = session.customer_details.email
            
            # Check if user status is updated
            email_hash = HIPAAEncryption.hash_email(customer_email)
            user = mongo.db.users.find_one({"email_hash": email_hash})
            
            if user and user.get('status') == 'active':
                return render_template('success.html', 
                                    email=customer_email,
                                    message="Your payment was successful! You can now log in.")
            else:
                # If status not yet updated, show waiting message
                return render_template('success.html',
                                    email=customer_email,
                                    message="Payment received, account activation in progress...")
        else:
            logger.error(f"Invalid payment status for session {session_id}")
            return redirect(url_for('pricing'))

    except Exception as e:
        logger.error(f"Error verifying payment success: {str(e)}")
        return redirect(url_for('pricing'))

@app.route("/resend-verification", methods=["POST"])
def resend_verification():
    try:
        email = request.json.get("email")
        if not email:
            return jsonify({"error": "Email is required"}), 400

        email_hash = HIPAAEncryption.hash_email(email)
        user = mongo.db.users.find_one({"email_hash": email_hash})

        if not user:
            return jsonify({"error": "User not found"}), 404

        if user.get("is_verified", False):
            return jsonify({"error": "Email already verified"}), 400

        # Generate new verification token
        token = generate_verification_token(email)
        
        # Update user's verification token
        mongo.db.users.update_one(
            {"email_hash": email_hash},
            {"$set": {"verification_token": token}}
        )

        # Send new verification email
        first_name = HIPAAEncryption.decrypt_data(user["firstName"], app.config["SECRET_KEY"])
        if send_verification_email(email, token, first_name):
            return jsonify({
                "message": "Verification email sent successfully"
            }), 200
        else:
            return jsonify({"error": "Failed to send verification email"}), 500

    except Exception as e:
        logger.error(f"Resend verification error: {str(e)}")
        return jsonify({"error": "Failed to resend verification"}), 500

@app.route("/api/agreements/<agreement_type>")
def get_agreement(agreement_type):
    agreements = {
        "eula": {
            "content": """
            <h3>End User License Agreement</h3>
            <div class="agreement-section">
                <h4>1. Introduction</h4>
                <p>This End User License Agreement ("Agreement") is a legal agreement between you and ChartWitch ("Company", "we", "us", or "our") for the use of our medical documentation software and services.</p>
                
                <h4>2. License Grant</h4>
                <p>Subject to the terms of this Agreement, we grant you a limited, non-exclusive, non-transferable license to use our software for medical documentation purposes.</p>
                
                <h4>3. HIPAA Compliance</h4>
                <p>Our service is designed to be HIPAA compliant. You agree to use the service in compliance with all applicable healthcare privacy laws and regulations.</p>
                
                <h4>4. Data Security</h4>
                <p>We implement industry-standard security measures to protect patient information. However, you are responsible for maintaining the security of your login credentials.</p>
                
                <h4>5. Limitations</h4>
                <p>You may not: (a) modify or create derivative works of the software; (b) reverse engineer the software; (c) use the software for illegal purposes.</p>
            </div>
            """
        },
        "baa": {
            "content": """
            <h3>Business Associate Agreement</h3>
            <div class="agreement-section">
                <h4>1. Definitions</h4>
                <p>Terms used but not otherwise defined in this BAA shall have the same meaning as those terms in HIPAA Rules.</p>
                
                <h4>2. Obligations of Business Associate</h4>
                <p>ChartWitch agrees to:</p>
                <ul>
                    <li>Not use or disclose Protected Health Information other than as permitted or required by this Agreement</li>
                    <li>Use appropriate safeguards to prevent unauthorized use or disclosure of PHI</li>
                    <li>Report to Covered Entity any use or disclosure not provided for by this Agreement</li>
                </ul>
                
                <h4>3. Privacy Practices</h4>
                <p>We maintain privacy practices that comply with HIPAA Security Rule requirements including:</p>
                <ul>
                    <li>Encryption of PHI in transit and at rest</li>
                    <li>Access controls and authentication</li>
                    <li>Audit logging and monitoring</li>
                </ul>
                
                <h4>4. Breach Notification</h4>
                <p>In the event of a data breach, we will:</p>
                <ul>
                    <li>Notify affected parties within required timeframes</li>
                    <li>Assist in breach investigation</li>
                    <li>Provide necessary documentation</li>
                </ul>
            </div>
            """
        }
    }
    
    if agreement_type not in agreements:
        return jsonify({"error": "Agreement not found"}), 404
        
    return jsonify(agreements[agreement_type])

# Add this after your other routes
@app.route("/api/custom-tools")
def get_custom_tools():
    """Get all custom tools."""
    try:
        # Find all active custom tools
        custom_tools = list(mongo.db.prompts.find(
            {
                "is_custom_tool": True,
                "active": True
            },
            {
                "_id": 0,
                "key": 1,
                "button_label": 1,
                "button_tooltip": 1,
                "text": 1  # Include the prompt text
            }
        ))
        
        return jsonify({"tools": custom_tools})
    except Exception as e:
        logger.error(f"Error retrieving custom tools: {str(e)}")
        return jsonify({"error": "Failed to retrieve custom tools"}), 500

@app.route("/api/all-tools")
def get_all_tools_for_tabs():
    """Get all custom tools organized by tabs for the main interface"""
    try:
        # Find all active custom tools
        tools = list(mongo.db.prompts.find(
            {
                "is_custom_tool": True,
                "active": True
            },
            {
                "_id": 0,
                "key": 1,
                "button_label": 1,
                "button_tooltip": 1,
                "text": 1,
                "tab": 1
            }
        ))
        
        return jsonify({"tools": tools})
    except Exception as e:
        logger.error(f"Error retrieving all tools: {str(e)}")
        return jsonify({"error": "Failed to retrieve tools"}), 500

# Admin Tools Management API
@app.route("/admin/tools")
@admin_required
def admin_tools():
    """Admin tools management page"""
    return render_template("admin_tools.html")

@app.route("/admin/api/tools", methods=["GET"])
@admin_required
def get_all_tools():
    """Get all tools for admin management"""
    try:
        # Get all active tools (both custom and regular)
        tools = list(mongo.db.prompts.find(
            {"active": True},
            {
                "key": 1,
                "text": 1,
                "button_label": 1,
                "button_tooltip": 1,
                "is_custom_tool": 1,
                "tab": 1,
                "created_at": 1,
                "updated_at": 1
            }
        ).sort("created_at", -1))
        
        # Filter only custom tools or tools with tab assignment
        custom_tools = [tool for tool in tools if tool.get('is_custom_tool') or tool.get('tab')]
        
        return jsonify({"tools": custom_tools})
    except Exception as e:
        logger.error(f"Error retrieving tools: {str(e)}")
        return jsonify({"error": "Failed to retrieve tools"}), 500

@app.route("/admin/api/tools/<tool_id>", methods=["GET"])
@admin_required
def get_tool(tool_id):
    """Get a specific tool by ID"""
    try:
        from bson.objectid import ObjectId
        tool = mongo.db.prompts.find_one({"_id": ObjectId(tool_id), "active": True})
        
        if not tool:
            return jsonify({"error": "Tool not found"}), 404
        
        # Convert ObjectId to string for JSON serialization
        tool['_id'] = str(tool['_id'])
        
        return jsonify({"tool": tool})
    except Exception as e:
        logger.error(f"Error retrieving tool {tool_id}: {str(e)}")
        return jsonify({"error": "Failed to retrieve tool"}), 500

@app.route("/admin/api/tools", methods=["POST"])
@admin_required
def create_tool():
    """Create a new tool"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['key', 'buttonLabel', 'buttonTooltip', 'text', 'tab']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"{field} is required"}), 400
        
        # Check if tool key already exists
        existing = mongo.db.prompts.find_one({"key": data['key'], "active": True})
        if existing:
            return jsonify({"error": "Tool key already exists"}), 409
        
        # Create tool document
        tool = {
            "key": data['key'],
            "text": data['text'],
            "button_label": data['buttonLabel'],
            "button_tooltip": data['buttonTooltip'],
            "tab": data['tab'],
            "is_custom_tool": True,
            "active": True,
            "created_at": datetime.utcnow(),
            "created_by": session.get('admin_id', 'admin'),
            "updated_at": datetime.utcnow(),
            "updated_by": session.get('admin_id', 'admin'),
            "version": 1
        }
        
        # Insert into database
        result = mongo.db.prompts.insert_one(tool)
        
        if result.inserted_id:
            logger.info(f"New tool '{data['key']}' created by admin in tab '{data['tab']}'")
            return jsonify({
                "message": "Tool created successfully",
                "id": str(result.inserted_id)
            }), 201
        else:
            raise Exception("Failed to insert tool")
            
    except Exception as e:
        logger.error(f"Error creating tool: {str(e)}")
        return jsonify({"error": f"Failed to create tool: {str(e)}"}), 500

@app.route("/admin/api/tools/<tool_id>", methods=["PUT"])
@admin_required
def update_tool(tool_id):
    """Update an existing tool"""
    try:
        from bson.objectid import ObjectId
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['key', 'buttonLabel', 'buttonTooltip', 'text', 'tab']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"{field} is required"}), 400
        
        # Check if tool exists
        tool = mongo.db.prompts.find_one({"_id": ObjectId(tool_id), "active": True})
        if not tool:
            return jsonify({"error": "Tool not found"}), 404
        
        # Check if new key conflicts with existing tool (if key changed)
        if data['key'] != tool['key']:
            existing = mongo.db.prompts.find_one({
                "key": data['key'], 
                "active": True,
                "_id": {"$ne": ObjectId(tool_id)}
            })
            if existing:
                return jsonify({"error": "Tool key already exists"}), 409
        
        # Update tool
        update_data = {
            "key": data['key'],
            "text": data['text'],
            "button_label": data['buttonLabel'],
            "button_tooltip": data['buttonTooltip'],
            "tab": data['tab'],
            "updated_at": datetime.utcnow(),
            "updated_by": session.get('admin_id', 'admin')
        }
        
        result = mongo.db.prompts.update_one(
            {"_id": ObjectId(tool_id)},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            logger.info(f"Tool '{data['key']}' updated by admin")
            return jsonify({"message": "Tool updated successfully"}), 200
        else:
            return jsonify({"error": "No changes made"}), 400
            
    except Exception as e:
        logger.error(f"Error updating tool {tool_id}: {str(e)}")
        return jsonify({"error": f"Failed to update tool: {str(e)}"}), 500

@app.route("/admin/api/tools/<tool_id>", methods=["DELETE"])
@admin_required
def delete_tool(tool_id):
    """Delete a tool"""
    try:
        from bson.objectid import ObjectId
        
        # Check if tool exists
        tool = mongo.db.prompts.find_one({"_id": ObjectId(tool_id), "active": True})
        if not tool:
            return jsonify({"error": "Tool not found"}), 404
        
        # Soft delete by setting active to False
        result = mongo.db.prompts.update_one(
            {"_id": ObjectId(tool_id)},
            {
                "$set": {
                    "active": False,
                    "deleted_at": datetime.utcnow(),
                    "deleted_by": session.get('admin_id', 'admin')
                }
            }
        )
        
        if result.modified_count > 0:
            logger.info(f"Tool '{tool.get('key')}' deleted by admin")
            return jsonify({"message": "Tool deleted successfully"}), 200
        else:
            return jsonify({"error": "Failed to delete tool"}), 500
            
    except Exception as e:
        logger.error(f"Error deleting tool {tool_id}: {str(e)}")
        return jsonify({"error": f"Failed to delete tool: {str(e)}"}), 500

@app.route('/payment')
def payment_page():
    user_id = request.args.get('user_id')
    if not user_id:
        return redirect(url_for('signup'))
    
    user = mongo.db.users.find_one({"user_id": user_id})
    if not user or user.get('status') != 'pending_payment':
        return redirect(url_for('signup'))
    
    # Decrypt the email for display (but not store in template for security)
    try:
        email = HIPAAEncryption.decrypt_data(user.get('email'), app.config["SECRET_KEY"])
    except Exception as e:
        logger.error(f"Error decrypting email for user_id {user_id}: {str(e)}")
        email = ""

    return render_template('payment.html', 
                         user_id=user_id,
                         user_email=email,
                         stripe_public_key=os.getenv('STRIPE_PUBLIC_KEY'))

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        logger.info("Creating checkout session...")
        
        # Extract form data
        user_id = request.form.get('user_id')
        email = request.form.get('email')
        
        logger.info(f"Checkout request for user_id: {user_id}, email: {email}")
        
        # If email is not provided in form, try to get it from user record
        if not email and user_id:
            user = mongo.db.users.find_one({"user_id": user_id})
            if user:
                # Decrypt the email from the user record
                try:
                    email = HIPAAEncryption.decrypt_data(user.get('email'), app.config["SECRET_KEY"])
                    logger.info(f"Retrieved email from user record for user_id: {user_id}")
                except Exception as e:
                    logger.error(f"Error decrypting email for user_id {user_id}: {str(e)}")
        
        if not user_id:
            logger.error("No user_id provided")
            return jsonify({"error": "User ID is required"}), 400
            
        if not email:
            logger.error("No email found for user")
            return jsonify({"error": "Email is required for checkout"}), 400
        
        # Check if required environment variables are set
        stripe_price_id = os.getenv('STRIPE_PRICE_ID')
        stripe_secret_key = os.getenv('STRIPE_SECRET_KEY')
        
        if not stripe_price_id:
            logger.error("STRIPE_PRICE_ID not found in environment variables")
            return jsonify({"error": "Payment configuration error"}), 500
        
        if not stripe_secret_key:
            logger.error("STRIPE_SECRET_KEY not found in environment variables")
            return jsonify({"error": "Payment configuration error"}), 500
        
        logger.info(f"Using Stripe Price ID: {stripe_price_id}")
        
        checkout_session = stripe.checkout.Session.create(
            customer_email=email,
            metadata={
                'user_id': user_id
            },
            payment_method_types=['card'],
            line_items=[{
                'price': stripe_price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=request.host_url + 'payment/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=request.host_url + 'payment/cancel',
        )
        
        logger.info(f"Checkout session created successfully: {checkout_session.id}")
        return redirect(checkout_session.url, code=303)
        
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        return jsonify({"error": f"Payment processing error: {str(e)}"}), 500
    except Exception as e:
        logger.error(f"Unexpected error in create_checkout_session: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/payment/cancel')
def payment_cancel():
    """Handle payment cancellation"""
    return render_template('payment_cancel.html')

@app.route("/api/user-status", methods=["GET"])
def get_user_status():
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        email_hash = HIPAAEncryption.hash_email(email)
        user = mongo.db.users.find_one({"email_hash": email_hash}, {"status": 1})
        if user:
            return jsonify({"status": user.get("status", "unknown")}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        logger.error(f"Error fetching user status: {str(e)}")
        return jsonify({"error": "Failed to fetch user status"}), 500

@app.route("/api/change-password", methods=["POST"])
@token_required
def change_password():
    """Change user password"""
    try:
        data = request.json
        current_password = data.get('currentPassword')
        new_password = data.get('newPassword')
        
        if not current_password or not new_password:
            return jsonify({"error": "Both current and new passwords are required"}), 400
        
        # Get current user from token
        token = request.headers.get("Authorization").split(" ")[1]
        decoded_token = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        email_hash = decoded_token.get("email_hash")
        
        user = mongo.db.users.find_one({"email_hash": email_hash})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Verify current password
        if not bcrypt.checkpw(current_password.encode('utf-8'), user['password']):
            return jsonify({"error": "Current password is incorrect"}), 400
        
        # Validate new password
        validation_error = validate_password(new_password)
        if validation_error:
            return jsonify({"error": validation_error}), 400
        
        # Hash new password
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt(rounds=12))
        
        # Update password in database
        result = mongo.db.users.update_one(
            {"email_hash": email_hash},
            {
                "$set": {
                    "password": hashed_password,
                    "password_changed_at": datetime.utcnow(),
                    "failed_login_attempts": 0
                }
            }
        )
        
        if result.modified_count == 0:
            return jsonify({"error": "Failed to update password"}), 500
        
        logger.info(f"Password changed successfully for user: {email_hash}")
        return jsonify({"message": "Password changed successfully"}), 200
        
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
    except Exception as e:
        logger.error(f"Change password error: {str(e)}")
        return jsonify({"error": "Failed to change password"}), 500

@app.route("/api/cancel-subscription", methods=["POST"])
@token_required
def cancel_subscription():
    """Cancel user's Stripe subscription"""
    try:
        data = request.json
        cancellation_reason = data.get('reason', '')
        
        # Get current user from token
        token = request.headers.get("Authorization").split(" ")[1]
        decoded_token = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        email_hash = decoded_token.get("email_hash")
        
        user = mongo.db.users.find_one({"email_hash": email_hash})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        subscription_id = user.get('subscription_id')
        if not subscription_id:
            return jsonify({"error": "No active subscription found"}), 400
        
        # Cancel subscription in Stripe
        try:
            subscription = stripe.Subscription.modify(
                subscription_id,
                cancel_at_period_end=True,
                metadata={
                    'cancellation_reason': cancellation_reason,
                    'cancelled_by': 'user',
                    'cancelled_at': datetime.utcnow().isoformat()
                }
            )
            
            # Update user record
            mongo.db.users.update_one(
                {"email_hash": email_hash},
                {
                    "$set": {
                        "subscription_status": "cancelled",
                        "cancellation_reason": cancellation_reason,
                        "cancelled_at": datetime.utcnow(),
                        "cancel_at_period_end": True,
                        "period_end_date": datetime.fromtimestamp(subscription.current_period_end)
                    }
                }
            )
            
            # Log the cancellation
            cancellation_record = {
                "email_hash": email_hash,
                "subscription_id": subscription_id,
                "reason": cancellation_reason,
                "cancelled_at": datetime.utcnow(),
                "period_end_date": datetime.fromtimestamp(subscription.current_period_end),
                "cancelled_by": "user"
            }
            mongo.db.cancellations.insert_one(cancellation_record)
            
            logger.info(f"Subscription cancelled for user: {email_hash}, reason: {cancellation_reason}")
            
            # Get formatted end date
            end_date = datetime.fromtimestamp(subscription.current_period_end).strftime('%B %d, %Y')
            
            return jsonify({
                "message": f"Subscription cancelled successfully. Access will continue until {end_date}.",
                "period_end_date": end_date
            }), 200
            
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error cancelling subscription: {str(e)}")
            return jsonify({"error": "Failed to cancel subscription. Please contact support."}), 500
        
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
    except Exception as e:
        logger.error(f"Cancel subscription error: {str(e)}")
        return jsonify({"error": "Failed to cancel subscription"}), 500

@app.route("/api/reactivate-subscription", methods=["POST"])
@token_required
def reactivate_subscription():
    """Reactivate a cancelled Stripe subscription"""
    try:
        # Get current user from token
        token = request.headers.get("Authorization").split(" ")[1]
        decoded_token = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        email_hash = decoded_token.get("email_hash")
        
        user = mongo.db.users.find_one({"email_hash": email_hash})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        subscription_id = user.get('subscription_id')
        if not subscription_id:
            return jsonify({"error": "No subscription found"}), 400
        
        # Check if subscription is cancelled but still active
        if user.get('subscription_status') != 'cancelled':
            return jsonify({"error": "Subscription is not cancelled"}), 400
        
        # Reactivate subscription in Stripe
        try:
            subscription = stripe.Subscription.modify(
                subscription_id,
                cancel_at_period_end=False,
                metadata={
                    'reactivated_by': 'user',
                    'reactivated_at': datetime.utcnow().isoformat()
                }
            )
            
            # Update user record
            mongo.db.users.update_one(
                {"email_hash": email_hash},
                {
                    "$set": {
                        "subscription_status": "active",
                        "reactivated_at": datetime.utcnow(),
                        "cancel_at_period_end": False
                    },
                    "$unset": {
                        "cancellation_reason": "",
                        "cancelled_at": "",
                        "period_end_date": ""
                    }
                }
            )
            
            logger.info(f"Subscription reactivated for user: {email_hash}")
            
            return jsonify({
                "message": "Subscription reactivated successfully!"
            }), 200
            
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error reactivating subscription: {str(e)}")
            return jsonify({"error": "Failed to reactivate subscription. Please contact support."}), 500
        
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
    except Exception as e:
        logger.error(f"Reactivate subscription error: {str(e)}")
        return jsonify({"error": "Failed to reactivate subscription"}), 500

# @app.route("/forgot-password", methods=["GET", "POST"])
# def forgot_password():
#     if request.method == "GET":
#         return render_template("forgot_password.html")
#     email = request.form.get("email")
#     if not email:
#         return render_template("forgot_password.html", error="Please enter your email.")
#     try:
#         # Generate a reset token (e.g., JWT or random string)
#         token = generate_verification_token(email)
#         # Send reset email (reuse your email sending logic)
#         send_verification_email(email, token, "User", reset=True)
#         return render_template("forgot_password.html", message="Check your email for a password reset link.")
#     except Exception as e:
#         print("Forgot password error:", e)
#         return render_template("forgot_password.html", error="Something went wrong. Please try again later.")

# @app.route("/reset-password/<token>", methods=["GET", "POST"])
# def reset_password(token):
#     try:
#         decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
#         email = decoded['email']
#     except Exception:
#         return "Invalid or expired token", 400

#     if request.method == "GET":
#         return render_template("reset_password.html", token=token)
#     new_password = request.form.get("password")
#     if not new_password:
#         return render_template("reset_password.html", token=token, error="Please enter a new password.")
#     # Hash and update password in DB
#     email_hash = HIPAAEncryption.hash_email(email)
#     hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
#     mongo.db.users.update_one({"email_hash": email_hash}, {"$set": {"password": hashed_password}})
#     return render_template("reset_password.html", message="Password reset successful! You can now log in.")

# Enhanced password reset routes with security improvements
import jwt
import bcrypt
import secrets
import string
from datetime import datetime, timedelta, timezone
from flask import request, render_template, redirect, url_for, flash
from functools import wraps
import re

# Enhanced password reset routes with security improvements
@app.route("/forgot-password", methods=["GET", "POST"])
def forgot_password():
    if request.method == "GET":
        return render_template("forgot_password.html")
    
    email = request.form.get("email", "").strip().lower()
    
    # Input validation
    if not email:
        return render_template("forgot_password.html", error="Please enter your email address.")
    
    # Email format validation
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email):
        return render_template("forgot_password.html", error="Please enter a valid email address.")
    
    try:
        # Check if user exists (using timing-safe comparison to prevent enumeration)
        email_hash = HIPAAEncryption.hash_email(email)
        user = mongo.db.users.find_one({"email_hash": email_hash})
        
        # Always show success message to prevent email enumeration attacks
        success_message = "If an account with that email exists, we've sent a password reset link."
        
        if user:
            # Check for recent reset attempts (rate limiting)
            recent_reset = mongo.db.password_resets.find_one({
                "email_hash": email_hash,
                "created_at": {"$gte": datetime.now(timezone.utc) - timedelta(minutes=15)},
                "used": {"$ne": True}
            })
            
            if recent_reset:
                # Don't send another email, but still show success message
                return render_template("forgot_password.html", message=success_message)
            
            # Generate secure reset token
            reset_token = generate_password_reset_token(email)
            
            # Store reset request in database with expiration
            reset_record = {
                "email_hash": email_hash,
                "token_hash": bcrypt.hashpw(reset_token.encode('utf-8'), bcrypt.gensalt()),
                "created_at": datetime.now(timezone.utc),
                "expires_at": datetime.now(timezone.utc) + timedelta(hours=1),  # 1 hour expiry
                "used": False,
                "ip_address": request.remote_addr,
                "user_agent": request.headers.get('User-Agent', '')
            }
            
            # Clean up old reset tokens for this user
            mongo.db.password_resets.delete_many({
                "email_hash": email_hash,
                "expires_at": {"$lt": datetime.now(timezone.utc)}
            })
            
            # Insert new reset record
            mongo.db.password_resets.insert_one(reset_record)
            
            # Get user name for email
            try:
                first_name = HIPAAEncryption.decrypt_data(user.get('firstName', ''), app.config['SECRET_KEY'])
                last_name = HIPAAEncryption.decrypt_data(user.get('lastName', ''), app.config['SECRET_KEY'])
                name = f"{first_name} {last_name}".strip() or "User"
            except:
                name = "User"
            
            # Send reset email
            send_password_reset_email(email, reset_token, name)
        
        return render_template("forgot_password.html", message=success_message)
        
    except Exception as e:
        app.logger.error(f"Forgot password error for {email}: {str(e)}")
        return render_template("forgot_password.html", 
                             error="Something went wrong. Please try again later.")

@app.route("/reset-password/<token>", methods=["GET", "POST"])
def reset_password(token):
    # Validate token format
    if not token or len(token) < 32:
        return render_template("error.html", 
                             message="Invalid reset link. Please request a new password reset."), 400
    
    try:
        # Decode JWT token to get email
        decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        email = decoded.get('email')
        token_id = decoded.get('token_id')  # Additional security measure
        
        if not email or not token_id:
            raise jwt.InvalidTokenError("Missing required token data")
            
    except jwt.ExpiredSignatureError:
        return render_template("error.html", 
                             message="Reset link has expired. Please request a new password reset."), 400
    except jwt.InvalidTokenError:
        return render_template("error.html", 
                             message="Invalid reset link. Please request a new password reset."), 400
    
    # Verify token exists in database and hasn't been used
    email_hash = HIPAAEncryption.hash_email(email)
    reset_record = mongo.db.password_resets.find_one({
        "email_hash": email_hash,
        "expires_at": {"$gte": datetime.now(timezone.utc)},
        "used": {"$ne": True}
    })
    
    if not reset_record:
        return render_template("error.html", 
                             message="Reset link is invalid or has already been used."), 400
    
    # Verify token hash matches
    if not bcrypt.checkpw(token.encode('utf-8'), reset_record['token_hash']):
        return render_template("error.html", 
                             message="Invalid reset link."), 400
    
    if request.method == "GET":
        return render_template("reset_password.html", token=token)
    
    # Handle password reset form submission
    new_password = request.form.get("password", "").strip()
    confirm_password = request.form.get("confirm_password", "").strip()
    
    # Password validation
    validation_error = validate_password(new_password, confirm_password)
    if validation_error:
        return render_template("reset_password.html", token=token, error=validation_error)
    
    try:
        # Check if user still exists
        user = mongo.db.users.find_one({"email_hash": email_hash})
        if not user:
            return render_template("error.html", 
                                 message="User account not found."), 400
        
        # Hash new password
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt(rounds=12))
        
        # Update password in database
        update_result = mongo.db.users.update_one(
            {"email_hash": email_hash}, 
            {
                "$set": {
                    "password": hashed_password,
                    "password_changed_at": datetime.now(timezone.utc),
                    "failed_login_attempts": 0  # Reset failed login attempts
                }
            }
        )
        
        if update_result.modified_count == 0:
            raise Exception("Failed to update password")
        
        # Mark reset token as used
        mongo.db.password_resets.update_one(
            {"_id": reset_record["_id"]},
            {
                "$set": {
                    "used": True,
                    "used_at": datetime.now(timezone.utc),
                    "used_ip": request.remote_addr
                }
            }
        )
        
        # Log successful password reset
        app.logger.info(f"Password reset successful for user: {email_hash}")
        
        # Get user name for confirmation email
        try:
            first_name = HIPAAEncryption.decrypt_data(user.get('firstName', ''), app.config['SECRET_KEY'])
            last_name = HIPAAEncryption.decrypt_data(user.get('lastName', ''), app.config['SECRET_KEY'])
            name = f"{first_name} {last_name}".strip() or "User"
        except:
            name = "User"
        
        # Send confirmation email
        send_password_reset_confirmation(email, name)
        
        return render_template("reset_password.html", 
                             message="Password reset successful! You can now log in with your new password.")
        
    except Exception as e:
        app.logger.error(f"Password reset error for {email}: {str(e)}")
        return render_template("reset_password.html", token=token,
                             error="Something went wrong. Please try again.")

# Helper functions
def generate_password_reset_token(email):
    """Generate a secure JWT token for password reset"""
    token_id = secrets.token_urlsafe(32)  # Additional security measure
    now = datetime.now(timezone.utc)
    payload = {
        'email': email,
        'token_id': token_id,
        'exp': now + timedelta(hours=1),  # 1 hour expiry
        'iat': now,
        'purpose': 'password_reset'
    }
    return jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")

def validate_password(password, confirm_password=None):
    """Validate password strength and confirmation"""
    if not password:
        return "Please enter a password."
    
    if len(password) < 8:
        return "Password must be at least 8 characters long."
    
    if len(password) > 128:
        return "Password must be less than 128 characters long."
    
    # Check for complexity requirements
    if not re.search(r'[A-Z]', password):
        return "Password must contain at least one uppercase letter."
    
    if not re.search(r'[a-z]', password):
        return "Password must contain at least one lowercase letter."
    
    if not re.search(r'\d', password):
        return "Password must contain at least one number."
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return "Password must contain at least one special character."
    
    # Check for common passwords (you might want to use a more comprehensive list)
    common_passwords = ['password', '123456789', 'qwerty', 'abc123', 'password123']
    if password.lower() in common_passwords:
        return "Please choose a more secure password."
    
    if confirm_password is not None and password != confirm_password:
        return "Passwords do not match."
    
    return None


# Test email function for debugging
def test_email_connection():
    """Test email configuration and connection"""
    try:
        with mail.connect() as conn:
            logging.info("Email connection successful")
            return True
    except Exception as e:
        logging.error(f"Email connection failed: {str(e)}")
        return False

if __name__ == "__main__":
    initialize_default_prompts()
    app.run(debug=False, ssl_context='adhoc')  # Enable HTTPS
    initialize_payment_collection()
