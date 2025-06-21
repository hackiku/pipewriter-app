// src/lib/services/loomEmbedService.ts
import loomEmbedPkg from '@loomhq/loom-embed';
import { processSteps } from '$lib/pages/landing/sections/features/processData';
import { browser } from '$app/environment';

const { oembed } = loomEmbedPkg;
const LOOM_VIDEO_ID = "8139bde5d3e140e988b48bb32914d068";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface VideoData {
	html: string;
	timestamp: number;
	stepId: string;
	cachedAt: number;
}

class LoomEmbedService {
	private cache = new Map<string, VideoData>();
	private preloadPromises = new Map<string, Promise<VideoData>>();
	private initialized = false;

	async initialize(): Promise<void> {
		if (this.initialized || !browser) return;

		try {
			this.initialized = true;
			console.log('📹 Loom Embed Service initialized');

			// Start preloading videos in background
			this.preloadAllSteps();
		} catch (error) {
			console.warn('Loom service initialization failed:', error);
		}
	}

	/**
	 * Get video HTML using Loom's oembed API
	 */
	async getVideoHTML(stepId: string, timestamp: number, options = { width: 800 }): Promise<string> {
		const cacheKey = `${stepId}-${timestamp}`;

		// Check cache first
		const cached = this.getCached(cacheKey);
		if (cached) {
			console.log('📺 Using cached video for', stepId);
			return cached.html;
		}

		// Check if already loading
		if (this.preloadPromises.has(cacheKey)) {
			console.log('⏳ Video already loading for', stepId);
			const preloaded = await this.preloadPromises.get(cacheKey)!;
			return preloaded.html;
		}

		// Generate new embed
		console.log('🔄 Generating new embed for', stepId);
		return this.generateVideoHTML(stepId, timestamp, options);
	}

	/**
	 * Preload all video steps
	 */
	async preloadAllSteps(): Promise<void> {
		try {
			console.log('🚀 Starting video preload...');

			const preloadPromises = processSteps.map(step =>
				this.preloadVideo(step.id, step.timestamp)
			);

			await Promise.all(preloadPromises);
			console.log('✅ All videos preloaded successfully');
		} catch (error) {
			console.warn('⚠️ Video preloading failed:', error);
		}
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
	 * Generate video HTML using Loom oembed
	 */
	private async generateVideoHTML(stepId: string, timestamp: number, options = { width: 800 }): Promise<string> {
		try {
			// Build Loom share URL with timestamp
			const shareUrl = `https://www.loom.com/share/${LOOM_VIDEO_ID}${timestamp > 0 ? `?t=${timestamp}` : ''}`;

			console.log(`🎬 Fetching oembed for: ${shareUrl}`);

			// Use Loom's oembed API
			const embedData = await oembed(shareUrl, {
				width: options.width,
				height: Math.round(options.width * 0.5625), // 16:9 aspect ratio
			});

			console.log('✅ Loom oembed successful:', embedData);
			return embedData.html;

		} catch (error) {
			console.error('❌ Loom oembed failed:', error);

			// Fallback to direct iframe
			console.log('🔄 Using fallback iframe');
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
	 * Get cached video if still valid
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
	 * Fallback iframe HTML (always works)
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
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        title="Pipewriter Demo Video">
      </iframe>
    `;
	}

	/**
	 * Preload next video based on current step
	 */
	async preloadNext(currentStepIndex: number): Promise<void> {
		const nextIndex = (currentStepIndex + 1) % processSteps.length;
		const nextStep = processSteps[nextIndex];

		try {
			await this.preloadVideo(nextStep.id, nextStep.timestamp);
			console.log(`📋 Preloaded next video: ${nextStep.id}`);
		} catch (error) {
			console.warn('Failed to preload next video:', error);
		}
	}

	/**
	 * Clear cache
	 */
	clearCache(): void {
		this.cache.clear();
		this.preloadPromises.clear();
		console.log('🗑️ Video cache cleared');
	}

	/**
	 * Get debug info
	 */
	getDebugInfo(): any {
		return {
			initialized: this.initialized,
			cacheSize: this.cache.size,
			preloadPromisesSize: this.preloadPromises.size,
			loomVideoId: LOOM_VIDEO_ID,
			service: 'loom-embed'
		};
	}
}

// Export singleton
export const loomEmbedService = new LoomEmbedService();