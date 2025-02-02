// src/lib/pages/landing/stores/driveStore.ts
import { writable, derived } from 'svelte/store';
import { getNodeByPath, getParentPath, getBreadcrumbs, type DriveNode } from '../data/folders';

interface DriveState {
	currentPath: string;
	isCompact: boolean;  // For mobile view
	showEarlyAccess: boolean;
}

function createDriveStore() {
	const { subscribe, update, set } = writable<DriveState>({
		currentPath: '/Elements.gdoc', // Default selected item
		isCompact: false,
		showEarlyAccess: false
	});

	// Derived store for current folder contents
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

		navigate: (path: string) => update(state => ({ ...state, currentPath: path })),
		toggleCompact: () => update(state => ({ ...state, isCompact: !state.isCompact })),

		// Special handling for My Drive click
		showMyDrive: () => update(state => ({
			...state,
			showEarlyAccess: true,
			currentPath: '/'
		})),

		// Return to main view
		showPipewriter: () => update(state => ({
			...state,
			showEarlyAccess: false,
			currentPath: '/Elements.gdoc'
		}))
	};
}

export const driveStore = createDriveStore();