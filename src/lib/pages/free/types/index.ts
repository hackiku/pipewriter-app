// src/lib/pages/free/types/index.ts
import type { LucideIcon } from 'lucide-svelte';

export interface SectionContent {
	hero: {
		eyebrow: string;
		headline: string;
	};
	features: {
		headline: string;
		blurbs: Array<{
			emoji: string;
			title: string;
			description: string;
		}>;
	};
	testimonials: {
		headline: string;
		cards: Array<{
			firstName: string;
			lastName: string;
			role: string;
			quote: string;
			imgSrc: string;
		}>;
	};
	cta: {
		headline: string;
		subheading: string;
		buttonText: string;
		note?: string;
	};
}

export interface Section {
	id: string;
	type: keyof SectionContent;
	order: number;
	visible: boolean;
}

export interface ElementConfig {
	id: string;
	type: keyof SectionContent;
	label: string;
	icon: LucideIcon;
}

export interface EditorState {
	sections: Section[];
	content: SectionContent;
	activeSection: string | null;
	editingField: string | null;
}

export interface FreeState {
	showExportFormats: boolean;
	isSubscribed: boolean;
	selectedFormat: 'html' | 'docs' | 'markdown';
}