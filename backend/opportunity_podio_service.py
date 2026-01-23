"""
Podio API integration for AIESEC opportunity applications (GV, GT, GE)
Submits opportunity signups to Podio for tracking and management
"""

import requests
import logging
from datetime import datetime
from typing import Dict, Optional

logger = logging.getLogger(__name__)

# Podio App IDs for each opportunity type
PODIO_APP_IDS = {
    'gv': 19029784,  # Global Volunteer
    'gt': 24852426,  # Global Talent
    'ge': 24852685,  # Global Entrepreneur
}

# Podio App for LC, University, Department lookups
LC_APP_ID = 23156094
UNIVERSITY_APP_ID = 23156117
DEPARTMENT_APP_ID = 23156121


class PodioAuth:
    """Handle Podio OAuth2 authentication"""
    
    def __init__(self):
        self.client_id = "developergreece"
        self.client_secret = "79dRsK00aBKgWZDJihd9ytP9L7DkX2yyDEiNqdfjjvrr7h1lV9AMKk55VW1BKTvp"
        self.username = "greece@aiesec.net"
        self.password = "AIESECHellas1956!"
        self.access_token = None
        self.token_expiry = None
    
    def get_access_token(self) -> Optional[str]:
        """Get or refresh Podio access token with retry logic"""
        logger.info("Getting Podio access token...")
        
        # Check if we have a valid token
        if self.access_token and self.token_expiry:
            if datetime.now() < self.token_expiry:
                logger.info("Using cached Podio token")
                return self.access_token
        
        # Authenticate with password grant - retry up to 3 times
        max_retries = 3
        for attempt in range(1, max_retries + 1):
            logger.info(f"Refreshing Podio token with password grant (attempt {attempt}/{max_retries})...")
            url = "https://podio.com/oauth/token"
            
            data = {
                'grant_type': 'password',
                'client_id': self.client_id,
                'client_secret': self.client_secret,
                'username': self.username,
                'password': self.password
            }
            
            try:
                response = requests.post(url, data=data, timeout=10)
                logger.info(f"Podio auth response status: {response.status_code}")
                
                if response.status_code == 200:
                    token_data = response.json()
                    self.access_token = token_data['access_token']
                    # Set expiry to now + expires_in seconds (minus 60s buffer)
                    expires_in = token_data.get('expires_in', 3600)
                    from datetime import timedelta
                    self.token_expiry = datetime.now() + timedelta(seconds=expires_in - 60)
                    logger.info("Successfully obtained Podio token")
                    return self.access_token
                else:
                    logger.error(f"Podio auth failed: {response.status_code} - {response.text}")
                    if attempt < max_retries and response.status_code in [503, 504, 502]:
                        logger.info(f"Retrying in 2 seconds...")
                        import time
                        time.sleep(2)
                        continue
                    return None
            except requests.exceptions.Timeout:
                logger.error(f"Podio auth timeout on attempt {attempt}")
                if attempt < max_retries:
                    logger.info(f"Retrying in 2 seconds...")
                    import time
                    time.sleep(2)
                    continue
                return None
            except Exception as e:
                logger.error(f"Error getting Podio token: {str(e)}")
                import traceback
                logger.error(traceback.format_exc())
                if attempt < max_retries:
                    logger.info(f"Retrying in 2 seconds...")
                    import time
                    time.sleep(2)
                    continue
                return None
        
        return None


# Global auth instance
podio_auth = PodioAuth()


