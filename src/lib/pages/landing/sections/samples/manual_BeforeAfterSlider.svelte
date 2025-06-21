<!-- src/lib/pages/landing/sections/samples/BeforeAfterSlider.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import TestimonialBubble from './TestimonialBubble.svelte';
  import type { SampleTestimonial } from './data';
  
  // Props
  export let beforeImage: string = '';
  export let afterImage: string = '';
  export let beforeLabel: string = 'Google Docs';
  export let afterLabel: string = 'Live Website';
  export let testimonial: SampleTestimonial | null = null;
  
  // State variables
  let sliderPosition = 50;
  let containerRef: HTMLDivElement;
  let dragAreaRef: HTMLDivElement;
  let isDragging = false;
  let isMobile = false;
  
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
  
  function handleStart(event: MouseEvent | TouchEvent) {
    // Only start dragging if we're in the drag area
    const target = event.target as Element;
    if (!dragAreaRef?.contains(target)) return;
    
    isDragging = true;
    
    if (event instanceof MouseEvent) {
      updateSliderPosition(event);
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    } else {
      updateSliderPosition(event.touches[0]);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }
    
    event.preventDefault();
  }
  
  function handleMove(event: MouseEvent | TouchEvent) {
    if (!isDragging) return;
    
    if (event instanceof MouseEvent) {
      updateSliderPosition(event);
    } else {
      updateSliderPosition(event.touches[0]);
      event.preventDefault();
    }
  }
  
  function handleEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
  }
  
  function updateSliderPosition(point: MouseEvent | Touch) {
    if (!containerRef) return;
    
    const rect = containerRef.getBoundingClientRect();
    
    if (isMobile) {
      const y = point.clientY - rect.top;
      sliderPosition = Math.max(0, Math.min(100, (y / rect.height) * 100));
    } else {
      const x = point.clientX - rect.left;
      sliderPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    }
  }
  
  // Styles
  $: clipPath = isMobile
    ? `polygon(0 0, 100% 0, 100% ${sliderPosition}%, 0 ${sliderPosition}%)`
    : `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`;
    
  $: aspectRatio = isMobile ? 'aspect-[3/4]' : 'aspect-[16/9]';
  
  // Drag area styles - centered strip
  $: dragAreaStyles = isMobile
    ? `top: ${sliderPosition - 5}%; height: 10%; left: 0; right: 0;`
    : `left: ${sliderPosition - 5}%; width: 10%; top: 0; bottom: 0;`;
    
  // Handle styles
  $: handleStyles = isMobile
    ? `top: ${sliderPosition}%; left: 50%; transform: translate(-50%, -50%);`
    : `left: ${sliderPosition}%; top: 50%; transform: translate(-50%, -50%);`;
    
  // Slider line styles
  $: lineStyles = isMobile
    ? `top: ${sliderPosition}%; left: 0; right: 0; height: 2px;`
    : `left: ${sliderPosition}%; top: 0; bottom: 0; width: 2px;`;
    
  // Label positions
  $: labelClasses = isMobile 
    ? { before: 'top-4 left-4', after: 'top-4 left-4' }
    : { before: 'bottom-4 left-4', after: 'top-4 right-4' };
</script>

<div
  bind:this={containerRef}
  class="relative w-full {aspectRatio} rounded-2xl overflow-hidden select-none"
  on:mousedown={handleStart}
  on:touchstart={handleStart}
>
  <!-- Before Content -->
  <div class="absolute inset-0">
    {#if beforeImage}
      <img src={beforeImage} alt="Before - {beforeLabel}" class="w-full h-full object-cover" />
    {:else}
      <div class="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
        <span class="text-muted-foreground">Before Image</span>
      </div>
    {/if}
  </div>
  
  <!-- After Content -->
  <div class="absolute inset-0" style="clip-path: {clipPath}">
    {#if afterImage}
      <img src={afterImage} alt="After - {afterLabel}" class="w-full h-full object-cover" />
    {:else}
      <div class="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
        <span class="text-muted-foreground">After Image</span>
      </div>
    {/if}
    
    <!-- Testimonial Bubble -->
    {#if testimonial}
      <TestimonialBubble {testimonial} {isMobile} />
    {/if}
  </div>
  
  <!-- Draggable Area (invisible but larger hit target) -->
  <div
    bind:this={dragAreaRef}
    class="absolute z-10 cursor-grab active:cursor-grabbing"
    class:cursor-ns-resize={isMobile}
    class:cursor-ew-resize={!isMobile}
    style={dragAreaStyles}
  ></div>
  
  <!-- Slider Line -->
  <div 
    class="absolute bg-gradient-to-r from-[#3644FE] to-[#B345ED] pointer-events-none shadow-lg z-20"
    style={lineStyles}
  ></div>
  
  <!-- Handle -->
  <div 
    class="absolute w-12 h-12 bg-white dark:bg-zinc-900 rounded-full border-2 border-primary shadow-xl flex items-center justify-center z-30 pointer-events-none transition-transform duration-100"
    class:scale-110={isDragging}
    style={handleStyles}
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
  
  <!-- Labels -->
  <div class="absolute {labelClasses.before} px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg pointer-events-none z-20">
    {beforeLabel}
  </div>
  <div class="absolute {labelClasses.after} px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg pointer-events-none z-20">
    {afterLabel}
  </div>
  
  <!-- Drag Hint -->
  <div class="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-20">
    {isMobile ? 'Drag up/down' : 'Drag left/right'}
  </div>
</div>