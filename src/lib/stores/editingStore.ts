// src/lib/stores/editingStore.ts
import { writable, derived } from 'svelte/store';

function createEditingStore() {
	const { subscribe, set, update } = writable({
		isEditing: false,
		activeElement: null as string | null
	});

	return {
		subscribe,
		startEditing: (elementId: string) => update(state => ({
			isEditing: true,
			activeElement: elementId
		})),
		stopEditing: () => update(state => ({
			isEditing: false,
			activeElement: null
		}))
	};
}

export const editingStore = createEditingStore();