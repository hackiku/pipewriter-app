<!-- src/lib/pages/ZigZag.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import EditableCursor from '$lib/components/EditableCursor.svelte';

  export let visible = false;
  export let direction: 'left' | 'right' = 'left';
  export let heading = 'Perfect For';
  export let subheading = 'Copywriters, UX Writers, Content Designers';
  export let description = 'Get professional-grade templates that actually look sick. With 70+ wireframe elements, dark mode, and UX patterns built in.';

  // Animation delays for staggered entrance
  const delays = {
    heading: direction === 'left' ? 150 : 300,
    content: direction === 'left' ? 300 : 150
  };
</script>

{#if visible}
  <div 
    class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-24"
    in:fade={{ duration: 300 }}
  >
    <!-- Text Content - Conditionally ordered based on direction -->
    <div 
      class="flex flex-col space-y-6 {direction === 'right' ? 'md:order-2' : ''}"
      in:fly={{ x: direction === 'left' ? -20 : 20, duration: 300, delay: delays.content, easing: quintOut }}
    >
      <div class="space-y-3">
        <h3 
          class="text-lg font-medium text-muted-foreground outline-none" 
          contenteditable="true"
          bind:innerText={heading}
        >
          {heading}
          <EditableCursor />
        </h3>
        
        <h2 
          class="text-3xl font-semibold outline-none"
          contenteditable="true"
          bind:innerText={subheading}
        >
          {subheading}
          <EditableCursor />
        </h2>
      </div>

      <p 
        class="text-lg text-muted-foreground outline-none"
        contenteditable="true"
        bind:innerText={description}
      >
        {description}
        <EditableCursor />
      </p>

      <div class="flex items-center gap-2 group cursor-pointer">
        <span class="font-medium">Learn more</span>
        <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>

    <!-- Image Placeholder - Conditionally ordered based on direction -->
    <div 
      class="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden {direction === 'right' ? 'md:order-1' : ''}"
      in:fly={{ x: direction === 'left' ? 20 : -20, duration: 300, delay: delays.heading, easing: quintOut }}
    >
      <div class="absolute inset-0 flex items-center justify-center text-gray-400">
        <span>Image Placeholder</span>
      </div>
    </div>
  </div>
{/if}
