// src/lib/iframe/stores/promptStore.ts

import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface PromptStep {
	title: string;
	content: string;
	index: number;
}

export interface MasterPrompt {
	title: string;
	content: string;
	enabled: boolean;
}

export interface Prompt {
	id: string;
	title: string;
	content: string;
	index: number;
	isDefault?: boolean;
}

interface PromptState {
	prompts: Prompt[];
	activePromptId: string | null;
	masterPrompt: MasterPrompt;
	currentIndex: number;
}

const DEFAULT_PROMPTS: Prompt[] = [
	{
		id: 'landing',
		title: 'Landing Page',
		content: 'Generate a landing page with a hero section that highlights the main value proposition, followed by 3 feature cards showing key benefits, and end with a prominent call-to-action button.',
		index: 0,
		isDefault: true
	},
	{
		id: 'features',
		title: 'Feature Section',
		content: 'Create a feature comparison section with 3-4 columns. Each should have a clear heading, supporting text that emphasizes benefits, and maintain consistent vertical alignment.',
		index: 1,
		isDefault: true
	},
	{
		id: 'pricing',
		title: 'Pricing Cards',
		content: 'Design a pricing section with 3 tiers. Each card should have a clear plan name, price point, feature list highlighting key benefits, and a call-to-action button.',
		index: 2,
		isDefault: true
	}
];

const DEFAULT_MASTER_PROMPT: MasterPrompt = {
	title: 'Master Layout Context',
	content: 'This HTML represents common UX layout patterns. Identify and enhance patterns like heroes, feature grids, zigzag sections, and pricing tables while maintaining semantic structure.',
	enabled: false
};

function createPromptStore() {
	const { subscribe, set, update }: Writable<PromptState> = writable({
		prompts: DEFAULT_PROMPTS,
		activePromptId: null,
		masterPrompt: DEFAULT_MASTER_PROMPT,
		currentIndex: 0
	});

	return {
		subscribe,

		// Prompt Management
		setActivePrompt: (promptId: string | null) =>
			update(state => ({ ...state, activePromptId: promptId })),

		updatePrompt: (prompt: Prompt) =>
			update(state => ({
				...state,
				prompts: state.prompts.map(p =>
					p.id === prompt.id ? { ...p, ...prompt } : p
				)
			})),

		deletePrompt: (promptId: string) =>
			update(state => ({
				...state,
				prompts: state.prompts.filter(p => p.id !== promptId || p.isDefault),
				activePromptId: state.activePromptId === promptId ? null : state.activePromptId
			})),

		addPrompt: (prompt: Omit<Prompt, 'id'>) =>
			update(state => ({
				...state,
				prompts: [...state.prompts, { ...prompt, id: crypto.randomUUID() }]
			})),

		// Index Management
		setCurrentIndex: (index: number) =>
			update(state => ({ ...state, currentIndex: index })),

		// Master Prompt Management
		updateMasterPrompt: (masterPrompt: Partial<MasterPrompt>) =>
			update(state => ({
				...state,
				masterPrompt: { ...state.masterPrompt, ...masterPrompt }
			})),

		toggleMasterPrompt: () =>
			update(state => ({
				...state,
				masterPrompt: {
					...state.masterPrompt,
					enabled: !state.masterPrompt.enabled
				}
			})),

		// Reset to defaults
		resetPrompts: () =>
			update(state => ({
				...state,
				prompts: DEFAULT_PROMPTS,
				masterPrompt: DEFAULT_MASTER_PROMPT,
				currentIndex: 0
			})),

		// Generate final prompt
		getFinalPrompt: (state: PromptState): string => {
			let finalPrompt = '';

			// Add master prompt if enabled
			if (state.masterPrompt.enabled) {
				finalPrompt += `${state.masterPrompt.content}\n\n`;
			}

			// Add active prompt content
			const activePrompt = state.prompts.find(p => p.id === state.activePromptId);
			if (activePrompt) {
				finalPrompt += activePrompt.content;
			}

			return finalPrompt.trim();
		}
	};
}

export const promptStore = createPromptStore();

// Derived stores for convenient access
export const activePrompt = derived(
	promptStore,
	$store => $store.prompts.find(p => p.id === $store.activePromptId) || null
);

export const masterPrompt = derived(
	promptStore,
	$store => $store.masterPrompt
);

export const currentIndex = derived(
	promptStore,
	$store => $store.currentIndex
);

export const hasActivePrompt = derived(
	promptStore,
	$store => $store.activePromptId !== null
);