<!-- src/lib/pages/space/components/chute/BeforeAfter.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import * as Resizable from "$lib/components/ui/resizable";
  import RepackLabel from './RepackLabel.svelte';
  
  export let beforeContent: any;
  export let afterContent: any;
  export let defaultSplit = 50;
  export let description = "";
  export let company = "";
</script>

<!-- Labels Container -->
<div class="relative h-12 mb-4">
  <RepackLabel type="before" />
  <RepackLabel type="after" />
</div>

<!-- Slider Container -->
<div class="relative aspect-[16/9] rounded-xl overflow-hidden border bg-card shadow-xl">
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