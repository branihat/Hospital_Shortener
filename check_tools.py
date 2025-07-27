from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

try:
    # Try both possible environment variable names
    mongo_uri = os.getenv('MONGODB_URI') or os.getenv('MONGO_URI')
    if not mongo_uri:
        print("No MongoDB URI found in environment variables")
        exit(1)
    
    client = MongoClient(mongo_uri)
    # Get database name from URI or use default
    db = client.get_default_database()
    
    # Find all custom tools
    tools = list(db.prompts.find({'is_custom_tool': True, 'active': True}))
    
    print(f'Found {len(tools)} custom tools:')
    for tool in tools:
        print(f'- Key: {tool.get("key", "N/A")}, Tab: {tool.get("tab", "N/A")}, Label: {tool.get("button_label", "N/A")}')
    
    # Find tools with old tab names
    old_tab_tools = list(db.prompts.find({
        'tab': {'$in': ['default', 'suggested', 'custom']},
        'active': True
    }))
    
    print(f'\nFound {len(old_tab_tools)} tools with old tab names:')
    for tool in old_tab_tools:
        print(f'- Key: {tool.get("key", "N/A")}, Tab: {tool.get("tab", "N/A")}, Label: {tool.get("button_label", "N/A")}')
        
except Exception as e:
    print(f"Error: {e}")
