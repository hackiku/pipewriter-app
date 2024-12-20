//src/lib/stores/demoStore.ts
import { writable, derived } from 'svelte/store';
import { demoContent as initialContent } from '$lib/pages/demo/data';
import { editingStore } from './editingStore';
import { initialSections } from '$lib/pages/demo/config';
import type { DemoSection, DemoContent } from '$lib/pages/demo/types';

interface StoreState {
	sections: DemoSection[];
	content: DemoContent;
	showAll: boolean;
}

const initialState: StoreState = {
	sections: initialSections,
	content: initialContent,
	showAll: false,
};


function createDemoStore() {
	const { subscribe, set, update } = writable<StoreState>(initialState);

	return {
		subscribe,

		toggleShowAll: () => update(state => {
			const newShowAll = !state.showAll;
			return {
				...state,
				sections: state.sections.map(section => ({
					...section,
					visible: newShowAll || section.visible
				}))
			};
		}),

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

		updateSectionOrder: (sections: DemoSection[]) =>
			update(state => ({
				...state,
				sections: sections
			})),

		getEditedContent: () => {
			let state: StoreState;
			subscribe(s => state = s)();
			return state.content;
		},

		reset: () => set(initialState)
	};
}

export const demoStore = createDemoStore();


export const formattedContent = derived(
	[demoStore],
	([$demo]) => {
		const visibleSections = $demo.sections
			.filter(s => s.visible)
			.sort((a, b) => a.order - b.order);

		return visibleSections
			.map(section => {
				switch (section.type) {
					case 'hero':
						return `${$demo.content.hero.headline}\n${$demo.content.hero.eyebrow}`;

					case 'product-blurbs':
						return $demo.content.products.features
							.map(f => `${f.multiplier}× ${f.tool.name}\n${f.description}`)
							.join('\n');

					case 'zigzag':
						const data = section.props.direction === 'left' ?
							$demo.content.zigzags.left : $demo.content.zigzags.right;
						return `${data.heading}\n${data.subheading}\n${data.description}`;

					case 'testimonials':
						return $demo.content.testimonials.cards
							.map(t => `${t.quote}\n— ${t.firstName} ${t.lastName}, ${t.role}`)
							.join('\n');

					case 'cta':
						return `${$demo.content.cta.headline}\n${$demo.content.cta.subheading}\n${$demo.content.cta.note}`;

					default:
						return '';
				}
			})
			.filter(Boolean)  // Remove empty sections
			.join('\n\n');  // Double newline between sections
	}
);