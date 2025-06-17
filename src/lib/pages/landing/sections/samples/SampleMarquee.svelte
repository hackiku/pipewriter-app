<!-- src/lib/pages/landing/sections/samples/SampleMarquee.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  
  export let samples: Array<{
    id: string;
    name: string;
    company: string;
    description: string;
  }>;
  export let currentSample: number;
  
  const dispatch = createEventDispatcher();
  
  let marqueeRef: HTMLDivElement;
  let autoScrollInterval: number;
  let isHovered = false;
  
  // Extended samples for seamless looping
  $: extendedSamples = [...samples, ...samples, ...samples];
  
  function handleSampleClick(index: number) {
    const actualIndex = index % samples.length;
    dispatch('sampleChange', actualIndex);
  }
  
  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    
    autoScrollInterval = setInterval(() => {
      if (!isHovered && marqueeRef) {
        const nextIndex = (currentSample + 1) % samples.length;
        dispatch('sampleChange', nextIndex);
      }
    }, 4000); // Change every 4 seconds
  }
  
  onMount(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    };
  });
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<div class="space-y-6">
  <!-- Section Header -->
  <div class="text-center">
    <h3 class="text-lg font-medium text-muted-foreground mb-4">
      See more examples
    </h3>
  </div>

  <!-- Interactive Marquee -->
  <button 
    class="w-full overflow-hidden py-8"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <div 
      bind:this={marqueeRef}
      class="flex space-x-12 animate-slow-marquee hover:animate-pause"
    >
      {#each extendedSamples as sample, i}
        {@const actualIndex = i % samples.length}
        {@const isActive = actualIndex === currentSample}
        
        <button
          class="flex-shrink-0 group"
          on:click={() => handleSampleClick(i)}
        >
          <!-- Sample Card -->
          <div class="w-64 p-6 rounded-2xl border transition-all duration-300
                      {isActive 
                        ? 'bg-gradient-to-br from-primary/5 to-primary/15 border-primary/20 shadow-lg' 
                        : 'bg-card hover:bg-muted/50 border-border hover:border-primary/20'
                      }">
            
            <!-- Mock Logo/Icon -->
            <div class="w-16 h-16 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-xl
                        {actualIndex === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : ''}
                        {actualIndex === 1 ? 'bg-gradient-to-br from-green-500 to-green-600' : ''}
                        {actualIndex === 2 ? 'bg-gradient-to-br from-purple-500 to-purple-600' : ''}">
              {sample.company.charAt(0)}
            </div>
            
            <!-- Content -->
            <div class="text-left space-y-2">
              <h4 class="font-semibold text-foreground group-hover:text-primary transition-colors">
                {sample.company}
              </h4>
              <p class="text-sm text-muted-foreground">
                {sample.name}
              </p>
              
              <!-- Active indicator -->
              {#if isActive}
                <div class="flex items-center gap-2 text-xs text-primary font-medium mt-3">
                  <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  Currently viewing
                </div>
              {/if}
            </div>
          </div>
        </button>
      {/each}
    </div>
  </button>

  <!-- Navigation Dots -->
  <div class="flex justify-center gap-2">
    {#each samples as _, i}
      <button
        class="w-2 h-2 rounded-full transition-all duration-300
               {i === currentSample 
                 ? 'bg-primary w-6' 
                 : 'bg-muted hover:bg-primary/50'
               }"
        on:click={() => dispatch('sampleChange', i)}
        aria-label="View sample {i + 1}"
      />
    {/each}
  </div>
</div>

<style>
  @keyframes slow-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.333%); /* Move by 1/3 since we have 3x samples */ }
  }

  .animate-slow-marquee {
    animation: slow-marquee 30s linear infinite;
    will-change: transform;
  }

  .animate-pause {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-slow-marquee {
      animation: none;
    }
  }
</style>