<!-- src/lib/(space)/components/proof/StackGrid.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { tools } from "$data/tools";
  import type { ToolId } from "$data/tools/types";
  import StackIcon from "./StackIcon.svelte";

  export let toolIds: ToolId[] = [];
  export let noStack = false;

  // Filter and prepare tools
  $: displayTools = toolIds.length > 0 
    ? toolIds.map(id => ({...tools[id]}))
    : Object.values(tools).slice(0, 9);

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

<div class="py-12" bind:this={container}>
  {#if visible}
    <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-8 place-items-center px-4">
      {#each displayTools as tool, i}
        <div 
          in:fly={{ y: 20, duration: 400, delay: i * 100 }}
        >
          <StackIcon {...tool} />
        </div>
      {/each}
    </div>
  {/if}
</div>