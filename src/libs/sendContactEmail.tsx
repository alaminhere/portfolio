import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sendContactEmail = async (
  name: string,
  email: string,
  message: string,
) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const { error } = await resend.emails.send({
    from: 'Alamin | Portfolio <website@alaminhere.com>',
    to: process.env.CONTACT_RECEIVER_EMAIL!,
    replyTo: email,
    subject: `New Contact Message from ${name}`,
    text: `New message from: ${name} (${email})\n\n${message}`,

    html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f4f7;">

      <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">
          Alamin <span style="font-weight: 400; opacity: 0.85;">| Portfolio</span>
        </h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 13px;">
          New message received from your website
        </p>
      </div>

      <div style="background-color: #ffffff; padding: 32px 28px; border: 1px solid #eef0f3; border-top: none;">

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f2;">
              <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: #9ca3af; font-weight: 600;">
                From
              </p>
              <p style="margin: 4px 0 0; font-size: 15px; color: #111827; font-weight: 600;">
                ${safeName}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f2;">
              <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: #9ca3af; font-weight: 600;">
                Email
              </p>
              <p style="margin: 4px 0 0; font-size: 15px; color: #4f46e5; font-weight: 500;">
                ${safeEmail}
              </p>
            </td>
          </tr>
        </table>

        <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: #9ca3af; font-weight: 600;">
          Message
        </p>
        <div style="background-color: #f9fafb; border-left: 3px solid #4f46e5; padding: 16px 18px; border-radius: 8px;">
          <p style="color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-line; margin: 0;">
            ${safeMessage}
          </p>
        </div>

        <div style="margin: 32px 0 8px; text-align: center;">
          <a href="mailto:${safeEmail}" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; padding: 13px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; display: inline-block; box-shadow: 0 4px 10px rgba(79,70,229,0.25);">
            Reply to ${safeName}
          </a>
        </div>
      </div>

      <div style="text-align: center; padding: 20px 24px;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          &copy; ${new Date().getFullYear()} Md. Alamin. All rights reserved.
        </p>
        <p style="color: #c4c7cd; font-size: 11px; margin: 4px 0 0;">
          This message was sent from the contact form on your portfolio site.
        </p>
      </div>

    </div>
  `,
  });

  if (error) throw new Error(error.message);
};

export default sendContactEmail;
