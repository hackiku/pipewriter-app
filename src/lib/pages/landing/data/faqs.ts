// data/faqs.ts
export interface FAQ {
	question: string;
	answer: string;
}

export const faqs: FAQ[] = [
	{
		question: 'How does the Google Docs integration work?',
		answer: 'Our sidebar app adds UX writing superpowers directly to Google Docs. Install it once, and you&#39;ll have access to all our templates and tools without leaving your document.',
  },
	{
		question: 'Can I use this for technical documentation?',
		answer: 'Absolutely! Our Enterprise plan includes specialized templates for technical documentation, API docs, and aerospace industry requirements.',
	},
	{
		question: 'Do you offer refunds?',
		answer: 'Yes, we offer a 30-day money-back guarantee. If you&#39;re not satisfied, just let us know and we&#39;ll process your refund.',
	},
];