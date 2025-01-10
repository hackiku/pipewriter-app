// src/lib/pages/space/stores/spaceStore.ts
import { writable } from 'svelte/store';

interface SpaceState {
	scrollY: number;
	parallaxOffset: number;
}

function createSpaceStore() {
	const { subscribe, set, update } = writable<SpaceState>({
		scrollY: 0,
		parallaxOffset: 0
	});

	return {
		subscribe,
		updateScroll: (y: number) => update(state => ({
			...state,
			scrollY: y,
			parallaxOffset: y * 0.1
		})),
		reset: () => set({ scrollY: 0, parallaxOffset: 0 })
	};
}

export const spaceStore = createSpaceStore();