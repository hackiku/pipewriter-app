// src/lib/pages/space/components/chute/physics.ts

// Constants
export const PHYSICS = {
	INITIAL_ALTITUDE: 95935.8, // X-15 record (m)
	FINAL_ALTITUDE: 300,       // Landing altitude (m)
	GRAVITY: 9.81,            // m/s^2
	AIR_DENSITY: 1.225,       // kg/m^3 at sea level
	CHUTE_AREA: 40,           // m^2
	MASS: 80,                 // kg (person + equipment)
	ANIMATION_DURATION: 30000, // 30 seconds for full descent
}

// Basic linear interpolation for now
// Will be replaced with proper physics later
export function calculateState(elapsed: number) {
	const progress = Math.min(elapsed / PHYSICS.ANIMATION_DURATION, 1);

	const altitude = PHYSICS.INITIAL_ALTITUDE +
		(PHYSICS.FINAL_ALTITUDE - PHYSICS.INITIAL_ALTITUDE) * progress;

	// Simple velocity calculation (will be replaced with proper physics)
	const velocity = 20 * (1 - Math.cos(progress * Math.PI / 2));

	return {
		altitude,
		velocity,
		progress
	};
}

// Cloud animation parameters
export const CLOUD_CONFIG = {
	SPAWN_INTERVAL: 800,      // ms between spawns
	TRAVEL_DURATION: 3000,    // ms to cross screen
	MIN_SCALE: 0.5,
	MAX_SCALE: 2.0,
	MIN_OPACITY: 0.1,
	MAX_OPACITY: 0.3,
}

// Helicopter animation parameters
export const HELI_CONFIG = {
	APPEAR_AFTER: 5000,       // ms before helicopter appears
	HOVER_AMPLITUDE: 5,       // pixels
	HOVER_FREQUENCY: 2,       // Hz
	ROTOR_SPEED: 720,        // deg/s
}