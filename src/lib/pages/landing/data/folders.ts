// src/lib/pages/landing/data/folders.ts
export interface PreviewContent {
	emoji: string;
	title: string;
	description: string;
}

export interface DriveItem {
	id: string;
	type: 'folder' | 'doc';
	name: string;
	shared?: boolean;
	preview?: boolean;
	previewContent?: PreviewContent;
	items?: DriveItem[];
}

export const driveContents: DriveItem[] = [
	{
		id: 'elements',
		type: 'doc',
		name: 'Elements 🎨',
		shared: true,
		preview: true,
		previewContent: {
			emoji: "🎨",
			title: "90+ UI Elements",
			description: "Copy-paste components for rapid prototyping"
		}
	},
	{
		id: 'samples',
		type: 'folder',
		name: 'samples',
		preview: true,
		previewContent: {
			emoji: "📦",
			title: "Pro Templates",
			description: "Ship faster with ready-to-go components"
		},
		items: [
			{ id: 'hero', type: 'doc', name: 'Hero Section.doc', shared: true, preview: true },
			{ id: 'features', type: 'doc', name: 'Feature Grid.doc', shared: true, preview: true }
		]
	},
	{
		id: 'guides',
		type: 'folder',
		name: 'guides',
		preview: true,
		previewContent: {
			emoji: "📖",
			title: "Quick Start Guides",
			description: "Learn the basics in 5 minutes"
		},
		items: [
			{ id: 'start', type: 'doc', name: '1. Start 🚀', shared: true, preview: true },
			{ id: 'install', type: 'doc', name: '2. Install app ⚡', shared: true, preview: true }
		]
	},
	{
		id: 'darkmode',
		type: 'doc',
		name: 'Darkmode 🌒',
		shared: true,
		preview: true,
		previewContent: {
			emoji: "🌗",
			title: "Dark Mode Built-in",
			description: "Switch themes with one click"
		}
	},
	{
		id: 'blank',
		type: 'doc',
		name: 'Blank ⚪',
		shared: true
	}
];