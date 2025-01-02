// src/lib/pages/app/config.ts
import type { ElementConfig } from './types';
import {
	LayoutTemplate,
	Type,
	Image,
	MessageSquare,
	ThumbsUp,
	MousePointer2
} from 'lucide-svelte';

export const elementConfig: ElementConfig[] = [
	{
		id: 'hero',
		type: 'hero',
		label: 'Hero',
		icon: LayoutTemplate,
		defaultContent: {
			eyebrow: "Type to prototype",
			headline: "Wireframes for Writers in Google Docs++"
		}
	},
	{
		id: 'features',
		type: 'features',
		label: 'Features',
		icon: Type,
		defaultContent: {
			title: "Features",
			items: []
		}
	},
	{
		id: 'image-left',
		type: 'media',
		label: 'Image + Text',
		icon: Image,
		defaultContent: {
			title: "Image Section",
			description: "Add your description"
		}
	},
	{
		id: 'testimonials',
		type: 'testimonials',
		label: 'Testimonials',
		icon: MessageSquare,
		defaultContent: {
			title: "What People Say",
			items: []
		}
	},
	{
		id: 'cta',
		type: 'cta',
		label: 'Call to Action',
		icon: MousePointer2,
		defaultContent: {
			headline: "Ready to start?",
			buttonText: "Get Started"
		}
	},
	{
		id: 'social-proof',
		type: 'social',
		label: 'Social Proof',
		icon: ThumbsUp,
		defaultContent: {
			title: "Trusted by",
			logos: []
		}
	}
];