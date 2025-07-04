#!/usr/bin/env python3
"""
Test script to verify profile functionality
"""

import requests
import json

def test_profile_endpoint():
    """Test the profile API endpoint"""
    
    # Test without token (should fail)
    print("Testing profile endpoint without authorization...")
    response = requests.get('http://localhost:5000/api/profile')
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    print()
    
    # Test with invalid token (should fail)
    print("Testing profile endpoint with invalid token...")
    headers = {'Authorization': 'Bearer invalid_token'}
    response = requests.get('http://localhost:5000/api/profile', headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    print()
    
    print("To test with valid token, you need to:")
    print("1. Start the server: python main.py")
    print("2. Register/login through the web interface")
    print("3. Use the browser's developer tools to get the authToken from localStorage")
    print("4. Update this test script with the valid token")

if __name__ == "__main__":
    test_profile_endpoint()
