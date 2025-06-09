// src/lib/pages/pricing/data/faqs.ts
export interface FAQ {
	question: string;
	answer: string;
}

export const faqs: FAQ[] = [
	{
		question: "How does the 14-day free trial work?",
		answer: "Start your trial directly from the Google Workspace Marketplace. You'll get full access to all Pro features for 14 days - no credit card required. After the trial, you can choose to upgrade to Pro or continue with our generous free tier."
	},
	{
		question: "What's the difference between the addon and templates?",
		answer: "The Pipewriter addon lives in your Google Docs sidebar with 84+ wireframe elements for quick access. The template bundles contain 100+ pre-made wireframe documents for specific industries (SaaS, eCommerce, B2B) that you can copy and customize."
	},
	{
		question: "Can I use this for client work?",
		answer: "Absolutely! Many of our users are copywriters and UX writers who create wireframes for clients. The professional formatting and client-ready deliverables help you charge premium rates for your services."
	},
	{
		question: "Do I need design experience to use Pipewriter?",
		answer: "No design experience needed! Pipewriter is built specifically for writers who need to create professional wireframes without learning complex design tools. If you can use Google Docs, you can use Pipewriter."
	},
	{
		question: "How does the Google Docs integration work?",
		answer: "Pipewriter appears as a sidebar app in Google Docs. Click any element to insert it at your cursor position, or use Enter/Space for even faster workflow. All your existing Google Docs shortcuts and features still work normally."
	},
	{
		question: "What happens if I cancel my subscription?",
		answer: "You can cancel anytime with no penalties. You'll keep access to Pro features until the end of your billing period, then automatically switch to our free tier. Any templates you've purchased remain yours forever."
	},
	{
		question: "Is the Starter Bundle a one-time purchase?",
		answer: "Yes! The Starter Bundle gives you 3 months of Pro access plus lifetime access to 100+ premium templates. It's perfect if you want to test everything or prefer one-time purchases over subscriptions."
	}
];