<!-- src/lib/(space)/content/features/ExampleWrapper.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import ExampleCard from './ExampleCard.svelte';
  import { uxExamples } from '../../data/examples';
  
  export let mode: 'floating' | 'fixed' = 'floating';
  export let activeStep = 0;
  
  let container: HTMLElement;
  let visible = false;
  let scrollProgress = 0;

  // Track visibility and scroll progress
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !visible) {
          visible = true;
        }
        
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          
          scrollProgress = Math.min(Math.max(
            (viewportHeight - rect.top) / (viewportHeight * 0.75),
            0
          ), 1);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  });

  // Calculate example positions based on mode
  function getExampleStyles(example: typeof uxExamples[0], index: number) {
    if (mode === 'floating') {
      const parallaxY = scrollProgress * (index % 2 ? 15 : 25);
      const parallaxX = scrollProgress * (index % 2 ? 5 : -5);
      
      return `
        position: absolute;
        left: ${example.position.x};
        top: ${example.position.y};
        transform: translate3d(${parallaxX}vw, ${parallaxY}vh, 0);
        transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
      `;
    } else {
      const baseTransform = index === 0 ? 
        'translate3d(0, -10%, 0)' : 
        'translate3d(0, 10%, 0)';
      
      return `
        transform: ${baseTransform};
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      `;
    }
  }
</script>

<div 
  class="absolute inset-0 pointer-events-none {mode === 'fixed' ? 'lg:w-1/2 lg:left-1/2' : ''}"
  bind:this={container}
>
  {#if mode === 'floating'}
    <!-- Floating Examples for Problem Section -->
    {#each uxExamples as example, i}
      <div class="absolute transition-all" style={getExampleStyles(example, i)}>
        {#if visible}
          <div in:fly={{ y: 50, duration: 800, delay: i * 200 }}>
            <ExampleCard 
              {example}
              size={example.size}
              yOffset={example.yOffset}
            />
          </div>
        {/if}
      </div>
    {/each}
  {:else}
    <!-- Fixed Examples for Process Section -->
    <div class="sticky top-32 h-[70vh]">
      <div class="relative h-full">
        <div class="absolute inset-0 flex flex-col gap-8 justify-center items-end">
          {#each uxExamples as example, i}
            <div 
              in:fly|local={{ x: i === 0 ? 50 : -50, duration: 600 }}
              class="w-full flex justify-end transform hover:z-10"
              style={getExampleStyles(example, i)}
            >
              <ExampleCard 
                {example}
                size={example.size}
                yOffset={example.yOffset}
                highlighted={activeStep === i}
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>