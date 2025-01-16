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
  
  let canvasWidth: number;
  let canvasHeight: number;
  let container: HTMLElement;
  
  onMount(() => {
    // Handle canvas sizing
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        canvasWidth = entry.contentRect.width;
        canvasHeight = entry.contentRect.height;
      }
    });
    
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  });
</script>

<!-- Main Container -->
<div class="relative max-w-7xl mx-auto px-4" bind:this={container}>
  <!-- Canvas Container - Positioned to overlap with content -->
  <div 
    class="absolute -top-[30vh] right-0 w-full md:w-1/3 h-[50vh]
           pointer-events-none z-10"
  >
    <ChuteCanvas width={canvasWidth} height={canvasHeight} />
  </div>
  
  <!-- Before/After Slider -->
  <div class="relative pt-[20vh] md:pt-[10vh]">
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
        onClick={() => window.open('/space/repacks/firefly', '_blank')}
      >
        <span class="mr-2">View Full Redesign</span>
        <ArrowRight 
          class="w-4 h-4 transition-transform group-hover:translate-x-1" 
        />
      </Button>
    </div>
  </div>
</div>