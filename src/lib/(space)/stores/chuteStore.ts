// src/lib/(space)/stores/chuteStore.ts
import { writable, get } from 'svelte/store';
import { PHYSICS, PLANETS } from '../components/chute/physics';

interface ChuteState {
	planet: keyof typeof PLANETS;
	altitude: number;
	velocity: number;
	lastUpdate: number;
	isPlaying: boolean;
}

function createChuteStore() {
	// Initialize store with default values
	const { subscribe, set, update } = writable<ChuteState>({
		planet: 'earth',
		altitude: PHYSICS.INITIAL_ALTITUDE,
		velocity: 0,
		lastUpdate: Date.now(),
		isPlaying: false
	});

	// Use more precise RAF-based throttling instead of setTimeout
	let rafId: number | null = null;
	let lastUpdate = Date.now();
	const THROTTLE_MS = 50; // Increased for better performance, still smooth

	// Cache for preventing unnecessary updates
	let lastAltitude = PHYSICS.INITIAL_ALTITUDE;
	let lastVelocity = 0;

	function throttledUpdate(altitude: number, velocity: number) {
		const now = Date.now();
		if (now - lastUpdate < THROTTLE_MS) {
			// Skip update if within throttle window
			return;
		}

		// Skip if values haven't changed significantly
		const altitudeDiff = Math.abs(altitude - lastAltitude);
		const velocityDiff = Math.abs(velocity - lastVelocity);

		if (altitudeDiff < 1 && velocityDiff < 0.1) {
			return;
		}

		// Update cache
		lastAltitude = altitude;
		lastVelocity = velocity;
		lastUpdate = now;

		// Perform the update
		update(state => ({
			...state,
			altitude,
			velocity,
			lastUpdate: now
		}));
	}

	return {
		subscribe,

		// Set planet with validation
		setPlanet: (planet: keyof typeof PLANETS) => {
			if (!PLANETS[planet]) return;
			update(state => ({ ...state, planet }));
		},

		// Optimized stats update using RAF-based throttling
		updateStats: (altitude: number, velocity: number) => {
			if (rafId) return;

			rafId = requestAnimationFrame(() => {
				throttledUpdate(altitude, velocity);
				rafId = null;
			});
		},

		// Atomic play state updates
		setPlaying: (isPlaying: boolean) => {
			update(state => {
				if (state.isPlaying === isPlaying) return state;
				return { ...state, isPlaying };
			});
		},

		togglePlay: () => {
			const currentState = get({ subscribe });
			update(state => ({
				...state,
				isPlaying: !currentState.isPlaying
			}));
		},

		// Clean reset with proper cleanup
		reset: () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
				rafId = null;
			}

			lastAltitude = PHYSICS.INITIAL_ALTITUDE;
			lastVelocity = 0;
			lastUpdate = Date.now();

			set({
				planet: 'earth',
				altitude: PHYSICS.INITIAL_ALTITUDE,
				velocity: 0,
				lastUpdate: Date.now(),
				isPlaying: false
			});
		},

		// Cleanup method for component unmounting
		cleanup: () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
				rafId = null;
			}
		}
	};
}

export const chuteStore = createChuteStore();