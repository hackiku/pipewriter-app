<!-- src/lib/(space)/components/proof/StackGrid.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { Ban } from "lucide-svelte";
  import { tools } from "$data/tools";
  import type { ToolId } from "$data/tools/types";
  import StackIcon from "./StackIcon.svelte";

  export let toolIds: ToolId[] = []; // Allow passing specific tools
  export let noStack = false; // If true, show the "no stack" row

  // Tools we don't recommend
  const noTools = ['wordpress', 'wix', 'webflow', 'squarespace'];

  // Default positive tools if none provided
  $: displayTools = toolIds.length > 0 
    ? toolIds.map(id => ({
        ...tools[id]
      }))
    : Object.entries(tools)
        .filter(([id]) => !noTools.includes(id))
        .map(([_, tool]) => tool);

  $: displayNoTools = noStack 
    ? noTools.map(id => ({
        ...tools[id]
      }))
    : [];

  let visible = false;
  let container: HTMLElement;
  let isScrolling = false;

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

  function handleScroll(e: WheelEvent | TouchEvent) {
    if (!isScrolling) {
      requestAnimationFrame(() => {
        if (e instanceof WheelEvent) {
          container.scrollLeft += e.deltaY;
        }
        isScrolling = false;
      });
      isScrolling = true;
    }
  }

  // Touch handling
  let touchStart: number;
  
  function handleTouchStart(e: TouchEvent) {
    touchStart = e.touches[0].clientX;
  }

  function handleTouchMove(e: TouchEvent) {
    if (!touchStart) return;
    const touchEnd = e.touches[0].clientX;
    const delta = touchStart - touchEnd;
    container.scrollLeft += delta;
    touchStart = touchEnd;
  }
</script>

<div
  class="w-full overflow-y-auto pb-4 hide-scrollbar relative"
  bind:this={container}
  on:wheel={handleScroll}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={() => touchStart = null}
>
  {#if visible}
    <!-- Main stack - max 3 rows on mobile -->
    <div class="flex min-w-full">
      <div class="flex flex-wrap gap-12 px-4 py-2 max-h-[calc(3*5rem)]" 
           in:fly={{ x: 20, duration: 800 }}>
        {#each displayTools as tool, i}
          <div 
            class="w-[calc(33.333%-1rem)] sm:w-auto"
            in:fly={{ y: 20, duration: 400, delay: i * 100 }}
          >
            <StackIcon {...tool} />
          </div>
        {/each}
      </div>
    </div>

    <!-- Optional "no stack" row -->
    {#if noStack}
      <div class="relative flex min-w-full mt-8">
        <div 
          class="absolute inset-0 z-10 pointer-events-none 
                 flex items-center justify-center opacity-0 
                 group-hover:opacity-100 transition-opacity"
        >
          <Ban class="w-12 h-12 text-red-500/80" />
        </div>
        <div 
          class="flex gap-4 px-4 py-2 opacity-40 group hover:opacity-30 
                 transition-opacity duration-300"
          in:fly={{ x: 20, duration: 800, delay: 400 }}
        >
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