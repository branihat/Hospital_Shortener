#!/usr/bin/env python3
"""
WSGI entry point for Hospital Shortener application
For use with Gunicorn or other WSGI servers
"""

import os
import sys
from main import app

# Add the application directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Initialize application
if hasattr(app, 'initialize_default_prompts'):
    app.initialize_default_prompts()

if hasattr(app, 'initialize_payment_collection'):
    app.initialize_payment_collection()

if __name__ == "__main__":
    app.run()
