// src/lib/pages/pricing/data/features.ts
export interface Feature {
	name: string;
	description: string;
	writer: boolean;  // Lite
	agency: boolean;  // Suite
	enterprise: boolean;  // Web App
}

export const features: Feature[] = [
	{
		name: 'UX Writing Template',
		description: 'Basic wireframing template to get started',
		writer: true,
		agency: true,
		enterprise: true
	},
	{
		name: 'Drive Integration',
		description: 'Work directly in Google Docs with our bound scripts',
		writer: true,
		agency: true,
		enterprise: true
	},
	{
		name: 'Component Library',
		description: 'Full access to 84+ UI components and layouts',
		writer: false,
		agency: true,
		enterprise: true
	},
	{
		name: 'Code Export',
		description: 'Convert docs to HTML, React, or Svelte components',
		writer: false,
		agency: true,
		enterprise: true
	},
	{
		name: 'Design Systems',
		description: 'Pre-built design systems with AI conversion',
		writer: false,
		agency: false,
		enterprise: true
	},
	{
		name: 'Web Editor',
		description: 'Browser-based visual editor with real-time preview',
		writer: false,
		agency: false,
		enterprise: true
	}
];