<!-- src/lib/pages/landing/sections/features/video/EnhancedVideoPlayer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { X, Maximize, Play } from 'lucide-svelte';
  import { loomVideoService } from '$lib/services/loomVideoService';
  import { processSteps } from '../processData';
  
  export let onClose: () => void;
  export let startTime: number = 0;
  export let stepId: string = 'addon';
  
  // State
  let isLoading = true;
  let showPreview = true;
  let videoHTML = '';
  let error = '';
  
  // Get current step data
  $: currentStep = processSteps.find(step => step.id === stepId) || processSteps[0];
  $: previewFrame = currentStep.videoFrame;
  
  onMount(async () => {
    await loadVideo();
  });
  
  async function loadVideo() {
    try {
      isLoading = true;
      showPreview = true;
      
      // Show preview immediately
      setTimeout(() => showPreview = true, 0);
      
      // Load video HTML in background using preloaded data
      videoHTML = await loomVideoService.getVideoHTML(stepId, startTime, { width: 800 });
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        isLoading = false;
        showPreview = false;
      }, 800);
      
      // Preload next likely video
      const currentIndex = processSteps.findIndex(step => step.id === stepId);
      await loomVideoService.preloadNext(currentIndex);
      
    } catch (err) {
      console.error('Video loading error:', err);
      error = 'Failed to load video';
      isLoading = false;
      showPreview = false;
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
  
  function openFullscreen() {
    const fullUrl = `https://www.loom.com/share/8139bde5d3e140e988b48bb32914d068${startTime > 0 ? `?t=${startTime}` : ''}`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
    onClose();
  }
  
  // Handle clicking on preview to start video
  function handlePreviewClick() {
    if (showPreview && !isLoading) {
      showPreview = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Overlay -->
<div
  class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
  transition:fade={{ duration: 200 }}
  on:click={onClose}
  role="button"
  tabindex="0"
  aria-label="Close video"
/>

<!-- Video Container -->
<div
  class="fixed inset-4 z-50 m-auto max-w-5xl h-fit rounded-2xl overflow-hidden
         bg-background shadow-2xl"
  transition:scale={{ duration: 300, start: 0.95 }}
  on:click|stopPropagation
  role="dialog"
  aria-modal="true"
>
  <!-- Header with Controls -->
  <div class="flex items-center justify-between p-4 bg-background border-b border-border">
    <div class="flex items-center gap-3">
      <div class="text-lg font-semibold">
        {currentStep.title} Demo
      </div>
      {#if startTime > 0}
        <div class="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
          Starting at {Math.floor(startTime / 60)}:{String(startTime % 60).padStart(2, '0')}
        </div>
      {/if}
    </div>
    
    <div class="flex items-center gap-2">
      <!-- Fullscreen Button -->
      <button
        class="p-2 rounded-lg hover:bg-muted transition-colors"
        on:click={openFullscreen}
        title="Open in fullscreen"
      >
        <Maximize class="w-4 h-4" />
      </button>
      
      <!-- Close Button -->
      <button
        class="p-2 rounded-lg hover:bg-muted transition-colors"
        on:click={onClose}
        title="Close video (Esc)"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>

  <!-- Video Area -->
  <div class="relative pb-[56.25%] h-0 bg-muted">
    
    <!-- Preview Frame (Shows Immediately) -->
    {#if showPreview}
      <div 
        class="absolute inset-0 cursor-pointer"
        on:click={handlePreviewClick}
        role="button"
        tabindex="0"
        transition:fade={{ duration: 300 }}
      >
        <img 
          src={previewFrame} 
          alt="{currentStep.title} preview" 
          class="w-full h-full object-cover"
        />
        
        <!-- Loading State -->
        {#if isLoading}
          <div class="absolute inset-0 flex items-center justify-center bg-black/40">
            <div class="flex flex-col items-center gap-3 text-white">
              <div class="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
              <div class="text-sm font-medium">Loading video...</div>
            </div>
          </div>
        {:else}
          <!-- Play Button Overlay -->
          <div class="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Play class="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        {/if}
      </div>
    {/if}
    
    <!-- Actual Video Embed (Preloaded) -->
    {#if !showPreview && videoHTML && !error}
      <div 
        class="absolute inset-0"
        transition:fade={{ duration: 400 }}
      >
        {@html videoHTML}
      </div>
    {/if}
    
    <!-- Error State -->
    {#if error}
      <div class="absolute inset-0 flex items-center justify-center bg-muted">
        <div class="text-center">
          <div class="text-destructive font-medium mb-2">Video Loading Error</div>
          <button 
            class="text-sm text-primary hover:underline"
            on:click={loadVideo}
          >
            Try Again
          </button>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Footer -->
  <div class="p-4 bg-muted/30 text-center">
    <p class="text-sm text-muted-foreground">
      Press <kbd class="px-1 py-0.5 text-xs font-mono bg-muted rounded">Esc</kbd> to close
      • <button on:click={openFullscreen} class="text-primary hover:underline">Open in new tab</button>
    </p>
  </div>
</div>

<style>
  kbd {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  /* Ensure Loom embeds fill container */
  :global(iframe) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
</style>