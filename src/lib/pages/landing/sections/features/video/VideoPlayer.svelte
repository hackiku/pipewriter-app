<!-- src/lib/pages/landing/sections/features/video/VideoPlayer.svelte -->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { X, Maximize } from 'lucide-svelte';
  
  export let onClose: () => void;
  export let startTime: number = 0;
  
  // Loom video ID - update this with your actual video
  // const LOOM_VIDEO_ID = "2dd12f155c834c83bdaa3f9e2cb1e011"; // old 2-min vid
  const LOOM_VIDEO_ID = "8139bde5d3e140e988b48bb32914d068";
  
  // Build Loom URL with timestamp
  $: loomUrl = `https://www.loom.com/embed/${LOOM_VIDEO_ID}?autoplay=1${startTime > 0 ? `&t=${startTime}` : ''}`;
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
  
  function openFullscreen() {
    // Open in new tab for true fullscreen experience
    const fullUrl = `https://www.loom.com/share/${LOOM_VIDEO_ID}${startTime > 0 ? `?t=${startTime}` : ''}`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
    onClose();
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
      <div class="text-lg font-semibold">Pipewriter Demo</div>
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

  <!-- Video Embed -->
  <div class="relative pb-[56.25%] h-0 bg-muted">
    <iframe
      src={loomUrl}
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
      class="absolute top-0 left-0 w-full h-full"
      title="Pipewriter Demo Video"
    />
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
</style>