// src/lib/(space)/components/chute/coordinates.ts

export const VIEWPORT = {
	parachutist: {
		x: 65,              // Right-biased position
		y: 35,              // Upper third of viewport
		size: 12            // Increased base size in vh
	},

	planet: {
		initial: {
			scale: 0.8,       // Increased initial scale
			x: 30,            // Shifted to right side
			y: 15,           // Lower initial position
		},
		final: {
			scale: 2.8,       // Larger final scale
			x: 0,             // Centered at end
			y: 0,             // Bottom aligned
		}
	},

	flight: {
		radius: 100,
		speed: {
			min: 0.8,
			max: 1.2
		}
	}
} as const;

export function interpolatePosition(
	start: number,
	end: number,
	progress: number
): number {
	return start + (end - start) * Math.min(Math.max(progress, 0), 1);
}