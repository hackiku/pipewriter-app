// src/routes/api/cron/emails/+server.ts
// Updated to use Vercel KV storage

import { json } from '@sveltejs/kit';
import { sendEmail } from '$lib/server/email/resend';
import { getEmailsToSend, markEmailAsSent } from '$lib/server/email/kv-sequences';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	// Verify this is from Vercel Cron (security)
	const authHeader = request.headers.get('authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const now = new Date();
		console.log(`🕐 Email cron job running at ${now.toISOString()}`);

		// Get emails that should be sent now
		const emailsToSend = await getEmailsToSend();
		console.log(`📧 Found ${emailsToSend.length} emails to send`);

		if (emailsToSend.length === 0) {
			return json({
				success: true,
				message: 'No emails to send',
				processed: 0,
				timestamp: now.toISOString()
			});
		}

		const results = [];

		// Process each email
		for (const scheduledEmail of emailsToSend) {
			try {
				console.log(`📤 Sending ${scheduledEmail.template} to ${scheduledEmail.email}`);

				// Generate email content based on template
				const emailContent = await generateEmailContent(scheduledEmail.template, scheduledEmail.email);

				const result = await sendEmail({
					to: scheduledEmail.email,
					subject: emailContent.subject,
					html: emailContent.html,
					text: emailContent.text
				});

				// Mark as sent or failed
				await markEmailAsSent(scheduledEmail.id, result.success);

				results.push({
					id: scheduledEmail.id,
					email: scheduledEmail.email,
					template: scheduledEmail.template,
					success: result.success,
					emailId: result.id,
					error: result.success ? null : result.error
				});

				if (result.success) {
					console.log(`✅ Sent ${scheduledEmail.template} to ${scheduledEmail.email}`);
				} else {
					console.error(`❌ Failed to send ${scheduledEmail.template} to ${scheduledEmail.email}:`, result.error);
				}

			} catch (error) {
				console.error(`❌ Error processing ${scheduledEmail.id}:`, error);

				await markEmailAsSent(scheduledEmail.id, false);

				results.push({
					id: scheduledEmail.id,
					email: scheduledEmail.email,
					template: scheduledEmail.template,
					success: false,
					error: error instanceof Error ? error.message : 'Unknown error'
				});
			}
		}

		const successCount = results.filter(r => r.success).length;
		const failureCount = results.length - successCount;

		console.log(`✅ Email processing complete: ${successCount} sent, ${failureCount} failed`);

		return json({
			success: true,
			processed: results.length,
			sent: successCount,
			failed: failureCount,
			results,
			timestamp: now.toISOString()
		});

	} catch (error) {
		console.error('❌ Cron job error:', error);
		return json({
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString()
		}, { status: 500 });
	}
};

// Generate email content based on template
async function generateEmailContent(template: string, email: string) {
	switch (template) {
		case 'welcome':
			const { generateWelcomeEmail } = await import('$lib/server/email/templates/welcome');
			return generateWelcomeEmail(email);

		case 'tutorial':
			return generateTutorialEmail(email);

		case 'social-proof':
			return generateSocialProofEmail(email);

		case 'upgrade':
			return generateUpgradeEmail(email);

		case 'trial-ending':
			return generateTrialEndingEmail(email);

		case 'trial-ended':
			return generateTrialEndedEmail(email);

		default:
			throw new Error(`Unknown email template: ${template}`);
	}
}

