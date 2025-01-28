// src/lib/(space)/stores/spaceStore.ts
import { writable } from 'svelte/store';

interface SpaceState {
	// Product showcase state
	activeProductIndex: number;
	previousProductIndex: number | null;

	// Navigation state
	isNavVisible: boolean;
	isMenuOpen: boolean;

	// Scene controls state
	isControlsOpen: boolean;
	hasScrolledPastHero: boolean;

	// Scroll position - used by multiple components for animations
	scrollY: number;
}

function createSpaceStore() {
	const { subscribe, set, update } = writable<SpaceState>({
		// Initial state
		activeProductIndex: 0,
		previousProductIndex: null,
		isNavVisible: true,
		isMenuOpen: false,
		isControlsOpen: true,
		hasScrolledPastHero: false,
		scrollY: 0
	});

	// Cache last scroll position for nav show/hide logic
	let lastScrollY = 0;

	return {
		subscribe,

		// Product navigation
		setActiveProduct: (index: number | null) => update(state => ({
			...state,
			previousProductIndex: state.activeProductIndex,
			activeProductIndex: index ?? 0
		})),

		// Mobile menu
		toggleMenu: () => update(state => ({
			...state,
			isMenuOpen: !state.isMenuOpen
		})),

		// Scene controls
		toggleControls: () => update(state => ({
			...state,
			isControlsOpen: !state.isControlsOpen,
		})),

		setControlsOpen: (isOpen: boolean) => update(state => ({
			...state,
			isControlsOpen: isOpen
		})),

		// Track hero scroll state
		setHasScrolledPastHero: (hasPassed: boolean) => update(state => ({
			...state,
			hasScrolledPastHero: hasPassed
		})),

		// Scroll handling
		updateScroll: (scrollY: number) => update(state => {
			const scrollDelta = scrollY - lastScrollY;
			const heroHeight = window.innerHeight * 0.9; // 90vh

			// Update scroll past hero state
			const hasPassedHero = scrollY > heroHeight;

			// Only update lastScrollY when we've scrolled a significant amount
			if (Math.abs(scrollDelta) > 50) {
				lastScrollY = scrollY;
			}

			// Show nav when:
			// 1. We're near the top of the page (scrollY < 100)
			// 2. User is scrolling up (current scroll position > last position)
			const isVisible = scrollY < 100 || state.scrollY > scrollY;

			return {
				...state,
				scrollY,
				isNavVisible: isVisible,
				hasScrolledPastHero: hasPassedHero
			};
		}),

		// Reset store to initial state
		reset: () => set({
			activeProductIndex: 0,
			previousProductIndex: null,
			isNavVisible: true,
			isMenuOpen: false,
			isControlsOpen: true,
			hasScrolledPastHero: false,
			scrollY: 0
		})
	};
}

export const spaceStore = createSpaceStore();