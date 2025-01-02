// $lib/stores/spaceDrawerStore.ts -- >
import { writable } from 'svelte/store';

interface DrawerState {
	isOpen: boolean;
	source: string;
}

function createDrawerStore() {
	const { subscribe, set, update } = writable<DrawerState>({
		isOpen: false,
		source: ''
	});

	return {
		subscribe,
		open: (source: string) => update(state => ({ ...state, isOpen: true, source })),
		close: () => update(state => ({ ...state, isOpen: false })),
		reset: () => set({ isOpen: false, source: '' })
	};
}

export const spaceDrawerStore = createDrawerStore();