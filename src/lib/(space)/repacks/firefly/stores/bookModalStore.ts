// src/lib/(space)/repacks/firefly/stores/bookModalStore.ts
import { writable } from 'svelte/store';

function createBookModalStore() {
	const initialState = false;
	const { subscribe, set } = writable(initialState);

	return {
		subscribe,
		open: () => set(true),
		close: () => set(false),
		reset: () => set(initialState)
	};
}

export const bookModalStore = createBookModalStore();