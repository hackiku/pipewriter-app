// $lib/stores/elementsThemeStore.ts
import { writable } from 'svelte/store';

export type ElementsTheme = 'light' | 'dark';

function createElementsThemeStore() {
	const { subscribe, set, update } = writable<ElementsTheme>('light');

	return {
		subscribe,
		set,
		toggle: () => update(theme => theme === 'light' ? 'dark' : 'light')
	};
}

export const elementsThemeStore = createElementsThemeStore();