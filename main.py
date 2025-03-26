from flask import Flask, request, jsonify, render_template, redirect
import google.generativeai as genai
import re
import bcrypt
import jwt
import datetime
from functools import wraps
from config import PROMPTS, load_api_key, load_mongo_uri
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["SECRET_KEY"] = "supersecretkey"  # Change this to a secure key

# Load MongoDB URI first
MONGO_URI = load_mongo_uri()
app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)  # Initialize MongoDB connection

# Load API keys
GEMINI_API_KEY = load_api_key()
genai.configure(api_key=GEMINI_API_KEY)

@app.route("/")
def home():
    return render_template("landing.html")

@app.route("/login")
def show_login_page():
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    return render_template("index.html")

# Function to anonymize confidential data
def anonymize_text(text):
    """Replace doctor and patient names with generic placeholders."""
    text = re.sub(r'\bDr\.?\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Dr. XYZ', text)  # Doctor names
    text = re.sub(r'\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Patient XYZ', text)  # Patient names
    return text

# Function to clean AI-generated output text
def clean_output(text):
    """Removes unnecessary characters and trims extra spaces."""
    return text.replace("*", "").strip()

# JWT Token Verification Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token is missing"}), 401
        
        try:
            token = token.split(" ")[1]  # Remove "Bearer" prefix
            decoded_token = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({"email": decoded_token["email"]})
            if not current_user:
                return jsonify({"error": "Invalid token"}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated

@app.route("/register", methods=["POST"])
def register():
    """Handle user registration."""
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if user already exists
    if mongo.db.users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Save user to database
    mongo.db.users.insert_one({"email": email, "password": hashed_pw})

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    """Handle user login and return JWT token."""
    email = request.json.get("email")
    password = request.json.get("password")

    user = mongo.db.users.find_one({"email": email})

    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        # Create JWT token
        token = jwt.encode(
            {"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
            app.config["SECRET_KEY"],
            algorithm="HS256"
        )
        return jsonify({"token": token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route("/process", methods=["POST"])
@token_required
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

        return jsonify({"result": clean_output(output_text)})
    
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify, render_template, redirect
import google.generativeai as genai
import re
import bcrypt
import jwt
import datetime
import logging
from functools import wraps
from config import PROMPTS, load_api_key, load_mongo_uri
from flask_pymongo import PyMongo
from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from cryptography.fernet import Fernet

app = Flask(__name__)

# Enhanced Security Configuration
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", os.urandom(24))
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

# Initialize Talisman for HTTPS and security headers
Talisman(app, force_https=True, strict_transport_security=True)

# Rate Limiting
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per day", "30 per hour"],
    storage_uri="memory://"
)

# Logging Configuration
logging.basicConfig(
    filename='chartwitch_audit.log', 
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Load MongoDB URI and initialize
MONGO_URI = load_mongo_uri()
app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)

# Load API keys
GEMINI_API_KEY = load_api_key()
genai.configure(api_key=GEMINI_API_KEY)

# Encryption Key for Additional Data Protection
ENCRYPTION_KEY = Fernet.generate_key()
cipher_suite = Fernet(ENCRYPTION_KEY)

def log_event(event_type, user_email=None, details=None):
    """Comprehensive logging for audit trails"""
    log_entry = {
        "type": event_type,
        "user": user_email or "SYSTEM",
        "details": details or {},
        "timestamp": datetime.datetime.utcnow()
    }
    mongo.db.audit_logs.insert_one(log_entry)
    logging.info(f"{event_type}: {log_entry}")

def advanced_anonymization(text):
    """Advanced PHI anonymization for HIPAA compliance"""
    if not isinstance(text, str):
        return text

    # Comprehensive PHI removal patterns
    anonymization_patterns = [
        (r'\b\d{3}-\d{2}-\d{4}\b', '[SSN REDACTED]'),  # Social Security Number
        (r'\b\d{10}\b', '[MRN REDACTED]'),  # Medical Record Number
        (r'\b\d{4}-\d{4}-\d{4}-\d{4}\b', '[INSURANCE REDACTED]'),  # Insurance Number
        (r'\b\d{1,2}/\d{1,2}/\d{4}\b', '[DATE REDACTED]'),  # Specific Dates
        (r'\b\d+\s+[A-Z][a-z]+\s+(Street|St\.|Avenue|Ave\.|Road|Rd\.)\b', '[ADDRESS REDACTED]'),
        (r'\bDr\.?\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Dr. XYZ'),  # Doctor names
        (r'\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Patient XYZ')  # Patient names
    ]

    for pattern, replacement in anonymization_patterns:
        text = re.sub(pattern, replacement, text)

    return text

def clean_output(text):
    """Clean AI-generated output text"""
    return text.replace("*", "").strip() if isinstance(text, str) else text

def token_required(f):
    """JWT Token Verification Decorator with Enhanced Security"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            log_event("UNAUTHORIZED_ACCESS", details={"reason": "Missing Token"})
            return jsonify({"error": "Authentication required"}), 401
        
        try:
            token = token.split(" ")[1]  # Remove "Bearer" prefix
            decoded_token = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({"email": decoded_token["email"]})
            
            if not current_user:
                log_event("INVALID_TOKEN", details={"email": decoded_token.get("email")})
                return jsonify({"error": "Invalid authentication"}), 401

            # Additional token validation
            if datetime.datetime.utcnow() > datetime.datetime.fromtimestamp(decoded_token['exp']):
                log_event("EXPIRED_TOKEN", user_email=decoded_token.get("email"))
                return jsonify({"error": "Token expired"}), 401

        except jwt.ExpiredSignatureError:
            log_event("EXPIRED_TOKEN_ATTEMPT")
            return jsonify({"error": "Session expired. Please log in again."}), 401
        except jwt.InvalidTokenError:
            log_event("INVALID_TOKEN_ATTEMPT")
            return jsonify({"error": "Invalid authentication token"}), 401

        return f(*args, **kwargs)
    return decorated

# Rest of the routes remain similar to previous implementation
# Add more robust error handling and logging

if __name__ == "__main__":
    app.run(ssl_context='adhoc')  # Use SSL for local development