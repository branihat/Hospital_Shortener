#!/usr/bin/env python3
"""
Simple debug script to test button functionality without full app setup
"""

from flask import Flask, jsonify, request, render_template_string

app = Flask(__name__)

# Simple test data
test_prompts = {
    "short_signout": "Create a concise signout note",
    "hospital_summary": "Generate a hospital summary",
    "cleanup": "Clean up the medical notes"
}

@app.route('/')
def index():
    return render_template_string('''
<!DOCTYPE html>
<html>
<head>
    <title>Button Debug Test</title>
    <style>
        .action-button {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            background-color: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .action-button:hover {
            background-color: #0056b3;
        }
        textarea {
            width: 100%;
            height: 200px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>Button Functionality Test</h1>
    
    <textarea id="inputText" placeholder="Enter test medical notes here...">
Patient John Doe presents with chest pain and shortness of breath. 
History of hypertension and diabetes.
Vitals: BP 140/90, HR 88, RR 18, O2 98%
Physical exam unremarkable except for mild SOB
Plan: EKG, chest X-ray, labs
    </textarea>
    
    <div>
        <button class="action-button" data-action="short_signout">Create Signout</button>
        <button class="action-button" data-action="hospital_summary">Hospital Summary</button>
        <button class="action-button" data-action="cleanup">Clean Up Note</button>
    </div>
    
    <textarea id="outputText" placeholder="Results will appear here..." readonly></textarea>
    
    <div id="status"></div>

    <script>
        // Test without authentication first
        function processText(action) {
            const inputText = document.getElementById('inputText').value;
            const outputText = document.getElementById('outputText');
            const status = document.getElementById('status');
            
            if (!inputText.trim()) {
                alert('Please enter some text first');
                return;
            }
            
            status.textContent = 'Processing...';
            
            fetch('/test-process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: inputText,
                    action: action
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    outputText.value = 'Error: ' + data.error;
                    status.textContent = 'Error occurred';
                } else {
                    outputText.value = data.result;
                    status.textContent = 'Success!';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                outputText.value = 'Network error: ' + error.message;
                status.textContent = 'Network error';
            });
        }
        
        // Attach event listeners to buttons
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.action-button');
            console.log('Found buttons:', buttons.length);
            
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const action = this.getAttribute('data-action');
                    console.log('Button clicked:', action);
                    processText(action);
                });
            });
        });
    </script>
</body>
</html>
    ''')

@app.route('/test-process', methods=['POST'])
def test_process():
    """Simple test endpoint without authentication or AI"""
    try:
        data = request.json
        action = data.get('action')
        text = data.get('text')
        
        if not action or not text:
            return jsonify({'error': 'Missing action or text'}), 400
        
        if action not in test_prompts:
            return jsonify({'error': f'Unknown action: {action}'}), 400
        
        # Simulate processing
        result = f"[TEST RESULT for {action}]\n\n"
        result += f"Prompt: {test_prompts[action]}\n\n"
        result += f"Input length: {len(text)} characters\n\n"
        result += f"Processed text: {text[:100]}..."
        
        return jsonify({'result': result})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting debug server...")
    print("Open http://localhost:5001 to test button functionality")
    app.run(debug=True, port=5001)
