<!-- src/lib/components/demo/docs/frame/DropperDemo.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  // Temporary demo elements until we have access to config
  const demoElements = [
    { id: 'hero-1', title: 'Hero Section' },
    { id: 'features-1', title: 'Features Grid' },
    { id: 'cta-1', title: 'Call to Action' },
    { id: 'pricing-1', title: 'Pricing Table' },
    { id: 'testimonials-1', title: 'Testimonials' },
    { id: 'contact-1', title: 'Contact Form' }
  ];

  function handleClick(elementId: string) {
    dispatch('elementSelect', { elementId });
  }
</script>

<div class="p-4 grid grid-cols-3 gap-4">
  {#each demoElements as element}
    <button
      class="aspect-video rounded-lg border border-zinc-200 dark:border-zinc-800
             bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700
             transition-colors p-2 flex items-center justify-center"
      on:click={() => handleClick(element.id)}
    >
      <div class="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded
                  flex items-center justify-center">
        <div class="w-2/3 h-1/2 border-2 border-dashed 
                    border-zinc-300 dark:border-zinc-700 rounded" />
      </div>
    </button>
  {/each}
</div>