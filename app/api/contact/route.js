import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

/**
 * POST /api/contact
 * Handles contact form submissions and sends email via Resend
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, interest, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #0F0F0F;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #0F0F0F;
              color: #FAFAFA;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #FFFFFF;
              padding: 30px;
              border: 1px solid #E5E5E5;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #E5E5E5;
            }
            .field:last-child {
              border-bottom: none;
            }
            .label {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #9397A0;
              margin-bottom: 8px;
            }
            .value {
              font-size: 16px;
              color: #0F0F0F;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #E5E5E5;
              font-size: 13px;
              color: #9397A0;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 20px; letter-spacing: 4px;">NEW ENQUIRY</h1>
            <p style="margin: 10px 0 0; font-size: 14px; color: #B5B8BD;">Fornieri & Azar Real Estate</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Full Name</div>
              <div class="value">${fullName}</div>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${email}" style="color: #9397A0;">${email}</a></div>
            </div>
            ${phone ? `
            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value"><a href="tel:${phone}" style="color: #9397A0;">${phone}</a></div>
            </div>
            ` : ''}
            ${interest ? `
            <div class="field">
              <div class="label">Interest</div>
              <div class="value">${interest}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This enquiry was submitted via the Fornieri & Azar website contact form.</p>
            <p>Sent on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })} AEDT</p>
          </div>
        </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const emailText = `
New Enquiry - Fornieri & Azar Real Estate

Full Name: ${fullName}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${interest ? `Interest: ${interest}` : ''}

Message:
${message}

---
This enquiry was submitted via the Fornieri & Azar website contact form.
Sent on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })} AEDT
    `.trim();

    // Send email via Resend
    const { data: emailResult, error: sendError } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'website@fornieriazar.com.au',
      to: process.env.CONTACT_EMAIL_TO || 'enquiry@fornieriazar.com.au',
      replyTo: email,
      subject: `New Website Enquiry from ${fullName}`,
      html: emailHtml,
      text: emailText,
    });
    if (sendError) throw sendError;

    const auditContactDetails = {
      email,
      fullName,
      phone,
      interest,
      message
    };

    try {
      await addContactToAudience(auditContactDetails);
    } catch (audienceError) {
      console.warn('Resend audience sync failed:', audienceError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been sent successfully. We will be in touch soon.',
        emailId: emailResult?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    const resendErrorMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.response?.body?.error ||
      error?.response?.body?.message ||
      error?.message ||
      error?.name ||
      'Unknown error';

    const domainValidationIssue =
      /validation_error/i.test(resendErrorMessage) ||
      /domain.*not verified/i.test(resendErrorMessage);

    const errorResponseMessage = domainValidationIssue
      ? 'The fornieriazar.com.au domain is not verified. Please, add and verify your domain on https://resend.com/domains'
      : 'Failed to send your enquiry. Please try again or contact us directly.';

    return NextResponse.json(
      {
        error: errorResponseMessage,
        details: process.env.NODE_ENV === 'development' ? resendErrorMessage : undefined
      },
      { status: domainValidationIssue ? 400 : 500 }
    );
  }
}

async function addContactToAudience(contact) {
  if (!RESEND_AUDIENCE_ID || !contact?.email) return;

  const properties = buildAudienceProperties(contact);
  const payload = {
    audienceId: RESEND_AUDIENCE_ID,
    email: contact.email,
    firstName: contact.fullName,
    ...(properties ? { properties } : {})
  };

  const { error: createError } = await resend.contacts.create(payload);
  if (!createError) return;

  if (isDuplicateContactError(createError)) {
    const { error: updateError } = await resend.contacts.update(payload);
    if (updateError) throw new Error(`Failed to refresh Resend audience member: ${updateError.message || updateError.name}`);
    return;
  }

  throw new Error(`Failed to save contact to Resend audience: ${createError.message || createError.name}`);
}

function buildAudienceProperties({ phone, interest, message }) {
  const properties = {};
  if (phone) properties.phone = phone;
  if (interest) properties.interest = interest;
  if (message) properties.message = message;
  return Object.keys(properties).length ? properties : null;
}

function isDuplicateContactError(error) {
  const message = (error?.message ?? '').toString().toLowerCase();
  return (
    error?.statusCode === 409 ||
    error?.name === 'contact_already_exists' ||
    /already exists/.test(message)
  );
}

// OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
