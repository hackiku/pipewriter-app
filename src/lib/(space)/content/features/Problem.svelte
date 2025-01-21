<!-- src/lib/(space)/content/features/Problem.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import ExampleCard from './ExampleCard.svelte';
  import { spaceStore } from '../../stores/spaceStore';
  import { uxExamples } from '../../data/examples';
  
  let visible = false;
  let container: HTMLElement;
  let scrollProgress = 0;
  
  $: containerRect = container?.getBoundingClientRect();
  
  // Subscribe to scroll position and track visibility
  spaceStore.subscribe(state => {
    if (container && typeof window !== 'undefined') {
      const rect = containerRect;
      const viewportHeight = window.innerHeight;
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Smoother progress calculation
        scrollProgress = Math.min(Math.max(
          (viewportHeight - rect.top) / (viewportHeight * 1.5),
          0
        ), 1);
        
        if (!visible && scrollProgress > 0) visible = true;
      }
    }
  });

  // Calculate position and parallax for each example pair
  function getExampleStyles(example: typeof uxExamples[0], index: number) {
    if (!visible) return '';
    
    // More pronounced parallax effect
    const parallaxY = scrollProgress * (index % 2 ? 15 : 25);
    const parallaxX = scrollProgress * (index % 2 ? 5 : -5);
    
    return `
      left: ${example.position.x};
      top: ${example.position.y};
      transform: translate3d(${parallaxX}vw, ${parallaxY}vh, 0);
      transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
    `;
  }
</script>

<div class="min-h-[100vh] relative overflow-hidden border border-dashed border-red-800/50" 
     bind:this={container}>
  <!-- Centered Text -->
  <div class="sticky top-1/3 z-10 text-center">
    <p class="text-2xl md:text-3xl max-w-3xl mx-auto px-4 md:px-16 leading-relaxed">
      Your rockets rock hard but your website feels like 1969?
      <span class="text-muted-foreground">You could use a repack. Modern space companies 
      need a web presence that matches their technical innovation.</span>
    </p>
  </div>

  <!-- Floating UX Examples -->
  <div class="absolute inset-0 pointer-events-none">
    {#each uxExamples as example, i}
      <div class="absolute transition-all"
           style={getExampleStyles(example, i)}>
        {#if visible}
          <div in:fly={{ y: 50, duration: 800, delay: i * 200 }}>
            <ExampleCard 
              size={example.size}
              bad={example.bad}
              good={example.good}
              yOffset={example.yOffset}
              className="shadow-xl"
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>