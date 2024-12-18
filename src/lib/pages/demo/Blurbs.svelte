<!-- src/lib/pages/demo/Blurbs.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { demoContent } from "./data";
  import EditableCursor from './EditableCursor.svelte';
  
  export let visible = false;

  let firstHeading: HTMLElement;

  function bindRef(node: HTMLElement, isFirst: boolean) {
    if (isFirst) firstHeading = node;
  }

  onMount(() => {
    // When the component becomes visible, focus and select the first heading
    if (visible && firstHeading) {
      setTimeout(() => {
        firstHeading.focus();
        // Create a range to place cursor at the end
        const range = document.createRange();
        range.selectNodeContents(firstHeading);
        range.collapse(false);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }, 500); // Wait for animation to complete
    }
  });
</script>

{#if visible}
  <div class="container mx-auto">
    <div 
      class="grid grid-cols-1 md:grid-cols-3 gap-8"
      in:fade={{ duration: 300 }}
    >
      {#each demoContent.features.blurbs as blurb, i}
        <div 
          class="flex flex-col text-left space-y-3"
          in:fly={{ y: 20, duration: 300, delay: 150 * (i + 1), easing: quintOut }}
        >
          <div 
            class="mb-2 font-bold text-3xl text-primary/80 outline-none cursor-text relative"
            contenteditable="true"
          >
            {blurb.emoji}
            <EditableCursor />
          </div>
          
          <h3 
            class="text-2xl font-semibold outline-none cursor-text relative"
            contenteditable="true"
            use:bindRef={i === 0}
          >
            {blurb.title}
            <EditableCursor />
          </h3>
          
          <p 
            class="text-lg text-muted-foreground outline-none cursor-text relative"
            contenteditable="true"
          >
            {blurb.description}
            <EditableCursor />
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  [contenteditable="true"]:hover {
    outline: 2px solid rgb(var(--primary) / 0.2);
    border-radius: 4px;
  }
  
  [contenteditable="true"]:focus {
    outline: 2px solid rgb(var(--primary) / 0.4);
    border-radius: 4px;
  }
</style>