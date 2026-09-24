/**
 * Inquiry Service
 * 
 * Secure service layer for submitting research paper inquiries.
 * 
 * SECURITY NOTE:
 * Email service provider API keys (such as Resend) MUST NEVER be placed in frontend code.
 * Requests are forwarded to the server-side Vercel serverless API route (/api/inquiry)
 * where the private RESEND_API_KEY resides securely on the server.
 */

const API_ENDPOINT = '/api/inquiry';

/**
 * Validate inquiry form data (Client-side fast feedback)
 * @param {Object} data 
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateInquiry = (data) => {
  const errors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (minimum 2 characters).";
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Please provide a valid email address.";
  }

  // Phone number validation (allows international formats with +, digits, spaces, hyphens)
  const phoneClean = (data.phone || "").replace(/[\s\-\(\)]/g, "");
  if (!phoneClean || phoneClean.length < 7 || !/^\+?[0-9]{7,20}$/.test(phoneClean)) {
    errors.phone = "Please provide a valid contact number (7 to 20 digits).";
  }

  if (!data.researchArea || data.researchArea === "") {
    errors.researchArea = "Please select your primary research discipline.";
  }

  if (!data.paperTitle || data.paperTitle.trim().length < 3) {
    errors.paperTitle = "Please provide your tentative research title or topic.";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Please provide brief details about your paper or requirements (at least 10 characters).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Submit inquiry to server-side email endpoint (/api/inquiry)
 * @param {Object} inquiryData 
 * @returns {Promise<{ success: boolean, referenceId?: string, message: string }>}
 */
export const submitInquiry = async (inquiryData) => {
  // 1. Client-side validation check
  const validation = validateInquiry(inquiryData);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0];
    return {
      success: false,
      message: firstError,
      errors: validation.errors
    };
  }

  // 2. Prepare structured payload
  const payload = {
    fullName: inquiryData.fullName?.trim() || '',
    email: inquiryData.email?.trim() || '',
    phone: inquiryData.phone?.trim() || '',
    researchArea: inquiryData.researchArea?.trim() || '',
    serviceNeeded: inquiryData.serviceNeeded?.trim() || 'General Publication Guidance',
    paperTitle: inquiryData.paperTitle?.trim() || '',
    message: inquiryData.message?.trim() || ''
  };

  // 3. Post to serverless endpoint
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result || !result.success) {
      return {
        success: false,
        message: result?.message || 'We could not submit your inquiry right now. Please try again.'
      };
    }

    return {
      success: true,
      referenceId: result.referenceId,
      message: result.message || 'Your inquiry has been submitted successfully.'
    };
  } catch {
    // Network failure or unhandled exception - return safe error without exposing internals
    return {
      success: false,
      message: 'We could not submit your inquiry right now. Please try again.'
    };
  }
};
