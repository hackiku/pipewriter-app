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
		description: 'Turn Google Docs into a writer-first design app. For reals',
		videoFrame: '/demo/videos/wireframing-demo.webp',
		timestamp: 0,
		shoutoutId: 'writer1',
		features: [
			'Click to insert UI elements',
			'Edit backgrounds, fonts, tables',
			'Drop, copy, save AI prompts'
		]
	},
	{
		id: 'templates',
		title: 'Templates',
		description: 'Unlock 100+ wireframing components in hyper-organized docs',
		videoFrame: '/demo/videos/templates-demo.webp',
		timestamp: 60,
		shoutoutId: 'writer2',
		features: [
			'Dark & light mode',
			'Copy-paste away',
			'Updated on the reg'
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
		description: 'Export wireframes to code. Build pages in minutes with fancy AI prompts',
		videoFrame: '/demo/videos/code-export.webp',
		timestamp: 366,
		shoutoutId: 'writer4',
		features: [
			'GDocs to HTML',
			'Writing & code prompts',
			'Ready for dev handoff'
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