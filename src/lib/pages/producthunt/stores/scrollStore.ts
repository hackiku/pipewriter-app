// lib/pages/producthunt/stores/scrollStore.ts
import { writable } from 'svelte/store';

export interface ScrollState {
	position: number;
	sectionInView: 'hero' | 'support' | 'cta';
	showFloatingButton: boolean;
	progress: number;  // 0-1 scroll progress through support section
}

function createScrollStore() {
	const { subscribe, set, update } = writable<ScrollState>({
		position: 0,
		sectionInView: 'hero',
		showFloatingButton: false,
		progress: 0
	});

	return {
		subscribe,
		updateScroll: (position: number, progress: number = 0) => update(state => {
			// Determine which section is in view based on scroll position
			const sectionInView = position < 300 ? 'hero'
				: position > 1200 ? 'cta'
					: 'support';

			return {
				position,
				sectionInView,
				showFloatingButton: position > 400,  // Show after hero, don't hide
				progress: Math.max(0, Math.min(1, progress))  // Clamp between 0-1
			};
		})
	};
}

export const scrollStore = createScrollStore();