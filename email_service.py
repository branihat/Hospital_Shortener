from flask_mail import Mail, Message
import jwt
from datetime import datetime, timedelta
from config import get_secret_key, MAIL_DEFAULT_SENDER
from flask import render_template
import logging

logger = logging.getLogger(__name__)
mail = Mail()

def generate_verification_token(email):
    """Generate a timed JWT token for email verification"""
    try:
        token = jwt.encode(
            {
                'email': email,
                'exp': datetime.utcnow() + timedelta(hours=24)
            },
            get_secret_key(),  # Use the function instead of direct import
            algorithm='HS256'
        )
        return token
    except Exception as e:
        logger.error(f"Error generating verification token: {str(e)}")
        raise

def send_verification_email(email, token, first_name):
    try:
        msg = Message(
            'Verify your ChartWitch account',
            sender=MAIL_DEFAULT_SENDER,
            recipients=[email]
        )
        
        # Get the base URL from environment or config
        base_url = "http://localhost:5000"  # Change this for production
        verification_link = f"{base_url}/verify/{token}"
        
        # HTML version of the email
        msg.html = render_template(
            'email/verify.html',
            verification_link=verification_link,
            first_name=first_name
        )
        
        # Plain text version as fallback
        msg.body = f"""
        Hi {first_name},
        
        Thank you for signing up with ChartWitch! Please verify your email by clicking the link below:
        
        {verification_link}
        
        This link will expire in 24 hours.
        
        If you didn't create an account, please ignore this email.
        
        Best regards,
        The ChartWitch Team
        """
        
        mail.send(msg)
        logger.info(f"Verification email sent to {email}")
        return True
        
    except Exception as e:
        logger.error(f"Error sending verification email: {str(e)}")
        return False