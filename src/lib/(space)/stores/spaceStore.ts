// src/lib/(space)/stores/spaceStore.ts
import { writable } from 'svelte/store';

interface SpaceState {
	activeProductIndex: number;
	previousProductIndex: number | null;
	isNavVisible: boolean;
	isMenuOpen: boolean;
	scrollY: number;
}

function createSpaceStore() {
	const { subscribe, set, update } = writable<SpaceState>({
		activeProductIndex: 0,
		previousProductIndex: null,
		isNavVisible: true,
		isMenuOpen: false,
		scrollY: 0
	});

	let lastScrollY = 0;

	return {
		subscribe,
		setActiveProduct: (index: number | null) => update(state => ({
			...state,
			previousProductIndex: state.activeProductIndex,
			activeProductIndex: index ?? 0
		})),
		toggleMenu: () => update(state => ({
			...state,
			isMenuOpen: !state.isMenuOpen
		})),
		updateScroll: (scrollY: number) => update(state => {
			const scrollDelta = scrollY - lastScrollY;
			const isVisible = scrollDelta < 0 || scrollY < 100;

			if (Math.abs(scrollDelta) > 50) {
				lastScrollY = scrollY;
			}

			return {
				...state,
				scrollY,
				isNavVisible: isVisible
			};
		}),
		reset: () => set({
			activeProductIndex: 0,
			previousProductIndex: null,
			isNavVisible: true,
			isMenuOpen: false,
			scrollY: 0
		})
	};
}

export const spaceStore = createSpaceStore();