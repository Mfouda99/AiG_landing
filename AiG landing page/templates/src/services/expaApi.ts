// Django Backend API Configuration
// Use relative URL when served from Django, or localhost:8000 during dev
const BACKEND_API_URL = window.location.hostname === 'localhost' && window.location.port === '5173'
  ? 'http://localhost:8000/api'
  : '/api';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  campus: string;
  faculty: string;
  dob: string;
  preventReason: string;
  campaignId?: string | null;
}

interface SignupResponse {
  success: boolean;
  data?: any;
  error?: string;
  errors?: { [key: string]: string };
  message?: string;
}

interface EmailCheckResponse {
  unique: boolean;
  error?: string;
}

/**
 * Check if an email is unique via Django backend
 */
export async function checkEmailUnique(email: string): Promise<{ unique: boolean; error?: string }> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/check-email/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const result: EmailCheckResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Email check error:', error);
    return { unique: false, error: 'Network error checking email' };
  }
}

/**
 * Submit Global Volunteer signup via Django backend
 */
export async function submitGlobalVolunteerSignup(
  data: SignupData
): Promise<{ success: boolean; data?: any; error?: string; errors?: { [key: string]: string } }> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/test-podio/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result: SignupResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Submission failed',
        errors: result.errors
      };
    }

    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Signup submission error:', error);
    return { success: false, error: 'Network error during signup' };
  }
}

/**
 * Submit Global Talent signup via Django backend
 */
export async function submitGlobalTalentSignup(
  data: SignupData
): Promise<{ success: boolean; data?: any; error?: string; errors?: { [key: string]: string } }> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/submit-global-talent/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result: SignupResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Submission failed',
        errors: result.errors
      };
    }

    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Signup submission error:', error);
    return { success: false, error: 'Network error during signup' };
  }
}

/**
 * Submit Global Teacher signup via Django backend
 */
export async function submitGlobalTeacherSignup(
  data: SignupData
): Promise<{ success: boolean; data?: any; error?: string; errors?: { [key: string]: string } }> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/submit-global-teacher/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result: SignupResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Submission failed',
        errors: result.errors
      };
    }

    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Signup submission error:', error);
    return { success: false, error: 'Network error during signup' };
  }
}
