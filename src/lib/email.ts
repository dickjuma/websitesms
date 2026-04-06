import { Resend } from "resend";
import { getSiteInfoSettings } from "@/lib/site-settings";

function getEmailClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error("RESEND_FROM_EMAIL is not set");
  }

  return {
    resend: new Resend(process.env.RESEND_API_KEY),
    fromEmail: process.env.RESEND_FROM_EMAIL,
  };
}

async function getEmailProfile() {
  try {
    const settings = await getSiteInfoSettings();
    return {
      companyName: settings.companyName,
      websiteUrl: settings.websiteUrl || "https://sma-systems.com",
      primaryEmail: settings.email,
      supportEmail: settings.supportEmail || settings.email,
      salesEmail: settings.salesEmail || settings.email,
      notificationsEmail: settings.notificationsEmail || settings.email,
      phone: settings.phone,
    };
  } catch (error) {
    console.error("Failed to load email profile from site settings:", error);
    return {
      companyName: "SMA Systems and Softwares",
      websiteUrl: "https://sma-systems.com",
      primaryEmail: "hello@sma-systems.com",
      supportEmail: "hello@sma-systems.com",
      salesEmail: "hello@sma-systems.com",
      notificationsEmail: "hello@sma-systems.com",
      phone: "+254 719 832 719",
    };
  }
}

export async function sendContactConfirmation(email: string, name: string, message: string) {
  try {
    const { resend, fromEmail } = getEmailClient();
    const profile = await getEmailProfile();
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `We've received your message - ${profile.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for reaching out, ${name}!</h2>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p style="background: #f0f0f0; padding: 10px; border-radius: 5px;">${message}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p>Best regards,<br />${profile.companyName}<br /><a href="${profile.websiteUrl}">${profile.websiteUrl}</a></p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Failed to send contact confirmation email:", error);
    throw error;
  }
}

export async function sendContactNotificationToTeam(
  name: string,
  email: string,
  company: string | undefined,
  subject: string,
  message: string,
  serviceType?: string
) {
  try {
    const { resend, fromEmail } = getEmailClient();
    const profile = await getEmailProfile();
    const response = await resend.emails.send({
      from: fromEmail,
      to: profile.notificationsEmail,
      replyTo: email,
      subject: `New Contact Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          ${serviceType ? `<p><strong>Service Type:</strong> ${serviceType}</p>` : ""}
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f0f0f0; padding: 10px; border-radius: 5px;">${message}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><a href="${profile.websiteUrl}/admin">View in dashboard</a></p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Failed to send team notification email:", error);
    throw error;
  }
}

export async function sendNewsletterConfirmation(email: string, name?: string) {
  try {
    const displayName = name || "Subscriber";
    const { resend, fromEmail } = getEmailClient();
    const profile = await getEmailProfile();
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Welcome to the ${profile.companyName} Newsletter`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to the SMA Systems Newsletter, ${displayName}!</h2>
          <p>Thanks for subscribing. You'll now receive:</p>
          <ul>
            <li>Latest product updates and features</li>
            <li>Industry insights and best practices</li>
            <li>Case studies and success stories</li>
            <li>Exclusive offers and announcements</li>
          </ul>
          <p>If you no longer wish to receive emails, you can unsubscribe anytime.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p>Best regards,<br />${profile.companyName}<br /><a href="${profile.websiteUrl}">${profile.websiteUrl}</a></p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Failed to send newsletter confirmation email:", error);
    throw error;
  }
}

export async function sendQuoteRequestConfirmation(email: string, name: string, projectType: string) {
  try {
    const { resend, fromEmail } = getEmailClient();
    const profile = await getEmailProfile();
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Quote Request Received - ${profile.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your quote request, ${name}!</h2>
          <p>We've received your request for a <strong>${projectType}</strong> project.</p>
          <p>Our team will review your requirements and send you a customized quote within 2 business days.</p>
          <p>In the meantime, feel free to explore our services and case studies on our website.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p>Questions? Reach out to us at <a href="mailto:${profile.salesEmail}">${profile.salesEmail}</a></p>
          <p>Best regards,<br />${profile.companyName}<br /><a href="${profile.websiteUrl}">${profile.websiteUrl}</a></p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Failed to send quote confirmation email:", error);
    throw error;
  }
}

export async function sendQuoteRequestToTeam(
  name: string,
  email: string,
  company: string | undefined,
  projectType: string,
  budget: string | undefined,
  timeline: string | undefined,
  message: string
) {
  try {
    const { resend, fromEmail } = getEmailClient();
    const profile = await getEmailProfile();
    const response = await resend.emails.send({
      from: fromEmail,
      to: profile.salesEmail,
      replyTo: email,
      subject: `New Quote Request: ${projectType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          <p><strong>Project Type:</strong> ${projectType}</p>
          ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
          ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ""}
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Details:</strong></p>
          <p style="background: #f0f0f0; padding: 10px; border-radius: 5px;">${message}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><a href="${profile.websiteUrl}/admin">View in dashboard</a></p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Failed to send quote notification email:", error);
    throw error;
  }
}

