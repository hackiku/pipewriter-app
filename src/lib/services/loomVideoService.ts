// src/lib/services/loomVideoService.ts
// import loomEmbedPkg from '@loomhq/loom-embed';
import { processSteps } from '$lib/pages/landing/sections/features/processData';
import { browser } from '$app/environment';
import { oembed } from "@loomhq/loom-embed";


// Fix CommonJS import
// const { oembed } = loomEmbedPkg;

// Video configuration
const LOOM_VIDEO_ID = "8139bde5d3e140e988b48bb32914d068";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get Loom app ID from environment
const LOOM_PUBLIC_APP_ID = browser ? import.meta.env.VITE_LOOM_PUBLIC_APP_ID : '';

interface VideoData {
	html: string;
	timestamp: number;
	stepId: string;
	cachedAt: number;
}

class LoomVideoService {
	private cache = new Map<string, VideoData>();
	private preloadPromises = new Map<string, Promise<VideoData>>();
	private initialized = false;

	/**
	 * Initialize video service (call this when needed, not automatically)
	 */
	async initialize(): Promise<void> {
		if (this.initialized || !browser) return;

		try {
			this.initialized = true;
			console.log('📹 Initializing Loom video service...');

			// Start preloading in background
			this.preloadAllSteps();
		} catch (error) {
			console.warn('Loom video service initialization failed:', error);
		}
	}

	/**
	 * Get video HTML for a specific step with timestamp
	 */
	async getVideoHTML(stepId: string, timestamp: number, options = { width: 800 }): Promise<string> {
		const cacheKey = `${stepId}-${timestamp}`;

		// Check cache first
		const cached = this.getCached(cacheKey);
		if (cached) {
			return cached.html;
		}

		// Check if already preloading
		if (this.preloadPromises.has(cacheKey)) {
			const preloaded = await this.preloadPromises.get(cacheKey)!;
			return preloaded.html;
		}

		// Generate new embed
		return this.generateVideoHTML(stepId, timestamp, options);
	}

	/**
	 * Preload video HTML for all steps
	 */
	async preloadAllSteps(): Promise<void> {
		const preloadPromises = processSteps.map(step =>
			this.preloadVideo(step.id, step.timestamp)
		);

		await Promise.all(preloadPromises);
		console.log('✅ All Loom videos preloaded');
	}

	/**
	 * Preload a specific video
	 */
	async preloadVideo(stepId: string, timestamp: number): Promise<VideoData> {
		const cacheKey = `${stepId}-${timestamp}`;

		if (!this.preloadPromises.has(cacheKey)) {
			this.preloadPromises.set(cacheKey, this.loadVideoData(stepId, timestamp));
		}

		return this.preloadPromises.get(cacheKey)!;
	}

	/**
	 * Generate video HTML using Loom SDK
	 */
	private async generateVideoHTML(stepId: string, timestamp: number, options = { width: 800 }): Promise<string> {
		try {
			// Build Loom share URL with timestamp
			const shareUrl = `https://www.loom.com/share/${LOOM_VIDEO_ID}${timestamp > 0 ? `?t=${timestamp}` : ''}`;

			// Use Loom SDK oembed for better performance
			const { html } = await oembed(shareUrl, {
				width: options.width,
				height: Math.round(options.width * 0.5625), // 16:9 aspect ratio
			});

			return html;
		} catch (error) {
			console.error('Failed to generate Loom embed:', error);

			// Fallback to direct iframe
			return this.getFallbackHTML(timestamp, options.width);
		}
	}

	/**
	 * Load and cache video data
	 */
	private async loadVideoData(stepId: string, timestamp: number): Promise<VideoData> {
		const html = await this.generateVideoHTML(stepId, timestamp);

		const videoData: VideoData = {
			html,
			timestamp,
			stepId,
			cachedAt: Date.now()
		};

		// Cache the result
		const cacheKey = `${stepId}-${timestamp}`;
		this.cache.set(cacheKey, videoData);

		return videoData;
	}

	/**
	 * Get cached video data if still valid
	 */
	private getCached(cacheKey: string): VideoData | null {
		const cached = this.cache.get(cacheKey);

		if (cached && (Date.now() - cached.cachedAt) < CACHE_DURATION) {
			return cached;
		}

		if (cached) {
			this.cache.delete(cacheKey);
		}

		return null;
	}

	/**
	 * Fallback iframe HTML
	 */
	private getFallbackHTML(timestamp: number, width: number): string {
		const height = Math.round(width * 0.5625);
		const src = `https://www.loom.com/embed/${LOOM_VIDEO_ID}?autoplay=1${timestamp > 0 ? `&t=${timestamp}` : ''}`;

		return `
      <iframe 
        src="${src}"
        frameborder="0" 
        webkitallowfullscreen 
        mozallowfullscreen 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: ${width}px; height: ${height}px;"
        title="Pipewriter Demo Video">
      </iframe>
    `;
	}

	/**
	 * Preload next likely video based on current step
	 */
	async preloadNext(currentStepIndex: number): Promise<void> {
		const nextIndex = (currentStepIndex + 1) % processSteps.length;
		const nextStep = processSteps[nextIndex];

		await this.preloadVideo(nextStep.id, nextStep.timestamp);
	}

	/**
	 * Clear cache (useful for development)
	 */
	clearCache(): void {
		this.cache.clear();
		this.preloadPromises.clear();
	}
}

// Export singleton instance
export const loomVideoService = new LoomVideoService();