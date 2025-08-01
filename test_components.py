#!/usr/bin/env python3
"""
Component test script for individual testing of signup/payment components
"""

import requests
import json
import uuid
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

BASE_URL = "http://localhost:5000"

def test_registration_endpoint():
    """Test the /register endpoint"""
    logger.info("Testing /register endpoint...")
    
    unique_id = str(uuid.uuid4())[:8]
    test_data = {
        "firstName": "Test",
        "lastName": "User",
        "email": f"test.{unique_id}@example.com",
        "password": "TestPassword123!",
        "confirmPassword": "TestPassword123!",
        "degree": "md",
        "profession": "physician",
        "institution": "Test Hospital",
        "agreeToEula": True,
        "agreeToBaa": True
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/register",
            json=test_data,
            headers={'Content-Type': 'application/json'}
        )
        
        logger.info(f"Status: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            logger.info(f"✅ Registration successful. User ID: {data.get('userId')}")
            return data.get('userId'), test_data['email']
        else:
            logger.error("❌ Registration failed")
            return None, None
            
    except Exception as e:
        logger.error(f"❌ Registration error: {str(e)}")
        return None, None

def test_payment_page(user_id):
    """Test the payment page"""
    logger.info(f"Testing payment page with user_id: {user_id}")
    
    try:
        response = requests.get(f"{BASE_URL}/payment?user_id={user_id}")
        
        logger.info(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            html = response.text
            if f'value="{user_id}"' in html:
                logger.info("✅ Payment page loads with correct user_id")
                return True
            else:
                logger.error("❌ user_id not found in payment page")
                return False
        else:
            logger.error(f"❌ Payment page failed: {response.status_code}")
            return False
            
    except Exception as e:
        logger.error(f"❌ Payment page error: {str(e)}")
        return False

def test_stripe_checkout_creation(user_id, email):
    """Test Stripe checkout session creation"""
    logger.info("Testing Stripe checkout session creation...")
    
    form_data = {
        'user_id': user_id,
        'email': email
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/create-checkout-session",
            data=form_data,
            allow_redirects=False
        )
        
        logger.info(f"Status: {response.status_code}")
        logger.info(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 303:
            redirect_url = response.headers.get('Location')
            if redirect_url and "stripe.com" in redirect_url:
                logger.info(f"✅ Checkout session created. Redirect: {redirect_url}")
                return True
            else:
                logger.error(f"❌ Invalid redirect URL: {redirect_url}")
                return False
        else:
            logger.error(f"❌ Checkout creation failed: {response.text}")
            return False
            
    except Exception as e:
        logger.error(f"❌ Checkout creation error: {str(e)}")
        return False

def test_webhook_endpoint(email):
    """Test the webhook endpoint"""
    logger.info("Testing webhook endpoint...")
    
    mock_event = {
        'type': 'checkout.session.completed',
        'data': {
            'object': {
                'id': 'cs_test_' + str(uuid.uuid4()),
                'customer': 'cus_test_' + str(uuid.uuid4()),
                'subscription': 'sub_test_' + str(uuid.uuid4()),
                'customer_details': {
                    'email': email
                },
                'amount_total': 699,
                'currency': 'usd'
            }
        }
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/webhook",
            json=mock_event,
            headers={'Content-Type': 'application/json'}
        )
        
        logger.info(f"Status: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        if response.status_code == 200:
            logger.info("✅ Webhook processed successfully")
            return True
        else:
            logger.error("❌ Webhook processing failed")
            return False
            
    except Exception as e:
        logger.error(f"❌ Webhook error: {str(e)}")
        return False

def test_user_status(email):
    """Test user status endpoint"""
    logger.info(f"Testing user status for: {email}")
    
    try:
        response = requests.get(f"{BASE_URL}/api/user-status?email={email}")
        
        logger.info(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            logger.info(f"✅ User status: {data.get('status')}")
            return data.get('status')
        else:
            logger.error(f"❌ Status check failed: {response.text}")
            return None
            
    except Exception as e:
        logger.error(f"❌ Status check error: {str(e)}")
        return None

def run_quick_test():
    """Run a quick test of all components"""
    logger.info("🚀 Running quick component tests...")
    
    # Step 1: Test registration
    user_id, email = test_registration_endpoint()
    if not user_id:
        logger.error("❌ Cannot continue - registration failed")
        return False
    
    # Step 2: Test payment page
    if not test_payment_page(user_id):
        logger.error("❌ Payment page test failed")
        return False
    
    # Step 3: Test checkout creation
    if not test_stripe_checkout_creation(user_id, email):
        logger.error("❌ Checkout creation test failed")
        return False
    
    # Step 4: Test webhook
    if not test_webhook_endpoint(email):
        logger.error("❌ Webhook test failed")
        return False
    
    # Step 5: Check user status
    status = test_user_status(email)
    if status == "active":
        logger.info("✅ User status correctly updated to active")
    else:
        logger.error(f"❌ Expected status 'active', got '{status}'")
        return False
    
    logger.info("🎉 All component tests passed!")
    return True

if __name__ == "__main__":
    success = run_quick_test()
    exit(0 if success else 1)