export async function sendBookDemoConfirmation(
  email: string,
  name: string,
  demoDetails: { date: string; time: string; serviceType: string }
) {
  try {
    const { resend, fromEmail } = getEmailClient();
    const profile = await getEmailProfile();
    const formattedDate = new Date(demoDetails.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Your Demo is Scheduled - ${formattedDate} at ${demoDetails.time}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your demo is scheduled! 🎉</h2>
          <p>Hi ${name},</p>
          <p>We're excited to show you how we deliver <strong>${demoDetails.serviceType}</strong> solutions.</p>
          
          <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Demo Details</h3>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${demoDetails.time} EAT (East Africa Time)</p>
            <p><strong>Duration:</strong> 30-45 minutes</p>
            <p><strong>Format:</strong> Video call (Zoom link in calendar invite)</p>
          </div>

          <p><strong>What to expect:</strong></p>
          <ul style="line-height: 1.8;">
            <li>Real examples from projects like yours</li>
            <li>Walk-through of key features and approach</li>
            <li>Time for your questions and specific use cases</li>
            <li>Next steps if there's a fit</li>
          </ul>

          <p><strong>To prepare:</strong></p>
          <ul style="line-height: 1.8;">
            <li>Check your calendar for the invite (with Zoom link)</li>
            <li>Bring your team if possible (operations, technical, leadership)</li>
            <li>Have any current workflows or pain points in mind</li>
          </ul>

          <div style="background: #e8f4f8; padding: 15px; border-left: 4px solid #0369a1; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Need to reschedule?</strong> Click the reschedule link in your calendar invite, or reply to this email.</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p>Looking forward to meeting you!</p>
          <p>Best regards,<br />${profile.companyName}<br /><a href="${profile.websiteUrl}">${profile.websiteUrl}</a></p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Failed to send book demo confirmation email:", error);
    throw error;
  }
}

export async function sendBookDemoNotificationToTeam(demoData: {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  teamSize: string;
  notes: string;
}) {
  try {
    const { resend, fromEmail } = getEmailClient();
    const profile = await getEmailProfile();
    const formattedDate = new Date(demoData.preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const response = await resend.emails.send({
      from: fromEmail,
      to: profile.notificationsEmail,
      replyTo: demoData.email,
      subject: `Demo Scheduled: ${demoData.name} - ${demoData.serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Demo Scheduled</h2>
          
          <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3 style="margin-top: 0; margin-bottom: 10px;">Contact Information</h3>
            <p><strong>Name:</strong> ${demoData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${demoData.email}">${demoData.email}</a></p>
            <p><strong>Company:</strong> ${demoData.company}</p>
            <p><strong>Phone:</strong> ${demoData.phone}</p>
          </div>

          <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3 style="margin-top: 0; margin-bottom: 10px;">Demo Details</h3>
            <p><strong>Service Type:</strong> ${demoData.serviceType}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${demoData.preferredTime}</p>
            <p><strong>Team Size:</strong> ${demoData.teamSize}</p>
          </div>

          ${demoData.notes !== 'None' ? `
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="margin-top: 0; margin-bottom: 10px;">Notes</h3>
              <p>${demoData.notes}</p>
            </div>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">
            <strong>Next Steps:</strong> Add to your calendar, prepare talking points, and consider who should attend from your side to maximize the conversation.
          </p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Failed to send book demo notification email:", error);
    throw error;
  }
}

export async function sendAdminReplyEmail(params: {
  to: string;
  subject: string;
  message: string;
}) {
  const { resend, fromEmail } = getEmailClient();
  const profile = await getEmailProfile();

  return resend.emails.send({
    from: fromEmail,
    to: params.to,
    replyTo: profile.supportEmail,
    subject: params.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2>${profile.companyName}</h2>
        <p style="white-space: pre-wrap; line-height: 1.6;">${params.message}</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p>Reply directly to <a href="mailto:${profile.supportEmail}">${profile.supportEmail}</a> for follow-up.</p>
        <p><a href="${profile.websiteUrl}">${profile.websiteUrl}</a></p>
      </div>
    `,
  });
}
