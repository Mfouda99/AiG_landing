"""
Direct Podio Test Endpoint
Simple endpoint to test Podio submission without EXPA
"""

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import logging
import requests
from datetime import datetime

logger = logging.getLogger(__name__)


@csrf_exempt
@require_http_methods(["POST"])
def test_podio(request):
    """
    Direct test endpoint - posts to Podio only (no EXPA)
    """
    try:
        data = json.loads(request.body)
        
        logger.info("=" * 50)
        logger.info("TEST PODIO SUBMISSION STARTED")
        logger.info("=" * 50)
        
        # Podio credentials
        client_id = "developergreece"
        client_secret = "79dRsK00aBKgWZDJihd9ytP9L7DkX2yyDEiNqdfjjvrr7h1lV9AMKk55VW1BKTvp"
        username = "greece@aiesec.net"
        password = "AIESECHellas1956!"
        
        # Get Podio token
        logger.info("Step 1: Getting Podio token...")
        token_url = "https://podio.com/oauth/token"
        token_data = {
            'grant_type': 'password',
            'client_id': client_id,
            'client_secret': client_secret,
            'username': username,
            'password': password
        }
        
        token_response = requests.post(token_url, data=token_data, timeout=10)
        logger.info(f"Token response: {token_response.status_code}")
        
        if token_response.status_code != 200:
            logger.error(f"Token failed: {token_response.text}")
            return JsonResponse({
                'success': False,
                'error': 'Token failed',
                'details': token_response.text
            }, status=500)
        
        token = token_response.json()['access_token']
        logger.info("✓ Got token successfully")
        
        # Get university mapping
        logger.info(f"Step 2: Mapping university: {data.get('campus')}")
        from .complete_mapping import get_university_mapping, get_department_mapping
        
        university_mapping = get_university_mapping(data.get('campus'))
        if not university_mapping:
            return JsonResponse({'success': False, 'error': 'Invalid university'})
        
        lc_podio_id = university_mapping['lc_podio_id']
        university_podio_id = university_mapping['university_podio_id']
        logger.info(f"✓ Mapped - LC: {lc_podio_id}, Uni: {university_podio_id}")
        
        # Get department mapping
        logger.info(f"Step 3: Mapping department: {data.get('faculty')}")
        department_podio_id = get_department_mapping(data.get('faculty'))
        if not department_podio_id:
            return JsonResponse({'success': False, 'error': 'Invalid department'})
        
        logger.info(f"✓ Mapped department: {department_podio_id}")
        
        # Get Podio item IDs
        logger.info("Step 4: Fetching Podio item IDs...")
        headers = {
            'Authorization': f'OAuth2 {token}',
            'Content-Type': 'application/json'
        }
        
        # LC item
        lc_url = f"https://api.podio.com/app/23156094/item/{lc_podio_id}"
        lc_response = requests.get(lc_url, headers=headers, timeout=10)
        logger.info(f"LC fetch: {lc_response.status_code}")
        if lc_response.status_code != 200:
            return JsonResponse({'success': False, 'error': 'LC fetch failed'})
        lc_item_id = lc_response.json()['item_id']
        logger.info(f"✓ LC item_id: {lc_item_id}")
        
        # University item
        uni_url = f"https://api.podio.com/app/23156117/item/{university_podio_id}"
        uni_response = requests.get(uni_url, headers=headers, timeout=10)
        logger.info(f"Uni fetch: {uni_response.status_code}")
        if uni_response.status_code != 200:
            return JsonResponse({'success': False, 'error': 'University fetch failed'})
        uni_item_id = uni_response.json()['item_id']
        logger.info(f"✓ Uni item_id: {uni_item_id}")
        
        # Department item
        dep_url = f"https://api.podio.com/app/23156121/item/{department_podio_id}"
        dep_response = requests.get(dep_url, headers=headers, timeout=10)
        logger.info(f"Dep fetch: {dep_response.status_code}")
        if dep_response.status_code != 200:
            return JsonResponse({'success': False, 'error': 'Department fetch failed'})
        dep_item_id = dep_response.json()['item_id']
        logger.info(f"✓ Dep item_id: {dep_item_id}")
        
        # Parse birthdate
        dob = data.get('dob', '')
        if '/' in dob:
            parsed_date = datetime.strptime(dob, '%d/%m/%Y')
            birthdate_str = parsed_date.strftime('%Y-%m-%d')
        else:
            birthdate_str = dob
        
        # Create Podio item
        logger.info("Step 5: Creating Podio item...")
        app_id = 19029784  # GV app
        
        fields = {
            "full-name": f"{data.get('firstName', '')} {data.get('lastName', '')}",
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
        
        create_url = f"https://api.podio.com/item/app/{app_id}/"
        payload = {"fields": fields}
        
        logger.info(f"Submitting to Podio app {app_id}...")
        logger.info(f"Payload: {json.dumps(payload, indent=2)}")
        
        create_response = requests.post(create_url, json=payload, headers=headers, timeout=10)
        logger.info(f"Create response: {create_response.status_code}")
        logger.info(f"Response body: {create_response.text}")
        
        if create_response.status_code in [200, 201]:
            result = create_response.json()
            item_id = result.get('item_id')
            logger.info("=" * 50)
            logger.info(f"✓✓✓ SUCCESS! Podio item created: {item_id}")
            logger.info("=" * 50)
            return JsonResponse({
                'success': True,
                'item_id': item_id,
                'message': 'Podio item created successfully!'
            })
        else:
            logger.error(f"Podio submission failed: {create_response.text}")
            return JsonResponse({
                'success': False,
                'error': 'Podio submission failed',
                'details': create_response.text
            }, status=500)
        
    except Exception as e:
        logger.error(f"Error in test_podio: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
