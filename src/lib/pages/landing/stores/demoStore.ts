// src/lib/pages/landing/stores/demoStore.ts
import { writable } from 'svelte/store';

interface DemoState {
	activeTab: 'wireframe' | 'doc' | 'prompt' | 'code';
	wireframeContent: {
		headline: string;
		subheadline: string;
		isEditing: boolean;
	};
}

const initialState: DemoState = {
	activeTab: 'wireframe',
	wireframeContent: {
		headline: 'Write Straight to Product',
		subheadline: 'Design in words. Preview in code.',
		isEditing: false
	}
};

function createDemoStore() {
	const { subscribe, update, set } = writable<DemoState>(initialState);

	return {
		subscribe,
		setTab: (tab: DemoState['activeTab']) =>
			update(state => ({ ...state, activeTab: tab })),
		updateWireframeContent: (content: Partial<DemoState['wireframeContent']>) =>
			update(state => ({
				...state,
				wireframeContent: { ...state.wireframeContent, ...content }
			})),
		toggleEditing: () =>
			update(state => ({
				...state,
				wireframeContent: {
					...state.wireframeContent,
					isEditing: !state.wireframeContent.isEditing
				}
			})),
		reset: () => set(initialState)
	};
}

export const demoStore = createDemoStore();