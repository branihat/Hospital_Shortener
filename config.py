import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def load_api_key():
    return os.getenv("GEMINI_API_KEY")

# AI prompt settings
PROMPTS = {
    "summary": "Summarize the following notes in two lines, focusing on main points:",
    "hospital_summary": "Provide a structured hospital summary for the following patient notes:",
    "cleanup": "Clean up the text, remove duplications, and use better, shorter English:",
    "discharge_summary": "Create a discharge summary for the following patient notes:",
    "diagnoses": "Extract the main diagnoses from the following medical notes:",
    "emergencies": "Predict possible emergencies based on the following notes:"
}
