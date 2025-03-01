from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import re
from config import PROMPTS, load_api_key

app = Flask(__name__)
GEMINI_API_KEY = load_api_key()

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Function to anonymize confidential data
def anonymize_text(text):
    text = re.sub(r'\bDr\.?\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Dr. Chetan', text)  # Doctor names
    text = re.sub(r'\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b', 'Patient Vishnu', text)  # Patient names
    return text

# Function to clean the output text (removes asterisks and extra spaces)
def clean_output(text):
    return text.replace("*", "").strip()

@app.route("/")
def home():
    return render_template("index.html") 

@app.route("/process", methods=["POST"])
def process_text():
    data = request.json
    action = data.get("action")
    text = data.get("text")

    if not action or not text:
        return jsonify({"error": "Missing required fields"}), 400

    if action not in PROMPTS:
        return jsonify({"error": "Invalid action"}), 400

    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        
        # Anonymize input text before sending to Gemini
        anonymized_text = anonymize_text(text)

        response = model.generate_content(PROMPTS[action] + "\n\n" + anonymized_text)

        # Extract response safely
        if hasattr(response, "text"):
            output_text = clean_output(response.text)  # Remove '*' and clean text
        else:
            output_text = "No response generated."

        return jsonify({"result": output_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
