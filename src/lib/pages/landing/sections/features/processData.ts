// src/lib/pages/landing/sections/features/processData.ts

export interface ProcessStep {
	id: string;
	title: string;
	description: string;
	videoFrame: string;
	timestamp: number;
	shoutoutId: string;
	features?: string[];
}

export const processSteps: ProcessStep[] = [
	{
		id: 'addon',
		title: 'Add-on',
		description: 'Native Google Docs sidebar with 90+ wireframe elements',
		videoFrame: '/demo/videos/wireframing-demo.webp',
		timestamp: 0,
		shoutoutId: 'writer1',
		features: [
			'One-click element insertion',
			'90+ wireframe components',
			'Native Google Docs integration'
		]
	},
	{
		id: 'templates',
		title: 'Templates',
		description: 'Industry-specific wireframe systems and layouts',
		videoFrame: '/demo/videos/templates-demo.webp',
		timestamp: 60,
		shoutoutId: 'writer2',
		features: [
			'SaaS landing pages',
			'eCommerce flows',
			'Copy-paste ready'
		]
	},
	{
		id: 'theming',
		title: 'Theming',
		description: 'Light/dark modes with automatic text style updates',
		videoFrame: '/demo/videos/darkmode.webp',
		timestamp: 275,
		shoutoutId: 'writer3',
		features: [
			'Light/dark themes',
			'Auto text updates',
			'Professional formatting'
		]
	},
	{
		id: 'code',
		title: 'Code',
		description: 'Export wireframes to HTML, React, and live websites',
		videoFrame: '/demo/videos/code-export.webp',
		timestamp: 366,
		shoutoutId: 'writer4',
		features: [
			'HTML export',
			'AI code generation',
			'Dev handoff ready'
		]
	}
];

// Helper to get process step by shoutout ID
export function getStepByShoutout(shoutoutId: string): ProcessStep | undefined {
	return processSteps.find(step => step.shoutoutId === shoutoutId);
}

// Helper to get next/previous steps
export function getAdjacentSteps(currentIndex: number) {
	return {
		previous: currentIndex > 0 ? processSteps[currentIndex - 1] : null,
		next: currentIndex < processSteps.length - 1 ? processSteps[currentIndex + 1] : null
	};
}