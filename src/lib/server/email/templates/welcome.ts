// src/lib/server/email/templates/welcome.ts

export function generateWelcomeEmail(email: string): {
	subject: string;
	html: string;
	text: string;
} {
	const subject = "You're in! (And yes, I used urgency in this subject line) 🎯";

	const text = `
Hey there!

Welcome to Pipewriter - you just joined 200+ writers who are tired of delivering copy in Word docs that clients judge.

Quick confession: I'm using every copywriting trick in the book on you in these emails. 

Why? Because you'll appreciate the meta-ness of it. Plus, you'll see exactly how good copy converts (hint: it's working right now).

Here's what happens next:
→ You'll get access to our Google Docs add-on (14-day free trial)
→ I'll show you how to turn $12/month into $500+ project premiums
→ You'll see why clients stop asking for revisions when they see wireframes

Ready to wireframe where you already write?

Start your free trial: https://workspace.google.com/marketplace/app/pipewriter

To better wireframes (and higher rates),
Ivan

P.S. Yes, I just used a P.S. It increases readership by 79%. See what I mean about the meta thing?
`;

	const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #2d3748;
      background-color: #f7fafc;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #3644FE 0%, #B345ED 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .tagline {
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    h1 {
      color: #1a202c;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 24px;
    }
    p {
      margin-bottom: 16px;
      color: #4a5568;
    }
    .highlight {
      background: linear-gradient(135deg, #3644FE 0%, #B345ED 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 600;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #3644FE 0%, #B345ED 100%);
      color: white;
      padding: 16px 32px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .meta-note {
      background: #f8f9fa;
      border-left: 4px solid #3644FE;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      font-style: italic;
      color: #6b7280;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px 30px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
    }
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Pipewriter</div>
      <div class="tagline">UX App for Writers</div>
    </div>
    
    <div class="content">
      <h1>You're in! (And yes, I used urgency in this subject line) 🎯</h1>
      
      <p>Welcome to Pipewriter - you just joined <span class="highlight">200+ writers</span> who are tired of delivering copy in Word docs that clients judge.</p>
      
      <div class="meta-note">
        <strong>Quick confession:</strong> I'm using every copywriting trick in the book on you in these emails. Why? Because you'll appreciate the meta-ness of it. Plus, you'll see exactly how good copy converts.
      </div>
      
      <p><strong>Here's what happens next:</strong></p>
      <p>→ You'll get access to our Google Docs add-on (14-day free trial)<br>
      → I'll show you how to turn $12/month into $500+ project premiums<br>
      → You'll see why clients stop asking for revisions when they see wireframes</p>
      
      <p>Ready to wireframe where you already write?</p>
      
      <div style="text-align: center;">
        <a href="https://workspace.google.com/marketplace/app/pipewriter" class="cta-button">
          Start Your Free Trial
        </a>
      </div>
      
      <div class="signature">
        <p>To better wireframes (and higher rates),<br>
        <strong>Ivan</strong></p>
        
        <p><strong>P.S.</strong> Yes, I just used a P.S. It increases readership by 79%. See what I mean about the meta thing?</p>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2025 Pipewriter. You're receiving this because you signed up for updates.</p>
      <p><a href="https://pipewriter.io/unsubscribe?email=${encodeURIComponent(email)}" style="color: #6b7280;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
  `;

	return { subject, html, text };
}