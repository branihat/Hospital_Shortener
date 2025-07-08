from pymongo import MongoClient
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db = client['medical_notes']

# Add a test tool for each tab
test_tools = [
    {
        "key": "test_default_tool",
        "text": "This is a test tool for the default tab. Analyze the following medical text and provide a summary.",
        "button_label": "Test Default Tool",
        "button_tooltip": "This is a test tool in the default tab",
        "tab": "default",
        "is_custom_tool": True,
        "active": True,
        "created_at": datetime.utcnow(),
        "created_by": "admin",
        "updated_at": datetime.utcnow(),
        "updated_by": "admin",
        "version": 1
    },
    {
        "key": "test_suggested_tool",
        "text": "This is a test tool for the suggested tab. Provide clinical recommendations based on the following text.",
        "button_label": "Test Suggested Tool",
        "button_tooltip": "This is a test tool in the suggested tab",
        "tab": "suggested",
        "is_custom_tool": True,
        "active": True,
        "created_at": datetime.utcnow(),
        "created_by": "admin",
        "updated_at": datetime.utcnow(),
        "updated_by": "admin",
        "version": 1
    },
    {
        "key": "test_custom_tool",
        "text": "This is a test tool for the custom tab. Process the following medical information according to custom requirements.",
        "button_label": "Test Custom Tool",
        "button_tooltip": "This is a test tool in the custom tab",
        "tab": "custom",
        "is_custom_tool": True,
        "active": True,
        "created_at": datetime.utcnow(),
        "created_by": "admin",
        "updated_at": datetime.utcnow(),
        "updated_by": "admin",
        "version": 1
    }
]

print("Adding test tools...")
for tool in test_tools:
    # Check if tool already exists
    existing = db.prompts.find_one({"key": tool["key"], "active": True})
    if existing:
        print(f"Tool {tool['key']} already exists, skipping...")
        continue
    
    result = db.prompts.insert_one(tool)
    if result.inserted_id:
        print(f"Added tool: {tool['key']} in tab: {tool['tab']}")
    else:
        print(f"Failed to add tool: {tool['key']}")

print("\n=== Verification ===")
tools = list(db.prompts.find({'is_custom_tool': True, 'active': True}))
print(f'Total custom tools: {len(tools)}')
for tool in tools:
    print(f"Key: {tool['key']}, Tab: {tool['tab']}, Label: {tool['button_label']}")
