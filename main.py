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
    return redirect("/login")

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