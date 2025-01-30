// src/lib/pages/landing/stores/landingStore.ts
import { writable } from 'svelte/store';

type ExportStep = 'doc' | 'process' | 'code';

interface LandingState {
	activeExportStep: ExportStep;
}

function createLandingStore() {
	const { subscribe, update, set } = writable<LandingState>({
		activeExportStep: 'doc'
	});

	return {
		subscribe,
		setExportStep: (step: ExportStep) => update(state => ({ ...state, activeExportStep: step })),
		reset: () => set({ activeExportStep: 'doc' })
	};
}

export const landingStore = createLandingStore();