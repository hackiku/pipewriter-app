<!-- src/lib/pages/landing/sections/samples/BeforeAfterSlider.svelte -->
<!-- Improved BeforeAfterSlider.svelte - Keeping the Beautiful Islands! -->
<script lang="ts">
  import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-svelte';
  
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
  
  // Constants for cleaner calculations
  const PADDING = 12; // px - padding inside container
  const ISLAND_GAP = 12; // px - gap between islands
  const HANDLE_SIZE = 48; // px
  
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
      const y = event.clientY - rect.top;
      newPosition = Math.max(10, Math.min(90, (y / rect.height) * 100));
    } else {
      const x = event.clientX - rect.left;
      newPosition = Math.max(10, Math.min(90, (x / rect.width) * 100));
    }
    
    position = newPosition;
  }
  
  // Computed styles - much cleaner than the original calc() madness
  $: aspectRatio = isMobile ? 'aspect-[3/4]' : 'aspect-[16/9]';
  
  // Before island positioning (left/top portion)
  $: beforeIslandStyle = isMobile 
    ? `
        left: ${PADDING}px; 
        right: ${PADDING}px; 
        top: ${PADDING}px; 
        height: calc(${position}% - ${PADDING + ISLAND_GAP/2}px);
      ` 
    : `
        left: ${PADDING}px; 
        top: ${PADDING}px; 
        bottom: ${PADDING}px; 
        width: calc(${position}% - ${PADDING + ISLAND_GAP/2}px);
      `;
  
  // After island positioning (right/bottom portion)  
  $: afterIslandStyle = isMobile 
    ? `
        left: ${PADDING}px; 
        right: ${PADDING}px; 
        bottom: ${PADDING}px; 
        height: calc(${100 - position}% - ${PADDING + ISLAND_GAP/2}px);
      ` 
    : `
        right: ${PADDING}px; 
        top: ${PADDING}px; 
        bottom: ${PADDING}px; 
        width: calc(${100 - position}% - ${PADDING + ISLAND_GAP/2}px);
      `;
  
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
    class="absolute rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-lg 
           transition-all duration-75 ease-out"
    style={beforeIslandStyle}
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
    class="absolute rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-lg
           transition-all duration-75 ease-out"
    style={afterIslandStyle}
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
           shadow-lg flex items-center justify-center z-30 pointer-events-none
           transition-all duration-100 ease-out"
    class:scale-110={isDragging}
    class:shadow-xl={isDragging}
    style={handleStyle}
  >
    {#if isMobile}
      <!-- Vertical handle indicator -->
      <div class="flex flex-col -gap-4">
				<ChevronUp class="h-5 w-5"/>
				<ChevronDown class="h-5 w-5"/>
      </div>
    {:else}
      <!-- Horizontal handle indicator -->
      <div class="flex -gap-1">
				<ChevronLeft />
				<ChevronRight />
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