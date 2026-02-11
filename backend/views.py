from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import logging
from datetime import datetime

from .expa_service import check_email_unique, submit_global_volunteer_signup
from .validation import validate_form_data
from .lc_mapping import get_university_lc_id, get_faculty_id

logger = logging.getLogger(__name__)


def index(request):
    """
    Serve the React frontend application
    """
    return render(request, 'index.html')


@require_http_methods(["GET"])
def health_check(request):
    """
    Simple health check endpoint
    """
    return JsonResponse({
        'status': 'ok',
        'message': 'Django API is running',
        'timestamp': datetime.now().isoformat()
    })


@csrf_exempt
@require_http_methods(["POST"])
def check_email(request):
    """
    API endpoint to check if email is unique in EXPA
    """
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip()
        
        if not email:
            return JsonResponse({'unique': False, 'error': 'Email is required'}, status=400)
        
        result = check_email_unique(email)
        return JsonResponse(result)
        
    except json.JSONDecodeError:
        return JsonResponse({'unique': False, 'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        logger.error(f"Error in check_email: {str(e)}")
        return JsonResponse({'unique': False, 'error': 'Server error'}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def submit_global_volunteer(request):
    """
    API endpoint to handle Global Volunteer form submission
    """
    try:
        data = json.loads(request.body)
        
        # Step 1: Validate form data
        validation = validate_form_data(data)
        if not validation['valid']:
            return JsonResponse({
                'success': False,
                'errors': validation['errors'],
                'message': 'Validation failed'
            }, status=400)
        
        # Step 2: Check email uniqueness
        email_check = check_email_unique(data['email'])
        if not email_check['unique']:
            return JsonResponse({
                'success': False,
                'errors': {'email': 'This email is already registered. Please sign in or use a different email.'},
                'message': 'Email already exists'
            }, status=400)
        
        # Step 3: Map university to LC ID and prepare submission data
        campus_lc_id = get_university_lc_id(data['campus'])
        faculty_id = get_faculty_id(data['faculty'])
        
        # Get current year + 4 as default graduation year
        current_year = datetime.now().year
        graduation_year = current_year + 4
        
        # Get campaign ID from query parameter or form data
        campaign_id = data.get('campaignId') or request.GET.get('c')
        
        submission_data = {
            'firstname': data['firstName'].strip(),
            'lastname': data['lastName'].strip(),
            'email': data['email'].strip().lower(),
            'password': data['password'],
            'phone': data['phone'].strip(),
            'campus': campus_lc_id,
            'faculty': faculty_id,
            'referral': 'UmVmZXJyYWxOb2RlOjI=',  # Default referral ID
            'dob': data['dob'],
            'ogxBranch': 1,  # Global Volunteer = 1
            'graduationYear': graduation_year,
            'gender': 'Prefer not to say',  # Default gender
            'campaign_id': campaign_id,
            'apply_reason': 'Personal Development',  # Default reason
            'prevent_resaon': data['preventReason']
        }
        
        # Step 4: Submit to EXPA
        result = submit_global_volunteer_signup(submission_data)
        
        if not result['success']:
            return JsonResponse({
                'success': False,
                'error': result['error'],
                'message': 'Failed to submit application'
            }, status=500)
        
        # Step 5: Submit to Podio for tracking
        from .opportunity_podio_service import submit_opportunity_to_podio
        
        podio_data = {
            'firstname': data['firstName'],
            'lastname': data['lastName'],
            'email': data['email'],
            'phone': data['phone'],
            'dob': data['dob'],
            'campus': data['campus'],  # University name  
            'faculty': data['faculty'],  # Department name (not EXPA ID)
            'referralLink': data.get('referralLink', ''),
            'referral': data.get('referral', '')
        }
        
        # Get person_id from EXPA response
        expa_person_id = result['data'].get('id') if result.get('data') else None
        
        podio_result = submit_opportunity_to_podio('gv', podio_data, expa_person_id)
        
        if not podio_result['success']:
            logger.warning(f"Podio submission failed for {data['email']}: {podio_result.get('error')}")
            # Don't fail the request if Podio fails - EXPA account is more important
        
        return JsonResponse({
            'success': True,
            'data': result['data'],
            'message': 'Application submitted successfully!'
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON',
            'message': 'Invalid request format'
        }, status=400)
    except KeyError as e:
        logger.error(f"Missing required field: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': f'Missing required field: {str(e)}',
            'message': 'Missing required data'
        }, status=400)
    except Exception as e:
        logger.error(f"Error in submit_global_volunteer: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Server error',
            'message': 'An unexpected error occurred'
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def submit_global_talent(request):
    """
    API endpoint to handle Global Talent form submission
    """
    try:
        data = json.loads(request.body)
        
        # Step 1: Validate form data
        validation = validate_form_data(data)
        if not validation['valid']:
            return JsonResponse({
                'success': False,
                'errors': validation['errors'],
                'message': 'Validation failed'
            }, status=400)
        
        # Step 2: Check email uniqueness
        email_check = check_email_unique(data['email'])
        if not email_check['unique']:
            return JsonResponse({
                'success': False,
                'errors': {'email': 'This email is already registered. Please sign in or use a different email.'},
                'message': 'Email already exists'
            }, status=400)
        
        # Step 3: Map university to LC ID and prepare submission data
        campus_lc_id = get_university_lc_id(data['campus'])
        faculty_id = get_faculty_id(data['faculty'])
        
        current_year = datetime.now().year
        graduation_year = current_year + 4
        campaign_id = data.get('campaignId') or request.GET.get('c')
        
        submission_data = {
            'firstname': data['firstName'].strip(),
            'lastname': data['lastName'].strip(),
            'email': data['email'].strip().lower(),
            'password': data['password'],
            'phone': data['phone'].strip(),
            'campus': campus_lc_id,
            'faculty': faculty_id,
            'referral': 'UmVmZXJyYWxOb2RlOjI=',
            'dob': data['dob'],
            'ogxBranch': 3,  # Global Talent = 3
            'graduationYear': graduation_year,
            'gender': 'Prefer not to say',
            'campaign_id': campaign_id,
            'apply_reason': 'Personal Development',
            'prevent_resaon': data.get('preventReason', '')
        }
        
        # Step 4: Submit to EXPA
        result = submit_global_volunteer_signup(submission_data)
        
        if not result['success']:
            return JsonResponse({
                'success': False,
                'error': result['error'],
                'message': 'Failed to submit application'
            }, status=500)
        
        # Step 5: Submit to Podio for tracking
        from .opportunity_podio_service import submit_opportunity_to_podio
        
        podio_data = {
            'firstname': data['firstName'],
            'lastname': data['lastName'],
            'email': data['email'],
            'phone': data['phone'],
            'dob': data['dob'],
            'campus': data['campus'],
            'faculty': data['faculty'],
            'referralLink': data.get('referralLink', ''),
            'referral': data.get('referral', '')
        }
        
        expa_person_id = result['data'].get('id') if result.get('data') else None
        podio_result = submit_opportunity_to_podio('gt', podio_data, expa_person_id)
        
        if not podio_result['success']:
            logger.warning(f"Podio submission failed for {data['email']}: {podio_result.get('error')}")
        
        return JsonResponse({
            'success': True,
            'data': result['data'],
            'message': 'Application submitted successfully!'
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON',
            'message': 'Invalid request format'
        }, status=400)
    except KeyError as e:
        logger.error(f"Missing required field: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': f'Missing required field: {str(e)}',
            'message': 'Missing required data'
        }, status=400)
    except Exception as e:
        logger.error(f"Error in submit_global_talent: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Server error',
            'message': 'An unexpected error occurred'
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def submit_global_teacher(request):
    """
    API endpoint to handle Global Teacher form submission
    """
    try:
        data = json.loads(request.body)
        
        # Step 1: Validate form data
        validation = validate_form_data(data)
        if not validation['valid']:
            return JsonResponse({
                'success': False,
                'errors': validation['errors'],
                'message': 'Validation failed'
            }, status=400)
        
        # Step 2: Check email uniqueness
        email_check = check_email_unique(data['email'])
        if not email_check['unique']:
            return JsonResponse({
                'success': False,
                'errors': {'email': 'This email is already registered. Please sign in or use a different email.'},
                'message': 'Email already exists'
            }, status=400)
        
        # Step 3: Map university to LC ID and prepare submission data
        campus_lc_id = get_university_lc_id(data['campus'])
        faculty_id = get_faculty_id(data['faculty'])
        
        current_year = datetime.now().year
        graduation_year = current_year + 4
        campaign_id = data.get('campaignId') or request.GET.get('c')
        
        submission_data = {
            'firstname': data['firstName'].strip(),
            'lastname': data['lastName'].strip(),
            'email': data['email'].strip().lower(),
            'password': data['password'],
            'phone': data['phone'].strip(),
            'campus': campus_lc_id,
            'faculty': faculty_id,
            'referral': 'UmVmZXJyYWxOb2RlOjI=',
            'dob': data['dob'],
            'ogxBranch': 2,  # Global Teacher = 2
            'graduationYear': graduation_year,
            'gender': 'Prefer not to say',
            'campaign_id': campaign_id,
            'apply_reason': 'Personal Development',
            'prevent_resaon': data.get('preventReason', '')
        }
        
        # Step 4: Submit to EXPA
        result = submit_global_volunteer_signup(submission_data)
        
        if not result['success']:
            return JsonResponse({
                'success': False,
                'error': result['error'],
                'message': 'Failed to submit application'
            }, status=500)
        
        # Step 5: Submit to Podio for tracking
        from .opportunity_podio_service import submit_opportunity_to_podio
        
        podio_data = {
            'firstname': data['firstName'],
            'lastname': data['lastName'],
            'email': data['email'],
            'phone': data['phone'],
            'dob': data['dob'],
            'campus': data['campus'],
            'faculty': data['faculty'],
            'referralLink': data.get('referralLink', ''),
            'referral': data.get('referral', '')
        }
        
        expa_person_id = result['data'].get('id') if result.get('data') else None
        podio_result = submit_opportunity_to_podio('ge', podio_data, expa_person_id)
        
        if not podio_result['success']:
            logger.warning(f"Podio submission failed for {data['email']}: {podio_result.get('error')}")
        
        return JsonResponse({
            'success': True,
            'data': result['data'],
            'message': 'Application submitted successfully!'
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON',
            'message': 'Invalid request format'
        }, status=400)
    except KeyError as e:
        logger.error(f"Missing required field: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': f'Missing required field: {str(e)}',
            'message': 'Missing required data'
        }, status=400)
    except Exception as e:
        logger.error(f"Error in submit_global_volunteer: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Server error',
            'message': 'An unexpected error occurred'
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def submit_member(request):
    """
    API endpoint to receive AIESEC member application submissions.
    Creates EXPA account and submits to Podio for tracking.
    """
    try:
        data = json.loads(request.body)

        # Validate required fields
        required = ['firstName', 'lastName', 'email', 'password', 'phone', 'university', 'department', 'birthdate', 'whyJoin', 'consent']
        missing = [f for f in required if not data.get(f)]
        if missing:
            return JsonResponse({
                'success': False, 
                'message': f'Missing fields: {", ".join(missing)}'
            }, status=400)
        
        # Import here to avoid circular imports
        from .expa_service import submit_member_signup
        from .podio_service import submit_member_to_podio
        from .complete_mapping import get_university_mapping
        
        # Get university mapping (LC ID and Podio IDs)
        university_mapping = get_university_mapping(data['university'])
        if not university_mapping:
            return JsonResponse({
                'success': False,
                'message': 'Invalid university selection'
            }, status=400)
        
        # Get department Podio ID
        from .complete_mapping import get_department_mapping
        department_mapping = get_department_mapping(data['department'])
        
        # Prepare EXPA submission data
        expa_data = {
            'firstName': data['firstName'].strip(),
            'lastName': data['lastName'].strip(),
            'email': data['email'].strip().lower(),
            'password': data['password'],
            'phone': data['phone'].strip(),
            'lc_id': university_mapping['lc_id'],
            'whyJoin': data['whyJoin']
        }
        
        # Step 1: Create EXPA account
        expa_result = submit_member_signup(expa_data)
        
        if not expa_result['success']:
            return JsonResponse({
                'success': False,
                'message': 'Failed to create EXPA account',
                'error': expa_result['error']
            }, status=500)
        
        # Step 2: Submit to Podio for tracking
        podio_data = {
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'email': data['email'],
            'phone': data['phone'],
            'birthdate': data['birthdate'],
            'university': data['university'],
            'department': data['department'],
            'whyJoin': data['whyJoin'],
            'academicSituation': data.get('academicSituation'),
            'employmentStatus': data.get('employmentStatus'),
            'consent': data.get('consent'),
            'motivation': data.get('motivation', ''),
            'howHeard': data.get('howHeard'),
            'referralLink': data.get('referralLink', ''),
            'lc_podio_id': university_mapping['lc_podio_id'],
            'university_podio_id': university_mapping['university_podio_id'],
            'department_podio_id': department_mapping,
            'lc_name': university_mapping.get('lc_name', 'ATHENS') # Fallback if missing
        }
        
        podio_result = submit_member_to_podio(podio_data, expa_result['person_id'])
        
        if not podio_result['success']:
            logger.warning(f"Podio submission failed but EXPA account created for {data['email']}")
            # Don't fail the request if Podio fails, EXPA account is more important
        
        logger.info(f"Successfully processed member application for {data['email']}")
        return JsonResponse({
            'success': True,
            'message': 'Application submitted successfully!',
            'person_id': expa_result['person_id']
        })

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        logger.error(f"Error in submit_member: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return JsonResponse({'success': False, 'message': 'Server error'}, status=500)
