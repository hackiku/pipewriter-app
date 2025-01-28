// src/lib/(space)/components/chute/physics.ts
export const PLANETS = {
	earth: {
		gravity: 9.81,
		airDensity: 1.225,
		name: 'Earth',
		color: '#4299E1',
		atmosphereHeight: 100000,
		scaleMultiplier: 1
	},
	mars: {
		gravity: 3.72,
		airDensity: 0.020,
		name: 'Mars',
		color: '#ED8936',
		atmosphereHeight: 50000,
		scaleMultiplier: 1.2  // Mars appears larger to compensate for thinner atmosphere
	}
} as const;

export const PHYSICS = {
	INITIAL_ALTITUDE: 35000,     // Slightly lower initial altitude
	FINAL_ALTITUDE: 500,         // Higher final altitude for smoother landing
	ANIMATION_DURATION: 40000,   // Shortened duration

	calculateState(elapsed: number, planet: keyof typeof PLANETS) {
		const progress = Math.min(elapsed / this.ANIMATION_DURATION, 1);
		const planetData = PLANETS[planet];

		// Enhanced easing function for smoother altitude transitions
		const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
		const altitudeProgress = easeOutQuart(progress);

		const altitude = this.INITIAL_ALTITUDE +
			(this.FINAL_ALTITUDE - this.INITIAL_ALTITUDE) * altitudeProgress;

		// Improved velocity curve with planetary factors
		let velocity;
		if (progress < 0.15) {
			// Initial acceleration
			velocity = 25 * (progress / 0.15) * planetData.scaleMultiplier;
		} else if (progress > 0.85) {
			// Landing deceleration
			velocity = 25 * (1 - (progress - 0.85) / 0.15) * planetData.scaleMultiplier;
		} else {
			// Terminal velocity with atmospheric variations
			const baseVelocity = 25 * planetData.scaleMultiplier;
			const variation = Math.sin(progress * Math.PI * 6) * 3;
			velocity = baseVelocity + variation * (planetData.airDensity / PLANETS.earth.airDensity);
		}

		// Scale calculation with planetary adjustment
		const scaleProgress = Math.pow(progress, 1.3);
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