// src/lib/pages/space/stores/spaceStore.ts
import { writable } from 'svelte/store';

interface SpaceState {
	scrollY: number;
	parallaxOffset: number;
	activeProductIndex: number | null;
	previousProductIndex: number | null;
}

function createSpaceStore() {
	const { subscribe, set, update } = writable<SpaceState>({
		scrollY: 0,
		parallaxOffset: 0,
		activeProductIndex: null,
		previousProductIndex: null
	});

	return {
		subscribe,
		updateScroll: (y: number) => update(state => ({
			...state,
			scrollY: y,
			parallaxOffset: y * 0.1
		})),
		setActiveProduct: (index: number | null) => update(state => ({
			...state,
			previousProductIndex: state.activeProductIndex,
			activeProductIndex: index
		})),
		reset: () => set({
			scrollY: 0,
			parallaxOffset: 0,
			activeProductIndex: null,
			previousProductIndex: null
		})
	};
}

export const spaceStore = createSpaceStore();