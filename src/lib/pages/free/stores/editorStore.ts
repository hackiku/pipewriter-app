// src/lib/pages/free/stores/editorStore.ts

import { writable, derived } from 'svelte/store';
import type { EditorState, Section, SectionContent } from '../types';
import { defaultContent } from '../data/default';

const initialState: EditorState = {
	sections: [],
	content: defaultContent,
	activeSection: null,
	editingField: null
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
		addSection: (type: keyof SectionContent, order?: number) => {
			update(state => {
				const newSection: Section = {
					id: `${type}-${Date.now()}`,
					type,
					order: order ?? state.sections.length,
					visible: true
				};

				return {
					...state,
					sections: [...state.sections, newSection].sort((a, b) => a.order - b.order)
				};
			});
		},

		removeSection: (id: string) => {
			update(state => ({
				...state,
				sections: state.sections.filter(s => s.id !== id)
			}));
		},

		reset: () => set(initialState)
	};
}

export const editorStore = createEditorStore();

// Derived stores for sections
export const visibleSections = derived(editorStore,
	$store => $store.sections.filter(s => s.visible).sort((a, b) => a.order - b.order)
);