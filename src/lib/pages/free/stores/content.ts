// src/lib/pages/app/stores/content.ts

import { writable, derived } from 'svelte/store';
import type { Section, EditorState } from '../types';
import { elementConfig } from '../config';

const initialState: EditorState = {
	sections: [{
		id: 'hero',
		type: 'hero',
		order: 0,
		visible: true,
		content: elementConfig.find(e => e.id === 'hero')?.defaultContent || {}
	}],
	activeSection: null,
	editingField: null,
	showAll: false,
};

function createEditorStore() {
	const { subscribe, set, update } = writable<EditorState>(initialState);

	return {
		subscribe,

		// Section Management
		addSection: (type: string, afterId: string | null) => {
			update(state => {
				const config = elementConfig.find(e => e.id === type);
				if (!config) return state;

				const newSection = {
					id: `${type}-${Date.now()}`,
					type: config.type,
					order: state.sections.length,
					visible: true,
					content: { ...config.defaultContent }
				};

				const sections = [...state.sections];
				if (afterId) {
					const index = sections.findIndex(s => s.id === afterId);
					if (index !== -1) {
						sections.splice(index + 1, 0, newSection);
					}
				} else {
					sections.push(newSection);
				}

				return { ...state, sections };
			});
		},

		// Content Updates
		updateContent: (sectionId: string, field: string, value: any) => {
			update(state => {
				const sections = state.sections.map(section => {
					if (section.id === sectionId) {
						return {
							...section,
							content: { ...section.content, [field]: value }
						};
					}
					return section;
				});
				return { ...state, sections };
			});
		},

		// UI State
		setActiveSection: (sectionId: string | null) => {
			update(state => ({ ...state, activeSection: sectionId }));
		},

		setEditingField: (fieldId: string | null) => {
			update(state => ({ ...state, editingField: fieldId }));
		},

		toggleShowAll: () => {
			update(state => ({
				...state,
				showAll: !state.showAll,
				sections: state.sections.map(s => ({
					...s,
					visible: !state.showAll || s.visible
				}))
			}));
		},

		reset: () => set(initialState)
	};
}

export const editorStore = createEditorStore();

// Derived store for formatted content export
export const formattedContent = derived(editorStore, $store => {
	return $store.sections
		.filter(s => s.visible)
		.sort((a, b) => a.order - b.order)
		.map(section => formatSectionContent(section))
		.filter(Boolean)
		.join('\n\n');
});

function formatSectionContent(section: Section): string {
	// Implementation based on section type
	return '';  // Placeholder
}