// src/lib/pages/free/config.ts
import type { ElementConfig } from './types';
import {
	LayoutTemplate,
	Type,
	Image,
	MessageSquare,
	ThumbsUp,
	MousePointer2
} from 'lucide-svelte';

// Sections that should be visible when the page loads
export const defaultVisibleSections = ['hero', 'features', 'cta'];

// Available section configurations
export const elementConfig: ElementConfig[] = [
	{
		id: 'hero',
		type: 'hero',
		label: 'Hero',
		icon: LayoutTemplate
	},
	{
		id: 'features',
		type: 'features',
		label: 'Features',
		icon: Type
	},
	{
		id: 'image-left',
		type: 'media',
		label: 'Image + Text',
		icon: Image
	},
	{
		id: 'testimonials',
		type: 'testimonials',
		label: 'Testimonials',
		icon: MessageSquare
	},
	{
		id: 'cta',
		type: 'cta',
		label: 'Call to Action',
		icon: MousePointer2
	},
	{
		id: 'social-proof',
		type: 'social',
		label: 'Social Proof',
		icon: ThumbsUp
	}
];