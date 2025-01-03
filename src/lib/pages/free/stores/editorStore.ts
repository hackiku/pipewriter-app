// src/lib/pages/free/stores/editorStore.ts

import { writable, derived } from 'svelte/store';
import type { EditorState, Section, SectionContent } from '../types';
import { defaultContent } from '../data/default';
import { elementConfig } from '../config';

const initialState: EditorState = {
	sections: [],
	content: defaultContent,
	activeSection: null,
	editingField: null,
	showAll: false
};

function createEditorStore() {
	const { subscribe, set, update } = writable<EditorState>(initialState);

	return {
		subscribe,

		// Content Management
		updateContent: (path: string[], value: string) => {
			update(state => {
				let current = { ...state.content } as any;
				const lastKey = path.pop()!;

				for (const key of path) {
					current = current[key];
				}
				current[lastKey] = value;

				return { ...state, content: current };
			});
		},

		// Section Management
		addSection: (elementId: string, order?: number) => {
			update(state => {
				const config = elementConfig.find(e => e.id === elementId);
				if (!config) return state;

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

				const newSection: Section = {
					id: elementId,
					type: config.type,
					order: order ?? state.sections.length,
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

		// UI State
		setActiveSection: (sectionId: string | null) => {
			update(state => ({ ...state, activeSection: sectionId }));
		},

		setEditingField: (fieldId: string | null) => {
			update(state => ({ ...state, editingField: fieldId }));
		},

		toggleShowAll: () => {
			update(state => {
				const showAll = !state.showAll;
				const sections = elementConfig.map((config, index) => ({
					id: config.id,
					type: config.type,
					order: index,
					visible: showAll
				}));

				return {
					...state,
					showAll,
					sections: showAll ? sections : sections.filter(s => s.id === 'hero')
				};
			});
		},

		reset: () => set(initialState)
	};
}

export const editorStore = createEditorStore();

// Derived stores for sections
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