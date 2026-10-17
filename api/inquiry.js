import { Resend } from 'resend';

/**
 * Helper to escape HTML characters in email templates
 */
function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Server-side input validator supporting the Brain & Pen inquiry schema
 */
function validateInput(payload) {
  const errors = [];

  const fullName = typeof payload.fullName === 'string' ? payload.fullName.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const institution = typeof payload.institution === 'string' ? payload.institution.trim() : '';
  const researchArea = typeof payload.researchArea === 'string' ? payload.researchArea.trim() : '';
  const paperTitle = typeof payload.paperTitle === 'string' ? payload.paperTitle.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const serviceNeeded = typeof payload.serviceNeeded === 'string' ? payload.serviceNeeded.trim() : '';

  // Required field: Full Name
  if (fullName.length < 2 || fullName.length > 100) {
    errors.push('fullName');
  }

  // Required field: Email Address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length > 150 || !emailRegex.test(email)) {
    errors.push('email');
  }

  // Optional field: Phone / WhatsApp (validate only if provided)
  const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
  if (phoneClean.length > 0) {
    if (phoneClean.length < 7 || phoneClean.length > 25 || !/^\+?[0-9]{7,25}$/.test(phoneClean)) {
      errors.push('phone');
    }
  }

  // Optional field: Institution / Organization
  if (institution.length > 200) {
    errors.push('institution');
  }

  // Required field: Research Area
  if (researchArea.length < 2 || researchArea.length > 150) {
    errors.push('researchArea');
  }

  // Required field: Type of Enquiry
  if (serviceNeeded.length < 2 || serviceNeeded.length > 150) {
    errors.push('serviceNeeded');
  }

  // Optional field: Target Journal / Conference / Requirement
  if (paperTitle.length > 400) {
    errors.push('paperTitle');
  }

  // Required field: Describe Your Requirement
  if (message.length < 10 || message.length > 5000) {
    errors.push('message');
  }

  return {
    isValid: errors.length === 0,
    sanitized: {
      fullName,
      email,
      phone: phone || 'Not provided',
      institution: institution || 'Not specified',
      researchArea,
      serviceNeeded,
      paperTitle: paperTitle || 'Not specified / General Requirement',
      message
    }
  };
}

/**
 * Generate unique reference ID
 */
function generateReferenceId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `BP-${randomNum}`;
}

/**
 * Vercel Serverless API Route Handler: /api/inquiry
 */
