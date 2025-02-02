// src/lib/pages/landing/data/folders.ts

export interface Preview {
	emoji: string;
	title: string;
	description: string;
}

export interface DriveNode {
	path: string;          // Full path like 'samples/Corpo.gdoc'
	type: 'folder' | 'doc';
	name: string;
	preview?: Preview;     // Only for previewable items
	children?: DriveNode[]; // For folders
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
			children: [
				{
					path: '/samples/Corpo.gdoc',
					type: 'doc',
					name: 'Corpo.gdoc',
					preview: {
						emoji: "📱",
						title: "Corporate Components",
						description: "Enterprise-ready UI kit for business apps"
					}
				},
				{
					path: '/samples/SaaS.gdoc',
					type: 'doc',
					name: 'SaaS.gdoc',
					preview: {
						emoji: "⚡",
						title: "SaaS Landing",
						description: "Start with proven conversion templates"
					}
				}
			]
		},
		{
			path: '/code',
			type: 'folder',
			name: 'code',
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
					preview: {
						emoji: "🎯",
						title: "Live Preview",
						description: "See changes in real-time as you type"
					}
				}
			]
		},
		{
			path: '/App.gdoc',
			type: 'doc',
			name: 'App.gdoc',
			preview: {
				emoji: "📱",
				title: "App Builder",
				description: "Design complete applications in Google Docs"
			}
		},
		{
			path: '/Darkmode.gdoc',
			type: 'doc',
			name: 'Darkmode.gdoc',
			preview: {
				emoji: "🌗",
				title: "Dark Mode Built-in",
				description: "Switch themes with one click"
			}
		},
		{
			path: '/Elements.gdoc',
			type: 'doc',
			name: 'Elements.gdoc',
			preview: {
				emoji: "🎨",
				title: "90+ UI Elements",
				description: "Copy-paste components for rapid prototyping"
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