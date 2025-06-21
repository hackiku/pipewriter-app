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
  let sliderPosition = 60; // Control slider position as percentage
  let isUserInteracting = false; // Track user interaction

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

  // Auto-rotate samples (slower and pauses during interaction)
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    
    autoRotateInterval = setInterval(() => {
      if (!isUserInteracting) {
        currentSample = (currentSample + 1) % samples.length;
      }
    }, 10000); // Slower: 10 seconds instead of 6
  }

  // Handle tab click
  function handleTabClick(index: number) {
    isUserInteracting = true;
    currentSample = index;
    
    // Resume auto-rotation after a delay
    setTimeout(() => {
      isUserInteracting = false;
      startAutoRotate();
    }, 3000);
  }

  // Handle slider interaction
  function handleSliderInteractionStart() {
    isUserInteracting = true;
  }

  function handleSliderInteractionEnd() {
    // Resume auto-rotation after user stops interacting
    setTimeout(() => {
      isUserInteracting = false;
    }, 2000);
  }

  // Handle label clicks to change position
  function handleBeforeLabelClick() {
    isUserInteracting = true;
    sliderPosition = 95; // Show mostly before
    
    setTimeout(() => {
      isUserInteracting = false;
    }, 2000);
  }
  
  function handleAfterLabelClick() {
    isUserInteracting = true;
    sliderPosition = 5; // Show mostly after
    
    setTimeout(() => {
      isUserInteracting = false;
    }, 2000);
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

  // Reset position when switching samples
  $: if (currentSample !== undefined) {
    sliderPosition = 60; // Reset to default when changing samples
  }
</script>

<div class="space-y-0">
  <!-- Main Slider with Active Styling, Labels, and Testimonial -->
  <div class="relative rounded-3xl overflow-hidden p-0 border-2
              bg-neutral-100 dark:bg-neutral-900 
              transition-all duration-300">
    
    <!-- Before/After Slider -->
    <BeforeAfterSlider
      beforeImage={currentImages.before}
      afterImage={currentImages.after}
      bind:position={sliderPosition}
      onInteractionStart={handleSliderInteractionStart}
      onInteractionEnd={handleSliderInteractionEnd}
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
          <div class="relative w-full max-w-22 h-10 flex items-center justify-center transition-all duration-200 {isActive ? 'scale-105' : 'group-hover:scale-[1.02]'}">
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


        </button>
      </div>
    {/each}
  </div>

  
</div>