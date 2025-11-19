import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, context } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Prepare email content
        const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; line-height: 1.6; color: #333; }
            .header { background: #000; color: #fff; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; font-size: 12px; text-transform: uppercase; color: #666; }
            .value { margin-top: 5px; }
            .context { background: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>New Chat Enquiry</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${message}</div>
            </div>
            
            <div class="field">
              <div class="label">Chat Transcript</div>
              <div class="value context">${context || 'No chat context available'}</div>
            </div>
          </div>
        </body>
      </html>
    `;

        const emailText = `
New Chat Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

Chat Transcript:
${context || 'No chat context available'}
    `.trim();

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: process.env.CONTACT_EMAIL_FROM || 'website@fornieriazar.com.au',
            to: process.env.CONTACT_EMAIL_TO || 'enquiry@fornieriazar.com.au',
            replyTo: email,
            subject: `New Chat Enquiry from ${name}`,
            html: emailHtml,
            text: emailText,
        });

        if (error) {
            console.error('Resend error:', error);
            throw error;
        }

        return NextResponse.json({ success: true, emailId: data?.id });

    } catch (error) {
        console.error('Enquiry API error:', error);
        return NextResponse.json(
            { error: 'Failed to send enquiry' },
            { status: 500 }
        );
    }
}