export default async function handler(req, res) {
  // 1. HTTP Method check
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    // 2. Parse payload safely
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          message: 'Invalid request format.'
        });
      }
    }
    body = body || {};

    // 3. Strict server-side validation
    const { isValid, sanitized } = validateInput(body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Please check all required fields and provide valid information.'
      });
    }

    // 4. Ensure local environment variables are loaded in local development
    if (typeof process.loadEnvFile === 'function') {
      try {
        process.loadEnvFile('.env.local');
      } catch {
        try {
          process.loadEnvFile('.env');
        } catch {
          // Ignore if file doesn't exist
        }
      }
    }

    const apiKey = (process.env.RESEND_API_KEY || '').trim();
    const receiverEmail = (process.env.INQUIRY_RECEIVER_EMAIL || '').trim();
    const fromEmail = (process.env.RESEND_FROM_EMAIL || '').trim() || 'Brain & Pen Inquiries <onboarding@resend.dev>';

    if (!apiKey || !receiverEmail) {
      const missingVars = [];
      if (!apiKey) missingVars.push('RESEND_API_KEY');
      if (!receiverEmail) missingVars.push('INQUIRY_RECEIVER_EMAIL');
      console.error(`[api/inquiry] Server configuration incomplete. Missing: ${missingVars.join(', ')}`);
      return res.status(500).json({
        success: false,
        message: 'We could not submit your inquiry right now due to a server configuration issue. Please try again later.'
      });
    }

    // 5. Generate tracking reference and timestamps
    const referenceId = generateReferenceId();
    const now = new Date();
    const utcTimestamp = now.toUTCString();
    const istTimestamp = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long'
    }).format(now);

    // 6. Build email content (plain text & professional HTML)
    const textContent = `
NEW RESEARCH INQUIRY - BRAIN & PEN RESEARCH SERVICES
========================================
Reference ID: ${referenceId}
Full Name: ${sanitized.fullName}
Email Address: ${sanitized.email}
Phone / WhatsApp: ${sanitized.phone}
Institution / Organization: ${sanitized.institution}
Type of Enquiry: ${sanitized.serviceNeeded}
Research Area: ${sanitized.researchArea}
Target Journal / Conference / Requirement: ${sanitized.paperTitle}

Describe Your Requirement:
${sanitized.message}

----------------------------------------
Submission Timestamps:
- IST: ${istTimestamp}
- UTC: ${utcTimestamp}
========================================
To respond to the applicant, reply directly to this email or send to: ${sanitized.email}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Research Inquiry - Brain &amp; Pen Research Services</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1b4a; color: #f8fafc; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0f2158; border-radius: 12px; border: 1px solid #2948d8; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e6fff, #7257e8); padding: 24px 32px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.025em;">
        New Research Inquiry — Brain &amp; Pen
      </h1>
      <p style="color: #e2e8f0; margin: 6px 0 0 0; font-size: 13px;">
        Reference ID: <strong>${escapeHtml(referenceId)}</strong>
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 28px 32px; background-color: #ffffff; color: #0b1b4a;">
      
      <!-- Key Metadata Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #4c6bad; width: 38%; font-weight: 600;">Reference ID:</td>
          <td style="padding: 10px 0; color: #0b1b4a; font-weight: 700;">${escapeHtml(referenceId)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #4c6bad; font-weight: 600;">Full Name:</td>
          <td style="padding: 10px 0; color: #0b1b4a; font-weight: 600;">${escapeHtml(sanitized.fullName)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #4c6bad; font-weight: 600;">Email Address:</td>
          <td style="padding: 10px 0; color: #2948d8; font-weight: 500;">
            <a href="mailto:${escapeHtml(sanitized.email)}" style="color: #2948d8; text-decoration: none;">
              ${escapeHtml(sanitized.email)}
            </a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #4c6bad; font-weight: 600;">Phone / WhatsApp:</td>
          <td style="padding: 10px 0; color: #0b1b4a;">${escapeHtml(sanitized.phone)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #4c6bad; font-weight: 600;">Institution / Organization:</td>
          <td style="padding: 10px 0; color: #0b1b4a;">${escapeHtml(sanitized.institution)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #4c6bad; font-weight: 600;">Type of Enquiry:</td>
          <td style="padding: 10px 0; color: #0b1b4a; font-weight: 600;">${escapeHtml(sanitized.serviceNeeded)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #4c6bad; font-weight: 600;">Research Area:</td>
          <td style="padding: 10px 0; color: #0b1b4a;">${escapeHtml(sanitized.researchArea)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #4c6bad; font-weight: 600; vertical-align: top;">Target Journal / Requirement:</td>
          <td style="padding: 10px 0; color: #0b1b4a; font-weight: 600; line-height: 1.4;">${escapeHtml(sanitized.paperTitle)}</td>
        </tr>
      </table>

      <!-- Requirements Section -->
      <div style="margin-bottom: 24px;">
        <h3 style="color: #2948d8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0; font-weight: 700;">
          Describe Your Requirement
        </h3>
        <div style="background-color: #f8f9ff; border-radius: 8px; border: 1px solid #d6ddef; padding: 16px; color: #0b1b4a; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(sanitized.message)}</div>
      </div>

      <!-- Reply CTA Button -->
      <div style="text-align: center; margin: 28px 0 20px 0;">
        <a href="mailto:${escapeHtml(sanitized.email)}?subject=Re:%20Research%20Inquiry%20[${escapeHtml(referenceId)}]"
           style="display: inline-block; background: linear-gradient(135deg, #1e6fff, #7257e8); color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 8px;">
          Reply to Applicant (${escapeHtml(sanitized.email)})
        </a>
      </div>

      <!-- Submission Timestamp & Metadata -->
      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; line-height: 1.5;">
        <p style="margin: 0 0 4px 0;"><strong>Submission Date (IST):</strong> ${escapeHtml(istTimestamp)}</p>
        <p style="margin: 0;"><strong>Submission Date (UTC):</strong> ${escapeHtml(utcTimestamp)}</p>
      </div>

    </div>
  </div>
</body>
</html>
    `.trim();

    // 7. Dispatch via Resend API
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      replyTo: sanitized.email,
      subject: `New Research Inquiry - [${referenceId}] - ${sanitized.serviceNeeded}`,
      text: textContent,
      html: htmlContent
    });

    if (error) {
      console.error('[api/inquiry] Resend dispatch failed:', error.statusCode || error.name || 'Error', error.message || error);
      return res.status(502).json({
        success: false,
        message: 'We could not submit your inquiry right now. Please try again or reach out to us directly.'
      });
    }

    // 8. Return success response
    return res.status(200).json({
      success: true,
      referenceId,
      message: 'Your inquiry has been submitted successfully.'
    });

  } catch (err) {
    console.error('[api/inquiry] Unexpected error processing request:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while processing your inquiry. Please try again later.'
    });
  }
}
