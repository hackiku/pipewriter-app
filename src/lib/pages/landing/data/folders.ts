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

// Helper to sort items - folders first, then docs alphabetically
function sortDriveItems(items: DriveItem[]): DriveItem[] {
	return items.sort((a, b) => {
		if (a.type === b.type) {
			return a.name.localeCompare(b.name);
		}
		return a.type === 'folder' ? -1 : 1;
	});
}

export const driveContents: DriveItem[] = sortDriveItems([
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
		items: sortDriveItems([
			{ id: 'hero', type: 'doc', name: 'Hero Section.doc', shared: true, preview: true },
			{ id: 'features', type: 'doc', name: 'Feature Grid.doc', shared: true, preview: true }
		])
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
		items: sortDriveItems([
			{ id: 'start', type: 'doc', name: '1. Start 🚀', shared: true, preview: true },
			{ id: 'install', type: 'doc', name: '2. Install app ⚡', shared: true, preview: true }
		])
	},
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
]);