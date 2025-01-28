// src/lib/(space)/stores/chuteStore.ts
import { writable } from 'svelte/store';
import { PHYSICS, PLANETS } from '../components/chute/physics';

interface ChuteState {
	planet: keyof typeof PLANETS;
	altitude: number;
	velocity: number;
	lastUpdate: number;
	isPlaying: boolean;
}

function createChuteStore() {
	const { subscribe, set, update } = writable<ChuteState>({
		planet: 'earth',
		altitude: PHYSICS.INITIAL_ALTITUDE,
		velocity: 0,
		lastUpdate: Date.now(),
		isPlaying: false
	});

	let updateTimeout: NodeJS.Timeout | null = null;
	const THROTTLE_MS = 33;

	return {
		subscribe,
		setPlanet: (planet: keyof typeof PLANETS) =>
			update(state => ({ ...state, planet })),

		updateStats: (altitude: number, velocity: number) => {
			if (updateTimeout) return;

			updateTimeout = setTimeout(() => {
				update(state => ({
					...state,
					altitude,
					velocity,
					lastUpdate: Date.now()
				}));
				updateTimeout = null;
			}, THROTTLE_MS);
		},

		setPlaying: (isPlaying: boolean) =>
			update(state => ({ ...state, isPlaying })),

		togglePlay: () =>
			update(state => ({ ...state, isPlaying: !state.isPlaying })),

		reset: () => set({
			planet: 'earth',
			altitude: PHYSICS.INITIAL_ALTITUDE,
			velocity: 0,
			lastUpdate: Date.now(),
			isPlaying: false
		})
	};
}

export const chuteStore = createChuteStore();