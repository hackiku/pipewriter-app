// $lib/stores/themeStore.ts

import { writable } from 'svelte/store';

export type AppTheme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set, update } = writable<AppTheme>('light');

	return {
		subscribe,
		set,
		toggle: () => update(theme => theme === 'light' ? 'dark' : 'light')
	};
}

export const themeStore = createThemeStore();