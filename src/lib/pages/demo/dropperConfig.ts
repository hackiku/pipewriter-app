// lib/pages/demo/dropperConfig.ts

import type { ElementObject } from "$lib/iframe/elements";
import { elements } from "$lib/iframe/elements";

export const sectionToElement: Record<string, string> = {
	'hero': 'hero',
	'zigzag-right': 'zz-right',
	'zigzag-left': 'zz-left',
	'blurbs': 'blurbs-3',
	'testimonials': 'cards-2-center',
	'cta': 'button-secondary-left',
	// 'zigzag-right': 'zz-right'
};

export const activeElements = Object.values(elements)
	.filter(el => !el.id.startsWith('container-') && !el.id.startsWith('background-'))
	.filter(el => !el.id.includes('-dark'))
	.sort((a, b) => {
		// Prioritize our main elements
		const isMainA = Object.values(sectionToElement).includes(a.id);
		const isMainB = Object.values(sectionToElement).includes(b.id);
		if (isMainA && !isMainB) return -1;
		if (!isMainA && isMainB) return 1;
		return 0;
	});
