"""
Form Validation Utilities
"""

import re
from datetime import datetime


def validate_password(password):
    """
    Validate password strength according to EXPA requirements
    
    Returns:
        dict: {'valid': bool, 'error': str or None}
    """
    if len(password) < 8:
        return {'valid': False, 'error': 'Password must be at least 8 characters long'}
    
    has_upper = bool(re.search(r'[A-Z]', password))
    has_lower = bool(re.search(r'[a-z]', password))
    has_number = bool(re.search(r'[0-9]', password))
    
    if not (has_upper and has_lower and has_number):
        return {
            'valid': False,
            'error': 'Password must contain uppercase, lowercase letters and at least one number'
        }
    
    return {'valid': True, 'error': None}


def validate_email(email):
    """
    Validate email format
    
    Returns:
        dict: {'valid': bool, 'error': str or None}
    """
    if len(email) < 4:
        return {'valid': False, 'error': 'Email is too short'}
    
    if ' ' in email:
        return {'valid': False, 'error': 'Email cannot contain spaces'}
    
    if '@' not in email or '.' not in email:
        return {'valid': False, 'error': 'Please enter a valid email address'}
    
    # Basic email regex
    email_pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    if not re.match(email_pattern, email):
        return {'valid': False, 'error': 'Please enter a valid email address'}
    
    return {'valid': True, 'error': None}


def validate_phone(phone):
    """
    Validate phone number (Greek format - 10-11 digits)
    
    Returns:
        dict: {'valid': bool, 'error': str or None}
    """
    # Remove any spaces or dashes
    clean_phone = re.sub(r'[\s-]', '', phone)
    
    # Check if it's 10 or 11 digits
    if len(clean_phone) in [10, 11] and clean_phone.isdigit():
        return {'valid': True, 'error': None}
    
    return {'valid': False, 'error': 'Please enter a valid 10-11 digit phone number'}


def calculate_age(dob_str):
    """
    Calculate age from date of birth string
    
    Args:
        dob_str (str): Date of birth in YYYY-MM-DD format
        
    Returns:
        int: Age in years
    """
    try:
        dob = datetime.strptime(dob_str, '%Y-%m-%d')
        today = datetime.today()
        age = today.year - dob.year
        
        # Adjust if birthday hasn't occurred this year
        if today.month < dob.month or (today.month == dob.month and today.day < dob.day):
            age -= 1
        
        return age
    except ValueError:
        return None


def validate_age(dob_str):
    """
    Validate age (must be between 18 and 30)
    
    Returns:
        dict: {'valid': bool, 'error': str or None, 'age': int or None}
    """
    age = calculate_age(dob_str)
    
    if age is None:
        return {'valid': False, 'error': 'Please enter a valid date of birth', 'age': None}
    
    if age < 18:
        return {'valid': False, 'error': 'You must be at least 18 years old to apply', 'age': age}
    
    if age > 30:
        return {'valid': False, 'error': 'You must be 30 years or younger to apply', 'age': age}
    
    return {'valid': True, 'error': None, 'age': age}


def validate_form_data(data):
    """
    Validate all form fields
    
    Args:
        data (dict): Form data to validate
        
    Returns:
        dict: {'valid': bool, 'errors': dict}
    """
    errors = {}
    
    # Validate first name
    if not data.get('firstName') or not data['firstName'].strip():
        errors['firstName'] = 'First name is required'
    
    # Validate last name
    if not data.get('lastName') or not data['lastName'].strip():
        errors['lastName'] = 'Last name is required'
    
    # Validate email
    email_validation = validate_email(data.get('email', ''))
    if not email_validation['valid']:
        errors['email'] = email_validation['error']
    
    # Validate password
    password_validation = validate_password(data.get('password', ''))
    if not password_validation['valid']:
        errors['password'] = password_validation['error']
    
    # Validate phone
    phone_validation = validate_phone(data.get('phone', ''))
    if not phone_validation['valid']:
        errors['phone'] = phone_validation['error']
    
    # Validate age
    age_validation = validate_age(data.get('dob', ''))
    if not age_validation['valid']:
        errors['dob'] = age_validation['error']
    
    # Validate campus
    if not data.get('campus') or data['campus'] == '':
        errors['campus'] = 'Please select a campus'
    
    # Validate faculty
    if not data.get('faculty') or data['faculty'] == '':
        errors['faculty'] = 'Please select a faculty'
    
    # Validate prevent reason
    if not data.get('preventReason') or data['preventReason'] == '':
        errors['preventReason'] = 'Please select a reason'
    
    return {
        'valid': len(errors) == 0,
        'errors': errors
    }
