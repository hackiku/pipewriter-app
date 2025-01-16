<!-- src/lib/pages/space/components/chute/Repack.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import ChuteCanvas from './ChuteCanvas.svelte';
  import BeforeAfter from './BeforeAfter.svelte';
  
  export let currentExample = {
    company: "Firefly Aerospace",
    description: "Full-throttle redesign with mission-ready UX",
    beforeUrl: "/space/examples/firefly-before.jpg",
    afterUrl: "/space/examples/firefly-after.jpg"
  };
  
  let container: HTMLElement;
  let canvasContainer: HTMLElement;
  
  onMount(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (canvasContainer) {
          const rect = entry.contentRect;
          const width = rect.width;
          const height = Math.max(rect.height * 0.6, 400); // Minimum height
          canvasContainer.style.height = `${height}px`;
        }
      }
    });
    
    if (container) resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  });
</script>

<div class="relative w-full" bind:this={container}>
  <!-- Canvas Overlay Container -->
  <div 
    bind:this={canvasContainer}
    class="absolute -top-[20vh] md:-top-[30vh] right-0 md:right-[10%] 
           w-full md:w-1/2 lg:w-1/3 
           pointer-events-none z-0"
  >
    <ChuteCanvas />
  </div>
  
  <!-- Before/After Container -->
  <div class="relative pt-[15vh] md:pt-[20vh] max-w-6xl mx-auto px-4">
    <BeforeAfter
      company={currentExample.company}
      description={currentExample.description}
    >
      <div slot="before">
        <img 
          src={currentExample.beforeUrl}
          alt="Original {currentExample.company} website"
          class="w-full h-full object-cover"
        />
      </div>
      
      <div slot="after">
        <img
          src={currentExample.afterUrl}
          alt="Redesigned {currentExample.company} website"
          class="w-full h-full object-cover"
        />
      </div>
    </BeforeAfter>
    
    <!-- View Demo Button -->
    <div class="flex justify-center mt-8">
      <Button 
        variant="outline" 
        size="lg"
        class="group"
        on:click={() => window.open('/space/repacks/firefly', '_blank')}
      >
        <span class="mr-2">View Full Redesign</span>
        <ArrowRight 
          class="w-4 h-4 transition-transform group-hover:translate-x-1" 
        />
      </Button>
    </div>
  </div>
</div>