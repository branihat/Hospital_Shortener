#!/usr/bin/env python3
import os
import stripe

# Check environment variables
print("Environment variables:")
print(f"STRIPE_SECRET_KEY set: {'YES' if os.getenv('STRIPE_SECRET_KEY') else 'NO'}")
print(f"STRIPE_PRICE_ID set: {'YES' if os.getenv('STRIPE_PRICE_ID') else 'NO'}")
print(f"STRIPE_PUBLIC_KEY set: {'YES' if os.getenv('STRIPE_PUBLIC_KEY') else 'NO'}")

# Initialize Stripe
stripe_secret_key = os.getenv('STRIPE_SECRET_KEY')
if stripe_secret_key:
    stripe.api_key = stripe_secret_key
    print(f"\nStripe API key set successfully")
    print(f"stripe module: {stripe}")
    print(f"stripe.checkout: {stripe.checkout}")
    print(f"stripe.checkout.Session: {stripe.checkout.Session}")
    
    # Test creating a simple session (without actually creating one)
    try:
        # This should not fail - just accessing the class
        session_class = stripe.checkout.Session
        print(f"Session class accessible: {session_class}")
        
        # Test if we can call the create method (this will fail due to missing parameters, but should not give NoneType error)
        try:
            stripe.checkout.Session.create()
        except Exception as e:
            print(f"Expected error when calling create() with no params: {e}")
            # This should be a Stripe validation error, not a NoneType error
            if "'NoneType' object has no attribute 'Session'" in str(e):
                print("ERROR: stripe.checkout is None!")
            else:
                print("Good: stripe.checkout.Session is accessible")
    
    except Exception as e:
        print(f"Error accessing stripe.checkout.Session: {e}")
else:
    print("STRIPE_SECRET_KEY not found in environment")
