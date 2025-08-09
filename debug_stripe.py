#!/usr/bin/env python3

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def debug_stripe_issue():
    print("=== Stripe Debug Script ===")
    print(f"Python version: {sys.version}")
    print()
    
    # Check if stripe is installed
    try:
        import stripe
        print("✅ Stripe module imported successfully")
        try:
            print(f"   Stripe version: {stripe.__version__}")
        except AttributeError:
            try:
                print(f"   Stripe version: {stripe._version}")
            except AttributeError:
                print("   Stripe version: Unable to determine")
    except ImportError as e:
        print(f"❌ Failed to import stripe: {e}")
        return False
    
    # Check environment variables
    print("\n=== Environment Variables ===")
    stripe_secret = os.getenv('STRIPE_SECRET_KEY')
    stripe_public = os.getenv('STRIPE_PUBLIC_KEY')
    stripe_price = os.getenv('STRIPE_PRICE_ID')
    
    if stripe_secret:
        print(f"✅ STRIPE_SECRET_KEY: {stripe_secret[:10]}...")
    else:
        print("❌ STRIPE_SECRET_KEY: Not found")
    
    if stripe_public:
        print(f"✅ STRIPE_PUBLIC_KEY: {stripe_public[:10]}...")
    else:
        print("❌ STRIPE_PUBLIC_KEY: Not found")
    
    if stripe_price:
        print(f"✅ STRIPE_PRICE_ID: {stripe_price}")
    else:
        print("❌ STRIPE_PRICE_ID: Not found")
    
    # Test stripe initialization
    print("\n=== Stripe Initialization Test ===")
    try:
        stripe.api_key = stripe_secret
        print("✅ Stripe API key set successfully")
        
        # Test if stripe object has Session attribute
        if hasattr(stripe, 'checkout'):
            print("✅ stripe.checkout exists")
            if hasattr(stripe.checkout, 'Session'):
                print("✅ stripe.checkout.Session exists")
            else:
                print("❌ stripe.checkout.Session does not exist")
        else:
            print("❌ stripe.checkout does not exist")
            
    except Exception as e:
        print(f"❌ Error setting Stripe API key: {e}")
        return False
    
    # Test creating a session (without actually creating it)
    print("\n=== Stripe Session Creation Test ===")
    try:
        if not stripe_secret:
            print("❌ Cannot test session creation: STRIPE_SECRET_KEY missing")
            return False
            
        if not stripe_price:
            print("❌ Cannot test session creation: STRIPE_PRICE_ID missing")
            return False
        
        # Just test if the method exists and is callable
        session_create = getattr(stripe.checkout.Session, 'create', None)
        if callable(session_create):
            print("✅ stripe.checkout.Session.create method is callable")
        else:
            print("❌ stripe.checkout.Session.create is not callable")
            
    except Exception as e:
        print(f"❌ Error testing session creation: {e}")
        return False
    
    print("\n=== Summary ===")
    print("If all checks pass, the issue might be in the production environment.")
    print("If any checks fail, that's likely the root cause of the issue.")
    
    return True

if __name__ == "__main__":
    debug_stripe_issue()
