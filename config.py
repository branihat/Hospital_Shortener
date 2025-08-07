import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load environment variables
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
MONGO_URI = os.getenv('MONGO_URI')
SECRET_KEY = os.getenv('SECRET_KEY')

# Email configuration
MAIL_SERVER = os.getenv('MAIL_SERVER')
MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
MAIL_USERNAME = os.getenv('MAIL_USERNAME')
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')

def load_api_key():
    """Load Gemini API key from environment variables."""
    return GEMINI_API_KEY

def load_mongo_uri():
    """Load MongoDB connection URI from environment variables."""
    return MONGO_URI 


import os
import secrets

def generate_secret_key():
    """
    Generate a secure secret key and save it to a file.
    If a key already exists, load the existing key.
    """
    SECRET_KEY_FILE = 'secret_key.txt'
    
    # Check if secret key file exists
    if os.path.exists(SECRET_KEY_FILE):
        with open(SECRET_KEY_FILE, 'r') as f:
            return f.read().strip()
    
    # Generate a new secret key
    secret_key = secrets.token_hex(32)  # 64 character hex string
    
    # Save the secret key to file
    with open(SECRET_KEY_FILE, 'w') as f:
        f.write(secret_key)
    
    return secret_key

def get_secret_key():
    """Get the secret key from environment variable or generate one if missing."""
    if SECRET_KEY:
        return SECRET_KEY
    else:
        # If no SECRET_KEY in env, generate one
        return generate_secret_key()

# AI prompt settings with detailed instructions
PROMPTS = {
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
    Use medical acronyms and shorthand to keep it short:"""
}
