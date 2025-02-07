// src/lib/pages/landing/stores/driveStore.ts
import { writable } from 'svelte/store';
import { getNodeByPath } from '../data/folders';

export const driveStore = (() => {
	const { subscribe, update } = writable({
		currentPath: '/',  // Start at root
		isCompact: false,
		activeShoutoutId: 'writer1' // Track current shoutout
	});

	return {
		subscribe,

		navigate: (path: string) => {
			const targetNode = getNodeByPath(path);
			if (!targetNode) return;

			update(state => {
				const newState = { ...state, currentPath: path };

				// Update shoutout if preview exists
				if (targetNode.preview?.shoutout) {
					newState.activeShoutoutId = targetNode.preview.shoutout;
				}

				return newState;
			});
		},

		handleBreadcrumbClick: (part: string, index: number) => {
			if (part === 'Pipewriter' || index === 0) {
				update(state => ({
					...state,
					currentPath: '/'
				}));
				return;
			}

			update(state => ({
				...state,
				currentPath: '/' + part
			}));
		},

		toggleCompact: (value?: boolean) => update(state => ({
			...state,
			isCompact: value !== undefined ? value : !state.isCompact
		})),
	};
})();