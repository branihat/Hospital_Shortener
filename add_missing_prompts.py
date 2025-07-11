#!/usr/bin/env python3
"""
Script to add missing button prompts to MongoDB database
"""

import pymongo
from datetime import datetime

# MongoDB connection string
MONGO_URI = "mongodb+srv://branihat:runthebot@cluster0.uuaxm.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0&ssl=true"

def connect_to_db():
    """Connect to MongoDB"""
    try:
        client = pymongo.MongoClient(MONGO_URI)
        db = client.mydb
        # Test connection
        client.admin.command('ping')
        print("✅ Connected to MongoDB successfully")
        return db
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        return None

def add_missing_prompts(db):
    """Add all missing prompts that correspond to buttons in the HTML template"""
    
    # All the prompts that should exist based on the HTML buttons
    all_prompts = {
        # Documentation tools
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
        
        "impression_ap": """You are an experienced American physician. Here is a history of medical illness note of HPI for a patient. Use this to generate the following output format:
        Impression: (create a short concise clinical signout using standard medical acronyms capturing the essence of the medical picture only and main clinical issues)
        Assessment/Plan: (Create a list of active diagnosis, next to each diagnosis create a short plan to include for further investigation to rule out differential diagnoses and suggest treatments. At the bottom create a list of chronic issues. Start every diagnosis and plan suggestion on a new line using the "-" character):""",
        
        "discharge_summary": """You are an experienced veteran physician fluent in American English.
        Create a concise discharge summary from the following Medical SOAP note.
        List actively managed problems as 'Discharge Diagnoses' in descending order of criticality.
        Summarize the hospital course in past tense. Mention chronic conditions at the beginning under 'past medical history'.
        Ignore negative reviews of systems and absent symptoms. Remove duplications:""",
        
        "diagnoses": """Extract the main diagnoses from the following medical notes.
        Use standard medical terminology and abbreviations. List in descending order of severity:""",
        
        "history_physical": """You are an experienced doctor. Create a concise history and physical document from the patient information provided to the best of your ability. If relevant information is missing, you can insert the most likely clinical scenario""",
        
        # Diagnostics tools
        "differentials": """You are an experienced doctor. Create a short list of diagnostic possibilities in the context of provided patient information""",
        
        "dizziness": """You are an experienced doctor. Create a short list of medical causes for dizziness in the context of provided patient information""",
        
        "hyponatremia": """You are an experienced doctor. Create a short list of medical causes for hyponatremia in the context of provided patient information""",
        
        "sinus_tachy": """You are an experienced doctor. Create a short list of medical causes for sinus tachycardia in the context of provided patient information""",
        
        # Analytics tools
        "cut_readmission": """You are an experienced American physician and a medical case manager and medical social worker. Here is a medical progress note you can use or use any clinical information given as input for understanding the patient. Please review it and decipher the clinical context and the psychosocial issues. Give me the following output only:
        Enlist brief practical actionable suggestions for reducing risk of admission in the next 30 days for this patient. Start every suggestion on a new line using the "-" character.""",
        
        "emergencies": """You are a veteran physician and a statistician.
        Study this Medical progress note and predict the five most likely emergency situations that could arise.
        Provide a one-line reasoning for each and list red flag symptoms to monitor.
        Use medical acronyms and shorthand to keep it short:""",
        
        "malpractice_risk": """You are an experienced doctor. Create a short list of top 5 possibilities of malpractice risks for the medical provider in the context of provided patient information""",
        
        "improve_care": """You are an experienced American physician, Medical case manager and a expert clinical pharmacist. Here is a medical progress note or any clinical information on a patient. Understand it as a whole to create a clear clinical story and context in your mind. For output give me a list of suggestions to improve the quality of my clinical care, reduce readmission risk and reduce medical errors. Base your suggestions on the latest evidence-based guidelines from American medical societies and CDC. Do not imagine new information only work with input provided. For output formatting, start every suggestion with a "-" character followed by your very short reasoning. OK to use standard medical acronyms and shorthand:""",
        
        "prognosis": """You are an experienced doctor. Please provide prognostic information in short in the context of provided information. Output should be less than 250 words""",
        
        # Additional prompts from the system
        "insurance_denial": """You are an experienced American physician. Here is a medical progress note you can use or use any clinical information given as input for understanding the patient. Please review it and decipher the clinical context with the main and critical issues. Their medical Insurance company has unfortunately denied their care. Please write a letter to the insurance company challenging their denial. Start the letter very briefly going over the important clinical events. Then explaining the medical reasons why patient absolutely needed this medical care and the dangers of denying the care. Explain to the insurance company why they need to cover the costs. Make the letter maximum 600 words, make it sound passionate, firm, formal yet friendly""",
        
        "improve_los": """You are an experienced American physician and a medical case manager and medical social worker. Here is a medical progress note you can use or use any clinical information given as input for understanding the patient. Please review it and decipher the clinical context and the psychosocial issues. Give me the following output only:
        Enlist brief practical actionable suggestions for improving this patient's length of stay. Start every suggestion on a new line using the "-" character"""
    }
    
    print(f"Adding {len(all_prompts)} prompts to the database...")
    
    added_count = 0
    updated_count = 0
    
    for key, text in all_prompts.items():
        # Check if prompt already exists and is active
        existing = db.prompts.find_one({"key": key, "active": True})
        
        if not existing:
            # Add new prompt
            prompt_doc = {
                "key": key,
                "text": text,
                "active": True,
                "created_at": datetime.utcnow(),
                "created_by": "system_import",
                "updated_at": datetime.utcnow(),
                "updated_by": "system_import",
                "version": 1
            }
            
            try:
                result = db.prompts.insert_one(prompt_doc)
                print(f"✅ Added: {key}")
                added_count += 1
            except Exception as e:
                print(f"❌ Failed to add {key}: {e}")
        else:
            # Check if the text needs updating
            if existing.get("text", "").strip() != text.strip():
                # Deactivate old version
                db.prompts.update_one(
                    {"_id": existing["_id"]},
                    {"$set": {"active": False}}
                )
                
                # Create new version
                new_version = existing.get("version", 1) + 1
                prompt_doc = {
                    "key": key,
                    "text": text,
                    "active": True,
                    "created_at": datetime.utcnow(),
                    "created_by": "system_import",
                    "updated_at": datetime.utcnow(),
                    "updated_by": "system_import",
                    "version": new_version
                }
                
                try:
                    result = db.prompts.insert_one(prompt_doc)
                    print(f"🔄 Updated: {key} (v{new_version})")
                    updated_count += 1
                except Exception as e:
                    print(f"❌ Failed to update {key}: {e}")
            else:
                print(f"⚪ Exists: {key}")
    
    print(f"\n📊 Summary:")
    print(f"   ✅ Added: {added_count} new prompts")
    print(f"   🔄 Updated: {updated_count} existing prompts")
    print(f"   ⚪ Unchanged: {len(all_prompts) - added_count - updated_count} prompts")

