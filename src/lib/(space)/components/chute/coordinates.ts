// src/lib/(space)/components/chute/coordinates.ts

export const VIEWPORT = {
	parachutist: {
		// desktop
		// x: 70,              // Right-biased position
		// y: 30,              // Upper third of viewport
		// size: 18            // Increased base size in vh
		// mobile
		x: 40,              // Right-biased position
		y: 65,              // Upper third of viewport
		size: 14            // Increased base size in vh
	},

	planet: {
		initial: {
			// scale: 0.18,       // mobile
			scale: 0.25,       // desktop
			// y: 12,            // Start higher in viewport
			x: 50,            // doesnt seem to be working
			y: 12,            // desktop
			// y: -10,            // mobile
		},
		final: {
			scale: 2.8,       // Larger final scale
			x: 0,             // Center at end
			y: -600,           // End position below viewport
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