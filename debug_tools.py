from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db = client['medical_notes']

print('=== All active prompts/tools ===')
tools = list(db.prompts.find({'active': True}))
for tool in tools:
    print('Key:', tool.get('key', 'N/A'))
    print('Tab:', tool.get('tab', 'N/A'))
    print('Custom Tool:', tool.get('is_custom_tool', False))
    print('Button Label:', tool.get('button_label', 'N/A'))
    print('---')

print('\n=== Custom tools only ===')
custom_tools = list(db.prompts.find({'is_custom_tool': True, 'active': True}))
print(f'Found {len(custom_tools)} custom tools')
for tool in custom_tools:
    print('Key:', tool.get('key', 'N/A'))
    print('Tab:', tool.get('tab', 'N/A'))
    print('Button Label:', tool.get('button_label', 'N/A'))
    print('---')
