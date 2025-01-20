// src/lib/(space)/components/chute/physics.ts

// Planet-specific constants
export const PLANETS = {
	earth: {
		gravity: 9.81,        // m/s²
		airDensity: 1.225,    // kg/m³ at sea level
		name: 'Earth',
		color: '#4299E1'      // blue-500
	},
	mars: {
		gravity: 3.72,        // m/s²
		airDensity: 0.020,    // kg/m³ at surface
		name: 'Mars',
		color: '#ED8936'      // orange-500
	}
} as const;

// Parachute system constants
export const PHYSICS = {
	INITIAL_ALTITUDE: 95935.8,  // X-15 record (m)
	FINAL_ALTITUDE: 300,        // Landing altitude (m)
	CHUTE_AREA: 40,            // m²
	MASS: 80,                  // kg (person + equipment)
	DRAG_COEFFICIENT: 1.75,    // Typical for round parachute
	ANIMATION_DURATION: 30000,  // 30 seconds for full descent

	// Terminal velocity calculation
	calculateTerminalVelocity(planet: keyof typeof PLANETS) {
		const { gravity, airDensity } = PLANETS[planet];
		return Math.sqrt(
			(2 * this.MASS * gravity) /
			(airDensity * this.CHUTE_AREA * this.DRAG_COEFFICIENT)
		);
	},

	// Air density at given altitude (simplified exponential model)
	getAirDensity(altitude: number, planet: keyof typeof PLANETS) {
		const { airDensity } = PLANETS[planet];
		const scaleHeight = planet === 'earth' ? 7400 : 11000; // m
		return airDensity * Math.exp(-altitude / scaleHeight);
	}
};

// Calculate state based on elapsed time and planet
export function calculateState(elapsed: number, planet: keyof typeof PLANETS) {
	const progress = Math.min(elapsed / PHYSICS.ANIMATION_DURATION, 1);
	const { gravity } = PLANETS[planet];

	// Altitude calculation with smooth easing
	const altitude = PHYSICS.INITIAL_ALTITUDE +
		(PHYSICS.FINAL_ALTITUDE - PHYSICS.INITIAL_ALTITUDE) *
		(1 - Math.pow(1 - progress, 3)); // Cubic easing

	// Current air density
	const currentAirDensity = PHYSICS.getAirDensity(altitude, planet);

	// Terminal velocity at current altitude
	const terminalVelocity = Math.sqrt(
		(2 * PHYSICS.MASS * gravity) /
		(currentAirDensity * PHYSICS.CHUTE_AREA * PHYSICS.DRAG_COEFFICIENT)
	);

	// Velocity calculation with smooth transition to terminal velocity
	const velocityProgress = Math.pow(Math.sin(progress * Math.PI / 2), 2);
	const velocity = terminalVelocity * velocityProgress;

	return {
		altitude,
		velocity,
		progress,
		terminalVelocity
	};
}

// Animation configuration
export const ANIMATION_CONFIG = {
	PARACHUTIST: {
		ROTATION_RANGE: 5,     // degrees
		SWAY_PERIOD: 2,        // seconds
		DESCENT_SPEED: 1       // relative speed
	},
	OBJECTS: {
		MIN_SCALE: 0.3,
		MAX_SCALE: 2.0,
		MIN_OPACITY: 0.1,
		MAX_OPACITY: 0.3,
		SPAWN_INTERVAL: 800,   // ms
		MIN_SPEED: 15000,      // ms to cross screen
		MAX_SPEED: 25000      // ms to cross screen
	}
};