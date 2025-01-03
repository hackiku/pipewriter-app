// src/lib/pages/free/stores/exportStore.ts
import { writable } from 'svelte/store';

export type ExportFormat = 'text' | 'html' | 'react' | 'markdown';

interface ExportState {
	dialogOpen: boolean;
	selectedFormat: ExportFormat;
	lastExported: ExportFormat | null;
}

const initialState: ExportState = {
	dialogOpen: false,
	selectedFormat: 'text',
	lastExported: null
};

function createExportStore() {
	const { subscribe, set, update } = writable<ExportState>(initialState);

	return {
		subscribe,

		openDialog: () => {
			update(state => ({ ...state, dialogOpen: true }));
		},

		closeDialog: () => {
			update(state => ({ ...state, dialogOpen: false }));
		},

		setFormat: (format: ExportFormat) => {
			update(state => ({ ...state, selectedFormat: format }));
		},

		markExported: () => {
			update(state => ({ ...state, lastExported: state.selectedFormat }));
		},

		reset: () => set(initialState)
	};
}

export const exportStore = createExportStore();