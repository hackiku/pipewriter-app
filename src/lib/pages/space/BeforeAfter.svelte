<!-- src/lib/pages/space/BeforeAfter.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { redesignsStore } from '$lib/stores/chuteStore';
  
  let sliderPosition = 50;
  let isDragging = false;
  let containerRef: HTMLDivElement;
  
  $: currentExample = $redesignsStore.examples[$redesignsStore.currentIndex];
  
  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !containerRef) return;
    
    const rect = containerRef.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    sliderPosition = (x / rect.width) * 100;
  }
  
  function handleMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }
  
  onMount(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });
</script>

<div class="container">
  <div class="max-w-5xl mx-auto">
    
    <!-- Slider Container -->
    <div 
      bind:this={containerRef}
      class="relative aspect-[16/9] rounded-xl overflow-hidden border bg-card"
    >
      <!-- Before - Original Site -->
      <div class="absolute inset-0">
        <iframe 
          src={currentExample.beforeUrl}
          title={`${currentExample.company} original website`}
          class="w-full h-full"
        />
      </div>

      <!-- After - Redesigned Version -->
      <div 
        class="absolute inset-0 bg-primary/10"
        style:clip-path="inset(0 {100 - sliderPosition}% 0 0)"
      >
        <div class="w-full h-full flex items-center justify-center">
          <div class="text-lg font-medium">
            Redesigned Version
          </div>
        </div>
      </div>

      <!-- Slider Handle -->
      <div 
        class="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
        style:left="{sliderPosition}%"
        style:transform="translateX(-50%)"
        on:mousedown={handleMouseDown}
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-8 h-8 rounded-full bg-white shadow-lg
                    flex items-center justify-center">
          <div class="w-4 h-4 rounded-full bg-primary" />
        </div>
      </div>

      <!-- Labels -->
      <div class="absolute bottom-4 left-4 text-sm font-medium text-white">
        Original Site
      </div>
      <div class="absolute bottom-4 right-4 text-sm font-medium text-white">
        Redesigned
      </div>
    </div>

    <!-- Company Info -->
    <div class="mt-6 text-center">
      <h3 class="text-xl font-semibold">
        {currentExample.company}
      </h3>
      <p class="text-muted-foreground mt-2">
        {currentExample.description}
      </p>
    </div>
  </div>
</div>

<style>
  iframe {
    pointer-events: none; /* Prevent iframe interaction while dragging */
  }
</style>