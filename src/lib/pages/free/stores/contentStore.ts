// src/lib/pages/free/stores/contentStore.ts
import { writable, derived } from 'svelte/store';
import { initialContent, type SectionContent } from '../data/content';

interface ContentState {
	original: SectionContent;
	changes: Partial<{ [K in keyof SectionContent]: Partial<SectionContent[K]> }>;
	ui: {
		activeSection: string | null;
		editingField: string | null;
	};
}

const initialState: ContentState = {
	original: initialContent,
	changes: {},
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
				const [section, ...rest] = path;
				const changes = { ...state.changes };

				// Initialize section if it doesn't exist in changes
				if (!changes[section]) {
					changes[section] = {};
				}

				// Handle nested updates
				let current = changes[section];
				const lastKey = rest[rest.length - 1];

				for (let i = 0; i < rest.length - 1; i++) {
					const key = rest[i];
					if (!current[key]) {
						current[key] = {};
					}
					current = current[key];
				}
				current[lastKey] = value;

				return {
					...state,
					changes
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

// Derived store for actual content merging original with changes
export const currentContent = derived(contentStore, $store => {
	const merged = { ...$store.original };

	// Merge changes into original content
	Object.entries($store.changes).forEach(([section, changes]) => {
		merged[section] = {
			...merged[section],
			...changes
		};
	});

	return merged;
});

// Helper for getting specific field value
export function getFieldValue(content: SectionContent, path: string[]): string {
	let current: any = content;
	for (const key of path) {
		if (!current?.[key]) return '';
		current = current[key];
	}
	return current?.toString() || '';
}