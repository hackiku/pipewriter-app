// src/lib/data/tools/types.ts

export interface Tool {
	name: string;
	icon: string;
	fallback: string;
	url: string;
	description: string;
	category: ToolCategory;
	tags?: string[];
}

export type ToolCategory =
	| 'framework'
	| 'library'
	| 'cms'
	| 'design'
	| 'language'
	| 'ai'
	| 'productivity';

export type ToolId = keyof typeof tools;
