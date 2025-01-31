// src/lib/pages/landing/data/folders.ts
import type { Folder, FileItem } from '../types';

export interface DriveItem {
	id: string;
	type: 'folder' | 'doc';
	name: string;
	shared?: boolean;
	preview?: boolean;  // Whether this item triggers a preview
	items?: DriveItem[];  // For folders
}

export const driveContents: DriveItem[] = [
	{
		id: 'samples',
		type: 'folder',
		name: 'samples',
		preview: true,
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
		items: [
			{ id: 'start', type: 'doc', name: '1. Start 🚀', shared: true, preview: true },
			{ id: 'install', type: 'doc', name: '2. Install app ⚡', shared: true, preview: true }
		]
	},
	{
		id: 'elements',
		type: 'doc',
		name: 'Elements 🎨',
		shared: true,
		preview: true
	},
	{
		id: 'darkmode',
		type: 'doc',
		name: 'Darkmode 🌒',
		shared: true,
		preview: true
	},
	{
		id: 'blank',
		type: 'doc',
		name: 'Blank ⚪',
		shared: true
	}
];