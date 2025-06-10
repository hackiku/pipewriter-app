// src/lib/pages/pricing/data/plans.ts
import type { Plan } from '../types';

export const plans: Plan[] = [
	{
		id: 'free',
		name: 'Free',
		description: 'Get started with essential wireframing tools',
		price: {
			amount: 0,
			period: 'forever'
		},
		features: [
			'Basic wireframe elements',
			'Light/dark mode templates',
			'Google Docs integration',
			'Community support'
		],
		cta: {
			text: 'Start Free',
			variant: 'outline',
			href: 'https://workspace.google.com/marketplace/app/pipewriter/123456789' // Replace with real marketplace URL
		},
		badge: 'Always Free'
	},
	{
		id: 'pro',
		name: 'Pro',
		description: 'Full access to professional wireframing toolkit',
		price: {
			amount: 15,
			period: 'monthly'
		},
		features: [
			'Everything in Free',
			'84+ premium elements',
			'Advanced color schemes',
			'Table & document backgrounds',
			'AI-powered prompts',
			'Export capabilities',
			'Priority support'
		],
		badge: '14-Day Free Trial',
		cta: {
			text: 'Start Free Trial',
			variant: 'default',
			href: 'https://workspace.google.com/marketplace/app/pipewriter/123456789'
		},
		highlight: true
	},
	{
		id: 'bundle',
		name: 'Starter Bundle',
		description: '3 months Pro + premium template collection',
		price: {
			amount: 59,
			period: 'one-time',
			savings: 'Save $26'
		},
		features: [
			'3 months Pro subscription',
			'100+ premium wireframe templates',
			'Industry-specific bundles',
			'SaaS, eCommerce & B2B templates',
			'Agency-ready deliverables',
			'Lifetime template access',
			'VIP onboarding call'
		],
		cta: {
			text: 'Get Bundle',
			variant: 'secondary',
			href: '/early' 
		},
		badge: 'Best Value'
	}
];

export const annualPlans: Plan[] = [
	{
		...plans[0] // Free stays the same
	},
	{
		...plans[1],
		price: {
			amount: 144, // $12/month billed annually
			period: 'annually',
			monthlyEquivalent: 12
		},
		badge: 'Save 20%'
	},
	{
		...plans[2] // Bundle stays the same
	}
];