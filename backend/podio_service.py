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
    'member': 30586037,  # REC Leads App
    'ysf': 25716991,
}

# App Token for Member/REC Leads App
PODIO_MEMBER_APP_TOKEN = "e7243665a7afab17bfad76b67b0f638a"

# Podio Item IDs for lookups
PODIO_LC_APP_ID = 23156094
PODIO_UNIVERSITY_APP_ID = 23156117
PODIO_DEPARTMENT_APP_ID = 23156121
PODIO_SPACE_ID = 915363

class PodioAuth:
    """Handles Podio authentication and token management"""
    _access_token = None
    _token_expiry = None
    _app_tokens = {}  # Cache for app authentication tokens
    
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

    @classmethod
    def get_app_token(cls, app_id, app_token):
        """Get access token for specific app"""
        cache_key = str(app_id)
        cached = cls._app_tokens.get(cache_key)
        
        if cached and cached['expiry'] > datetime.now():
            return cached['token']
            
        try:
            logger.info(f"Authenticating as App {app_id}...")
            response = requests.post(
                'https://podio.com/oauth/token',
                data={
                    'grant_type': 'app',
                    'app_id': app_id,
                    'app_token': app_token,
                    'client_id': PODIO_CLIENT_ID,
                    'client_secret': PODIO_CLIENT_SECRET
                },
                timeout=10
            )
            
            response.raise_for_status()
            data = response.json()
            
            cls._app_tokens[cache_key] = {
                'token': data['access_token'],
                'expiry': datetime.now() + timedelta(seconds=data['expires_in'] - 300)
            }
            
            return data['access_token']
        except Exception as e:
            logger.error(f"Failed to authenticate as App {app_id}: {str(e)}")
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
        
        # Build EXPA link
        expa_link = f"https://expa.aiesec.org/people/{expa_person_id}"
        
        # Parse birthdate
        try:
            birthdate = datetime.strptime(data['birthdate'], '%Y-%m-%d')
        except:
            birthdate = None
            
        # LC Mapping (Option IDs for 'home-lc-4')
        lc_map = {
            'UniPi': 1, 'Unipi': 1, 'UoM THESSALONIKI': 2, 'Volos': 3, 
            'Patras': 4, 'Crete': 5, 'ATHENS': 6, 'Aegean': 7, 
            'AEGEAN': 7, 'AUTH': 8, 'DUTH': 9, 'NKUA': 10, 'UoI': 11
        }
        lc_val = lc_map.get(data.get('lc_name'), 6) # Default to ATHENS if not found
        
        # Source Mapping (Option IDs for 'how-did-you-hear-about-aiesec')
        hh = data.get('howHeard', '')
        source_id = 15 # Default: Friends
        if hh == 'social-media': source_id = 1 # Instagram Story
        elif hh == 'university-event': source_id = 12 # Events
        elif hh == 'website': source_id = 14 # Website
        elif hh == 'other': source_id = 18 # Other Org
        
        # Academic Situation Mapping (Default to 1st year if unknown)
        # Options: 1:1st year, 2:2nd, 3:3rd, 4:4th, 5:5th, 6:Graduated
        academic_map = {
            'Undergraduate Student': 1, 
            'Postgraduate Student': 5, 
            'Graduate': 6, 
            'Alumni': 6 
        }
        academic_val = academic_map.get(data.get('academicSituation'), 1)

        # Employment Status Mapping (Default to Unemployed if unknown)
        # Options: 1:Employed, 2:Self employed, 3:Unemployed
        employment_map = {
            'student': 3, 
            'part-time': 1, 
            'full-time': 1, 
            'unemployed': 3,
            'other': 3
        }
        employment_val = employment_map.get(data.get('employmentStatus'), 3)

        # Build Podio item fields
        # Note: We append University name to motivation since we can't link to the new University App easily
        univ_text = f"\n\nUniversity: {data.get('university', 'Unknown')}"
        
        fields = {
            "full-name": {
                "value": data['firstName']
            },
            "last-name-2": {
                "value": data['lastName']
            },
            "why-would-you-like-to-join-aiesec": {
                "value": (f"{data.get('whyJoin', '')}\n\nMotivation:\n{data.get('motivation', '')}" if data.get('motivation') else data.get('whyJoin', '')) + univ_text
            },
            "email-2": {
                "value": [{"type": "home", "value": data['email']}]
            },
            "phone": {
                "value": [{"type": "home", "value": data['phone']}]
            },
            "ep-id-expa-link": {
                "value": expa_link
            },
            "home-lc-4": {
                "value": lc_val
            },
            "department": {
                "value": data.get('department', '')
            },
            "how-did-you-hear-about-aiesec": {
                "value": source_id
            },
            "what-option-best-fits-your-current-academic-situation": {
                "value": academic_val
            },
            "what-option-best-fits-your-current-employment-status": {
                "value": employment_val
            },
            "data-protection-privacy-policy": {
                "value": 1
            }
        }
        
        if birthdate:
            fields["birthdate"] = {
                "start_date": birthdate.strftime('%Y-%m-%d')
            }
        
        # Create Podio item
        logger.info("Creating Podio item...")
        
        # Use App Authentication for robust submission
        app_id = PODIO_APP_IDS.get('member')
        token = PodioAuth.get_app_token(app_id, PODIO_MEMBER_APP_TOKEN)
        
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

