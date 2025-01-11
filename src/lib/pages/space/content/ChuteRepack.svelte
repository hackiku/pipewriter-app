<!-- src/lib/pages/space/content/ChuteRepack.svelte -->

<!-- BeforeAfter.svelte -->
<!-- https://www.site-shot.com/?utm_source=chatgpt.com -->
<script lang="ts">
  import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import { redesignsStore } from '$lib/stores/chuteStore';
  
  let sliderPosition = 50;
  let isDragging = false;
  let containerRef: HTMLDivElement;
  
  $: currentExample = $redesignsStore.examples[$redesignsStore.currentIndex];
  
  function nextExample() {
    const nextIndex = ($redesignsStore.currentIndex + 1) % $redesignsStore.examples.length;
    redesignsStore.setExample(nextIndex);
  }

  function prevExample() {
    const prevIndex = $redesignsStore.currentIndex === 0 
      ? $redesignsStore.examples.length - 1 
      : $redesignsStore.currentIndex - 1;
    redesignsStore.setExample(prevIndex);
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
      <!-- Before -->
      <div class="absolute inset-0">
        <iframe 
          src={currentExample.beforeUrl}
          title={`${currentExample.company} original site`}
          class="w-full h-full pointer-events-none"
        />
      </div>

      <!-- After -->
      <div 
        class="absolute inset-0"
        style:clip-path="inset(0 {100 - sliderPosition}% 0 0)"
      >
        <iframe 
          src={currentExample.afterUrl}
          title={`${currentExample.company} redesigned site`}
          class="w-full h-full pointer-events-none"
        />
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
            <Button variant="ghost" size="sm" class="mt-2 gap-2 hover:bg-white/20">
              <Maximize2 class="w-4 h-4" />
              View Full Comparison
            </Button>
          </div>

          <Button variant="ghost" size="icon" class="text-white hover:bg-white/20" on:click={nextExample}>
            <ChevronRight class="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>