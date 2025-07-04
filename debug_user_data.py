#!/usr/bin/env python3
"""
Debug script to examine user data structure in MongoDB
"""

import os
import sys
from flask import Flask
from flask_pymongo import PyMongo
from config import load_mongo_uri

def debug_user_data():
    """Check the structure of user data in MongoDB"""
    
    # Setup Flask app for MongoDB connection
    app = Flask(__name__)
    MONGO_URI = load_mongo_uri()
    app.config["MONGO_URI"] = MONGO_URI
    mongo = PyMongo(app)
    
    with app.app_context():
        # Get all users (limit to first 10 for safety)
        users = list(mongo.db.users.find({}).limit(10))
        
        # Also look for the specific user from the logs
        logged_user = mongo.db.users.find_one({"user_id": "92d1ca7c-3347-437d-a583-2c67a3457183"})
        if logged_user:
            print("CURRENT LOGGED USER FOUND:")
            print("=" * 50)
            print(f"User ID: {logged_user.get('user_id')}")
            print(f"Email Hash: {logged_user.get('email_hash', 'MISSING')}")
            print("All fields:")
            for key, value in logged_user.items():
                if key not in ['_id', 'password']:
                    value_type = type(value).__name__
                    value_preview = str(value)[:50] + '...' if len(str(value)) > 50 else str(value)
                    print(f"  {key}: {value_preview} ({value_type})")
            print("=" * 50)
            print()
        
        print(f"Found {len(users)} users in database:")
        print("=" * 50)
        
        for i, user in enumerate(users, 1):
            print(f"\nUser {i}:")
            print(f"  User ID: {user.get('user_id', 'N/A')}")
            print(f"  Email Hash: {user.get('email_hash', 'N/A')}")
            
            # Check encrypted fields
            print("\n  Encrypted Fields:")
            print(f"    firstName: {'EXISTS' if user.get('firstName') else 'MISSING'}")
            if user.get('firstName'):
                print(f"      Length: {len(user.get('firstName', ''))}")
                print(f"      Type: {type(user.get('firstName'))}")
            
            print(f"    lastName: {'EXISTS' if user.get('lastName') else 'MISSING'}")
            if user.get('lastName'):
                print(f"      Length: {len(user.get('lastName', ''))}")
                print(f"      Type: {type(user.get('lastName'))}")
            
            print(f"    email: {'EXISTS' if user.get('email') else 'MISSING'}")
            if user.get('email'):
                print(f"      Length: {len(user.get('email', ''))}")
                print(f"      Type: {type(user.get('email'))}")
            
            # Check plain text fields (might exist in old data)
            print("\n  Plain Text Fields:")
            plain_fields = ['first_name', 'firstname', 'last_name', 'lastname', 'degree', 'profession', 'institution', 'status']
            for field in plain_fields:
                if user.get(field):
                    print(f"    {field}: {user.get(field)}")
            
            print("\n  All Fields in Document:")
            for key, value in user.items():
                if key not in ['_id', 'password']:  # Skip MongoDB ID and password for security
                    value_type = type(value).__name__
                    value_preview = str(value)[:50] + '...' if len(str(value)) > 50 else str(value)
                    print(f"    {key}: {value_preview} ({value_type})")
            
            print("\n" + "-" * 40)

if __name__ == "__main__":
    try:
        debug_user_data()
    except Exception as e:
        print(f"Error: {e}")
        print("Make sure MongoDB is running and accessible.")
