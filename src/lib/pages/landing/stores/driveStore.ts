// src/lib/pages/landing/stores/driveStore.ts
import { writable, derived } from 'svelte/store';
import { driveRoot, getNodeByPath, getParentPath, getBreadcrumbs, type DriveNode } from '../data/folders';

interface DriveState {
	currentPath: string;
	isCompact: boolean;
	showEarlyAccess: boolean;
}

function createDriveStore() {
	const { subscribe, update, set } = writable<DriveState>({
		currentPath: '/Elements.gdoc',  // Default selected document
		isCompact: false,              // Default expanded on desktop
		showEarlyAccess: false
	});

	// Get current folder's contents
	const currentFolder = derived({ subscribe }, ($state) => {
		if ($state.showEarlyAccess) return null;
		const parentPath = getParentPath($state.currentPath);
		const folder = getNodeByPath(parentPath);
		console.log('Current folder:', folder?.path, 'Children:', folder?.children?.length);
		return folder;
	});

	// Get breadcrumb path parts
	const breadcrumbs = derived({ subscribe }, ($state) => {
		const parts = getBreadcrumbs($state.currentPath);
		console.log('Breadcrumbs generated:', parts);
		return parts;
	});

	return {
		subscribe,
		currentFolder,
		breadcrumbs,

		// Navigation with path validation
		navigate: (path: string) => {
			console.log('Navigating to:', path);
			const targetNode = getNodeByPath(path);
			if (targetNode || path === '/') {
				update(state => ({ ...state, currentPath: path }));
			} else {
				console.warn('Invalid path:', path);
			}
		},

		// Special path handling
		handleBreadcrumbClick: (part: string, index: number) => {
			update(state => {
				// Handle special paths
				if (part === 'My Drive') {
					return { ...state, showEarlyAccess: true, currentPath: '/' };
				}
				if (part === 'Pipewriter') {
					return { ...state, showEarlyAccess: false, currentPath: '/Elements.gdoc' };
				}

				// Get path up to clicked breadcrumb
				const pathParts = state.currentPath.split('/').filter(Boolean);
				const newPath = '/' + pathParts.slice(0, index).join('/');
				console.log('Breadcrumb click:', part, 'New path:', newPath);

				return { ...state, currentPath: newPath || '/' };
			});
		},

		toggleCompact: () => update(state => ({ ...state, isCompact: !state.isCompact })),

		showMyDrive: () => update(state => ({
			...state,
			showEarlyAccess: true,
			currentPath: '/',
		})),

		showPipewriter: () => update(state => ({
			...state,
			showEarlyAccess: false,
			currentPath: '/Elements.gdoc',
		}))
	};
}

export const driveStore = createDriveStore();