// src/lib/pages/free/stores/contentStore.ts
import { writable, derived } from 'svelte/store';
import { initialContent } from '../data/content';
import type { ContentStructure, ContentElement } from '../types';

interface ContentState {
	content: ContentStructure;
	ui: {
		activeSection: string | null;
		editingField: string | null;
	};
}

const initialState: ContentState = {
	content: initialContent,
	ui: {
		activeSection: null,
		editingField: null
	}
};

function createContentStore() {
	const { subscribe, set, update } = writable<ContentState>(initialState);

	return {
		subscribe,

		// Update specific content field
		updateField: (path: string[], value: string) => {
			update(state => {
				const [sectionId, ...elementPath] = path;
				const newContent = { ...state.content };

				const section = newContent.sections.find(s => s.id === sectionId);
				if (!section) return state;

				// Helper to find and update element
				const updateElement = (elements: ContentElement[], path: string[]): boolean => {
					for (let i = 0; i < elements.length; i++) {
						if (elements[i].path.join('.') === path.join('.')) {
							elements[i] = { ...elements[i], value };
							return true;
						}
					}
					return false;
				};

				// Try to update main section elements
				let updated = updateElement(section.elements, path);

				// If not found, try children
				if (!updated && section.children) {
					for (const child of section.children) {
						updated = updateElement(child.elements, path);
						if (updated) break;
					}
				}

				return {
					...state,
					content: newContent
				};
			});
		},

		// UI State management
		setActiveSection: (sectionId: string | null) => {
			update(state => ({
				...state,
				ui: { ...state.ui, activeSection: sectionId }
			}));
		},

		setEditingField: (fieldId: string | null) => {
			update(state => ({
				...state,
				ui: { ...state.ui, editingField: fieldId }
			}));
		},

		reset: () => set(initialState)
	};
}

export const contentStore = createContentStore();

// Helper for getting specific field value
export function getFieldValue(content: ContentStructure, path: string[]): string {
	const [sectionId, ...elementPath] = path;
	const section = content.sections.find(s => s.id === sectionId);
	if (!section) return '';

	// Search in main elements
	let element = section.elements.find(e => e.path.join('.') === path.join('.'));

	// If not found, search in children
	if (!element && section.children) {
		for (const child of section.children) {
			element = child.elements.find(e => e.path.join('.') === path.join('.'));
			if (element) break;
		}
	}

	return element?.value || '';
}