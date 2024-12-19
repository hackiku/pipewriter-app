// src/lib/stores/demoStore.ts
import { writable, derived } from 'svelte/store';
import { demoContent as initialContent } from '$lib/pages/demo/data';
import type { tools } from '$lib/data/assets/tools';

interface ProductFeature {
	multiplier: number;
	tool: typeof tools[keyof typeof tools];
	description: string;
}

interface DemoState {
	visibleSections: {
		features: boolean;
		productFeatures: boolean;
		blurbs: boolean;
		zigZagLeft: boolean;
		zigZagRight: boolean;
		testimonials: boolean;
		cta: boolean;
	};

	content: {
		hero: {
			eyebrow: string;
			headline: string;
		};
		products: {
			headline: string;
			features: ProductFeature[];
		};
		features: {
			headline: string;
			blurbs: {
				emoji: string;
				title: string;
				description: string;
			}[];
		};
		zigzags: {
			left: {
				heading: string;
				subheading: string;
				description: string;
			};
			right: {
				heading: string;
				subheading: string;
				description: string;
			};
		};
		testimonials: {
			headline: string;
			cards: {
				firstName: string;
				lastName: string;
				role: string;
				quote: string;
				imgSrc: string;
			}[];
		};
		cta: {
			headline: string;
			subheading: string;
			buttonText: string;
			note: string;
		};
	};
}

function createDemoStore() {
	const initialState: DemoState = {
		visibleSections: {
			features: true,
			productFeatures: true,
			blurbs: false,
			zigZagLeft: false,
			zigZagRight: false,
			testimonials: false,
			cta: true
		},
		content: initialContent
	};

	const { subscribe, set, update } = writable<DemoState>(initialState);

	return {
		subscribe,

		showSection: (section: keyof DemoState['visibleSections']) =>
			update(state => ({
				...state,
				visibleSections: {
					...state.visibleSections,
					[section]: true
				}
			})),

		updateContent: (path: string[], value: string) =>
			update(state => {
				let current = state.content as any;
				const lastKey = path.pop()!;

				for (const key of path) {
					current = current[key];
				}
				current[lastKey] = value;

				return state;
			}),

		getEditedContent: () => {
			let state: DemoState;
			subscribe(s => state = s)();
			return state.content;
		},

		reset: () => set(initialState)
	};
}

export const demoStore = createDemoStore();

// Complete formatted content for the FreeForm component
export const formattedContent = derived(demoStore, ($demo) => {
	const content = $demo.content;

	return [
		// Hero section
		`# ${content.hero.headline}`,
		content.hero.eyebrow,
		'',
		// Product features section
		'## What You Get',
		...content.products.features.map(feature =>
			`${feature.multiplier}× ${feature.tool.name}\n${feature.description}`
		),
		'',
		// Features section
		`## ${content.features.headline}`,
		...content.features.blurbs.map(blurb =>
			`### ${blurb.emoji} ${blurb.title}\n${blurb.description}`
		),
		'',
		// ZigZag sections
		`## ${content.zigzags.left.heading}`,
		`### ${content.zigzags.left.subheading}`,
		content.zigzags.left.description,
		'',
		`## ${content.zigzags.right.heading}`,
		`### ${content.zigzags.right.subheading}`,
		content.zigzags.right.description,
		'',
		// Testimonials
		`## ${content.testimonials.headline}`,
		...content.testimonials.cards.map(card =>
			`> "${card.quote}"\n> — ${card.firstName} ${card.lastName}, ${card.role}`
		),
		'',
		// CTA
		`## ${content.cta.headline}`,
		content.cta.subheading,
		'',
		'_' + content.cta.note + '_'
	].join('\n');
});