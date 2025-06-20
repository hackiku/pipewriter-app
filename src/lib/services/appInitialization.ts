// src/lib/services/appInitialization.ts
import { browser } from '$app/environment';
import { loomVideoService } from './loomVideoService';

class AppInitializationService {
	private initialized = false;

	async initialize() {
		if (!browser || this.initialized) return;

		try {
			console.log('🚀 Initializing Pipewriter app services...');

			// Start video preloading immediately
			await this.initializeVideoService();

			// Other initialization tasks can go here
			await this.initializeAnalytics();

			this.initialized = true;
			console.log('✅ App initialization complete');

		} catch (error) {
			console.error('❌ App initialization failed:', error);
		}
	}

	private async initializeVideoService() {
		try {
			// Check if we're on a page that needs videos
			const needsVideo = window.location.pathname === '/' ||
				window.location.pathname.includes('features');

			if (needsVideo) {
				console.log('📹 Starting video preloading...');
				// This starts preloading all video embeds in background
				loomVideoService.preloadAllSteps();
			}
		} catch (error) {
			console.warn('Video service initialization failed:', error);
		}
	}

	private async initializeAnalytics() {
		// Placeholder for other analytics or tracking
		// Could include Mixpanel, PostHog, etc.
		console.log('📊 Analytics initialized');
	}

	// Utility to check if app is ready
	isReady(): boolean {
		return this.initialized;
	}
}

// Export singleton
export const appInitialization = new AppInitializationService();

// Auto-initialize when imported (for layout)
if (browser) {
	appInitialization.initialize();
}