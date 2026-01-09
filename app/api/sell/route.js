import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const data = await request.json();

        const {
            firstName,
            lastName,
            propertyAddress,
            lastSold,
            neverSold,
            saleMethod,
            timeline,
            estimatedValue,
            improvements,
            agentName,
            agentEmail,
            email,
            phone,
            contactPreference,
            preferredDate,
            preferredTime,
            heardAbout
        } = data;

        // Validate required fields
        if (!firstName || !lastName || !propertyAddress || !email) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check for missing Resend key
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured in environment variables.');
            return NextResponse.json(
                { success: false, error: 'The server is not configured to send emails. Please contact administration.' },
                { status: 500 }
            );
        }

        // Build email content
        const emailContent = `
NEW PROPERTY APPRAISAL REQUEST
==============================

CONTACT DETAILS
---------------
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Preferred Contact: ${contactPreference || 'Any time'}
${preferredDate ? `Preferred Date: ${preferredDate}` : ''}
${preferredTime ? `Preferred Time: ${preferredTime}` : ''}

PROPERTY DETAILS
----------------
Address: ${propertyAddress}
Last Sold: ${neverSold ? "I've never sold" : (lastSold || 'Not specified')}
Estimated Value: ${estimatedValue || 'Not specified'}
Improvements Made: ${improvements || 'Not specified'}

SALE PREFERENCES
----------------
Preferred Method: ${saleMethod || 'Not specified'}
Timeline: ${timeline || 'Not specified'}

SELECTED AGENT
--------------
${agentName || 'No preference'}
${agentEmail ? `(${agentEmail})` : ''}

HOW THEY HEARD ABOUT US
-----------------------
${heardAbout?.length > 0 ? heardAbout.join(', ') : 'Not specified'}

---
This enquiry was submitted via the Fornieri & Azar website.
        `.trim();

        // HTML version for better formatting
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0F0F0F; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0F0F0F; color: #FAFAFA; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #FFFFFF; padding: 30px; border: 1px solid #E5E5E5; border-top: none; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #E5E5E5; }
        .field:last-child { border-bottom: none; }
        .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9397A0; margin-bottom: 8px; }
        .value { font-size: 16px; color: #0F0F0F; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; font-size: 13px; color: #9397A0; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0; font-size: 20px; letter-spacing: 4px;">NEW APPRAISAL REQUEST</h1>
        <p style="margin: 10px 0 0; font-size: 14px; color: #B5B8BD;">Fornieri & Azar Real Estate</p>
    </div>
    <div class="content">
        <div class="field">
            <div class="label">Contact Details</div>
            <div class="value">
                ${firstName} ${lastName}<br>
                <a href="mailto:${email}">${email}</a><br>
                ${phone || ''}<br>
                Contact: ${contactPreference || 'Any time'}
                ${preferredDate ? `<br>Preferred Date: ${preferredDate}` : ''}
                ${preferredTime ? `<br>Preferred Time: ${preferredTime}` : ''}
            </div>
        </div>
        
        <div class="field">
            <div class="label">Property Address</div>
            <div class="value">${propertyAddress}</div>
        </div>

        <div class="field">
            <div class="label">Last Sold & Value</div>
            <div class="value">Last Sold: ${neverSold ? "I've never sold" : (lastSold || 'Not specified')}<br>Est. Value: ${estimatedValue || 'Not specified'}</div>
        </div>

        <div class="field">
            <div class="label">Improvements</div>
            <div class="value">${improvements || 'Not specified'}</div>
        </div>
        
        <div class="field">
            <div class="label">Sale Preferences</div>
            <div class="value">Method: ${saleMethod || 'Not specified'}<br>Timeline: ${timeline || 'Not specified'}</div>
        </div>

        <div class="field">
            <div class="label">Selected Agent</div>
            <div class="value">${agentName || 'No preference'}${agentEmail ? ` (${agentEmail})` : ''}</div>
        </div>

        <div class="field">
            <div class="label">Heard From</div>
            <div class="value">${heardAbout?.length > 0 ? heardAbout.join(', ') : 'Not specified'}</div>
        </div>
    </div>
    <div class="footer">
        <p>This enquiry was submitted via the Fornieri & Azar website.</p>
        <p>Sent on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })} AEDT</p>
    </div>
</body>
</html>
        `.trim();

        // Recipients: main enquiry email + selected agent (if they have an email)
        const recipients = [process.env.CONTACT_EMAIL_TO || 'enquiry@fornieriazar.com.au'];
        if (agentEmail && agentEmail !== (process.env.CONTACT_EMAIL_TO || 'enquiry@fornieriazar.com.au')) {
            recipients.push(agentEmail);
        }

        // Send email via Resend
        const { data: emailResult, error: sendError } = await resend.emails.send({
            from: process.env.CONTACT_EMAIL_FROM || 'website@fornieriazar.com.au',
            to: recipients,
            replyTo: email,
            subject: `New Appraisal Request: ${propertyAddress}`,
            html: htmlContent,
            text: emailContent,
        });

        if (sendError) throw sendError;

        return NextResponse.json({ success: true, emailId: emailResult?.id });

    } catch (error) {
        console.error('Error processing sell form [VERSION 2]:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit form. Please try again.' },
            { status: 500 }
        );
    }
}
