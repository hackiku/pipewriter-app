// src/lib/(space)/components/chute/physics.ts
import { VIEWPORT } from './coordinates';

export const PLANETS = {
	earth: {
		gravity: 9.81,
		airDensity: 1.225,
		name: 'Earth',
		color: '#4299E1',
		terminalVelocity: 55,
		scaleMultiplier: 1
	},
	mars: {
		gravity: 3.72,
		airDensity: 0.020,
		name: 'Mars',
		color: '#ED8936',
		terminalVelocity: 110,
		scaleMultiplier: 1.2
	}
} as const;

export const PHYSICS = {
	INITIAL_ALTITUDE: 35000,
	FINAL_ALTITUDE: 100,
	ANIMATION_DURATION: 45000,

	// Cache for performance
	private: {
		lastProgress: -1,
		lastState: null as any
	},

	calculateState(elapsed: number, planet: keyof typeof PLANETS) {
		const progress = Math.min(elapsed / this.ANIMATION_DURATION, 1);

		// Return cached result if progress hasn't changed significantly
		if (Math.abs(progress - this.private.lastProgress) < 0.001 && this.private.lastState) {
			return this.private.lastState;
		}

		const planetData = PLANETS[planet];

		// Enhanced easing curve for smoother animation
		const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
		const altitudeProgress = easeOutQuart(progress);

		// Calculate altitude with smoother interpolation
		const altitude = this.INITIAL_ALTITUDE +
			(this.FINAL_ALTITUDE - this.INITIAL_ALTITUDE) * altitudeProgress;

		// Optimized velocity calculation
		let velocity;
		const p = progress;
		if (p < 0.1) {
			velocity = planetData.terminalVelocity * (p / 0.1);
		} else if (p > 0.9) {
			velocity = planetData.terminalVelocity * Math.pow(1 - (p - 0.9) / 0.1, 2);
		} else {
			const baseVelocity = planetData.terminalVelocity;
			// Use cheaper sin approximation for variation
			const variation = (Math.sin(p * 25.13) * 0.1) * baseVelocity;
			velocity = (baseVelocity + variation) *
				(planetData.airDensity / PLANETS.earth.airDensity * 0.5 + 0.5);
		}

		// Optimized scale calculation
		const scaleProgress = Math.pow(progress, 1.2);
		const scale = VIEWPORT.planet.initial.scale +
			(VIEWPORT.planet.final.scale - VIEWPORT.planet.initial.scale) *
			scaleProgress * planetData.scaleMultiplier;

		// Cache the result
		this.private.lastProgress = progress;
		this.private.lastState = {
			altitude,
			velocity,
			scale,
			progress
		};

		return this.private.lastState;
	}
};