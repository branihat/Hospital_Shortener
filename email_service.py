from flask_mail import Mail, Message
import jwt
from datetime import datetime, timedelta
from config import get_secret_key, MAIL_DEFAULT_SENDER
from flask import render_template, url_for
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

def send_email(email, subject, html_body, text_body=None):
    """General purpose email sending function"""
    try:
        msg = Message(
            subject=subject,
            sender=MAIL_DEFAULT_SENDER,
            recipients=[email]
        )
        
        msg.html = html_body
        
        if text_body:
            msg.body = text_body
        else:
            # Create a simple text version by stripping HTML tags
            import re
            msg.body = re.sub('<[^<]+?>', '', html_body)
        
        mail.send(msg)
        logger.info(f"Email sent to {email} with subject: {subject}")
        return True
        
    except Exception as e:
        logger.error(f"Error sending email to {email}: {str(e)}")
        return False

def send_password_reset_email(email, token, name):
    """Send password reset email"""
    reset_url = url_for('reset_password', token=token, _external=True)
    
    subject = "Password Reset Request - ChartWitch"
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background-color: #dc3545; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Password Reset Request</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Hello {name},</h2>
                                
                                <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                                    We received a request to reset your password for your ChartWitch account. 
                                    Click the button below to create a new password:
                                </p>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="{reset_url}" 
                                       style="background-color: #dc3545; color: white; padding: 15px 30px; 
                                              text-decoration: none; border-radius: 6px; display: inline-block;
                                              font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(220,53,69,0.3);">
                                        Reset My Password
                                    </a>
                                </div>
                                
                                <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0;">
                                    <p style="color: #856404; margin: 0; font-size: 14px;">
                                        <strong>⚠️ Important:</strong> This reset link will expire in 1 hour for security reasons.
                                    </p>
                                </div>
                                
                                <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                                    If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                                </p>
                                
                                <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                                    If the button above doesn't work, copy and paste this link into your browser:<br>
                                    <a href="{reset_url}" style="color: #dc3545; word-break: break-all;">{reset_url}</a>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px 30px; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                                <p style="color: #6c757d; font-size: 12px; margin: 0; text-align: center;">
                                    © 2025 ChartWitch. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    text_body = f"""
    Hello {name},
    
    We received a request to reset your password for your ChartWitch account.
    
    Please click the link below to reset your password:
    {reset_url}
    
    This link will expire in 1 hour for security reasons.
    
    If you didn't request this password reset, please ignore this email.
    
    Best regards,
    The ChartWitch Team
    """
    
    return send_email(email, subject, html_body, text_body)

def send_password_reset_confirmation(email, name):
    """Send confirmation email after successful password reset"""
    subject = "Password Reset Successful - ChartWitch"
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background-color: #28a745; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Password Reset Successful</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Hello {name},</h2>
                                
                                <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                                    Your password has been successfully reset for your ChartWitch account.
                                </p>
                                
                                <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 4px; margin: 20px 0;">
                                    <p style="color: #155724; margin: 0; font-size: 14px;">
                                        <strong>✅ Security Notice:</strong> If you didn't make this change, please contact support immediately.
                                    </p>
                                </div>
                                
                                <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                                    You can now log in to your account using your new password.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px 30px; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                                <p style="color: #6c757d; font-size: 12px; margin: 0; text-align: center;">
                                    © 2025 ChartWitch. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    text_body = f"""
    Hello {name},
    
    Your password has been successfully reset for your ChartWitch account.
    
    If you didn't make this change, please contact support immediately.
    
    You can now log in to your account using your new password.
    
    Best regards,
    The ChartWitch Team
    """
    
    return send_email(email, subject, html_body, text_body)
