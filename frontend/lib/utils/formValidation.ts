/**
 * Form validation utilities for Sakwood checkout
 * Thai-specific validation for phone numbers and postal codes
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate email address format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email is required' };
  }

  // Standard email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

/**
 * Validate Thai phone number format
 * Accepts: 0xx-xxx-xxxx, 08x-xxx-xxxx, or 10 digits without dashes
 */
export function validateThaiPhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === '') {
    return { valid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // Must be exactly 10 digits
  if (digitsOnly.length !== 10) {
    return { valid: false, error: 'Please enter a valid Thai phone number (10 digits)' };
  }

  // Must start with 0
  if (!digitsOnly.startsWith('0')) {
    return { valid: false, error: 'Phone number must start with 0' };
  }

  return { valid: true };
}

/**
 * Validate Thai postal code format (5 digits)
 */
export function validateThaiPostalCode(postalCode: string): ValidationResult {
  if (!postalCode || postalCode.trim() === '') {
    return { valid: false, error: 'Postal code is required' };
  }

  // Remove all non-digit characters
  const digitsOnly = postalCode.replace(/\D/g, '');

  // Must be exactly 5 digits
  if (digitsOnly.length !== 5) {
    return { valid: false, error: 'Please enter a 5-digit postal code' };
  }

  return { valid: true };
}

/**
 * Validate required field (not empty after trimming)
 */
export function validateRequired(value: string, fieldName: string = 'This field'): ValidationResult {
  if (!value || value.trim() === '') {
    return { valid: false, error: `${fieldName} is required` };
  }

  return { valid: true };
}

/**
 * Validate minimum length
 */
export function validateMinLength(value: string, minLength: number, fieldName: string = 'This field'): ValidationResult {
  if (!value || value.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }

  return { valid: true };
}

/**
 * Validate maximum length
 */
export function validateMaxLength(value: string, maxLength: number, fieldName: string = 'This field'): ValidationResult {
  if (value && value.length > maxLength) {
    return { valid: false, error: `${fieldName} must not exceed ${maxLength} characters` };
  }

  return { valid: true };
}

/**
 * Combines multiple validators - returns first error found
 */
export function validateField(
  value: string,
  validators: Array<(value: string) => ValidationResult>
): ValidationResult {
  for (const validator of validators) {
    const result = validator(value);
    if (!result.valid) {
      return result;
    }
  }

  return { valid: true };
}
