// src/lib/pages/landing/stores/driveStore.ts
import { writable, derived } from 'svelte/store';
import { getNodeByPath, getParentPath, getBreadcrumbs, type DriveNode } from '../data/folders';

interface DriveState {
	currentPath: string;
	isCompact: boolean;
	showEarlyAccess: boolean;
}

function createDriveStore() {
	const { subscribe, update, set } = writable<DriveState>({
		currentPath: '/Elements.gdoc',
		isCompact: true, // Default to compact on mobile
		showEarlyAccess: false
	});

	// Derived store for current folder
	const currentFolder = derived(
		{ subscribe },
		($state) => {
			if ($state.showEarlyAccess) return null;
			const parentPath = getParentPath($state.currentPath);
			return getNodeByPath(parentPath);
		}
	);

	// Derived store for breadcrumbs
	const breadcrumbs = derived(
		{ subscribe },
		($state) => getBreadcrumbs($state.currentPath)
	);

	return {
		subscribe,
		currentFolder,
		breadcrumbs,

		navigate: (path: string) => {
			console.log('Store: Navigating to', path);
			update(state => ({ ...state, currentPath: path }));
		},

		toggleCompact: () => {
			update(state => {
				console.log('Store: Toggling compact mode', !state.isCompact);
				return { ...state, isCompact: !state.isCompact };
			});
		},

		showMyDrive: () => {
			update(state => ({
				...state,
				showEarlyAccess: true,
				currentPath: '/',
				isCompact: true
			}));
		},

		showPipewriter: () => {
			update(state => ({
				...state,
				showEarlyAccess: false,
				currentPath: '/Elements.gdoc',
				isCompact: true
			}));
		}
	};
}

export const driveStore = createDriveStore();