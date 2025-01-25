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
	INITIAL_ALTITUDE: 95935.8,  // X-15 record (m)
	FINAL_ALTITUDE: 300,        // Landing altitude (m)
	ANIMATION_DURATION: 120000, // 120 seconds for full descent
	MAX_CURVATURE: 75,         // Max planet curve in degrees
	MIN_CURVATURE: 10,         // Min planet curve in degrees

	calculateState(elapsed: number, planet: keyof typeof PLANETS) {
		const progress = Math.min(elapsed / this.ANIMATION_DURATION, 1);

		// Smoother altitude curve using custom easing
		const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
		const altitudeProgress = easeOutQuart(progress);

		const altitude = this.INITIAL_ALTITUDE +
			(this.FINAL_ALTITUDE - this.INITIAL_ALTITUDE) * altitudeProgress;

		// More natural velocity curve
		// Peaks in the middle of descent, slower at start and end
		const velocityProgress = Math.sin(progress * Math.PI);
		const maxVelocity = planet === 'earth' ? 25 : 15;
		const velocity = maxVelocity * velocityProgress;

		// Smoother curvature transition
		const curvature = this.MIN_CURVATURE +
			(this.MAX_CURVATURE - this.MIN_CURVATURE) *
			(1 - easeOutQuart(progress));

		// Scale increases more dramatically near the end
		const scale = 1 + Math.pow(altitudeProgress, 2) * 1.5;

		return {
			altitude,
			velocity,
			curvature,
			scale,
			progress
		};
	},
	calculatePlanetScale(altitude: number) {
		// Simple inverse relationship - planet appears larger as we get closer
		const maxScale = 2;
		const minScale = 0.5;
		const progress = (this.INITIAL_ALTITUDE - altitude) /
			(this.INITIAL_ALTITUDE - this.FINAL_ALTITUDE);

		return minScale + (maxScale - minScale) * progress;
	}
};