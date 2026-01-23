"""
EXPA API Service
Handles all communication with EXPA GraphQL API
"""

import requests
import logging

logger = logging.getLogger(__name__)

# EXPA API Configuration
EXPA_ENDPOINT = 'https://gis-api.aiesec.org/graphql'
API_TOKEN = 'qqco7qaP3EE8r5mTL679u2S5RGed7kYinrqN6NpzQeY'


def check_email_unique(email):
    """
    Check if an email is unique in EXPA system
    Note: EXPA REST API doesn't have a separate email check endpoint,
    so we just return True and let the signup handle duplicates
    
    Args:
        email (str): Email address to check
        
    Returns:
        dict: {'unique': bool, 'error': str or None}
    """
    # EXPA will handle duplicate emails during signup
    # Returning True here to not block the form
    logger.info(f"Email check for {email} - skipping validation (will be checked during signup)")
    return {'unique': True, 'error': None}


def submit_global_volunteer_signup(data):
    """
    Submit Global Volunteer signup to EXPA using REST API
    Based on the old PHP implementation
    
    Args:
        data (dict): Signup data containing all required fields
        
    Returns:
        dict: {'success': bool, 'data': dict or None, 'error': str or None}
    """
    # Build payload matching old PHP code format
    payload = {
        "user": {
            "first_name": data['firstname'],
            "last_name": data['lastname'],
            "email": data['email'],
            "password": data['password'],
            "phone": data['phone'],
            "country_code": "+30",
            "lc": data['campus'],
            "mc": 1555,  # Greece MC ID
            "allow_phone_communication": "true",
            "allow_email_communication": "true"
        }
    }
    
    try:
        response = requests.post(
            'https://auth.aiesec.org/users.json',
            headers={'Content-Type': 'application/json'},
            json=payload,
            timeout=30,
            verify=False  # Match old PHP code behavior
        )
        
        response.raise_for_status()
        result = response.json()
        
        logger.info(f"EXPA REST API response: {result}")
        
        # Check for errors in response
        if 'errors' in result and result['errors']:
            error_messages = []
            for field, messages in result['errors'].items():
                if isinstance(messages, list):
                    error_messages.extend([f"{field}: {msg}" for msg in messages])
                else:
                    error_messages.append(f"{field}: {messages}")
            error_str = ', '.join(error_messages)
            logger.error(f"EXPA signup errors: {error_str}")
            return {'success': False, 'data': None, 'error': error_str}
        
        person_id = result.get('person_id')
        if person_id:
            logger.info(f"Successful signup for {data['firstname']} {data['lastname']}, person_id: {person_id}")
            return {'success': True, 'data': {'person_id': person_id, 'applicant': result}, 'error': None}
        
        return {'success': False, 'data': None, 'error': 'No person_id returned from EXPA'}
        
    except requests.exceptions.Timeout:
        logger.error("EXPA API timeout")
        return {'success': False, 'data': None, 'error': 'Request timeout. Please try again.'}
    except requests.exceptions.RequestException as e:
        logger.error(f"Network error during signup: {str(e)}")
        return {'success': False, 'data': None, 'error': 'Network error during signup'}
    except Exception as e:
        logger.error(f"Unexpected error during signup: {str(e)}")
        return {'success': False, 'data': None, 'error': 'Unexpected error occurred'}


def submit_member_signup(data):
    """
    Submit Member signup to EXPA using REST API
    This creates an EXPA account for the member applicant
    
    Args:
        data (dict): Signup data containing all required fields
        
    Returns:
        dict: {'success': bool, 'person_id': int or None, 'error': str or None}
    """
    payload = {
        "user": {
            "first_name": data['firstName'],
            "last_name": data['lastName'],
            "email": data['email'],
            "password": data['password'],
            "phone": data['phone'],
            "country_code": "+30",
            "lc": data['lc_id'],
            "mc": 1555,  # Greece MC ID
            "allow_phone_communication": "true",
            "allow_email_communication": "true",
            "why_would_you_like_to_join_aiesec": data.get('whyJoin', '')
        }
    }
    
    try:
        response = requests.post(
            'https://auth.aiesec.org/users.json',
            headers={'Content-Type': 'application/json'},
            json=payload,
            timeout=30,
            verify=False  # Match old PHP code behavior
        )
        
        response.raise_for_status()
        result = response.json()
        
        # Check for errors in response
        if 'errors' in result and result['errors']:
            error_messages = []
            for field, messages in result['errors'].items():
                if isinstance(messages, list):
                    error_messages.extend(messages)
                else:
                    error_messages.append(str(messages))
            error_str = ', '.join(error_messages)
            logger.error(f"EXPA member signup errors: {error_str}")
            return {'success': False, 'person_id': None, 'error': error_str}
        
        person_id = result.get('person_id')
        if person_id:
            logger.info(f"Successful member signup for {data['firstName']} {data['lastName']}, person_id: {person_id}")
            return {'success': True, 'person_id': person_id, 'error': None}
        
        return {'success': False, 'person_id': None, 'error': 'No person_id returned from EXPA'}
        
    except requests.exceptions.Timeout:
        logger.error("EXPA API timeout during member signup")
        return {'success': False, 'person_id': None, 'error': 'Request timeout. Please try again.'}
    except requests.exceptions.RequestException as e:
        logger.error(f"Network error during member signup: {str(e)}")
        return {'success': False, 'person_id': None, 'error': 'Network error during signup'}
    except Exception as e:
        logger.error(f"Unexpected error during member signup: {str(e)}")
        return {'success': False, 'person_id': None, 'error': 'Unexpected error occurred'}
