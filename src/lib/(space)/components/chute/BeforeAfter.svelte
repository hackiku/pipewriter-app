<!-- src/lib/pages/space/components/chute/BeforeAfter.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import * as Resizable from "$lib/components/ui/resizable";
  
  export let beforeContent: any;
  export let afterContent: any;
  export let defaultSplit = 50;
  export let description = "";
  export let company = "";
  
  let containerWidth: number;
  let containerHeight: number;
</script>

<!-- Label Positioning Container -->
<div class="-mb-12 relative z-10">
  <!-- Before Label -->
  <div 
    class="absolute left-8 -top-4 transform -rotate-3
           bg-white/10 backdrop-blur-sm border border-white/20 
           px-6 py-2 rounded-full shadow-lg"
  >
    <div class="flex items-center gap-2 text-white/90">
      <span class="w-2 h-2 rounded-full bg-white/50" />
      <span class="font-medium">Before</span>
    </div>
    <!-- Curved Arrow -->
    <svg class="absolute bottom-0 left-1/2 h-8 -mb-8 text-white/20"
         viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3,3 Q12,3 12,12 L14,10 M12,12 L10,10" 
            stroke-width="2" stroke-linecap="round" />
    </svg>
  </div>
  
  <!-- After Label -->
  <div 
    class="absolute right-8 -top-4 transform rotate-3
           bg-primary/10 backdrop-blur-sm border border-primary/20 
           px-6 py-2 rounded-full shadow-lg"
  >
    <div class="flex items-center gap-2 text-primary">
      <span class="w-2 h-2 rounded-full bg-primary/50" />
      <span class="font-medium">After</span>
    </div>
    <!-- Curved Arrow -->
    <svg class="absolute bottom-0 right-1/2 h-8 -mb-8 text-primary/20"
         viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21,3 Q12,3 12,12 L14,10 M12,12 L10,10" 
            stroke-width="2" stroke-linecap="round" />
    </svg>
  </div>
</div>

<!-- Slider Container -->
<div 
  class="relative aspect-[16/9] rounded-xl overflow-hidden border bg-card shadow-xl"
  bind:clientWidth={containerWidth}
  bind:clientHeight={containerHeight}
>
  <Resizable.PaneGroup
    direction="horizontal"
    class="h-full lg:flex"
  >
    <!-- Before Content -->
    <Resizable.Pane 
      defaultSize={100 - defaultSplit}
      class="relative h-full min-h-[300px]"
    >
      <slot name="before" />
    </Resizable.Pane>

    <Resizable.Handle withHandle class="hidden lg:block" />

    <!-- After Content -->
    <Resizable.Pane 
      defaultSize={defaultSplit}
      class="relative h-full"
    >
      <slot name="after" />
    </Resizable.Pane>
  </Resizable.PaneGroup>

  <!-- Info Overlay -->
  {#if company || description}
    <div class="absolute bottom-0 inset-x-0 
                bg-gradient-to-t from-black/90 to-transparent
                pt-12 pb-4 px-6">
      <div class="text-white">
        {#if company}
          <h3 class="text-lg font-medium">{company}</h3>
        {/if}
        {#if description}
          <p class="text-sm text-white/80">{description}</p>
        {/if}
      </div>
    </div>
  {/if}
</div>