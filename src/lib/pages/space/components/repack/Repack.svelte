<!-- src/lib/pages/space/components/repack/Repack.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import RepackLabel from './RepackLabel.svelte';
  import { repackStore } from '../../stores/repackStore';
  
  let sliderPosition = 50;
  let isDragging = false;
  let containerRef: HTMLDivElement;
  let dynamicComponent: any;
  
  $: currentExample = $repackStore.examples[$repackStore.currentIndex];
  
  onMount(async () => {
    if (currentExample.component) {
      const module = await import(`../../${currentExample.component}`);
      dynamicComponent = module.default;
    }
  });
  
  function nextExample() {
    const nextIndex = ($repackStore.currentIndex + 1) % $repackStore.examples.length;
    repackStore.setExample(nextIndex);
  }

  function prevExample() {
    const prevIndex = $repackStore.currentIndex === 0 
      ? $repackStore.examples.length - 1 
      : $repackStore.currentIndex - 1;
    repackStore.setExample(prevIndex);
  }

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !containerRef) return;
    const rect = containerRef.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    sliderPosition = (x / rect.width) * 100;
  }
  
  function handleMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }
</script>

<div class="container relative">
  <div class="max-w-5xl mx-auto">
    <div 
      bind:this={containerRef}
      class="relative aspect-[16/9] rounded-xl overflow-hidden border bg-card group"
    >
      <!-- Labels -->
      <RepackLabel type="before" />
      <RepackLabel type="after" />

      <!-- Before -->
      <div class="absolute inset-0">
        {#if currentExample.beforeUrl}
          <img 
            src={currentExample.beforeUrl}
            alt="Original {currentExample.company} website"
            class="w-full h-full object-cover"
          />
        {/if}
      </div>

      <!-- After -->
      <div 
        class="absolute inset-0"
        style:clip-path="inset(0 {100 - sliderPosition}% 0 0)"
      >
        {#if currentExample.afterUrl}
          <img
            src={currentExample.afterUrl}
            alt="Redesigned {currentExample.company} website"
            class="w-full h-full object-cover"
          />
        {:else if dynamicComponent}
          <svelte:component this={dynamicComponent} />
        {/if}
      </div>

      <!-- Slider Handle -->
      <div 
        class="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize shadow-lg"
        style:left="{sliderPosition}%"
        style:transform="translateX(-50%)"
        on:mousedown={handleMouseDown}
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-8 h-8 rounded-full bg-white shadow-lg
                    flex items-center justify-center">
          <div class="w-4 h-4 rounded-full bg-primary" />
        </div>
      </div>

      <!-- Info Overlay -->
      <div class="absolute bottom-0 inset-x-0 
                  bg-gradient-to-t from-black/80 via-black/40 to-transparent
                  pt-16 pb-6 px-8
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="flex items-center justify-between text-white">
          <Button variant="ghost" size="icon" class="text-white hover:bg-white/20" on:click={prevExample}>
            <ChevronLeft class="w-6 h-6" />
          </Button>

          <div class="text-center">
            <h3 class="text-xl font-semibold mb-1">{currentExample.company}</h3>
            <p class="text-sm text-white/80">{currentExample.description}</p>
            {#if currentExample.meta?.originalUrl}
              <Button variant="ghost" size="sm" class="mt-2 gap-2 hover:bg-white/20">
                <Maximize2 class="w-4 h-4" />
                View Original Site
              </Button>
            {/if}
          </div>

          <Button variant="ghost" size="icon" class="text-white hover:bg-white/20" on:click={nextExample}>
            <ChevronRight class="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>