def get_podio_item_id(app_id: int, item_id: int, token: str) -> Optional[int]:
    """
    Get Podio item_id from an app by its app_item_id
    This is used to get LC, University, and Department Podio IDs
    """
    logger.info(f"Fetching Podio item from app {app_id}, item {item_id}")
    
    url = f"https://api.podio.com/app/{app_id}/item/{item_id}"
    headers = {
        'Authorization': f'OAuth2 {token}',
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.get(url, headers=headers)
        logger.info(f"Podio item fetch response: {response.status_code}")
        
        if response.status_code == 200:
            item = response.json()
            podio_item_id = item.get('item_id')
            logger.info(f"Successfully retrieved Podio item_id: {podio_item_id}")
            return podio_item_id
        else:
            logger.error(f"Failed to fetch Podio item: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        logger.error(f"Error fetching Podio item: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return None


def submit_opportunity_to_podio(opportunity_type: str, data: Dict, expa_person_id: Optional[int] = None) -> Dict:
    """
    Submit opportunity application to Podio
    
    Args:
        opportunity_type: 'gv', 'gt', or 'ge'
        data: Form data containing all required fields
        expa_person_id: EXPA person ID if account was created
    
    Returns:
        Dict with success status and error message if failed
    """
    logger.info(f"=== Starting Podio submission for {opportunity_type.upper()} ===")
    logger.info(f"Form data keys: {list(data.keys())}")
    
    try:
        # Get access token
        token = podio_auth.get_access_token()
        if not token:
            logger.error("Failed to get Podio access token")
            return {'success': False, 'error': 'Authentication failed'}
        
        # Get app ID for this opportunity type
        app_id = PODIO_APP_IDS.get(opportunity_type.lower())
        if not app_id:
            logger.error(f"Invalid opportunity type: {opportunity_type}")
            return {'success': False, 'error': 'Invalid opportunity type'}
        
        logger.info(f"Using Podio app ID: {app_id}")
        
        # Get university name and map to Podio IDs
        campus = data.get('campus', '')
        logger.info(f"Campus/University: {campus}")
        
        # Import mapping utilities
        from .complete_mapping import get_university_mapping
        
        university_mapping = get_university_mapping(campus)
        if not university_mapping:
            logger.error(f"No mapping found for university: {campus}")
            return {'success': False, 'error': 'Invalid university'}
        
        lc_podio_id = university_mapping['lc_podio_id']
        university_podio_id = university_mapping['university_podio_id']
        
        logger.info(f"Mapped Podio IDs - LC: {lc_podio_id}, University: {university_podio_id}")
        
        # Get Podio item IDs for LC and University
        logger.info("Fetching LC Podio item...")
        lc_item_id = get_podio_item_id(LC_APP_ID, int(lc_podio_id), token)
        if not lc_item_id:
            logger.error(f"Failed to get LC item ID for {lc_podio_id}")
            return {'success': False, 'error': 'Failed to map LC'}
        
        logger.info("Fetching University Podio item...")
        uni_item_id = get_podio_item_id(UNIVERSITY_APP_ID, int(university_podio_id), token)
        if not uni_item_id:
            logger.error(f"Failed to get University item ID for {university_podio_id}")
            return {'success': False, 'error': 'Failed to map university'}
        
        # Get Department Podio ID from department name
        from .complete_mapping import get_department_mapping
        
        faculty_name = data.get('faculty', '')
        logger.info(f"Faculty/Department name: {faculty_name}")
        
        department_podio_id = get_department_mapping(faculty_name)
        if not department_podio_id:
            logger.error(f"No mapping found for department: {faculty_name}")
            return {'success': False, 'error': 'Invalid department'}
        
        logger.info(f"Department Podio ID: {department_podio_id}")
        
        logger.info(f"Fetching Department Podio item for ID {department_podio_id}...")
        dep_item_id = get_podio_item_id(DEPARTMENT_APP_ID, int(department_podio_id), token)
        if not dep_item_id:
            logger.error(f"Failed to get Department item ID for {department_podio_id}")
            return {'success': False, 'error': 'Failed to map department'}
        
        logger.info(f"Mapped Podio IDs - LC: {lc_item_id}, Uni: {uni_item_id}, Dep: {dep_item_id}")
        
        # Parse birthdate from DD/MM/YYYY to YYYY-MM-DD
        dob = data.get('dob', '')
        if '/' in dob:
            try:
                # Convert from DD/MM/YYYY to YYYY-MM-DD
                from datetime import datetime
                parsed_date = datetime.strptime(dob, '%d/%m/%Y')
                birthdate_str = parsed_date.strftime('%Y-%m-%d')
                logger.info(f"Parsed birthdate: {dob} -> {birthdate_str}")
            except Exception as e:
                logger.error(f"Error parsing birthdate {dob}: {str(e)}")
                birthdate_str = dob
        else:
            birthdate_str = dob
        
        # Build EXPA link
        expa_link = f"https://expa.aiesec.org/people/{expa_person_id}" if expa_person_id else ""
        logger.info(f"EXPA link: {expa_link}")
        
        # Build Podio item fields (only include non-empty values)
        fields = {
            "full-name": data.get('firstname', '') + " " + data.get('lastname', ''),
            "birthdate": {
                "start_date": birthdate_str
            },
            "email-2": [
                {
                    "type": "home",
                    "value": data.get('email', '')
                }
            ],
            "phone": [
                {
                    "type": "home",
                    "value": data.get('phone', '')
                }
            ],
            "university-2": uni_item_id,
            "home-lc": lc_item_id,
            "department-2": dep_item_id,
        }
        
        # Add EXPA link only if we have a person ID
        if expa_link:
            fields["ep-id-expa-link"] = expa_link
        
        # Add referral link only if provided
        referral_link = data.get('referralLink', '').strip()
        if referral_link:
            fields["referral-link"] = referral_link
        
        # Add referral category if provided
        referral = data.get('referral', '').strip()
        if referral and referral.isdigit():
            try:
                fields["how-did-you-hear-about-aiesec-2"] = int(referral)
            except:
                pass
        
        logger.info(f"Podio fields prepared: {list(fields.keys())}")
        
        # Create Podio item
        url = f"https://api.podio.com/item/app/{app_id}/"
        headers = {
            'Authorization': f'OAuth2 {token}',
            'Content-Type': 'application/json'
        }
        
        payload = {"fields": fields}
        
        logger.info(f"Submitting to Podio app {app_id}...")
        response = requests.post(url, json=payload, headers=headers)
        logger.info(f"Podio submission response: {response.status_code}")
        
        if response.status_code in [200, 201]:
            result = response.json()
            item_id = result.get('item_id')
            logger.info(f"✓ Successfully created Podio item {item_id}")
            return {'success': True, 'item_id': item_id}
        else:
            logger.error(f"Podio submission failed: {response.status_code} - {response.text}")
            return {'success': False, 'error': f'Podio API error: {response.status_code}'}
            
    except Exception as e:
        logger.error(f"Error in submit_opportunity_to_podio: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return {'success': False, 'error': str(e)}