def verify_prompts(db):
    """Verify all prompts exist and are accessible"""
    print("\n🔍 Verifying all prompts exist...")
    
    # All button actions from HTML template
    required_actions = [
        'short_signout', 'hospital_summary', 'cleanup', 'impression_ap', 
        'discharge_summary', 'diagnoses', 'history_physical', 'differentials',
        'dizziness', 'hyponatremia', 'sinus_tachy', 'cut_readmission', 
        'emergencies', 'malpractice_risk', 'improve_care', 'prognosis'
    ]
    
    missing_actions = []
    for action in required_actions:
        prompt = db.prompts.find_one({"key": action, "active": True})
        if prompt:
            print(f"✅ {action}")
        else:
            print(f"❌ {action} - MISSING")
            missing_actions.append(action)
    
    if missing_actions:
        print(f"\n⚠️ Missing actions: {missing_actions}")
        return False
    else:
        print(f"\n🎉 All {len(required_actions)} button actions have corresponding prompts!")
        return True

def main():
    """Main function"""
    print("🚀 Starting MongoDB prompt import...")
    
    # Connect to database
    db = connect_to_db()
    if not db:
        return
    
    try:
        # Add missing prompts
        add_missing_prompts(db)
        
        # Verify all prompts exist
        verify_prompts(db)
        
        print("\n✅ Process completed successfully!")
        
    except Exception as e:
        print(f"\n❌ An error occurred: {e}")

if __name__ == "__main__":
    main()
