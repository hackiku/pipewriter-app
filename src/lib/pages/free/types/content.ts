// src/lib/pages/free/types/content.ts

export type ElementType = 'h1' | 'h2' | 'h3' | 'text' | 'button' | 'quote' | 'label' | 'emoji' | 'image';

// Just content, no order/structure
export interface ContentField {
	id: string;               // e.g., "hero.headline"
	type: ElementType;
	value: string;
	path: string[];          // For backward compatibility
	metadata?: {
		placeholder?: string;
		required?: boolean;
		className?: string;
	};
}

export interface SectionContent {
	id: string;              // e.g., "hero", "features"
	elements: ContentField[];
	subsections?: {
		id: string;
		elements: ContentField[];
	}[];
}

// Separate content from structure
export interface ContentData {
	sections: Record<string, SectionContent>;  // Keyed by section ID
}

// Layout/Structure management
export interface PageSection {
	id: string;              // Matches section ID in ContentData 
	type: string;           // For rendering the right component
	visible: boolean;
	order: number;          // For display order
}

export interface PageStructure {
	sections: PageSection[];
	defaultSections: string[];  // IDs of sections to show by default
}