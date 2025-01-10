// src/lib/pages/space/stores/spaceStore.ts
import { writable } from 'svelte/store';

interface SpaceState {
	scrollY: number;
	parallaxOffset: number;
	activeProductIndex: number;  // Changed to be 0 by default
	previousProductIndex: number | null;
}

function createSpaceStore() {
	const { subscribe, set, update } = writable<SpaceState>({
		scrollY: 0,
		parallaxOffset: 0,
		activeProductIndex: 0,  // First card active by default
		previousProductIndex: null
	});

	return {
		subscribe,
		updateScroll: (y: number) => update(state => ({
			...state,
			scrollY: y,
			parallaxOffset: y * 0.1
		})),
		setActiveProduct: (index: number) => update(state => ({
			...state,
			previousProductIndex: state.activeProductIndex,
			activeProductIndex: index
		})),
		reset: () => set({
			scrollY: 0,
			parallaxOffset: 0,
			activeProductIndex: 0,
			previousProductIndex: null
		})
	};
}

export const spaceStore = createSpaceStore();