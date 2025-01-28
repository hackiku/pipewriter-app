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
	FINAL_ALTITUDE: 100,     // Lower final altitude for intersection effect
	ANIMATION_DURATION: 45000, // Longer animation duration

	calculateState(elapsed: number, planet: keyof typeof PLANETS) {
		const progress = Math.min(elapsed / this.ANIMATION_DURATION, 1);
		const planetData = PLANETS[planet];

		// Enhanced easing for more dramatic landing
		const easeOutQuart = (x: number) => {
			const p = 1 - x;
			return 1 - (p < 0.5
				? Math.pow(2 * p, 3)
				: 1 - Math.pow(2 * (1 - p), 3) / 2);
		};

		const altitudeProgress = easeOutQuart(progress);
		const altitude = this.INITIAL_ALTITUDE +
			(this.FINAL_ALTITUDE - this.INITIAL_ALTITUDE) * altitudeProgress;

		// Velocity calculation with smoother transitions
		let velocity;
		if (progress < 0.1) {
			// Initial acceleration
			velocity = planetData.terminalVelocity * (progress / 0.1);
		} else if (progress > 0.9) {
			// Final dramatic deceleration
			const decelProgress = (1 - (progress - 0.9) / 0.1);
			velocity = planetData.terminalVelocity * Math.pow(decelProgress, 2);
		} else {
			// Terminal velocity with atmospheric effects
			const baseVelocity = planetData.terminalVelocity;
			const variation = Math.sin(progress * Math.PI * 8) * (baseVelocity * 0.1);
			velocity = (baseVelocity + variation) *
				(planetData.airDensity / PLANETS.earth.airDensity * 0.5 + 0.5);
		}

		// Scale calculation matching grid visuals
		const scaleProgress = Math.pow(progress, 1.2);
		const scale = VIEWPORT.planet.initial.scale +
			(VIEWPORT.planet.final.scale - VIEWPORT.planet.initial.scale) *
			scaleProgress * planetData.scaleMultiplier;

		return {
			altitude,
			velocity,
			scale,
			progress
		};
	}
};