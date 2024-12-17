// $lib/stores/earlyAccessStore.ts
import { writable } from 'svelte/store';

interface DrawerState {
	isOpen: boolean;
	source: string | null;
}

function createDrawerStore() {
	const { subscribe, set, update } = writable<DrawerState>({
		isOpen: false,
		source: null
	});

	return {
		subscribe,
		open: (source: string) => update(state => ({ isOpen: true, source })),
		close: () => update(state => ({ ...state, isOpen: false })),
		reset: () => set({ isOpen: false, source: null })
	};
}

export const drawerStore = createDrawerStore();