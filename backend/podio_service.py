"""
Podio API Service
Handles all communication with Podio API for member application tracking
"""

import requests
import logging
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

# Podio API Configuration
PODIO_CLIENT_ID = "developergreece"
PODIO_CLIENT_SECRET = "79dRsK00aBKgWZDJihd9ytP9L7DkX2yyDEiNqdfjjvrr7h1lV9AMKk55VW1BKTvp"
PODIO_USERNAME = "greece@aiesec.net"
PODIO_PASSWORD = "AIESECHellas1956!"

# Podio App IDs for different products
PODIO_APP_IDS = {
    'member': 25333960,  # REC app
    'ysf': 25716991,
}

# Podio Item IDs for lookups
PODIO_LC_APP_ID = 23156094
PODIO_UNIVERSITY_APP_ID = 23156117
PODIO_DEPARTMENT_APP_ID = 23156121
PODIO_SPACE_ID = 915363

class PodioAuth:
    """Handles Podio authentication and token management"""
    _access_token = None
    _token_expiry = None
    
    @classmethod
    def get_access_token(cls):
        """Get or refresh Podio access token"""
        if cls._access_token and cls._token_expiry and datetime.now() < cls._token_expiry:
            return cls._access_token
        
        return cls._refresh_token()
    
    @classmethod
    def _refresh_token(cls):
        """Refresh Podio access token using password grant"""
        try:
            logger.info("Attempting to refresh Podio token...")
            response = requests.post(
                'https://podio.com/oauth/token',
                data={
                    'grant_type': 'password',
                    'client_id': PODIO_CLIENT_ID,
                    'client_secret': PODIO_CLIENT_SECRET,
                    'username': PODIO_USERNAME,
                    'password': PODIO_PASSWORD
                },
                timeout=10
            )
            
            logger.info(f"Podio token response status: {response.status_code}")
            response.raise_for_status()
            data = response.json()
            
            cls._access_token = data['access_token']
            cls._token_expiry = datetime.now() + timedelta(seconds=data['expires_in'] - 300)
            
            logger.info("Podio token refreshed successfully")
            return cls._access_token
            
        except Exception as e:
            logger.error(f"Failed to refresh Podio token: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response body: {e.response.text}")
            raise


def get_podio_item_id(app_id, item_id):
    """
    Get Podio item by app and item ID
    
    Args:
        app_id (int): The Podio app ID
        item_id (int): The item ID within the app
        
    Returns:
        int or None: The Podio item_id if found
    """
    try:
        logger.info(f"Fetching Podio item {item_id} from app {app_id}")
        token = PodioAuth.get_access_token()
        response = requests.get(
            f'https://api.podio.com/item/app/{app_id}/{item_id}',
            headers={
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            },
            timeout=10
        )
        
        logger.info(f"Podio item fetch status: {response.status_code}")
        response.raise_for_status()
        data = response.json()
        podio_item_id = data.get('item_id')
        logger.info(f"Successfully fetched Podio item_id: {podio_item_id}")
        return podio_item_id
        
    except Exception as e:
        logger.error(f"Error getting Podio item {item_id} from app {app_id}: {str(e)}")
        if hasattr(e, 'response') and e.response is not None:
            logger.error(f"Response body: {e.response.text}")
        return None


def submit_member_to_podio(data, expa_person_id):
    """
    Submit member application to Podio
    
    Args:
        data (dict): Member application data
        expa_person_id (int): EXPA person ID from registration
        
    Returns:
        dict: {'success': bool, 'item_id': int or None, 'error': str or None}
    """
    try:
        logger.info(f"Starting Podio submission for {data['email']} (EXPA ID: {expa_person_id})")
        logger.info(f"Looking up Podio mappings - LC: {data['lc_podio_id']}, University: {data['university_podio_id']}, Department: {data['department_podio_id']}")
        
        # Get LC, University, and Department Podio item IDs
        lc_item_id = get_podio_item_id(PODIO_LC_APP_ID, data['lc_podio_id'])
        university_item_id = get_podio_item_id(PODIO_UNIVERSITY_APP_ID, data['university_podio_id'])
        department_item_id = get_podio_item_id(PODIO_DEPARTMENT_APP_ID, data['department_podio_id'])
        
        if not all([lc_item_id, university_item_id, department_item_id]):
            logger.error(f"Podio mapping lookup failed - LC: {lc_item_id}, Uni: {university_item_id}, Dept: {department_item_id}")
            return {'success': False, 'item_id': None, 'error': 'Failed to lookup Podio mappings'}
        
        # Build EXPA link
        expa_link = f"https://expa.aiesec.org/people/{expa_person_id}"
        
        # Parse birthdate
        try:
            birthdate = datetime.strptime(data['birthdate'], '%Y-%m-%d')
        except:
            birthdate = None
        
        # Build Podio item fields
        fields = {
            "full-name": {
                "value": f"{data['firstName']} {data['lastName']}"
            },
            "why-would-you-like-to-join-aiesec": {
                "value": data.get('whyJoin', '')
            },
            "email-2": {
                "value": [{"type": "home", "value": data['email']}]
            },
            "phone": {
                "value": [{"type": "home", "value": data['phone']}]
            },
            "university-2": {
                "value": university_item_id
            },
            "home-lc": {
                "value": lc_item_id
            },
            "department-2": {
                "value": department_item_id
            },
            "ep-id-expa-link": {
                "value": expa_link
            },
            "how-did-you-hear-about-aiesec-2": {
                "value": data.get('howHeard')
            }
        }
        
        if birthdate:
            fields["birthdate"] = {
                "start_date": birthdate.strftime('%Y-%m-%d')
            }
        
        if data.get('referralLink'):
            fields["referral-link"] = {"value": data['referralLink']}
        
        # Create Podio item
        logger.info("Creating Podio item...")
        token = PodioAuth.get_access_token()
        app_id = PODIO_APP_IDS.get('member', 25333960)
        
        logger.info(f"Posting to Podio app {app_id}")
        response = requests.post(
            f'https://api.podio.com/item/app/{app_id}/',
            headers={
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            },
            json={'fields': fields},
            timeout=30
        )
        
        logger.info(f"Podio create item response status: {response.status_code}")
        response.raise_for_status()
        result = response.json()
        
        logger.info(f"Successfully created Podio item {result.get('item_id')} for {data['email']}")
        return {'success': True, 'item_id': result.get('item_id'), 'error': None}
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Podio API error: {str(e)}")
        if hasattr(e, 'response') and e.response is not None:
            logger.error(f"Response status: {e.response.status_code}")
            logger.error(f"Response body: {e.response.text}")
        return {'success': False, 'item_id': None, 'error': 'Failed to submit to Podio'}
    except Exception as e:
        logger.error(f"Unexpected error submitting to Podio: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return {'success': False, 'item_id': None, 'error': 'Unexpected error'}

