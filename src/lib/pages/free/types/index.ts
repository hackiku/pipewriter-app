// src/lib/pages/free/types/index.ts

export type ElementType =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'text'
	| 'button'
	| 'quote'
	| 'label'
	| 'emoji'
	| 'image';

export interface ContentElement {
	type: ElementType;
	value: string;
	path: string[];
	metadata?: {
		placeholder?: string;
		required?: boolean;
		className?: string;
	};
}

export interface ContentSection {
	id: string;
	elements: ContentElement[];
	children?: Array<{
		id: string;
		elements: ContentElement[];
	}>;
}

export interface ContentStructure {
	sections: ContentSection[];
}