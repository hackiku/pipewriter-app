// src/lib/pages/free/config.ts
import type { ElementConfig } from './types';
import {
	LayoutTemplate,
	Type,
	Image,
	MessageSquare,
	ThumbsUp,
	MousePointer2,
	Video
} from 'lucide-svelte';

// Default visible sections on page load
export const defaultVisibleSections = ['hero', 'features', 'video', 'cta'];

// Available section configurations
export const elementConfig: ElementConfig[] = [
	{
		id: 'hero',
		type: 'hero',
		label: 'Hero',
		description: 'Main landing section with headline and subhead',
		icon: LayoutTemplate,
		preview: '/elements/hero.svg'
	},
	{
		id: 'features',
		type: 'features',
		label: 'Features',
		description: 'Feature blocks with icons and descriptions',
		icon: Type,
		preview: '/elements/blurbs-3.svg',
	},
	{
		id: 'testimonials',
		type: 'testimonials',
		label: 'Testimonials',
		description: 'Customer testimonials and reviews',
		icon: MessageSquare,
		preview: '/elements/cards-3.svg'
	},
	{
		id: 'cta',
		type: 'cta',
		label: 'Call to Action',
		description: 'Convert visitors with a strong CTA',
		icon: MousePointer2,
		preview: '/elements/buttons-2-center.svg'
	},
	{
		id: 'social-proof',
		type: 'social',
		label: 'Social Proof',
		description: 'Show off your customer logos and metrics',
		icon: ThumbsUp,
		preview: '/elements/cards-2.svg'
	},
	{
		id: 'zigzag-left',
		type: 'zigzag-left',
		label: 'Zigzag Left',
		description: 'Alternating content layout - image left',
		icon: Image,
		preview: '/elements/zz-left.svg'
	},
	{
		id: 'zigzag-right',
		type: 'zigzag-right',
		label: 'Zigzag Right',
		description: 'Alternating content layout - image right',
		icon: Image,
		preview: '/elements/zz-right.svg'
	},
	{
		id: 'video',
		type: 'video',
		label: 'Video Section',
		description: 'Embed a video with supporting text',
		icon: Video,
		preview: '/elements/background-empty.svg'
	}
];