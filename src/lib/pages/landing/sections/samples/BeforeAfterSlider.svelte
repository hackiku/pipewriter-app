<!-- src/lib/pages/landing/sections/samples/BeforeAfterSlider.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Props
  export let beforeImage: string = '';
  export let afterImage: string = '';
  export let position = 60; // Controlled by parent (percentage)
  export let onInteractionStart: (() => void) | undefined = undefined;
  export let onInteractionEnd: (() => void) | undefined = undefined;
  
  // State
  let isMobile = false;
  let isDragging = false;
  let containerRef: HTMLDivElement;
  
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  });
  
  // Simplified drag handling with better performance
  function handlePointerDown(event: PointerEvent) {
    if (!containerRef) return;
    
    isDragging = true;
    onInteractionStart?.();
    containerRef.setPointerCapture(event.pointerId);
    updatePosition(event);
    
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e);
    };
    
    const handlePointerUp = () => {
      isDragging = false;
      onInteractionEnd?.();
      containerRef.removeEventListener('pointermove', handlePointerMove);
      containerRef.removeEventListener('pointerup', handlePointerUp);
    };
    
    containerRef.addEventListener('pointermove', handlePointerMove);
    containerRef.addEventListener('pointerup', handlePointerUp);
  }
  
  function updatePosition(event: PointerEvent) {
    if (!containerRef) return;
    
    const rect = containerRef.getBoundingClientRect();
    let newPosition: number;
    
    if (isMobile) {
      // Vertical dragging for mobile
      const y = event.clientY - rect.top;
      newPosition = Math.max(10, Math.min(90, (y / rect.height) * 100));
    } else {
      // Horizontal dragging for desktop
      const x = event.clientX - rect.left;
      newPosition = Math.max(10, Math.min(90, (x / rect.width) * 100));
    }
    
    position = newPosition;
  }
  
  // Handle label clicks to jump to positions
  function jumpToBefore() {
    position = 85;
  }
  
  function jumpToAfter() {
    position = 15;
  }
  
  // Aspect ratios
  $: aspectRatio = isMobile ? 'aspect-[3/4]' : 'aspect-[16/10]';
    
  // Handle positioning
  $: handleStyle = isMobile
    ? `top: ${position}%; left: 50%; transform: translate(-50%, -50%);`
    : `left: ${position}%; top: 50%; transform: translate(-50%, -50%);`;
</script>

<div 
  bind:this={containerRef}
  class="relative w-full {aspectRatio} rounded-2xl overflow-hidden 
         bg-neutral-200 dark:bg-neutral-900 
         cursor-grab active:cursor-grabbing select-none"
  class:cursor-ns-resize={isMobile}
  class:cursor-ew-resize={!isMobile}
  on:pointerdown={handlePointerDown}
  role="slider"
  tabindex="0"
  aria-label="Drag to compare before and after"
  aria-valuenow={position}
  aria-valuemin={10}
  aria-valuemax={90}
>
  
  
  <!-- Before Island - Shows left/top portion -->
  <div 
    class="absolute top-3 left-3 bottom-3 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-lg"
    style={isMobile 
      ? `right: 12px; height: calc(${position}% - 15px);` 
      : `width: calc(${position}% - 20px); right: auto;`}
  >
    {#if beforeImage}
      <img 
        src={beforeImage} 
        alt="Before - Google Docs wireframe" 
        class="w-full h-full object-cover pointer-events-none select-none"
        draggable="false"
      />
    {:else}
      <div class="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
        <span class="text-muted-foreground text-lg font-medium">Google Docs</span>
      </div>
    {/if}
  </div>
  
  <!-- After Island - Shows right/bottom portion -->
  <div 
    class="absolute top-3 right-3 bottom-3 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-lg"
    style={isMobile 
      ? `left: 12px; height: calc(${100 - position}% - 15px); top: calc(${position}% + 3px);` 
      : `width: calc(${100 - position}% - 20px); left: calc(${position}% + 3px);`}
  >
    {#if afterImage}
      <img 
        src={afterImage} 
        alt="After - Live website" 
        class="w-full h-full object-cover pointer-events-none select-none"
        draggable="false"
      />
    {:else}
      <div class="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
        <span class="text-muted-foreground text-lg font-medium">Live Website</span>
      </div>
    {/if}
  </div>
    
  <!-- Drag Handle -->
  <div 
    class="absolute w-12 h-12 bg-white dark:bg-zinc-900 rounded-full 
           border-2 border-neutral-300 dark:border-neutral-700
           shadow-sm flex items-center justify-center z-30 pointer-events-none
           transition-transform duration-100"
    class:scale-110={isDragging}
    style={handleStyle}
  >
    {#if isMobile}
      <!-- Vertical handle indicator -->
      <div class="flex flex-col gap-0.5">
        <div class="w-4 h-0.5 bg-neutral-500 dark:bg-neutral-400 rounded-full"></div>
        <div class="w-4 h-0.5 bg-neutral-500 dark:bg-neutral-400 rounded-full"></div>
        <div class="w-4 h-0.5 bg-neutral-500 dark:bg-neutral-400 rounded-full"></div>
      </div>
    {:else}
      <!-- Horizontal handle indicator -->
      <div class="flex gap-0.5">
        <div class="w-0.5 h-4 bg-neutral-500 dark:bg-neutral-400 rounded-full"></div>
        <div class="w-0.5 h-4 bg-neutral-500 dark:bg-neutral-400 rounded-full"></div>
        <div class="w-0.5 h-4 bg-neutral-500 dark:bg-neutral-400 rounded-full"></div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Prevent image dragging and selection */
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
  
  /* Better touch handling */
  [role="slider"] {
    touch-action: none;
  }
  
  /* Smooth cursor transitions */
  .cursor-grab:active {
    cursor: grabbing;
  }
</style>