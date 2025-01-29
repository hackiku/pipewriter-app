<!-- src/lib/pages/space/components/chute/OLD.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import * as Resizable from "$lib/components/ui/resizable";
  import RepackLabel from './RepackLabel.svelte';
  import { repackStore } from '../../stores/repackStore';
  
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
</script>

<div class="container px-4 relative">
  <div class="max-w-5xl mx-auto">
    <!-- Enclosing card with proper spacing for labels -->
    <div class="pt-8 pb-2"> <!-- Added top padding for label overflow -->
      <div class="relative aspect-[16/9] sm:aspect-[16/9] rounded-xl overflow-hidden border bg-card shadow-xl">
        <!-- Labels -->
        <RepackLabel type="before" />
        <RepackLabel type="after" />

        <Resizable.PaneGroup
          direction="horizontal"
          class="h-full lg:flex"
        >
          <!-- Before (Original Site) -->
          <Resizable.Pane 
            defaultSize={100 - (currentExample.defaultSize || 50)}
            class="relative h-full min-h-[300px]"
          >
            {#if currentExample.beforeUrl}
              <img 
                src={currentExample.beforeUrl}
                alt="Original {currentExample.company} website"
                class="w-full h-full object-cover"
              />
            {/if}
          </Resizable.Pane>

          <Resizable.Handle withHandle class="hidden lg:block" />

          <!-- After (Redesign) -->
          <Resizable.Pane 
            defaultSize={currentExample.defaultSize || 50}
            class="relative h-full"
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
          </Resizable.Pane>
        </Resizable.PaneGroup>

        <!-- Simplified Info Overlay -->
        <div class="absolute bottom-0 inset-x-0 
                    bg-gradient-to-t from-black/90 to-transparent
                    pt-12 pb-4 px-6">
          <div class="flex items-center justify-between text-white">
            <div class="flex-1">
              <h3 class="text-lg font-medium">{currentExample.company}</h3>
              <p class="text-sm text-white/80">{currentExample.description}</p>
            </div>
            
            {#if currentExample.meta?.originalUrl}
              <Button variant="ghost" size="sm" class="ml-4 shrink-0">
                <Maximize2 class="w-4 h-4 mr-2" />
                View Original
              </Button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>