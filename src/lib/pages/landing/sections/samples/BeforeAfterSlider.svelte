<!-- src/lib/pages/landing/sections/samples/BeforeAfterSlider.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Props
  export let beforeImage: string = '';
  export let afterImage: string = '';
  export let position = 60; // Controlled by parent (percentage)
  
  // State variables
  let isMobile = false;
  let isDragging = false;
  let containerRef: HTMLDivElement;
  
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    
    // Touch events
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  });
  
  function handleStart(event: MouseEvent | TouchEvent) {
    isDragging = true;
    updatePosition(event);
    event.preventDefault();
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    updatePosition(event);
  }
  
  function handleTouchMove(event: TouchEvent) {
    if (!isDragging) return;
    updatePosition(event.touches[0]);
    event.preventDefault();
  }
  
  function handleEnd() {
    isDragging = false;
  }
  
  function updatePosition(point: MouseEvent | Touch) {
    if (!containerRef) return;
    
    const rect = containerRef.getBoundingClientRect();
    let newPosition: number;
    
    if (isMobile) {
      // Vertical dragging for mobile
      const y = point.clientY - rect.top;
      newPosition = Math.max(5, Math.min(95, (y / rect.height) * 100));
    } else {
      // Horizontal dragging for desktop
      const x = point.clientX - rect.left;
      newPosition = Math.max(5, Math.min(95, (x / rect.width) * 100));
    }
    
    position = newPosition;
  }
  
  // Mobile gets vertical aspect ratio, desktop gets horizontal
  $: aspectRatio = isMobile ? 'aspect-[3/4]' : 'aspect-[16/10]';
  
  // Clip path for after image to reveal it progressively
  $: clipPath = isMobile
    ? `polygon(0 0, 100% 0, 100% ${position}%, 0 ${position}%)`
    : `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
    
  // Divider position
  $: dividerStyles = isMobile
    ? `top: ${position}%; left: 0; right: 0; height: 8px; transform: translateY(-50%);`
    : `left: ${position}%; top: 0; bottom: 0; width: 8px; transform: translateX(-50%);`;
    
  // Handle position
  $: handleStyles = isMobile
    ? `top: ${position}%; left: 50%; transform: translate(-50%, -50%);`
    : `left: ${position}%; top: 50%; transform: translate(-50%, -50%);`;
</script>

<div bind:this={containerRef} class="relative w-full {aspectRatio} rounded-2xl overflow-hidden select-none">
  
  <!-- Before Image Container -->
  <div class="absolute inset-0 rounded-2xl overflow-hidden">
    <div class="h-full mr-1 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
      {#if beforeImage}
        <img 
          src={beforeImage} 
          alt="Before image" 
          class="w-full h-full object-cover select-none pointer-events-none"
          draggable="false"
        />
      {:else}
        <div class="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
          <span class="text-muted-foreground select-none">Before Image</span>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- After Image Container (clipped) -->
  <div class="absolute inset-0 rounded-2xl overflow-hidden" style="clip-path: {clipPath}">
    <div class="h-full ml-1 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
      {#if afterImage}
        <img 
          src={afterImage} 
          alt="After image" 
          class="w-full h-full object-cover select-none pointer-events-none"
          draggable="false"
        />
      {:else}
        <div class="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
          <span class="text-muted-foreground select-none">After Image</span>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Draggable Divider (matches wrapper background) -->
  <div 
    class="absolute cursor-grab active:cursor-grabbing z-30"
    style={dividerStyles}
    on:mousedown={handleStart}
    on:touchstart={handleStart}
    role="slider"
    tabindex="0"
    aria-label="Adjust comparison"
    aria-valuenow={position}
    aria-valuemin={5}
    aria-valuemax={95}
  >
    <!-- Divider background (matches wrapper) -->
    <div class="w-full h-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
      <!-- Optional divider line -->
      <!-- <div class="absolute {isMobile ? 'w-full h-0.5 left-0' : 'h-full w-0.5 top-0'} bg-gradient-to-r from-[#3644FE] to-[#B345ED]"></div> -->
    </div>
  </div>
  
  <!-- Draggable Handle -->

  <div 
    class="absolute w-12 h-12 bg-white dark:bg-zinc-900 rounded-full border-2 border-primary shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-grab active:cursor-grabbing z-40"
    style={handleStyles}
    on:mousedown={handleStart}
    on:touchstart={handleStart}
    role="button"
    tabindex="0"
    aria-label="Drag to adjust comparison"
  >
    {#if isMobile}
      <div class="flex flex-col gap-1">
        <div class="w-5 h-0.5 bg-primary rounded-full"></div>
        <div class="w-5 h-0.5 bg-primary rounded-full"></div>
        <div class="w-5 h-0.5 bg-primary rounded-full"></div>
      </div>
    {:else}
      <div class="flex gap-1">
        <div class="w-0.5 h-5 bg-primary rounded-full"></div>
        <div class="w-0.5 h-5 bg-primary rounded-full"></div>
        <div class="w-0.5 h-5 bg-primary rounded-full"></div>
      </div>
    {/if}
  </div>
  
  <!-- Interaction Hint -->
  <div class="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-20">
    {isMobile ? 'Drag up/down' : 'Drag left/right'}
  </div>
</div>

<style>
  /* Prevent image interactions */
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Ensure smooth dragging */
  [role="slider"], [role="button"] {
    touch-action: none;
  }
</style>