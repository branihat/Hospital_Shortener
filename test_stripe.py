#!/usr/bin/env python3

import stripe
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

def test_stripe_config():
    """Test Stripe configuration and connectivity"""
    print("Testing Stripe configuration...")
    
    # Check if API key is set
    if not stripe.api_key:
        print("❌ STRIPE_SECRET_KEY not found in environment variables")
        return False
    
    print(f"✅ Stripe API key is set: {stripe.api_key[:10]}...")
    
    # Check if price ID is set
    price_id = os.getenv('STRIPE_PRICE_ID')
    if not price_id:
        print("❌ STRIPE_PRICE_ID not found in environment variables")
        return False
    
    print(f"✅ Stripe Price ID is set: {price_id}")
    
    return True

def test_checkout_session():
    """Test creating a checkout session"""
    if not test_stripe_config():
        return False
    
    try:
        print("\nTesting checkout session creation...")
        
        # Create a test checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': os.getenv('STRIPE_PRICE_ID'),
                'quantity': 1,
            }],
            mode='subscription',
            success_url='http://localhost:5000/payment/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:5000/payment/cancel',
        )
        
        print(f"✅ Checkout session created successfully!")
        print(f"   Session ID: {checkout_session.id}")
        print(f"   Session URL: {checkout_session.url}")
        
        return True
        
    except stripe.error.StripeError as e:
        print(f"❌ Stripe error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    print("=== Stripe Configuration Test ===")
    success = test_checkout_session()
    
    if success:
        print("\n🎉 All tests passed! Stripe integration should be working.")
    else:
        print("\n💥 Tests failed! Check your Stripe configuration.")
