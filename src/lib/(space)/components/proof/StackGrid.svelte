<!-- src/lib/(space)/components/proof/StackGrid.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { tools } from "$data/tools";
  import type { ToolId } from "$data/tools/types";
  import StackIcon from "./StackIcon.svelte";

  export let noStack = false; // If true, show the "no stack" row
  export let toolIds: ToolId[] = []; // Allow passing specific tools
  export let spaceDescriptions = false; // Toggle space-specific descriptions
  
  const spaceTools = {
    svelte: "Fast as a rocket",
    react: "Mission control dashboards",
    nextjs: "Enterprise-ready",
    tailwind: "Pixel-perfect design",
    vue: "Smooth orbital maneuvers",
    remix: "Re-entry ready",
    shopify: "Space commerce",
    supabase: "Space commerce",
    firebase: "Space commerce",
    // ... add more space-themed descriptions
  };

  // Default positive tools if none provided
  $: displayTools = toolIds.length > 0 
    ? toolIds.map(id => ({
        ...tools[id],
        description: spaceDescriptions ? spaceTools[id] || tools[id].description : tools[id].description
      }))
    : Object.entries(tools)
        .filter(([id]) => !noTools.includes(id))
        .map(([_, tool]) => tool);

  // Tools we don't recommend
  const noTools = ['wordpress', 'wix', 'webflow', 'squarespace'];
  $: displayNoTools = noStack 
    ? noTools.map(id => ({
        ...tools[id],
        description: spaceDescriptions 
          ? "Not mission-ready" 
          : tools[id].description
      }))
    : [];

  let visible = false;
  let container: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  });
</script>

<div
  class="w-full overflow-x-auto pb-8 hide-scrollbar relative"
  bind:this={container}
>
  {#if visible}
    <!-- Main stack -->
    <div class="flex justify-center min-w-full">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-4 py-2" 
           in:fly={{ x: 20, duration: 800 }}>
        {#each displayTools as tool, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 100 }}>
            <StackIcon {...tool} />
          </div>
        {/each}
      </div>
    </div>

    <!-- Optional "no stack" row -->
    {#if noStack}
      <div class="flex justify-center min-w-full mt-12 opacity-50">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4 py-2" 
             in:fly={{ x: 20, duration: 800, delay: 400 }}>
          {#each displayNoTools as tool, i}
            <div in:fly={{ y: 20, duration: 400, delay: (i * 100) + 400 }}>
              <StackIcon {...tool} />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>