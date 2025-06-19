<!-- src/lib/pages/landing/sections/samples/BeforeAfterSlider.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Props
  export let beforeImage: string = '';
  export let afterImage: string = '';
  export let beforeLabel: string = 'Google Docs';
  export let afterLabel: string = 'Live Website';
  
  // State variables
  let sliderPosition = 50; // Percentage
  let containerRef: HTMLDivElement;
  let isDragging = false;
  let isMobile = false;
  let animationFrame: number;
  
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768; // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
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
  
  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    updateSliderPosition(event);
    event.preventDefault();
  }
  
  function handleTouchStart(event: TouchEvent) {
    isDragging = true;
    updateSliderPosition(event.touches[0]);
    event.preventDefault();
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    updateSliderPosition(event);
  }
  
  function handleTouchMove(event: TouchEvent) {
    if (!isDragging) return;
    updateSliderPosition(event.touches[0]);
    event.preventDefault();
  }
  
  function handleEnd() {
    isDragging = false;
  }
  
  function updateSliderPosition(event: MouseEvent | Touch) {
    if (!containerRef) return;
    
    // Cancel any pending animation frame
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    // Use requestAnimationFrame for smooth updates
    animationFrame = requestAnimationFrame(() => {
      const rect = containerRef.getBoundingClientRect();
      let percentage: number;
      
      if (isMobile) {
        // Vertical sliding for mobile (up/down)
        const y = event.clientY - rect.top;
        percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
      } else {
        // Horizontal sliding for desktop (left/right)
        const x = event.clientX - rect.left;
        percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      }
      
      sliderPosition = percentage;
      
      // Update CSS custom properties for hardware acceleration
      containerRef.style.setProperty('--slider-position', `${percentage}%`);
    });
  }
  
  // Reactive statements for dynamic styles
  $: clipPath = isMobile
    ? `polygon(0 0, 100% 0, 100% ${sliderPosition}%, 0 ${sliderPosition}%)`
    : `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`;
  
  $: sliderStyles = isMobile
    ? `top: ${sliderPosition}%; left: 0; right: 0; height: 2px;`
    : `left: ${sliderPosition}%; top: 0; bottom: 0; width: 2px;`;
    
  $: handleStyles = isMobile
    ? `top: ${sliderPosition}%; left: 50%; transform: translate(-50%, -50%);`
    : `left: ${sliderPosition}%; top: 50%; transform: translate(-50%, -50%);`;
    
  // Mobile gets vertical aspect ratio
  $: aspectRatio = isMobile ? 'aspect-[3/4]' : 'aspect-[16/9]';
</script>

<div
  bind:this={containerRef}
  class="relative w-full {aspectRatio} rounded-2xl overflow-hidden 
         cursor-crosshair select-none transition-all duration-200"
  on:mousedown={handleMouseDown}
  on:touchstart={handleTouchStart}
  role="slider"
  tabindex="0"
  aria-label="Before and after comparison slider"
  aria-valuenow={sliderPosition}
  aria-valuemin={0}
  aria-valuemax={100}
>
  <!-- Before Content -->
  <div class="absolute inset-0">
    {#if beforeImage}
      <img src={beforeImage} alt="Before - {beforeLabel}" class="w-full h-full object-cover" />
    {:else}
      <!-- Simple placeholder for future image -->
      <div class="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        <!-- This will be replaced with actual image -->
      </div>
    {/if}
  </div>
  
  <!-- After Content -->
  <div 
    class="absolute inset-0"
    style="clip-path: {clipPath}"
  >
    {#if afterImage}
      <img src={afterImage} alt="After - {afterLabel}" class="w-full h-full object-cover" />
    {:else}
      <!-- Simple placeholder for future image -->
      <div class="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20">
        <!-- This will be replaced with actual image -->
      </div>
    {/if}
  </div>
  
  <!-- Slider Line -->
  <div 
    class="absolute bg-gradient-to-r from-[#3644FE] to-[#B345ED] z-10 pointer-events-none
           shadow-lg"
    style={sliderStyles}
  ></div>
  
  <!-- Slider Handle -->
  <div 
    class="absolute w-12 h-12 bg-white dark:bg-zinc-900 rounded-full border-2
           border-primary shadow-xl flex items-center justify-center z-20
           hover:scale-110 transition-all duration-200 cursor-grab active:cursor-grabbing
           {isDragging ? 'scale-110 shadow-2xl' : ''}"
    style={handleStyles}
  >
    {#if isMobile}
      <!-- Vertical handle icon for mobile (up/down drag) -->
      <div class="flex flex-col gap-1">
        <div class="w-5 h-0.5 bg-primary rounded-full"></div>
        <div class="w-5 h-0.5 bg-primary rounded-full"></div>
        <div class="w-5 h-0.5 bg-primary rounded-full"></div>
      </div>
    {:else}
      <!-- Horizontal handle icon for desktop (left/right drag) -->
      <div class="flex gap-1">
        <div class="w-0.5 h-5 bg-primary rounded-full"></div>
        <div class="w-0.5 h-5 bg-primary rounded-full"></div>
        <div class="w-0.5 h-5 bg-primary rounded-full"></div>
      </div>
    {/if}
  </div>
  
  <!-- Labels -->
  <div class="absolute bottom-4 left-4 px-4 py-2 bg-black/70 backdrop-blur-sm
              rounded-full text-white text-sm font-medium shadow-lg">
    {beforeLabel}
  </div>
  <div class="absolute bottom-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-sm
              rounded-full text-white text-sm font-medium shadow-lg">
    {afterLabel}
  </div>
  
  <!-- Interaction Hint -->
  <div class="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 
              bg-black/50 backdrop-blur-sm rounded-full text-white text-xs
              opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
    {isMobile ? 'Drag up/down' : 'Drag left/right'}
  </div>
</div>