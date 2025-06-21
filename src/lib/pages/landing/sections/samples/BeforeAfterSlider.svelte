<!-- src/lib/pages/landing/sections/samples/BeforeAfterSlider.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import * as Resizable from '$lib/components/ui/resizable';
  
  // Props
  export let beforeImage: string = '';
  export let afterImage: string = '';
  export let sizes = [60, 40]; // Initialize with default
  
  // State variables
  let isMobile = false;
  
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  });
  
  // Mobile gets vertical aspect ratio, desktop gets horizontal
  $: aspectRatio = isMobile ? 'aspect-[3/4]' : 'aspect-[16/9]';
  $: direction = isMobile ? 'vertical' : 'horizontal';
  
  // Ensure sizes is always a valid array
  $: if (!Array.isArray(sizes) || sizes.length !== 2) {
    sizes = [60, 40];
  }
</script>

<div class="relative w-full {aspectRatio} rounded-2xl overflow-hidden">
  <Resizable.PaneGroup 
    {direction} 
    class="w-full h-full"
    bind:sizes
  >
    <!-- Before Content Pane -->
    <Resizable.Pane defaultSize={sizes[0]}>
      <!-- Rounded wrapper with margin to create gap -->
      <div class="h-full {isMobile ? 'mb-2' : 'mr-2'} rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
        <div class="relative w-full h-full overflow-hidden">
          {#if beforeImage}
            <!-- Fixed size container for image to prevent movement -->
            <div class="absolute inset-0">
              <img 
                src={beforeImage} 
                alt="Before image" 
                class="w-full h-full object-cover select-none pointer-events-none"
                style="min-width: 100%; min-height: 100%; max-width: none; max-height: none;"
                draggable="false"
              />
            </div>
          {:else}
            <div class="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
              <span class="text-muted-foreground select-none">Before Image</span>
            </div>
          {/if}
        </div>
      </div>
    </Resizable.Pane>

    <!-- Simple Handle with icon -->
    <Resizable.Handle withHandle />

    <!-- After Content Pane -->
    <Resizable.Pane defaultSize={sizes[1]}>
      <!-- Rounded wrapper with margin to create gap -->
      <div class="h-full {isMobile ? 'mt-2' : 'ml-2'} rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
        <div class="relative w-full h-full overflow-hidden">
          {#if afterImage}
            <!-- Fixed size container for image to prevent movement -->
            <div class="absolute inset-0">
              <img 
                src={afterImage} 
                alt="After image" 
                class="w-full h-full object-cover select-none pointer-events-none"
                style="min-width: 100%; min-height: 100%; max-width: none; max-height: none;"
                draggable="false"
              />
            </div>
          {:else}
            <div class="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
              <span class="text-muted-foreground select-none">After Image</span>
            </div>
          {/if}
        </div>
      </div>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</div>

<style>
  /* Prevent image interactions */
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>