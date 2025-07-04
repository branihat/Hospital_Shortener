#!/usr/bin/env python3
"""
Test script to verify email configuration and sending functionality
"""

import os
import sys
import logging
from flask import Flask
from flask_mail import Mail, Message
from dotenv import load_dotenv

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def test_email_config():
    """Test the email configuration"""
    app = Flask(__name__)
    
    # Configure Flask-Mail
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')
    
    print("Email Configuration:")
    print(f"MAIL_SERVER: {app.config['MAIL_SERVER']}")
    print(f"MAIL_PORT: {app.config['MAIL_PORT']}")
    print(f"MAIL_USE_TLS: {app.config['MAIL_USE_TLS']}")
    print(f"MAIL_USERNAME: {app.config['MAIL_USERNAME']}")
    print(f"MAIL_PASSWORD: {'*' * len(str(app.config['MAIL_PASSWORD'])) if app.config['MAIL_PASSWORD'] else 'None'}")
    print(f"MAIL_DEFAULT_SENDER: {app.config['MAIL_DEFAULT_SENDER']}")
    print()
    
    # Check if all required fields are present
    missing_fields = []
    if not app.config['MAIL_SERVER']:
        missing_fields.append('MAIL_SERVER')
    if not app.config['MAIL_USERNAME']:
        missing_fields.append('MAIL_USERNAME')
    if not app.config['MAIL_PASSWORD']:
        missing_fields.append('MAIL_PASSWORD')
    if not app.config['MAIL_DEFAULT_SENDER']:
        missing_fields.append('MAIL_DEFAULT_SENDER')
    
    if missing_fields:
        print(f"❌ Missing required configuration: {', '.join(missing_fields)}")
        return False
    
    print("✅ All required email configuration fields are present")
    
    # Initialize Flask-Mail
    mail = Mail(app)
    
    with app.app_context():
        try:
            # Test connection
            with mail.connect() as conn:
                print("✅ Email server connection successful")
                return True
        except Exception as e:
            print(f"❌ Email server connection failed: {str(e)}")
            return False

def send_test_email():
    """Send a test email"""
    app = Flask(__name__)
    
    # Configure Flask-Mail
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')
    
    mail = Mail(app)
    
    test_email = input("Enter test email address (or press Enter to use sender email): ").strip()
    if not test_email:
        test_email = app.config['MAIL_DEFAULT_SENDER']
    
    with app.app_context():
        try:
            msg = Message(
                'Test Email from ChartWitch',
                sender=app.config['MAIL_DEFAULT_SENDER'],
                recipients=[test_email]
            )
            
            msg.body = """
            This is a test email from ChartWitch.
            
            If you receive this email, your email configuration is working correctly!
            
            Best regards,
            ChartWitch Team
            """
            
            msg.html = """
            <html>
            <body style="font-family: Arial, sans-serif;">
                <h2>Test Email from ChartWitch</h2>
                <p>This is a test email from ChartWitch.</p>
                <p style="color: green;"><strong>✅ If you receive this email, your email configuration is working correctly!</strong></p>
                <hr>
                <p><em>Best regards,<br>ChartWitch Team</em></p>
            </body>
            </html>
            """
            
            mail.send(msg)
            print(f"✅ Test email sent successfully to {test_email}")
            return True
            
        except Exception as e:
            print(f"❌ Failed to send test email: {str(e)}")
            return False

def main():
    """Main function"""
    print("=" * 50)
    print("ChartWitch Email Configuration Test")
    print("=" * 50)
    
    # Test email configuration
    if not test_email_config():
        print("\n❌ Email configuration test failed. Please check your .env file.")
        return
    
    print()
    # Ask if user wants to send test email
    send_test = input("Do you want to send a test email? (y/n): ").strip().lower()
    if send_test in ['y', 'yes']:
        print()
        if send_test_email():
            print("\n✅ Email test completed successfully!")
        else:
            print("\n❌ Email test failed!")
    else:
        print("\n✅ Email configuration test completed!")

if __name__ == "__main__":
    main()
