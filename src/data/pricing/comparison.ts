// src/data/pricing/comparison.ts

export interface Feature {
	name: string;
	tooltip: string;
	free: boolean | string;
	pro: boolean | string;
	figma: boolean | string;
	manual: boolean | string;
}

export const features: Feature[] = [
	{
		name: 'Google Docs Native',
		tooltip: 'Work directly in Google Docs where your content lives - no more copy-paste between tools',
		free: true,
		pro: true,
		figma: false,
		manual: true
	},
	{
		name: 'UI Components',
		tooltip: 'Pre-built components for headers, buttons, forms, and more - just insert and customize',
		free: '12+',
		pro: '90+',
		figma: '∞',
		manual: false
	},
	{
		name: 'Export to Code',
		tooltip: 'Convert your docs directly to HTML/CSS, React, or Svelte components',
		free: false,
		pro: true,
		figma: true,
		manual: false
	},
	{
		name: 'Version Control',
		tooltip: 'Track changes and manage versions directly in Google Docs',
		free: true,
		pro: true,
		figma: true,
		manual: 'Manual'
	},
	{
		name: 'Team Collaboration',
		tooltip: 'Share, comment, and iterate together in real-time',
		free: 'Basic',
		pro: true,
		figma: true,
		manual: true
	},
	{
		name: 'AI Assistance',
		tooltip: 'Smart suggestions for copy improvements and component selection',
		free: false,
		pro: true,
		figma: false,
		manual: false
	}
];