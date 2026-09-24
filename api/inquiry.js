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
 * Server-side input validator
 */
function validateInput(payload) {
  const errors = [];

  const fullName = typeof payload.fullName === 'string' ? payload.fullName.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const researchArea = typeof payload.researchArea === 'string' ? payload.researchArea.trim() : '';
  const paperTitle = typeof payload.paperTitle === 'string' ? payload.paperTitle.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const serviceNeeded = typeof payload.serviceNeeded === 'string' ? payload.serviceNeeded.trim() : '';

  // Required field checks & length limits
  if (fullName.length < 2 || fullName.length > 100) {
    errors.push('fullName');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length > 150 || !emailRegex.test(email)) {
    errors.push('email');
  }

  const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
  if (phoneClean.length < 7 || phoneClean.length > 20 || !/^\+?[0-9]{7,20}$/.test(phoneClean)) {
    errors.push('phone');
  }

  if (researchArea.length < 2 || researchArea.length > 100) {
    errors.push('researchArea');
  }

  if (paperTitle.length < 3 || paperTitle.length > 300) {
    errors.push('paperTitle');
  }

  if (message.length < 10 || message.length > 3000) {
    errors.push('message');
  }

  if (serviceNeeded.length > 100) {
    errors.push('serviceNeeded');
  }

  return {
    isValid: errors.length === 0,
    sanitized: {
      fullName,
      email,
      phone,
      researchArea,
      paperTitle,
      message,
      serviceNeeded: serviceNeeded || 'General Publication Guidance'
    }
  };
}

/**
 * Generate unique reference ID
 */
function generateReferenceId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `RP-${randomNum}`;
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

    // 4. Check server-side email credentials
    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.INQUIRY_RECEIVER_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Academic Inquiries <onboarding@resend.dev>';

    if (!apiKey || !receiverEmail) {
      // Log generic server message without revealing secrets or applicant private data
      console.error('[api/inquiry] Resend configuration incomplete on server.');
      return res.status(500).json({
        success: false,
        message: 'We could not submit your inquiry right now. Please try again.'
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
NEW RESEARCH PUBLICATION INQUIRY
========================================
Reference ID: ${referenceId}
Full Name: ${sanitized.fullName}
Applicant Email: ${sanitized.email}
Phone Number: ${sanitized.phone}
Research Discipline: ${sanitized.researchArea}
Service Needed: ${sanitized.serviceNeeded}
Paper Title: ${sanitized.paperTitle}

Message / Requirements:
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
  <title>New Research Publication Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #06b6d4, #4f46e5); padding: 24px 32px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.025em;">
        New Research Publication Inquiry
      </h1>
      <p style="color: #e2e8f0; margin: 6px 0 0 0; font-size: 13px;">
        Tracking Reference: <strong>${escapeHtml(referenceId)}</strong>
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 28px 32px;">
      
      <!-- Key Metadata Card -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #94a3b8; width: 38%;">Full Name:</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600;">${escapeHtml(sanitized.fullName)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #94a3b8;">Applicant Email:</td>
          <td style="padding: 10px 0; color: #38bdf8; font-weight: 500;">
            <a href="mailto:${escapeHtml(sanitized.email)}" style="color: #38bdf8; text-decoration: none;">
              ${escapeHtml(sanitized.email)}
            </a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #94a3b8;">Contact Number:</td>
          <td style="padding: 10px 0; color: #f8fafc;">${escapeHtml(sanitized.phone)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #94a3b8;">Research Discipline:</td>
          <td style="padding: 10px 0; color: #f8fafc;">${escapeHtml(sanitized.researchArea)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #94a3b8;">Service Requested:</td>
          <td style="padding: 10px 0; color: #f8fafc;">${escapeHtml(sanitized.serviceNeeded)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Paper Title / Topic:</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; line-height: 1.4;">${escapeHtml(sanitized.paperTitle)}</td>
        </tr>
      </table>

      <!-- Message Section -->
      <div style="margin-bottom: 24px;">
        <h3 style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0;">
          Requirements &amp; Details
        </h3>
        <div style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; padding: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(sanitized.message)}</div>
      </div>

      <!-- Reply CTA Button -->
      <div style="text-align: center; margin: 28px 0 20px 0;">
        <a href="mailto:${escapeHtml(sanitized.email)}?subject=Re:%20Research%20Publication%20Inquiry%20[${escapeHtml(referenceId)}]"
           style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #4f46e5); color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 8px;">
          Reply to Applicant (${escapeHtml(sanitized.email)})
        </a>
      </div>

      <!-- Submission Timestamp & Metadata -->
      <div style="border-top: 1px solid #334155; padding-top: 16px; font-size: 12px; color: #64748b; line-height: 1.5;">
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
      subject: 'New Research Publication Inquiry',
      text: textContent,
      html: htmlContent
    });

    if (error) {
      console.error('[api/inquiry] Resend dispatch error occurred.');
      return res.status(500).json({
        success: false,
        message: 'We could not submit your inquiry right now. Please try again.'
      });
    }

    // 8. Return success response
    return res.status(200).json({
      success: true,
      referenceId,
      message: 'Your inquiry has been submitted successfully.'
    });

  } catch (err) {
    console.error('[api/inquiry] Unexpected error processing request.');
    return res.status(500).json({
      success: false,
      message: 'We could not submit your inquiry right now. Please try again.'
    });
  }
}
