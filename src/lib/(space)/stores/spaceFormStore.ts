// src/lib/(space)/stores/spaceFormStore.ts

import { writable } from 'svelte/store';

export interface CustomerData {
	website: string;
	email: string;
	comment: string;
	source?: string;  // Track where the form was submitted from
	timestamp?: string;
}

interface SpaceFormState {
	isExpanded: boolean;
	data: CustomerData;
	status: 'idle' | 'submitting' | 'success' | 'error';
	error?: string;
}

const initialState: SpaceFormState = {
	isExpanded: false,
	data: {
		website: '',
		email: '',
		comment: '',
	},
	status: 'idle'
};

function createSpaceFormStore() {
	const { subscribe, set, update } = writable<SpaceFormState>(initialState);

	return {
		subscribe,
		toggleExpanded: () => update(state => ({
			...state,
			isExpanded: !state.isExpanded
		})),
		updateData: (data: Partial<CustomerData>) => update(state => ({
			...state,
			data: { ...state.data, ...data }
		})),
		async submitForm(source: string = 'default') {
			update(state => ({ ...state, status: 'submitting' }));

			try {
				// Add timestamp and source
				const formData = {
					...state.data,
					timestamp: new Date().toISOString(),
					source
				};

				// TODO: Replace with your Make.com webhook URL
				const response = await fetch('YOUR_MAKE_WEBHOOK_URL', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData)
				});

				if (!response.ok) throw new Error('Submission failed');

				update(state => ({ ...state, status: 'success' }));
			} catch (error) {
				update(state => ({
					...state,
					status: 'error',
					error: error.message
				}));
			}
		},
		reset: () => set(initialState)
	};
}

export const spaceFormStore = createSpaceFormStore();