// src/lib/pages/free/data/content.ts

import { writable, derived } from 'svelte/store';
import { elementConfig } from '../config';
import type { Section } from '../types';

function createSectionsStore() {
	const { subscribe, set, update } = writable<Section[]>([
		{
			id: 'hero',
			type: 'hero',
			order: 0,
			visible: true,
			content: elementConfig.find(e => e.id === 'hero')?.defaultContent || {}
		}
	]);

	return {
		subscribe,

		addSection: (type: string, afterId: string | null) => {
			update(sections => {
				const config = elementConfig.find(e => e.id === type);
				if (!config) return sections;

				const newSection: Section = {
					id: `${type}-${Date.now()}`,
					type: config.type,
					order: sections.length,
					visible: true,
					content: { ...config.defaultContent }
				};

				if (afterId) {
					const index = sections.findIndex(s => s.id === afterId);
					if (index !== -1) {
						return [
							...sections.slice(0, index + 1),
							newSection,
							...sections.slice(index + 1)
						];
					}
				}

				return [...sections, newSection];
			});
		},

		updateSection: (id: string, updates: Partial<Section>) => {
			update(sections =>
				sections.map(s => s.id === id ? { ...s, ...updates } : s)
			);
		},

		reorder: (orderedIds: string[]) => {
			update(sections => {
				const newSections = [...sections];
				orderedIds.forEach((id, index) => {
					const section = newSections.find(s => s.id === id);
					if (section) section.order = index;
				});
				return newSections;
			});
		}
	};
}

export const sectionsStore = createSectionsStore();

// Derived store for visible sections in order
export const visibleSections = derived(sectionsStore, $sections =>
	$sections
		.filter(s => s.visible)
		.sort((a, b) => a.order - b.order)
);