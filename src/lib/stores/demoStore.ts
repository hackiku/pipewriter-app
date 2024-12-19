//src/lib/stores/demoStore.ts
import { writable, derived } from 'svelte/store';
import { demoContent as initialContent } from '$lib/pages/demo/data';
import { editingStore } from './editingStore';
import { initialSections } from '$lib/pages/demo/config';
import type { DemoSection, DemoContent } from '$lib/pages/demo/types';

interface StoreState {
	sections: DemoSection[];
	content: DemoContent;
}

const initialState: StoreState = {
	sections: initialSections,
	content: initialContent
};

function createDemoStore() {
	const { subscribe, set, update } = writable<StoreState>(initialState);

	return {
		subscribe,

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

// Enhanced formatted content for TextEditor
// src/lib/stores/demoStore.ts
export const formattedContent = derived(
  [demoStore, editingStore],
  ([$demo, $editing]) => {
    const content = $demo.content;
    const visibleSections = $demo.sections
      .filter(s => s.visible)
      .sort((a, b) => a.order - b.order);

    const formatSection = (section: DemoSection): string[] => {
      const isBeingEdited = $editing.activeElement?.startsWith(section.id);
      const wrap = (text: string) => isBeingEdited ?
        `<span class="highlight">${text}</span>` : text;

      switch (section.type) {
        case 'product-blurbs':
          return [
            wrap('## What You Get'),
            ...content.products.features.map(feature =>
              `${feature.multiplier}× ${feature.tool.name}\n${feature.description}`
            )
          ];

        case 'blurbs':
          return [
            wrap(`## ${content.features.headline}`),
            ...content.features.blurbs.map(blurb =>
              `### ${blurb.emoji} ${blurb.title}\n${blurb.description}`
            )
          ];

        case 'zigzag':
          const data = section.props.direction === 'left' ? 
            content.zigzags.left : content.zigzags.right;
          return [
            wrap(`## ${data.heading}`),
            `### ${data.subheading}`,
            data.description
          ];

        case 'testimonials':
          return [
            wrap(`## ${content.testimonials.headline}`),
            ...content.testimonials.cards.map(card =>
              `> "${card.quote}"\n> — ${card.firstName} ${card.lastName}, ${card.role}`
            )
          ];

        case 'cta':
          return [
            wrap(`## ${content.cta.headline}`),
            content.cta.subheading,
            '',
            '_' + content.cta.note + '_'
          ];

        default:
          return [];
      }
    };

    return visibleSections
      .map(section => formatSection(section).join('\n'))
      .join('\n\n');
  }
);