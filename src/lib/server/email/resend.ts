// src/lib/server/email/resend.ts
import { Resend } from 'resend';
import { RESEND_API_KEY, RESEND_AUDIENCE_ID } from '$env/static/private';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
const FROM_EMAIL = 'Ivan from Pipewriter <ivan@pipewriter.io>';

/**
 * Add subscriber to Resend audience (Resend = your database)
 */
export async function addToAudience(email: string, source: string = 'website'): Promise<{
	success: boolean;
	message: string;
}> {
	if (!resend || !RESEND_AUDIENCE_ID) {
		console.error('Resend configuration missing');
		return { success: false, message: 'Email service not configured' };
	}

	try {
		console.log(`Adding contact ${email} to audience ${RESEND_AUDIENCE_ID}`);

		const { data, error } = await resend.contacts.create({
			email,
			audienceId: RESEND_AUDIENCE_ID,
			unsubscribed: false,
			// You can add custom fields later for source tracking
		});

		if (error) {
			// Handle "already exists" gracefully
			if (error.name === 'validation_error' &&
				error.message?.toLowerCase().includes('already exists')) {
				console.log(`Contact ${email} already exists in audience`);
				return { success: true, message: 'Already subscribed!' };
			}
			console.error('Resend API error:', error);
			return { success: false, message: 'Subscription failed' };
		}

		console.log(`Successfully added contact ${email} to audience`);
		return { success: true, message: 'Successfully subscribed!' };
	} catch (err) {
		console.error('Error adding to audience:', err);
		return { success: false, message: 'Subscription failed' };
	}
}

/**
 * Send email using Resend
 */
export async function sendEmail({
	to,
	subject,
	html,
	text,
	from = FROM_EMAIL
}: {
	to: string;
	subject: string;
	html: string;
	text: string;
	from?: string;
}): Promise<{ success: boolean; id?: string; error?: any }> {
	if (!resend) {
		console.error('Resend client not initialized');
		return { success: false, error: 'Resend not configured' };
	}

	try {
		console.log(`Sending email to ${to} with subject "${subject}"`);

		const { data, error } = await resend.emails.send({
			from,
			to,
			subject,
			html,
			text
		});

		if (error) {
			console.error('Error sending email:', error);
			return { success: false, error };
		}

		console.log(`Email sent successfully. ID: ${data?.id}`);
		return { success: true, id: data?.id };
	} catch (err) {
		console.error('Unexpected error sending email:', err);
		return { success: false, error: err };
	}
}

/**
 * Send welcome email (convenience function)
 */
export async function sendWelcomeEmail(email: string, welcomeTemplate: any): Promise<{
	success: boolean;
	id?: string;
	error?: any
}> {
	const { subject, html, text } = welcomeTemplate(email);
	return sendEmail({ to: email, subject, html, text });
}