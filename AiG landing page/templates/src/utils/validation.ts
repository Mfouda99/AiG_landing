/**
 * Validation utility functions for EXPA form submission
 */

/**
 * Validate password strength according to EXPA requirements
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    return {
      valid: false,
      error: 'Password must contain uppercase, lowercase letters and at least one number'
    };
  }

  return { valid: true };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (email.length < 4) {
    return { valid: false, error: 'Email is too short' };
  }

  if (email.includes(' ')) {
    return { valid: false, error: 'Email cannot contain spaces' };
  }

  if (!email.includes('@') || !email.includes('.')) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

/**
 * Validate phone number (Greek format - 10 digits)
 */
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  // Remove any spaces or dashes
  const cleanPhone = phone.replace(/[\s-]/g, '');

  // Check if it's 10 digits (Greek format without country code)
  if (cleanPhone.length === 10 && /^\d+$/.test(cleanPhone)) {
    return { valid: true };
  }

  // Check if it's 11 digits (might include a leading 0 or country code digit)
  if (cleanPhone.length === 11 && /^\d+$/.test(cleanPhone)) {
    return { valid: true };
  }

  return { valid: false, error: 'Please enter a valid 10-11 digit phone number' };
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

/**
 * Validate age (must be between 18 and 30)
 */
export function validateAge(dob: string): { valid: boolean; error?: string; age?: number } {
  const birthDate = new Date(dob);

  if (isNaN(birthDate.getTime())) {
    return { valid: false, error: 'Please enter a valid date of birth' };
  }

  const age = calculateAge(birthDate);

  if (age < 18) {
    return { valid: false, error: 'You must be at least 18 years old to apply', age };
  }

  if (age > 30) {
    return { valid: false, error: 'You must be 30 years or younger to apply', age };
  }

  return { valid: true, age };
}

/**
 * Validate all form fields
 */
export function validateFormData(formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  campus: string;
  faculty: string;
  preventReason: string;
}): { valid: boolean; errors: { [key: string]: string } } {
  const errors: { [key: string]: string } = {};

  // Validate first name
  if (!formData.firstName || formData.firstName.trim().length === 0) {
    errors.firstName = 'First name is required';
  }

  // Validate last name
  if (!formData.lastName || formData.lastName.trim().length === 0) {
    errors.lastName = 'Last name is required';
  }

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.error!;
  }

  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.error!;
  }

  // Validate phone
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.valid) {
    errors.phone = phoneValidation.error!;
  }

  // Validate age
  const ageValidation = validateAge(formData.dob);
  if (!ageValidation.valid) {
    errors.dob = ageValidation.error!;
  }

  // Validate campus
  if (!formData.campus || formData.campus === '') {
    errors.campus = 'Please select a campus';
  }

  // Validate faculty
  if (!formData.faculty || formData.faculty === '') {
    errors.faculty = 'Please select a faculty';
  }

  // Validate prevent reason
  if (!formData.preventReason || formData.preventReason === '') {
    errors.preventReason = 'Please select a reason';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
