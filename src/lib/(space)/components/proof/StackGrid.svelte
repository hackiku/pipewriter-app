<!-- NEW: src/lib/(space)/components/proof/StackGrid.svelte -->

<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { tools } from "$data/assets/tools";
  import StackIcon from "./StackIcon.svelte";

  export let noStack = false; // If true, show the "no stack" row
  
  // Default stack we use
  const spaceStacks = [
    {
      ...tools.sveltekit,
      description: "Fast as a rocket",
    },
    {
      ...tools.react,
      description: "Mission control dashboards",
    },
    {
      ...tools.nextjs,
      description: "Enterprise-ready",
    },
    {
      ...tools.tailwind,
      description: "Pixel-perfect design",
    },
    {
      ...tools.figma,
      description: "Launch blueprints",
    },
    {
      ...tools.pipewriter,
      description: "UX writing",
    },
  ];

  // Stack we don't use (only shown if noStack is true)
  const spaceNoStacks = [
    {
      ...tools.wordpress,
      description: "Too slow for space",
    },
    {
      ...tools.webflow,
      description: "Limited control",
    },
    {
      ...tools.wix,
      description: "Not mission-ready",
    },
    {
      ...tools.squarespace,
      description: "Earth-bound",
    },
  ];

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
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  });

  let scrolling = false;
  function handleScroll(e: WheelEvent) {
    if (!scrolling) {
      requestAnimationFrame(() => {
        container.scrollLeft += e.deltaY;
        scrolling = false;
      });
      scrolling = true;
    }
  }
</script>

<div
  class="w-full overflow-x-auto pb-8 hide-scrollbar relative"
  bind:this={container}
  on:wheel={handleScroll}
>
  {#if visible}
    <!-- Main stack -->
    <div class="flex justify-center min-w-full">
      <div class="flex gap-8 px-4 py-2" in:fly={{ x: 20, duration: 800 }}>
        {#each spaceStacks as stack, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 100 }}>
            <StackIcon {...stack} />
          </div>
        {/each}
      </div>
    </div>

    <!-- Optional "no stack" row -->
    {#if noStack}
      <div class="flex justify-center min-w-full mt-12 opacity-50">
        <div class="flex gap-8 px-4 py-2" in:fly={{ x: 20, duration: 800, delay: 400 }}>
          {#each spaceNoStacks as stack, i}
            <div in:fly={{ y: 20, duration: 400, delay: (i * 100) + 400 }}>
              <StackIcon {...stack} />
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