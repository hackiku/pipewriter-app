// src/lib/stores/earlyAccessStore.ts
import { writable } from 'svelte/store';

interface DrawerState {
	isOpen: boolean;
	source: string | null;
	lastInteraction?: Date;
	previousSources: string[];
}

const initialState: DrawerState = {
	isOpen: false,
	source: null,
	previousSources: []
};

function createDrawerStore() {
	const { subscribe, set, update } = writable<DrawerState>(initialState);

	return {
		subscribe,

		// Open drawer with tracking
		open: (source: string) => update(state => ({
			isOpen: true,
			source,
			lastInteraction: new Date(),
			previousSources: [...state.previousSources, source]
		})),

		// Close drawer but maintain source history
		close: () => update(state => ({
			...state,
			isOpen: false,
			lastInteraction: new Date()
		})),

		// Complete reset (useful for cleanup)
		reset: () => set(initialState),

		// Get interaction history (useful for analytics)
		getHistory: () => {
			let state: DrawerState;
			subscribe(s => state = s)();
			return state.previousSources;
		},

		// Analytics helper
		getLastSource: () => {
			let state: DrawerState;
			subscribe(s => state = s)();
			return state.source;
		}
	};
}

export const drawerStore = createDrawerStore();