// src/lib/pages/landing/stores/driveStore.ts
import { writable } from 'svelte/store';
import { getNodeByPath } from '../data/folders';

export const driveStore = (() => {
	const { subscribe, update } = writable({
		currentPath: '/',  // Start at root
		isCompact: false
	});

	return {
		subscribe,

		navigate: (path: string) => {
			const targetNode = getNodeByPath(path);
			if (!targetNode) return;

			// Handle folder toggle
			if (targetNode.type === 'folder') {
				update(state => {
					// If already open, close it by going to root
					if (state.currentPath === path) {
						return { ...state, currentPath: '/' };
					}
					return { ...state, currentPath: path };
				});
				return;
			}

			// Handle doc clicks
			update(state => ({ ...state, currentPath: path }));
		},

		handleBreadcrumbClick: (part: string, index: number) => {
			// Pipewriter always goes home
			if (part === 'Pipewriter' || index === 0) {
				update(state => ({
					...state,
					currentPath: '/'
				}));
				return;
			}

			// Navigate to clicked folder
			update(state => ({
				...state,
				currentPath: '/' + part
			}));
		},

		toggleCompact: () => update(state => ({
			...state,
			isCompact: !state.isCompact
		})),
	};
})();