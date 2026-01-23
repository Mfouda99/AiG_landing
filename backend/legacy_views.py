"""
Legacy Forms API Endpoint
Handles submissions from the old forms (forms/gv/, forms/gt/, forms/ge/)
Uses the original pipe-separated format: lc_podio_id|university_podio_id|lc_expa_id
"""

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


@csrf_exempt
@require_http_methods(["POST"])
def legacy_signup(request):
    """
    Handle legacy form submissions from forms/gv/, forms/gt/, forms/ge/
    Expects pipe-separated university format: lc_podio_id|university_podio_id|lc_expa_id
    """
    try:
        # Parse form data (can be form-encoded or JSON)
        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = dict(request.POST)
            # Convert lists to single values
            data = {k: v[0] if isinstance(v, list) else v for k, v in data.items()}
        
        logger.info(f"=== Legacy form submission ===")
        logger.info(f"Product: {data.get('product')}")
        
        # Determine opportunity type
        product = data.get('product', 'gv').lower()
        if product not in ['gv', 'gt', 'ge']:
            return JsonResponse({
                'success': False,
                'error': 'Invalid product type'
            }, status=400)
        
        # Parse university data (format: "lc_podio_id|uni_podio_id|lc_expa_id")
        universities = data.get('universities', '')
        if not universities or '|' not in universities:
            logger.error(f"Invalid universities format: {universities}")
            return JsonResponse({
                'success': False,
                'error': 'Invalid university format'
            }, status=400)
        
        university_parts = universities.split('|')
        if len(university_parts) < 3:
            logger.error(f"Incomplete university data: {universities}")
            return JsonResponse({
                'success': False,
                'error': 'Incomplete university data'
            }, status=400)
        
        lc_podio_id = university_parts[0]
        uni_podio_id = university_parts[1]
        lc_expa_id = university_parts[2]
        
        logger.info(f"Parsed IDs - LC Podio: {lc_podio_id}, Uni Podio: {uni_podio_id}, LC EXPA: {lc_expa_id}")
        
        # Parse department
        department_id = data.get('departments', '')
        logger.info(f"Department ID: {department_id}")
        
        # Step 1: Create EXPA account
        from .expa_service import submit_global_volunteer_signup
        
        expa_data = {
            'firstname': data.get('fname', '').strip(),
            'lastname': data.get('lname', '').strip(),
            'email': data.get('email', '').strip().lower(),
            'password': data.get('password', ''),
            'phone': data.get('phone', '').strip(),
            'campus': int(lc_expa_id),  # Use LC EXPA ID
            'faculty': int(department_id) if department_id else 0,
            'referral': 'UmVmZXJyYWxOb2RlOjI=',
            'dob': data.get('birthdate', ''),
            'ogxBranch': 1 if product == 'gv' else (3 if product == 'gt' else 2),
            'graduationYear': datetime.now().year + 4,
            'gender': 'Prefer not to say',
            'apply_reason': 'Personal Development',
            'prevent_resaon': ''
        }
        
        logger.info(f"Submitting to EXPA with LC ID: {lc_expa_id}")
        expa_result = submit_global_volunteer_signup(expa_data)
        
        if not expa_result['success']:
            logger.error(f"EXPA submission failed: {expa_result.get('error')}")
            return JsonResponse({
                'success': False,
                'error': 'EXPA submission failed',
                'details': expa_result.get('error')
            }, status=500)
        
        expa_person_id = expa_result['data'].get('id') if expa_result.get('data') else None
        logger.info(f"✓ EXPA account created, person_id: {expa_person_id}")
        
        # Step 2: Submit to Podio
        from .legacy_podio_service import submit_legacy_to_podio
        
        podio_data = {
            'product': product,
            'firstname': data.get('fname', ''),
            'lastname': data.get('lname', ''),
            'email': data.get('email', ''),
            'phone': data.get('phone', ''),
            'birthdate': data.get('birthdate', ''),
            'lc_podio_id': lc_podio_id,
            'uni_podio_id': uni_podio_id,
            'dep_podio_id': department_id,
            'ref_link': data.get('ref-link', ''),
            'referral': data.get('referral', ''),
            'member': data.get('member', ''),  # Signup by member ID
            'expa_person_id': expa_person_id
        }
        
        logger.info("Submitting to Podio...")
        podio_result = submit_legacy_to_podio(podio_data)
        
        if not podio_result['success']:
            logger.warning(f"Podio submission failed: {podio_result.get('error')}")
            # Don't fail the request - EXPA account is created
        else:
            logger.info(f"✓ Podio item created: {podio_result.get('item_id')}")
        
        return JsonResponse({
            'success': True,
            'person_id': expa_person_id,
            'message': 'Application submitted successfully!'
        })
        
    except Exception as e:
        logger.error(f"Error in legacy_signup: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return JsonResponse({
            'success': False,
            'error': 'Server error',
            'details': str(e)
        }, status=500)
