// src/data/pricing/plans.ts
import type { Plan } from './types';

export const plans: Plan[] = [
	{
		id: 'lite',
		name: 'Lite',
		description: 'Test drive a folder & show you care',
		price: {
			amount: 1,
			period: 'one-time'
		},
		features: [
			'UX writing template',
			'Basic components library',
			'Google Drive setup',
			'Export to HTML/AI'
		],
		cta: {
			text: 'Start Writing',
			variant: 'outline',
			href: 'https://gumroad.com/l/pipewriter-lite'
		}
	},
	{
		id: 'pro',
		name: 'Pro',
		description: 'Complete UX writing toolkit',
		price: {
			amount: 97,
			period: 'lifetime'
		},
		features: [
			'Full Google Docs app',
			'84+ UI components',
			'All templates & guides',
			'Code export (HTML/React/Svelte)',
			'AI-ready design comments'
		],
		badge: 'Most Popular',
		cta: {
			text: 'Get Full Access',
			variant: 'default',
			href: 'https://gumroad.com/l/pipewriter'
		}
	}
];