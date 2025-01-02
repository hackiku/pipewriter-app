// src/lib/pages/app/stores/editorStore.ts
import { writable, derived } from 'svelte/store';
import { elementConfig } from '../config';
import type { Section, EditorState } from '../types';

export interface EditorStore {
	sections: Section[];
	activeSection: string | null;
	editingField: string | null;
	showAll: boolean;
}

const initialState: EditorStore = {
	sections: Object.values(elementConfig).map((config, index) => ({
		id: config.id,
		type: config.type,
		order: index,
		visible: index === 0, // Only hero visible initially
		content: config.defaultContent
	})),
	activeSection: null,
	editingField: null,
	showAll: false
};

function createEditorStore() {
	const { subscribe, set, update } = writable<EditorStore>(initialState);

	return {
		subscribe,

		// Section Management
		toggleSection: (id: string, visible?: boolean) => {
			update(state => ({
				...state,
				sections: state.sections.map(s =>
					s.id === id ? { ...s, visible: visible ?? !s.visible } : s
				)
			}));
		},

		toggleAllSections: (visible: boolean) => {
			update(state => ({
				...state,
				showAll: visible,
				sections: state.sections.map(s => ({ ...s, visible }))
			}));
		},

		reorderSections: (orderedIds: string[]) => {
			update(state => ({
				...state,
				sections: state.sections.map(section => ({
					...section,
					order: orderedIds.indexOf(section.id)
				}))
			}));
		},

		// Content Updates
		updateContent: (sectionId: string, field: string, value: any) => {
			update(state => ({
				...state,
				sections: state.sections.map(section =>
					section.id === sectionId
						? { ...section, content: { ...section.content, [field]: value } }
						: section
				)
			}));
		},

		// UI State
		setActiveSection: (sectionId: string | null) => {
			update(state => ({ ...state, activeSection: sectionId }));
		},

		setEditingField: (fieldId: string | null) => {
			update(state => ({ ...state, editingField: fieldId }));
		},

		reset: () => set(initialState)
	};
}

export const editorStore = createEditorStore();

// Derived stores
export const visibleSections = derived(editorStore, $store =>
	$store.sections
		.filter(s => s.visible)
		.sort((a, b) => a.order - b.order)
);

export const availableSections = derived(editorStore, $store =>
	$store.sections
		.filter(s => !s.visible)
		.sort((a, b) => a.order - b.order)
);