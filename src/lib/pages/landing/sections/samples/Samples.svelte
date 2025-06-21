<!-- src/lib/pages/landing/sections/samples/Samples.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import BeforeAfterSlider from "./BeforeAfterSlider.svelte";
  import TestimonialBubble from "./TestimonialBubble.svelte";
  import { samples } from "./data";

  // State
  let currentSample = 0;
  let autoRotateInterval: number;
  let isMobile = false;
  let sliderSizes = [60, 40]; // Control slider from here - proper initialization

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    startAutoRotate();
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (autoRotateInterval) clearInterval(autoRotateInterval);
    };
  });

  // Auto-rotate samples
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    
    autoRotateInterval = setInterval(() => {
      currentSample = (currentSample + 1) % samples.length;
    }, 6000);
  }

  // Handle tab click
  function handleTabClick(index: number) {
    currentSample = index;
    startAutoRotate();
  }

  // Handle label clicks to change sizes
  function handleBeforeLabelClick() {
    sliderSizes = [95, 5]; // Almost full width for before
  }
  
  function handleAfterLabelClick() {
    sliderSizes = [5, 95]; // Almost full width for after
  }

  // Current sample data
  $: currentSampleData = samples[currentSample];
  $: currentImages = {
    before: isMobile ? currentSampleData.beforeImage.mobile : currentSampleData.beforeImage.desktop,
    after: isMobile ? currentSampleData.afterImage.mobile : currentSampleData.afterImage.desktop
  };

  // Label positions based on mobile/desktop
  $: beforeLabelClasses = isMobile ? 'top-4 left-4' : 'top-4 left-4';
  $: afterLabelClasses = isMobile ? 'bottom-4 left-4' : 'top-4 right-4';

  // Update slider sizes when switching between samples or mobile/desktop
  $: if (currentSample !== undefined || isMobile !== undefined) {
    sliderSizes = [60, 40]; // Reset to default when changing samples
  }
</script>

<div class="space-y-0">
  <!-- Main Slider with Active Styling, Labels, and Testimonial -->
  <div class="relative rounded-3xl overflow-hidden p-2 border-2 border-border 
              bg-neutral-100 dark:bg-neutral-900 
              transition-all duration-300">
    
    <!-- Before/After Slider -->
    <BeforeAfterSlider
      beforeImage={currentImages.before}
      afterImage={currentImages.after}
      bind:sizes={sliderSizes}
    />
    
    <!-- Before Label - Positioned at wrapper level -->
    <button
      class="absolute {beforeLabelClasses} px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg hover:bg-black/80 transition-colors z-[90]"
      on:click={handleBeforeLabelClick}
      style="z-index: 9990;"
    >
      Google Docs
    </button>

    <!-- After Label - Positioned at wrapper level -->
    <button
      class="absolute {afterLabelClasses} px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg hover:bg-black/80 transition-colors z-[90]"
      on:click={handleAfterLabelClick}
      style="z-index: 9990;"
    >
      Live Website
    </button>
    
    <!-- Testimonial Bubble - Positioned at wrapper level for guaranteed z-index -->
    <div class="absolute bottom-8 right-8 z-[100]" style="z-index: 9999;">
      <TestimonialBubble 
        testimonial={currentSampleData.testimonial} 
        {isMobile} 
      />
    </div>
    
    <!-- Interaction Hint -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-20">
      {isMobile ? 'Drag up/down' : 'Drag left/right'}
    </div>
  </div>

  <!-- Enhanced Tabs with Lateral Spacing -->
  <div class="flex justify-center gap-3 px-8 md:px-12 lg:px-16">
    {#each samples as sample, index}
      {@const isActive = currentSample === index}
      <div class="transition-all duration-200 ease-out {isActive ? 'pt-0 -mt-[2px] z-10' : 'pt-4 -mt-[2px] z-0'}">
        <button
          class="relative flex flex-col items-center gap-3 px-4 py-4 border-2 transition-all duration-200 group max-w-[200px] {isActive 
            ? 'border-l-border border-r-border border-b-border border-t-0 bg-neutral-100 dark:bg-neutral-900 rounded-t-none rounded-b-3xl' 
            : 'border-border bg-card hover:bg-muted/50 rounded-3xl hover:scale-[1.02] opacity-75'}"
          on:click={() => handleTabClick(index)}
        >
          <!-- Logo Container - No wrapper, just logo -->
          <div class="relative w-full max-w-[120px] h-12 flex items-center justify-center transition-all duration-200 {isActive ? 'scale-105' : 'group-hover:scale-[1.02]'}">
            <img 
              src={sample.logo} 
              alt="{sample.company} logo" 
              class="max-w-full max-h-full object-contain transition-all duration-200"
            />
          </div>
          
          <!-- Tag Badge -->
          <div class="px-3 py-1 rounded-full text-[0.6em] font-medium transition-all duration-200 {isActive 
            ? 'bg-gradient-to-r from-primary/20 to-primary/30 text-primary border border-primary/30' 
            : 'bg-muted/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 border border-transparent'}">
            {sample.tag}
          </div>

          <!-- Connection Line (for active tab) -->
          {#if isActive}
            <div class="absolute -top-[2px] left-6 right-6 h-[2px] bg-neutral-100 dark:bg-neutral-900"></div>
          {/if}
        </button>
      </div>
    {/each}
  </div>

  <!-- Mobile Navigation Dots -->
  <div class="flex justify-center gap-2 mt-6 md:hidden">
    {#each samples as _, index}
      {@const isActive = index === currentSample}
      <button
        class="transition-all duration-300 rounded-full {isActive ? 'w-8 h-3 bg-primary' : 'w-3 h-3 bg-muted hover:bg-primary/50'}"
        on:click={() => handleTabClick(index)}
        aria-label="View sample {index + 1}"
      />
    {/each}
  </div>
</div>