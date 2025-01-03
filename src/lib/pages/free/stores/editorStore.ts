// src/lib/pages/free/stores/editorStore.ts
import { writable, derived } from 'svelte/store';
import type { Section } from '../types';
import { elementConfig } from '../config';
import { contentStore } from './contentStore';
import { get } from 'svelte/store';
import { initialContent } from '../data/content';

interface EditorState {
	sections: Section[];
	activeSection: string | null;
	editingField: string | null;
	showAll: boolean;
}

const initialState: EditorState = {
	sections: [],
	activeSection: null,
	editingField: null,
	showAll: false
};

function createEditorStore() {
	const { subscribe, set, update } = writable<EditorState>(initialState);

	return {
		subscribe,

		addSection: (elementId: string) => {
			update(state => {
				// Check if section already exists
				const existingSection = state.sections.find(s => s.id === elementId);
				if (existingSection) {
					return {
						...state,
						sections: state.sections.map(s =>
							s.id === elementId ? { ...s, visible: true } : s
						),
						activeSection: elementId
					};
				}

				// Get section config
				const config = elementConfig.find(e => e.id === elementId);
				if (!config) return state;

				// Get initial content for this section
				const sectionContent = initialContent.sections.find(s => s.id === elementId);
				if (!sectionContent) return state;

				// Add section to contentStore if not already present
				const currentContent = get(contentStore);
				if (!currentContent.content.sections.find(s => s.id === elementId)) {
					contentStore.update(store => ({
						...store,
						content: {
							...store.content,
							sections: [...store.content.sections, sectionContent]
						}
					}));
				}

				// Add section to editorStore
				const newSection: Section = {
					id: elementId,
					type: config.type,
					order: state.sections.length,
					visible: true
				};

				return {
					...state,
					sections: [...state.sections, newSection].sort((a, b) => a.order - b.order),
					activeSection: elementId
				};
			});
		},

		removeSection: (id: string) => {
			update(state => ({
				...state,
				sections: state.sections.filter(s => s.id !== id),
				activeSection: state.activeSection === id ? null : state.activeSection
			}));
		},

		setActiveSection: (sectionId: string | null) => {
			update(state => ({ ...state, activeSection: sectionId }));
		},

		setEditingField: (fieldId: string | null) => {
			update(state => ({ ...state, editingField: fieldId }));
		},

		toggleShowAll: () => {
			update(state => {
				const showAll = !state.showAll;

				if (showAll) {
					// Add all sections
					elementConfig.forEach(config => {
						this.addSection(config.id);
					});
				}

				return { ...state, showAll };
			});
		},

		reset: () => {
			contentStore.reset();
			set(initialState);
		}
	};
}

export const editorStore = createEditorStore();

export const visibleSections = derived(editorStore,
	$store => $store.sections.filter(s => s.visible).sort((a, b) => a.order - b.order)
);

export const availableSections = derived(editorStore,
	$store => elementConfig
		.filter(config => !$store.sections.some(s => s.id === config.id && s.visible))
		.map(config => ({
			id: config.id,
			type: config.type,
			order: config.order,
			visible: false
		}))
);