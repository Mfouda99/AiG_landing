"""
Legacy Podio Integration
Handles Podio submissions for old forms with pipe-separated format
Uses PodioItem::get_by_app_item_id() logic to fetch item IDs
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

# Podio App IDs for lookups
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
    Mimics: PodioItem::get_by_app_item_id($app_id, $item_id)
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


def get_member_podio_id(space_id: int, member_id: int, token: str) -> Optional[int]:
    """
    Get member's Podio profile_id for "sign-up-by" field
    Mimics: PodioSpaceMember::get($space_id, $member_id)
    """
    logger.info(f"Fetching space member {member_id} from space {space_id}")
    
    url = f"https://api.podio.com/space/{space_id}/member/{member_id}"
    headers = {
        'Authorization': f'OAuth2 {token}',
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            member = response.json()
            profile_id = member.get('profile', {}).get('profile_id')
            logger.info(f"Successfully retrieved member profile_id: {profile_id}")
            return profile_id
        else:
            logger.error(f"Failed to fetch member: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        logger.error(f"Error fetching member: {str(e)}")
        return None


def submit_legacy_to_podio(data: Dict) -> Dict:
    """
    Submit opportunity application to Podio using legacy format
    
    Args:
        data: Form data with pipe-separated IDs already parsed
    
    Returns:
        Dict with success status and item_id if successful
    """
    logger.info(f"=== Starting legacy Podio submission for {data.get('product', '').upper()} ===")
    
    try:
        # Get access token
        token = podio_auth.get_access_token()
        if not token:
            logger.error("Failed to get Podio access token")
            return {'success': False, 'error': 'Authentication failed'}
        
        # Get app ID for this opportunity type
        product = data.get('product', 'gv')
        app_id = PODIO_APP_IDS.get(product.lower())
        if not app_id:
            logger.error(f"Invalid product type: {product}")
            return {'success': False, 'error': 'Invalid product type'}
        
        logger.info(f"Using Podio app ID: {app_id}")
        
        # Get Podio item IDs for LC, University, and Department
        lc_podio_id = data.get('lc_podio_id')
        uni_podio_id = data.get('uni_podio_id')
        dep_podio_id = data.get('dep_podio_id')
        
        logger.info(f"Fetching LC item (app {LC_APP_ID}, item {lc_podio_id})...")
        lc_item_id = get_podio_item_id(LC_APP_ID, int(lc_podio_id), token)
        if not lc_item_id:
            logger.error(f"Failed to get LC item ID for {lc_podio_id}")
            return {'success': False, 'error': 'Failed to map LC'}
        
        logger.info(f"Fetching University item (app {UNIVERSITY_APP_ID}, item {uni_podio_id})...")
        uni_item_id = get_podio_item_id(UNIVERSITY_APP_ID, int(uni_podio_id), token)
        if not uni_item_id:
            logger.error(f"Failed to get University item ID for {uni_podio_id}")
            return {'success': False, 'error': 'Failed to map university'}
        
        logger.info(f"Fetching Department item (app {DEPARTMENT_APP_ID}, item {dep_podio_id})...")
        dep_item_id = get_podio_item_id(DEPARTMENT_APP_ID, int(dep_podio_id), token)
        if not dep_item_id:
            logger.error(f"Failed to get Department item ID for {dep_podio_id}")
            return {'success': False, 'error': 'Failed to map department'}
        
        logger.info(f"Mapped Podio item IDs - LC: {lc_item_id}, Uni: {uni_item_id}, Dep: {dep_item_id}")
        
        # Parse birthdate
        birthdate_str = data.get('birthdate', '')
        if '/' in birthdate_str:
            try:
                parsed_date = datetime.strptime(birthdate_str, '%d/%m/%Y')
                birthdate_formatted = parsed_date.strftime('%Y-%m-%d')
                logger.info(f"Parsed birthdate: {birthdate_str} -> {birthdate_formatted}")
            except Exception as e:
                logger.error(f"Error parsing birthdate {birthdate_str}: {str(e)}")
                birthdate_formatted = birthdate_str
        else:
            birthdate_formatted = birthdate_str
        
        # Build EXPA link
        expa_person_id = data.get('expa_person_id')
        expa_link = f"https://expa.aiesec.org/people/{expa_person_id}" if expa_person_id else ""
        
        # Build Podio item fields (only include non-empty values)
        fields = {
            "full-name": f"{data.get('firstname', '')} {data.get('lastname', '')}",
            "birthdate": {
                "start_date": birthdate_formatted
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
        ref_link = data.get('ref_link', '').strip()
        if ref_link:
            fields["referral-link"] = ref_link
        
        # Add referral category if provided
        referral = data.get('referral', '').strip()
        if referral and referral.isdigit():
            fields["how-did-you-hear-about-aiesec-2"] = int(referral)
        
        # Add member sign-up-by if provided
        member_id = data.get('member', '')
        if member_id and member_id.isdigit():
            logger.info(f"Fetching member {member_id} from space 915363...")
            profile_id = get_member_podio_id(915363, int(member_id), token)
            if profile_id:
                fields["sign-up-by"] = [{"type": "profile", "id": profile_id}]
                logger.info(f"Added sign-up-by member: {profile_id}")
        
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
        logger.error(f"Error in submit_legacy_to_podio: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return {'success': False, 'error': str(e)}
