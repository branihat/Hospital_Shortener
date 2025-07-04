#!/usr/bin/env python3
"""
Test script to verify profile endpoint fix
"""

import requests
import json

def test_profile_fix():
    """Test the fixed profile endpoint"""
    
    base_url = 'http://localhost:5000'
    
    print("Testing fixed profile endpoint...")
    print("=" * 50)
    
    # Test without token (should still fail with 401)
    print("1. Testing without authorization:")
    response = requests.get(f'{base_url}/api/profile')
    print(f"   Status Code: {response.status_code}")
    try:
        print(f"   Response: {response.json()}")
    except:
        print(f"   Response: {response.text}")
    print()
    
    # Test with invalid token (should fail with 401) 
    print("2. Testing with invalid token:")
    headers = {'Authorization': 'Bearer invalid_token'}
    response = requests.get(f'{base_url}/api/profile', headers=headers)
    print(f"   Status Code: {response.status_code}")
    try:
        print(f"   Response: {response.json()}")
    except:
        print(f"   Response: {response.text}")
    print()
    
    print("To test with a valid token:")
    print("1. Start the server: python main.py")
    print("2. Login through the web interface")
    print("3. Open browser developer tools")
    print("4. In Console, type: localStorage.getItem('authToken')")
    print("5. Copy the token and test with:")
    print("   curl -H 'Authorization: Bearer YOUR_TOKEN' http://localhost:5000/api/profile")

if __name__ == "__main__":
    try:
        test_profile_fix()
    except requests.exceptions.ConnectionError:
        print("Error: Cannot connect to server.")
        print("Make sure the Flask server is running on http://localhost:5000")
    except Exception as e:
        print(f"Error: {e}")
