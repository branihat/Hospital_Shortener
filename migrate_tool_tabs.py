from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Tab migration mapping
TAB_MIGRATION = {
    'default': 'documentation',  # Map default tools to documentation
    'suggested': 'diagnostics',  # Map suggested tools to diagnostics
    'custom': 'misc'             # Map custom tools to misc
}

def migrate_tool_tabs():
    try:
        # Try both possible environment variable names
        mongo_uri = os.getenv('MONGODB_URI') or os.getenv('MONGO_URI')
        if not mongo_uri:
            print("No MongoDB URI found in environment variables")
            return False
        
        client = MongoClient(mongo_uri)
        db = client.get_default_database()
        
        print("Starting tab migration...")
        
        # Find all tools with old tab names
        old_tab_tools = list(db.prompts.find({
            'tab': {'$in': list(TAB_MIGRATION.keys())},
            'active': True
        }))
        
        print(f"Found {len(old_tab_tools)} tools with old tab names")
        
        migration_count = 0
        for tool in old_tab_tools:
            old_tab = tool.get('tab')
            new_tab = TAB_MIGRATION.get(old_tab)
            
            if new_tab:
                result = db.prompts.update_one(
                    {'_id': tool['_id']},
                    {'$set': {'tab': new_tab}}
                )
                
                if result.modified_count > 0:
                    migration_count += 1
                    print(f"✓ Updated {tool.get('key', 'N/A')} from '{old_tab}' to '{new_tab}'")
                else:
                    print(f"✗ Failed to update {tool.get('key', 'N/A')}")
        
        # Find tools with no tab assigned and set them to 'misc'
        no_tab_tools = list(db.prompts.find({
            'is_custom_tool': True,
            'active': True,
            '$or': [
                {'tab': {'$exists': False}},
                {'tab': None},
                {'tab': ''}
            ]
        }))
        
        print(f"Found {len(no_tab_tools)} tools without tab assignment")
        
        for tool in no_tab_tools:
            result = db.prompts.update_one(
                {'_id': tool['_id']},
                {'$set': {'tab': 'misc'}}
            )
            
            if result.modified_count > 0:
                migration_count += 1
                print(f"✓ Assigned {tool.get('key', 'N/A')} to 'misc' tab")
            else:
                print(f"✗ Failed to assign tab for {tool.get('key', 'N/A')}")
        
        print(f"\nMigration completed! Updated {migration_count} tools")
        
        # Verify migration
        print("\nVerifying migration:")
        updated_tools = list(db.prompts.find({'is_custom_tool': True, 'active': True}))
        
        for tool in updated_tools:
            key = tool.get('key', 'N/A')
            tab = tool.get('tab', 'N/A')
            label = tool.get('button_label', 'N/A')
            print(f"- {key}: {tab} ({label})")
            
        return True
        
    except Exception as e:
        print(f"Error during migration: {e}")
        return False

if __name__ == "__main__":
    migrate_tool_tabs()
