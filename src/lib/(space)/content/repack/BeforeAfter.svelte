<!-- src/lib/(space)/content/repack/BeforeAfter.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import * as Resizable from "$lib/components/ui/resizable";
  import Firefly from '../../repacks/firefly/Firefly.svelte';
  
  export let beforeUrl: string;
  export let defaultSplit = 50;
  export let company = "";
  export let description = "";

  let mounted = false;
  
  onMount(() => {
    mounted = true;
    return () => mounted = false;
  });
</script>

<!-- Main Container -->
<div class="relative aspect-[16/9] rounded-xl overflow-hidden border bg-card shadow-xl">
  {#if mounted}
    <Resizable.PaneGroup
      direction="horizontal"
      class="h-full lg:flex"
    >
      <!-- Before Content -->
      <Resizable.Pane 
        defaultSize={100 - defaultSplit}
        class="relative h-full min-h-[300px]"
      >
        <div class="absolute inset-0">
          <img 
            src={beforeUrl}
            alt="Original {company} website"
            class="w-full h-full object-cover"
            style="transform: scale(1.01);"
          />
        </div>
      </Resizable.Pane>

      <Resizable.Handle withHandle class="hidden lg:block" />

      <!-- After Content (Live Firefly Component) -->
      <Resizable.Pane 
        defaultSize={defaultSplit}
        class="relative h-full overflow-hidden"
      >
        <div class="absolute inset-0 bg-black">
          <Firefly />
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>

    <!-- Info Overlay -->
    <div class="absolute bottom-0 inset-x-0 
                bg-gradient-to-t from-black/90 to-transparent
                pt-12 pb-4 px-6 z-10">
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