// Email template generators
function generateTutorialEmail(email: string) {
	return {
		subject: "Here's how to wireframe in Google Docs (2-min read) 📋",
		html: `
			<!DOCTYPE html>
			<html>
			<head><meta charset="utf-8"></head>
			<body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
				<h1 style="color: #3644FE;">📋 Your 2-Minute Wireframing Tutorial</h1>
				<p>Hi there!</p>
				<p>Ready to see how easy wireframing can be in Google Docs? Here's your quick start guide:</p>
				
				<div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
					<h3>🚀 3 Steps to Your First Wireframe:</h3>
					<p><strong>1.</strong> Install Pipewriter from Google Workspace Marketplace</p>
					<p><strong>2.</strong> Open any Google Doc and find Pipewriter in the sidebar</p>
					<p><strong>3.</strong> Click any element to insert it at your cursor</p>
				</div>
				
				<p>That's it! No Figma learning curve, no switching between apps.</p>
				
				<div style="text-align: center; margin: 30px 0;">
					<a href="https://workspace.google.com/marketplace/app/pipewriter" 
					   style="background: linear-gradient(135deg, #3644FE 0%, #B345ED 100%); 
					          color: white; padding: 16px 32px; text-decoration: none; 
					          border-radius: 50px; font-weight: 600;">
						Start Your Free Trial
					</a>
				</div>
				
				<p>Questions? Just hit reply!</p>
				<p>Ivan</p>
				
				<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
					<p><a href="https://pipewriter.io/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a></p>
				</div>
			</body>
			</html>
		`,
		text: `📋 Your 2-Minute Wireframing Tutorial

Hi there!

Ready to see how easy wireframing can be in Google Docs? Here's your quick start guide:

🚀 3 Steps to Your First Wireframe:
1. Install Pipewriter from Google Workspace Marketplace
2. Open any Google Doc and find Pipewriter in the sidebar  
3. Click any element to insert it at your cursor

That's it! No Figma learning curve, no switching between apps.

Start Your Free Trial: https://workspace.google.com/marketplace/app/pipewriter

Questions? Just hit reply!
Ivan

---
Unsubscribe: https://pipewriter.io/unsubscribe?email=${encodeURIComponent(email)}`
	};
}

function generateSocialProofEmail(email: string) {
	return {
		subject: "How Sarah increased her project rates by 40% 💰",
		html: `
			<!DOCTYPE html>
			<html>
			<head><meta charset="utf-8"></head>
			<body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
				<h1 style="color: #3644FE;">💰 Real Results from Real Writers</h1>
				
				<div style="background: #f8f9fa; padding: 25px; margin: 20px 0; border-radius: 12px; border-left: 4px solid #3644FE;">
					<p style="font-style: italic; font-size: 18px; margin-bottom: 15px;">
						"Since using Pipewriter, I've increased my project rates by 40%. Clients immediately understand the vision when they see wireframe structure."
					</p>
					<p style="margin: 0;"><strong>- Sarah M., Freelance Copywriter</strong></p>
				</div>
				
				<p>Here's why wireframes change everything for copywriters:</p>
				
				<ul style="line-height: 1.8;">
					<li><strong>Fewer revisions:</strong> Clients see the structure before you write</li>
					<li><strong>Higher perceived value:</strong> Professional deliverables = premium rates</li>  
					<li><strong>Faster approval:</strong> Visual clarity eliminates confusion</li>
				</ul>
				
				<p>Ready to join Sarah and 200+ other writers charging more?</p>
				
				<div style="text-align: center; margin: 30px 0;">
					<a href="https://workspace.google.com/marketplace/app/pipewriter" 
					   style="background: linear-gradient(135deg, #3644FE 0%, #B345ED 100%); 
					          color: white; padding: 16px 32px; text-decoration: none; 
					          border-radius: 50px; font-weight: 600;">
						Start Your Free Trial
					</a>
				</div>
				
				<p>To higher rates,<br>Ivan</p>
				
				<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
					<p><a href="https://pipewriter.io/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a></p>
				</div>
			</body>
			</html>
		`,
		text: `💰 Real Results from Real Writers

"Since using Pipewriter, I've increased my project rates by 40%. Clients immediately understand the vision when they see wireframe structure."
- Sarah M., Freelance Copywriter

Here's why wireframes change everything for copywriters:

• Fewer revisions: Clients see the structure before you write
• Higher perceived value: Professional deliverables = premium rates  
• Faster approval: Visual clarity eliminates confusion

Ready to join Sarah and 200+ other writers charging more?

Start Your Free Trial: https://workspace.google.com/marketplace/app/pipewriter

To higher rates,
Ivan

---
Unsubscribe: https://pipewriter.io/unsubscribe?email=${encodeURIComponent(email)}`
	};
}

function generateUpgradeEmail(email: string) {
	return {
		subject: "Ready to unlock the full wireframe library? 🔓",
		html: `<!-- Upgrade email HTML -->`,
		text: `<!-- Upgrade email text -->`
	};
}

function generateTrialEndingEmail(email: string) {
	return {
		subject: "Your trial ends tomorrow (here's what you'll miss) ⏰",
		html: `<!-- Trial ending email HTML -->`,
		text: `<!-- Trial ending email text -->`
	};
}

function generateTrialEndedEmail(email: string) {
	return {
		subject: "Trial ended - but you can still get 20% off 🎯",
		html: `<!-- Trial ended email HTML -->`,
		text: `<!-- Trial ended email text -->`
	};
}