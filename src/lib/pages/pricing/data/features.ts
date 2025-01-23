// data/features.ts
export interface Feature {
	name: string;
	description: string;
	writer: boolean;
	agency: boolean;
	enterprise: boolean;
}

export const features: Feature[] = [
	{
		name: 'UX Writing Templates',
		description: 'Pre-built templates for landing pages, docs, and more',
		writer: true,
		agency: true,
		enterprise: true,
	},
	{
		name: 'Google Docs Integration',
		description: 'Work directly in Google Docs with our sidebar app',
		writer: true,
		agency: true,
		enterprise: true,
	},
	{
		name: 'Export to Code',
		description: 'Convert your docs to HTML, React, or Svelte',
		writer: true,
		agency: true,
		enterprise: true,
	},
	{
		name: 'Team Collaboration',
		description: 'Share templates and work together',
		writer: false,
		agency: true,
		enterprise: true,
	},
	{
		name: 'Custom Development',
		description: 'Tailored solutions for your specific needs',
		writer: false,
		agency: false,
		enterprise: true,
	},
];