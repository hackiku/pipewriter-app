// src/lib/pages/app/stores/content.ts
import { writable, derived } from 'svelte/store';
import type { SectionType, Section, EditorState } from '../types';

const initialState: EditorState = {
	sections: [
		{
			id: 'hero',
			type: 'hero',
			visible: true,
			order: 0,
			content: {
				eyebrow: "Type to prototype",
				headline: "Wireframes for Writers in Google Docs++"
			}
		}
	],
	activeSection: null,
	editingField: null
};

function createEditorStore() {
	const { subscribe, set, update } = writable<EditorState>(initialState);

	return {
		subscribe,
		reset: () => set(initialState),
		updateContent: (sectionId: string, field: string, value: any) => {
			update(state => {
				const section = state.sections.find(s => s.id === sectionId);
				if (section) {
					section.content[field] = value;
				}
				return state;
			});
		},
		setActiveSection: (sectionId: string | null) => {
			update(state => ({ ...state, activeSection: sectionId }));
		},
		setEditingField: (fieldId: string | null) => {
			update(state => ({ ...state, editingField: fieldId }));
		}
	};
}

export const editorStore = createEditorStore();