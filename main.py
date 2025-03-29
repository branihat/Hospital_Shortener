from flask import Flask, request, jsonify, render_template, redirect
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
from flask_cors import CORS  # Added CORS support
from config import get_secret_key

# Configure logging for audit trail
logging.basicConfig(
    filename='hipaa_audit.log', 
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config["SECRET_KEY"] = get_secret_key()
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
    text = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '[SSN REDACTED]'),  # Social Security Number
    text = re.sub(r'\b\d{10}\b', '[MRN REDACTED]'),  # Medical Record Number
    text = re.sub(r'\b\d{4}-\d{4}-\d{4}-\d{4}\b', '[INSURANCE REDACTED]'),  # Insurance Number
    text = re.sub(r'\b\d{1,2}/\d{1,2}/\d{4}\b', '[DATE REDACTED]'),  # Specific Dates
    text = re.sub(r'\b\d+\s+[A-Z][a-z]+\s+(Street|St\.|Avenue|Ave\.|Road|Rd\.)\b', '[ADDRESS REDACTED]'),
    text = re.sub(r'\bDr\.?\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Dr. XYZ'),  # Doctor names
    text = re.sub(r'\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Patient XYZ')  # Patient names
    return text

# Function to clean AI-generated output text
def clean_output(text):
    """Removes unnecessary characters and trims extra spaces."""
    return text.replace("*", "").strip()

# Enhanced Authentication Decorator with Audit Logging
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

@app.route("/")
def home():
    return render_template("landing.html")

@app.route("/login")
def show_login_page():
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    return render_template("index.html")

@app.route("/register", methods=["POST"])
@limiter.limit("3 per minute")
def register():
    """Handle user registration with enhanced security and email uniqueness."""
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        logger.warning("Registration attempt with missing email or password")
        return jsonify({"error": "Email and password are required"}), 400

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
            return jsonify({"error": "An account with this email already exists"}), 409  # Use 409 Conflict status

        # Enhanced password hashing
        salt = bcrypt.gensalt(rounds=12)  # Increased salt rounds
        hashed_pw = bcrypt.hashpw(password.encode("utf-8"), salt)
        
        # Generate unique user ID for audit trail
        user_id = str(uuid.uuid4())

        # Save user to database
        user_doc = {
            "user_id": user_id,
            "email": encrypted_email,
            "email_hash": email_hash,  # Store the hash for lookups
            "password": hashed_pw,
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

@app.route("/process", methods=["POST"])
@token_required
@limiter.limit("20 per hour")
def process_text():
    """Handle AI processing requests (protected by JWT authentication)."""
    data = request.json
    action = data.get("action")
    text = data.get("text")

    # Validate request
    if not action or not text:
        return jsonify({"error": "Missing required fields"}), 400
    if action not in PROMPTS:
        return jsonify({"error": "Invalid action"}), 400

    try:
        model = genai.GenerativeModel("gemini-1.5-pro")

        # Anonymize input text before sending to AI
        anonymized_text = anonymize_text(text)

        # Generate response from AI
        response = model.generate_content(PROMPTS[action] + "\n\n" + anonymized_text)
        output_text = getattr(response, "text", "No response generated.")  # Safer extraction

        # Log AI processing for audit trail
        logger.info(f"AI processing completed for action: {action}")

        return jsonify({"result": clean_output(output_text)})
    
    except Exception as e:
        logger.error(f"AI processing error: {str(e)}")
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# Error Handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=False, ssl_context='adhoc')  # Enable HTTPS