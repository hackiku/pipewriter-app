// src/lib/pages/pricing/data/plans.ts
import type { Plan } from '../types';

export const plans: Plan[] = [
	{
		id: 'lite',
		name: 'Pipewriter Lite',
		description: 'Essential tools to start wireframing in Google Docs',
		price: {
			amount: 1,
			period: 'one-time'
		},
		features: [
			'Single document template',
			'Basic UX components',
			'Drive folder setup'
		],
		cta: {
			text: 'Try for $1',
			variant: 'outline',
			href: 'https://gumroad.com/l/pipewriter-lite'
		}
	},
	{
		id: 'suite',
		name: 'Writer Suite',
		description: 'Complete toolkit for UX writing and wireframes',
		price: {
			amount: 89,
			period: 'one-time'
		},
		features: [
			'Everything in Lite',
			'Full Google Docs sidebar app',
			'84+ UI components & templates',
			'AI-ready design system comments',
			'Code export (HTML/React/Svelte)'
		],
		badge: 'Most Popular',
		cta: {
			text: 'Get Suite Access',
			variant: 'default',
			href: 'https://gumroad.com/l/pipewriter'
		}
	},
	{
		id: 'coming-soon',
		name: 'Coming Soon',
		description: 'AI-powered design systems & web editor',
		price: {
			amount: null
		},
		features: [
			'Browser-based editor',
			'AI design system generation',
			'Team collaboration',
			'Priority access to beta'
		],
		cta: {
			text: 'Join Waitlist',
			variant: 'secondary',
			href: '/waitlist'
		}
	}
];