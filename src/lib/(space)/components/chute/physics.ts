// src/lib/(space)/components/chute/physics.ts
export const PLANETS = {
	earth: {
		gravity: 9.81,
		airDensity: 1.225,
		name: 'Earth',
		color: '#4299E1',
		atmosphereHeight: 100000
	},
	mars: {
		gravity: 3.72,
		airDensity: 0.020,
		name: 'Mars',
		color: '#ED8936',
		atmosphereHeight: 50000
	}
} as const;

export const PHYSICS = {
	INITIAL_ALTITUDE: 40000,     // Reduced for better visualization
	FINAL_ALTITUDE: 300,         // Landing altitude (m)
	ANIMATION_DURATION: 45000,   // 45 seconds for full descent
	PLANET_INITIAL_SCALE: 0.6,   // Initial planet scale (60% of viewport)
	PLANET_FINAL_SCALE: 2.5,     // Final planet scale (250% of viewport)

	calculateState(elapsed: number, planet: keyof typeof PLANETS) {
		const progress = Math.min(elapsed / this.ANIMATION_DURATION, 1);

		// Smoothed altitude curve
		const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
		const altitudeProgress = easeOutQuart(progress);

		const altitude = this.INITIAL_ALTITUDE +
			(this.FINAL_ALTITUDE - this.INITIAL_ALTITUDE) * altitudeProgress;

		// Velocity curve with three phases:
		// 1. Initial acceleration
		// 2. Terminal velocity
		// 3. Landing deceleration
		let velocity;
		if (progress < 0.2) {
			// Initial acceleration
			velocity = 20 * (progress / 0.2);
		} else if (progress > 0.8) {
			// Landing deceleration
			velocity = 20 * (1 - (progress - 0.8) / 0.2);
		} else {
			// Terminal velocity with slight variation
			velocity = 20 + Math.sin(progress * Math.PI * 4) * 2;
		}

		// Adjust velocity based on planet
		velocity *= planet === 'mars' ? 0.7 : 1;

		// Planet scale increases as we get closer
		const scale = this.PLANET_INITIAL_SCALE +
			(this.PLANET_FINAL_SCALE - this.PLANET_INITIAL_SCALE) *
			Math.pow(progress, 1.5);

		return {
			altitude,
			velocity,
			scale,
			progress
		};
	}
};