// src/lib/(space)/stores/spaceStore.ts

// src / lib / pages / space / stores / spaceStore.ts-- >
import { writable } from 'svelte/store';

interface SpaceState {
	activeProductIndex: number;
	previousProductIndex: number | null;
}

function createSpaceStore() {
	const { subscribe, set, update } = writable<SpaceState>({
		activeProductIndex: 0,
		previousProductIndex: null
	});

	return {
		subscribe,
		setActiveProduct: (index: number | null) => update(state => ({
			previousProductIndex: state.activeProductIndex,
			activeProductIndex: index ?? 0
		})),
		reset: () => set({
			activeProductIndex: 0,
			previousProductIndex: null
		})
	};
}

export const spaceStore = createSpaceStore();