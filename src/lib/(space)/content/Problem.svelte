<!-- src/lib/(space)/content/Problem.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import UXExample from '../components/proof/UXExample.svelte';
  import { spaceStore } from '../stores/spaceStore';
  
  const examples = [
    {
      x: '5%',
      y: '10%',
      size: 'lg' as const,
      points: [
        { label: '5s load time', isGood: false },
        { label: 'Generic template', isGood: false }
      ]
    },
    {
      x: '60%',
      y: '5%',
      size: 'md' as const,
      points: [
        { label: 'Poor mobile UX', isGood: false },
        { label: 'SEO unfriendly', isGood: false }
      ]
    },
    {
      x: '25%',
      y: '45%',
      size: 'lg' as const,
      points: [
        { label: 'Blazing fast', isGood: true },
        { label: 'Space-ready design', isGood: true }
      ]
    },
    {
      x: '70%',
      y: '35%',
      size: 'md' as const,
      points: [
        { label: 'Mission-ready UX', isGood: true },
        { label: 'Optimized flow', isGood: true }
      ]
    }
  ];

  let visible = false;
  let container: HTMLElement;
  let viewportHeight: number;
  let scrollProgress = 0;
  
  $: containerRect = container?.getBoundingClientRect();
  
  // Subscribe to scroll position and track visibility
  spaceStore.subscribe(state => {
    if (container && typeof window !== 'undefined') {
      const rect = containerRect;
      viewportHeight = window.innerHeight;
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Calculate progress (0 when entering viewport, 1 when 75% scrolled)
        scrollProgress = Math.min(Math.max(
          (viewportHeight - rect.top) / (viewportHeight * 0.75),
          0
        ), 1);
        
        if (!visible && scrollProgress > 0) visible = true;
      }
    }
  });

  // Calculate position and animation for each example
  function getExampleStyles(example: typeof examples[0], index: number) {
    if (!visible) return '';
    
    const baseDelay = index * 0.2; // Stagger initial appearance
    const yOffset = scrollProgress * 30; // Move up as we scroll
    const xOffset = scrollProgress * (index % 2 ? 10 : -10); // Spread horizontally
    
    return `
      left: ${example.x};
      top: ${example.y};
      transform: translate3d(${xOffset}vw, ${yOffset}vh, 0);
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
      opacity: ${1 - (scrollProgress * 0.8)};
    `;
  }
</script>

<div class="min-h-[80vh] relative overflow-hidden border border-dashed border-red-800/50" 
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
    {#each examples as example, i}
      <div class="absolute transition-all"
           style={getExampleStyles(example, i)}>
        {#if visible}
          <div in:fly={{ y: 50, duration: 800, delay: i * 200 }}>
            <UXExample 
              size={example.size}
              points={example.points}
              className="shadow-xl"
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>