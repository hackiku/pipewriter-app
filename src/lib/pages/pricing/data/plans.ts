// data/plans.ts

export interface Plan {
	id: string;
	name: string;
	description: string;
	price: {
		monthly: number;
		annual: number;
	};
	features: string[];
	cta: string;
	badge?: string;
}

export const plans: Plan[] = [
	{
		id: 'writer',
		name: 'Writer',
		description: 'Perfect for freelance writers and small agencies',
		price: {
			monthly: 49,
			annual: 490,
		},
		features: [
			'All UX writing templates',
			'Sidebar app for Google Docs',
			'Export to HTML/Figma',
			'Basic AI assistance',
		],
		cta: 'Start Writing',
	},
	{
		id: 'agency',
		name: 'Agency',
		description: 'For design and development teams',
		price: {
			monthly: 149,
			annual: 1490,
		},
		features: [
			'Everything in Writer',
			'Team collaboration',
			'Custom templates',
			'Advanced AI features',
			'Priority support',
		],
		cta: 'Power Up Your Team',
		badge: 'Most Popular',
	},
	{
		id: 'enterprise',
		name: 'Space Industry',
		description: 'Custom solutions for aerospace companies',
		price: {
			monthly: null,
			annual: null,
		},
		features: [
			'Everything in Agency',
			'Custom component development',
			'Dedicated support team',
			'Technical documentation',
			'Security compliance',
		],
		cta: 'Contact Sales',
	},
];