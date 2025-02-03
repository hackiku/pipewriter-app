// src/lib/pages/landing/data/folders.ts

export interface Preview {
	emoji: string;
	title: string;
	description: string;
	shoutout?: string;  // Link to corresponding testimonial
	order?: number;         // Display order in preview
}

export interface DriveNode {
	path: string;          // Full path like 'samples/Corpo.gdoc'
	type: 'folder' | 'doc';
	name: string;
	preview?: Preview;     // Only for previewable items
	children?: DriveNode[]; // For folders
	interactive?: boolean;
}

export const driveRoot: DriveNode = {
	path: '/',
	type: 'folder',
	name: 'Pipewriter',
	children: [
		{
			path: '/samples',
			type: 'folder',
			name: 'samples',
			interactive: true,
			children: [
				{
					path: '/samples/Corpo.gdoc',
					type: 'doc',
					name: 'Corpo.gdoc',
				},
				{
					path: '/samples/SaaS.gdoc',
					type: 'doc',
					name: 'SaaS.gdoc',
				}
			]
		},
		{
			path: '/code',
			type: 'folder',
			name: 'code',
			interactive: true,
			children: [
				{
					path: '/code/Prompt.gdoc',
					type: 'doc',
					name: 'Prompt.gdoc'
				},
				{
					path: '/code/index.html',
					type: 'doc',
					name: 'index.html',
					interactive: true,
					preview: {
						emoji: "🎯",
						title: "Live Preview",
						description: "See changes in real-time as you type",
						shoutout: "See changes in real-time as you type",
						order: 4,
					}
				}
			]
		},
		{
			path: '/App.gdoc',
			type: 'doc',
			name: 'App.gdoc',
			interactive: true,
			preview: {
				emoji: "📱",
				title: "Sidebar App",
				description: "Click drop elements",
				shoutout: "writer1",
				order: 1
			}
		},
		{
			path: '/Darkmode.gdoc',
			type: 'doc',
			name: 'Darkmode.gdoc',
			interactive: true,
			preview: {
				emoji: "🌗",
				title: "Theming",
				description: "Text styles auto-update and color mode",
				shoutout: "writer3",
				order: 3
			}
		},
		{
			path: '/Elements.gdoc',
			type: 'doc',
			name: 'Elements.gdoc',
			interactive: true,
			preview: {
				emoji: "🎨",
				title: "90+ UI Elements",
				description: "Copy-paste components for rapid prototyping",
				shoutout: "writer2",
				order: 2,
			}
		}
	]
};

// Helper functions
export function getNodeByPath(path: string): DriveNode | null {
	if (path === '/') return driveRoot;

	const parts = path.split('/').filter(Boolean);
	let current = driveRoot;

	for (const part of parts) {
		current = current.children?.find(node => node.name === part) || null;
		if (!current) return null;
	}

	return current;
}

export function getParentPath(path: string): string {
	if (path === '/') return '';
	const parts = path.split('/');
	return parts.slice(0, -1).join('/') || '/';
}

export function getBreadcrumbs(path: string): string[] {
	return ['My Drive', 'Pipewriter', ...path.split('/').filter(Boolean)];
}