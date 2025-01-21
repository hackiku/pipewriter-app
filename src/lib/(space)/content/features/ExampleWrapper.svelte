<!-- src/lib/(space)/content/features/ExampleWrapper.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import ExampleGroup from './ExampleGroup.svelte';
  import { uxExamples } from '../../data/examples';
  
  export let mode: 'floating' | 'fixed' = 'floating';
  export let activeStep = 0;
  
  let container: HTMLElement;
  let visible = false;
  let scrollProgress = 0;

  // Just use two examples for problem section
  const problemExamples = uxExamples.slice(0, 2);
  // Use first example for process section
  const processExample = uxExamples[0];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!visible) {
            visible = true;
          }
          
          // Simplified scroll progress - just for subtle movement
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          scrollProgress = Math.min(
            (viewportHeight - rect.top) / viewportHeight,
            1
          );
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  });
</script>

<div 
  class="absolute inset-0 pointer-events-none {mode === 'fixed' ? 'lg:w-1/2 lg:left-1/2' : ''}"
  bind:this={container}
>
  {#if mode === 'floating'}
    <!-- Problem Section Examples -->
    {#each problemExamples as example, i}
      <div 
        class="absolute transition-transform duration-1000"
        style="
          left: {i === 0 ? '10%' : '60%'};
          top: {i === 0 ? '20%' : '50%'};
          transform: translate3d(
            {scrollProgress * (i === 0 ? -5 : 5)}vw,
            {scrollProgress * (i === 0 ? -10 : 10)}vh,
            0
          );
        "
      >
        {#if visible}
          <div in:fade|local={{ duration: 800, delay: i * 400 }}>
            <ExampleGroup {example} />
          </div>
        {/if}
      </div>
    {/each}
  {:else}
    <!-- Process Section Example -->
    <div class="sticky top-32 h-[70vh]">
      <div class="relative h-full flex justify-center items-center">
        <div in:fade={{ duration: 400 }}>
          <ExampleGroup
            example={processExample}
            highlighted={true}
          />
        </div>
      </div>
    </div>
  {/if}
</div>