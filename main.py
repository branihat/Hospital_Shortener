from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from config import PROMPTS, load_api_key

app = Flask(__name__)
GEMINI_API_KEY = load_api_key()

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

from flask import Flask, render_template


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
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(PROMPTS[action] + "\n" + text)

        if response.candidates:
            output_text = response.candidates[0].content.parts[0].text
        else:
            output_text = "No response generated."

        return jsonify({"result": output_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
