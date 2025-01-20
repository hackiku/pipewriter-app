// src/lib/(space)/components/chute/physics.ts
export const PLANETS = {
	earth: {
		gravity: 9.81,
		airDensity: 1.225,
		name: 'Earth',
		color: '#4299E1',
		atmosphereHeight: 100000  // meters
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
	INITIAL_ALTITUDE: 95935.8,  // X-15 record (m)
	FINAL_ALTITUDE: 300,        // Landing altitude (m)
	ANIMATION_DURATION: 30000,  // 30 seconds for full descent
	MAX_CURVATURE: 75,         // Max planet curve in degrees
	MIN_CURVATURE: 10,         // Min planet curve in degrees

	calculateState(elapsed: number, planet: keyof typeof PLANETS) {
		const progress = Math.min(elapsed / this.ANIMATION_DURATION, 1);

		// Altitude with cubic easing
		const altitude = this.INITIAL_ALTITUDE +
			(this.FINAL_ALTITUDE - this.INITIAL_ALTITUDE) *
			(1 - Math.pow(1 - progress, 3));

		// Velocity calculation
		const velocity = 20 * Math.sin(progress * Math.PI);

		// Planet curvature - more curved at high altitude
		const altitudeProgress = (altitude - this.FINAL_ALTITUDE) /
			(this.INITIAL_ALTITUDE - this.FINAL_ALTITUDE);
		const curvature = this.MIN_CURVATURE +
			(this.MAX_CURVATURE - this.MIN_CURVATURE) *
			altitudeProgress;

		// Planet scale - bigger as we get closer
		const scale = 1 + (1 - altitudeProgress) * 1.5;

		return {
			altitude,
			velocity,
			curvature,
			scale,
			progress
		};
	}
};