// src/lib/stores/onboardingStore.ts
import { writable } from 'svelte/store';

interface OnboardingState {
	isNewUser: boolean;
	currentStep: number;
	hasAccessToDoc: boolean;
	docUrl: string | null;
	emailConfirmed: boolean;
}

function createOnboardingStore() {
	const { subscribe, set, update } = writable<OnboardingState>({
		isNewUser: true,
		currentStep: 1,
		hasAccessToDoc: false,
		docUrl: null,
		emailConfirmed: false
	});

	return {
		subscribe,
		startOnboarding: (email: string) => {
			// Here you'll integrate with your email service
			update(state => ({
				...state,
				isNewUser: true,
				currentStep: 1
			}));
		},
		confirmEmail: () => {
			update(state => ({
				...state,
				emailConfirmed: true,
				currentStep: 2
			}));
		},
		grantDocAccess: (docUrl: string) => {
			update(state => ({
				...state,
				hasAccessToDoc: true,
				docUrl,
				currentStep: 3
			}));
		},
		completeOnboarding: () => {
			update(state => ({
				...state,
				isNewUser: false,
				currentStep: 4
			}));
		}
	};
}

export const onboarding = createOnboardingStore();

// Helper derived store for onboarding progress
import { derived } from 'svelte/store';

export const onboardingProgress = derived(
	onboarding,
	$onboarding => ({
		progress: ($onboarding.currentStep / 4) * 100,
		isComplete: $onboarding.currentStep === 4
	})
);