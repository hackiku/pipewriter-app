<!-- src/lib/pages/landing/sections/samples/BeforeAfterSlider.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  interface SliderProps {
    beforeImage?: string;
    afterImage?: string;
    beforeLabel?: string;
    afterLabel?: string;
    vertical?: boolean; // For mobile
  }
  
  const {
    beforeImage = '',
    afterImage = '',
    beforeLabel = 'Google Docs',
    afterLabel = 'Live Website',
    vertical = false
  }: SliderProps = $props();
  
  let sliderPosition = $state(50); // Percentage
  let containerRef: HTMLDivElement;
  let isDragging = $state(false);
  let isMobile = $state(false);
  
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 640; // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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
    
    const rect = containerRef.getBoundingClientRect();
    let percentage: number;
    
    if (vertical || isMobile) {
      // Vertical sliding for mobile
      const y = event.clientY - rect.top;
      percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
    } else {
      // Horizontal sliding for desktop
      const x = event.clientX - rect.left;
      percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    }
    
    sliderPosition = percentage;
  }
  
  onMount(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  });
  
  // Dynamic clip path based on orientation
  $: clipPath = vertical || isMobile
    ? `polygon(0 0, 100% 0, 100% ${sliderPosition}%, 0 ${sliderPosition}%)`
    : `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`;
  
  $: sliderStyles = vertical || isMobile
    ? `top: ${sliderPosition}%; left: 0; right: 0; height: 2px;`
    : `left: ${sliderPosition}%; top: 0; bottom: 0; width: 2px;`;
    
  $: handleStyles = vertical || isMobile
    ? `top: ${sliderPosition}%; left: 50%; transform: translate(-50%, -50%);`
    : `left: ${sliderPosition}%; top: 50%; transform: translate(-50%, -50%);`;
</script>

<div
  bind:this={containerRef}
  class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-border
         bg-gradient-to-br from-muted/20 to-muted/40 cursor-crosshair select-none
         transition-all duration-200 hover:border-primary/20"
  on:mousedown={handleMouseDown}
  on:touchstart={handleTouchStart}
  role="slider"
  tabindex="0"
  aria-label="Before and after comparison slider"
  aria-valuenow={sliderPosition}
  aria-valuemin={0}
  aria-valuemax={100}
>
  <!-- Before Image/Content (Google Docs mockup) -->
  <div class="absolute inset-0 bg-white dark:bg-zinc-900">
    {#if beforeImage}
      <img src={beforeImage} alt="Before" class="w-full h-full object-cover" />
    {:else}
      <!-- Mock Google Docs interface -->
      <div class="h-full flex flex-col">
        <!-- Docs header -->
        <div class="h-16 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700
                    flex items-center px-6 gap-4">
          <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span class="text-white text-sm font-bold">D</span>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Website Copy.gdoc
            </div>
          </div>
        </div>
        
        <!-- Docs content -->
        <div class="flex-1 p-8 bg-white dark:bg-zinc-900">
          <div class="max-w-2xl mx-auto space-y-4">
            <div class="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
            <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
            <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6"></div>
            <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-4/5"></div>
            
            <!-- Pipewriter element placeholder -->
            <div class="mt-8 p-4 border-2 border-dashed border-primary/30 rounded-lg">
              <div class="text-xs text-primary font-medium mb-2">PIPEWRITER ELEMENT</div>
              <div class="h-6 bg-primary/10 rounded w-2/3"></div>
            </div>
            
            <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
            <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- After Image/Content (Website mockup) -->
  <div 
    class="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/15"
    style="clip-path: {clipPath}"
  >
    {#if afterImage}
      <img src={afterImage} alt="After" class="w-full h-full object-cover" />
    {:else}
      <!-- Mock Website -->
      <div class="h-full flex flex-col">
        <!-- Website header -->
        <div class="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700
                    flex items-center px-6 justify-between">
          <div class="text-lg font-bold text-primary">Company Name</div>
          <div class="flex gap-4 text-sm">
            <span>Home</span>
            <span>Features</span>
            <span>Pricing</span>
          </div>
        </div>
        
        <!-- Website content -->
        <div class="flex-1 p-8">
          <div class="text-center space-y-6">
            <div class="h-12 bg-gradient-to-r from-primary to-primary/80 rounded w-3/4 mx-auto"></div>
            <div class="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mx-auto"></div>
            
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="h-24 bg-white dark:bg-zinc-800 rounded-lg border"></div>
              <div class="h-24 bg-white dark:bg-zinc-800 rounded-lg border"></div>
              <div class="h-24 bg-white dark:bg-zinc-800 rounded-lg border"></div>
            </div>
            
            <div class="mt-8 p-6 bg-primary/10 rounded-xl">
              <div class="h-8 bg-primary/20 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Slider Line -->
  <div 
    class="absolute bg-gradient-to-r from-[#3644FE] to-[#B345ED] z-10 pointer-events-none"
    style={sliderStyles}
  ></div>
  
  <!-- Slider Handle -->
  <div 
    class="absolute w-12 h-12 bg-white dark:bg-zinc-900 rounded-full border-2
           border-primary shadow-lg flex items-center justify-center z-20
           hover:scale-110 transition-transform cursor-grab active:cursor-grabbing
           {isDragging ? 'scale-110' : ''}"
    style={handleStyles}
  >
    {#if vertical || isMobile}
      <!-- Vertical handle icon -->
      <div class="flex flex-col gap-1">
        <div class="w-4 h-0.5 bg-primary rounded-full"></div>
        <div class="w-4 h-0.5 bg-primary rounded-full"></div>
      </div>
    {:else}
      <!-- Horizontal handle icon -->
      <div class="flex gap-1">
        <div class="w-0.5 h-4 bg-primary rounded-full"></div>
        <div class="w-0.5 h-4 bg-primary rounded-full"></div>
      </div>
    {/if}
  </div>
  
  <!-- Labels -->
  <div class="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm
              rounded-full text-white text-sm font-medium">
    {beforeLabel}
  </div>
  <div class="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm
              rounded-full text-white text-sm font-medium">
    {afterLabel}
  </div>
</div>