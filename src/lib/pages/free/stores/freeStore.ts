// src/lib/pages/free/stores/freeStore.ts

import { writable, derived } from 'svelte/store';
import { elementConfig } from '../config';
import type { Section, FreeState } from '../types';

const initialState: FreeState = {
	sections: elementConfig.map((config, index) => ({
		id: config.id,
		type: config.type,
		order: index,
		visible: index === 0,
		content: config.defaultContent
	})),
	activeSection: null,
	editingField: null,
	showAll: false
};

function createFreeStore() {
	const { subscribe, set, update } = writable<FreeState>(initialState);

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

		// Content Updates
		updateContent: (sectionId: string, fieldId: string, value: any) => {
			update(state => ({
				...state,
				sections: state.sections.map(section =>
					section.id === sectionId
						? { ...section, content: { ...section.content, [fieldId]: value } }
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

		toggleShowAll: () => {
			update(state => ({
				...state,
				showAll: !state.showAll,
				sections: state.sections.map(s => ({ ...s, visible: !state.showAll }))
			}));
		},

		reset: () => set(initialState)
	};
}

export const freeStore = createFreeStore();

// Derived stores
export const visibleSections = derived(freeStore, $store =>
	$store.sections
		.filter(s => s.visible)
		.sort((a, b) => a.order - b.order)
);

export const availableSections = derived(freeStore, $store =>
	$store.sections
		.filter(s => !s.visible)
		.sort((a, b) => a.order - b.order)
);