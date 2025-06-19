# Privacy Policy

*Last updated: June 8, 2025*

## Who We Are

Pipewriter is built by writers, for writers. "We" are a small team... of one (it's a-me, Ivan) who believes that copywriters, UX writers, and content strategists deserve product development tools as sophisticated as those used by designers and developers. After all, great products start with great words. Even movie films have screenplays, after all. 

**Company Details:** Pipewriter OÜ, registered at Sepapaja 6, Tallinn 15551, Estonia, reg. no. 14904870. We're incorporated in Estonia but serve writers worldwide who want to create better documents in Google Docs.

## What Pipewriter Does

Pipewriter is a Google Docs add-on that transforms your familiar writing environment into a wireframing and design tool. Think of it as giving Google Docs superpowers for creating professional website copy decks, email templates, and other structured content that looks like it came from a design agency.

Our add-on provides pre-made elements (tables, layouts, components) that you can insert into your documents with one click. We also offer premium templates - standalone Google Docs with professional formatting and wireframe structures that you can purchase and customize for your projects.

## Information We Collect

### How Our Add-On Works

Here's the technical bit: our add-on requires permission to "view and manage your Google Docs documents." This sounds broader than it is. In practice, we only access documents where you've specifically opened our sidebar or used our menu features. We use this permission to insert our pre-made elements at your cursor position - think of it like a really sophisticated copy-paste operation. 

We also provide HTML conversion and AI prompt features that process your document content, but crucially, this processing happens entirely within Google's infrastructure using Google Apps Script. When you use our HTML export feature or insert AI prompts, your document content is processed locally within Google's servers and never transmitted to our external servers. The conversion logic runs as part of Google's platform, reads your document headings and text, transforms them according to our formatting rules, and either inserts the results back into your document or copies them to your clipboard - all without your content ever leaving Google's secure environment.

**Important clarification:** We cannot and do not read your documents for any purpose other than the specific features you activate. When you insert an element, we're copying from our template library to your document. When you use HTML conversion, Google's servers are processing your content locally according to our formatting scripts, not sending your data to external services.

### Google OAuth Permissions Explained

Our add-on requests three specific Google permissions:

**Current Document Editing** (`https://www.googleapis.com/auth/documents.currentonly`): This scope is essential for modifying the document you’re actively working on in terms of design, look, feel and wireframing functionality:
- changing background colors
- editing table format to simulate designing wireframes
- formatting headings and text
- transforming selected sections into HTML for AI integrations.

Because it’s limited to the “current document only,” this scope cannot access any of your other Google Docs. It ensures Pipewriter only touches the doc you’re actively working on.

**Document Access (Template Injection)** (`https://www.googleapis.com/auth/documents`): This allows us to insert content into your Google Docs and process document content for features you explicitly activate. While the permission name sounds broad, we use it only for the specific purpose of copying pre-designed elements from our template library and pasting them where you click.These elements are kept in specific template documents owned by Pipewriter; what the permission does is essentially just give you access to the template document from the document you are working on.

**Sidebar Interface** (`https://www.googleapis.com/auth/script.container.ui`): This displays our element picker, AI tools, color customization, and other features in Google Docs' sidebar.

**Technical Reality:** Our add-on operates through Google Apps Script, which means all document processing happens within Google's secure infrastructure. We read from template documents in *our* Google Drive (not yours) to insert elements, and we process *your* document content only for the specific features you activate - but this processing occurs locally within Google's servers, not on our external servers. We cannot access your other Google Drive files, monitor your documents when our add-on isn't active, or retrieve your document content for any purpose beyond the immediate feature you're using.

**Data Flow Guarantee:** Your document content never leaves Google's infrastructure when using our HTML conversion, prompt insertion, or any other processing features. All text analysis, formatting, and content generation happens through Google Apps Script running within Google's secure environment, ensuring your confidential content remains within Google's privacy and security boundaries at all times.


### Usage and Preferences

We collect information about how you use our add-on to make it better. This includes which elements you insert most often, your preferred themes (light or dark), and any customization settings you choose. 

**Personal Prompt Library**: To get you started quickly, we provide a curated set of default AI prompts for common writing tasks (like "polish copy" or "write a feature description"). These starter prompts are copied to your personal prompt library when you first sign up, where you can edit them, create new ones, or delete any you don't need. Your prompt library is stored securely in your individual account space - think of it like having your own private collection of writing templates that travels with you across devices.

We designed this system so you can build a personalized set of AI prompts that match your writing style and client needs, starting from our professionally crafted defaults. Your custom prompts remain in your private account and are only used when you explicitly choose to apply them to your documents.

If you purchase our premium templates, we keep records of your purchases and download activity. For subscription users, we track usage patterns to ensure our service remains fast and reliable.

### Automatic Information
Like most web services, we automatically collect some technical information including your device type, browser version, IP address, and how you interact with our add-on. This helps us fix bugs, improve performance, and understand which features are most valuable to our users.

## How We Use Your Information

We use the information we collect to provide and improve Pipewriter. Specifically, we use it to process your payments through Stripe (our payment processor), provide customer support, send important updates about the service, and develop new features that writers actually want.

For subscription users, we use usage data to optimize performance and ensure fair access to our servers. For template customers, we use purchase history to recommend relevant new templates and bundles.

We may also use your information to send occasional marketing communications about new templates or features, but you can opt out of these at any time. We'll never send you spam or sell your email to other companies.

## Information Sharing

We don't sell your personal information, period. That would be pretty terrible, and we're not in the business of being terrible.

We do share information with a few trusted service providers who help us run Pipewriter. Stripe processes our payments and has their own robust privacy protections. Google provides our authentication and document services. Firebase (part of Google Cloud) stores our user data securely.

We may also share information if required by law or to protect our rights, but we'll fight any unreasonable requests and notify you when legally permitted.

## Data Storage and Security

Your data is stored securely using Google's Firebase platform, which provides enterprise-grade security and encryption. Payment information is handled exclusively by Stripe - we never see or store your credit card details.

Since we're a small team, we take security seriously precisely because we can't afford not to. We implement industry-standard security measures and regularly update our systems. However, no internet service is 100% secure, so we can't guarantee absolute security (nobody can, despite what they might claim in their marketing).

## Your Rights and Control

You have significant control over your information. You can access, correct, or delete your personal information at any time by contacting us. You can also export your custom prompts and settings if you want to keep a local backup.

If you're in the European Union, you have additional rights under GDPR including the right to data portability and the right to restrict processing. If you're in California, you have rights under CCPA including the right to know what personal information we collect and the right to delete it.

You can also revoke our add-on's access to your Google account at any time through your Google account settings. This will disable the add-on but won't delete your Pipewriter account or purchase history.

## Templates and Content Ownership

When you purchase our premium templates, you're buying the right to use them in your projects. The templates themselves remain our intellectual property, but any content you add to them is yours. You can use our templates for client work, internal projects, or personal use, but you can't resell or redistribute the templates themselves.

Any custom prompts, settings, or modifications you create within Pipewriter belong to you. We may analyze usage patterns across all users to improve our service, but we don't read individual custom content or share it with anyone. In fact, we have no way to access your content, since it's secured by Google Docs.

## AI and Future Features

We're building AI-powered features to help writers create better content faster. Currently, this includes custom prompt management and planned content generation features. Currently, our AI features involve inserting pre-written prompts into your documents - no external AI processing occurs. Future AI capabilities may involve external services, and we'll update this policy accordingly.

We're also developing a web-based editor that will complement our Google Docs add-on. When this launches, it will be covered by this privacy policy with any necessary updates clearly communicated to users.

## International Users and Data Transfers

Pipewriter serves writers worldwide from our base in Estonia. Your information may be processed in the United States (where Google and Stripe operate), the European Union (where we're based), and other countries where our service providers operate.

We ensure that any international data transfers comply with applicable privacy laws including GDPR Article 46 safeguards. Essentially, we only work with service providers who meet European privacy standards regardless of where they're located.

## Changes and Updates

We may update this privacy policy as our service evolves. We'll notify you of material changes by email and by posting the updated policy on our website. The "last updated" date at the top tells you when the policy was last modified.

If we make significant changes that affect how we use your information, we'll give you the opportunity to review the changes before they take effect.

## Contact Us

Have questions about this privacy policy or how we handle your information? We'd genuinely love to hear from you.

**Email:** hello@pipewriter.io  
**Address:** Pipewriter OÜ, Sepapaja 6, Tallinn 15551, Estonia

We typically respond within 24 hours during business days, though sometimes it takes a bit longer when I'm deep in code or dealing with the inevitable challenges of being a solo developer trying to build something useful for fellow writers.

For urgent privacy-related concerns, please mark your email as "Privacy - Urgent" and we'll prioritize it accordingly.

---

*This privacy policy is governed by Estonian law and EU privacy regulations. If you're a writer who's read this far, you probably understand the importance of clear, honest communication - which is exactly what we're aiming for here.*