// src/lib/(space)/components/chute/coordinates.ts

export const VIEWPORT = {
	parachutist: {
		x: 65,              // Right-biased position
		y: 35,              // Upper third of viewport
		size: 12            // Increased base size in vh
	},

	planet: {
		initial: {
			scale: 1.2,       // Larger initial scale for visibility
			x: 30,            // Centered horizontally
			y: 20,            // Start higher in viewport
		},
		final: {
			scale: 2.8,       // Larger final scale
			x: 0,             // Center at end
			y: -10,           // End position below viewport
		}
	},
} as const;

export function interpolatePosition(
	start: number,
	end: number,
	progress: number
): number {
	return start + (end - start) * Math.min(Math.max(progress, 0), 1);
}