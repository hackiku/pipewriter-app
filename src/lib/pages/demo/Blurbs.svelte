<!-- src/lib/pages/demo/Blurbs.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { demoContent } from "./data";
  
  export let visible = false;

  let firstHeading: HTMLElement;

  function bindRef(node: HTMLElement, isFirst: boolean) {
    if (isFirst) firstHeading = node;
  }

  onMount(() => {
    if (visible && firstHeading) {
      setTimeout(() => {
        firstHeading.focus();
        const range = document.createRange();
        range.selectNodeContents(firstHeading);
        range.collapse(false);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }, 500);
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
            class="mb-2 font-bold text-3xl text-primary/80 outline-none cursor-text editable-content"
            contenteditable="true"
          >
            {blurb.emoji}
          </div>
          
          <h3 
            class="text-2xl font-semibold outline-none cursor-text editable-content"
            contenteditable="true"
            use:bindRef={i === 0}
          >
            {blurb.title}
          </h3>
          
          <p 
            class="text-lg text-muted-foreground outline-none cursor-text editable-content"
            contenteditable="true"
          >
            {blurb.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .editable-content {
    position: relative;
    transition: all 0.2s ease;
    padding: 0.25rem 0.5rem;
    margin: -0.25rem -0.5rem;
    border-radius: 6px;
  }

  .editable-content:hover {
    background: rgb(var(--primary) / 0.04);
  }

  .editable-content:focus {
    background: rgb(var(--primary) / 0.08);
    box-shadow: 
      inset 0 0 0 2px rgb(var(--primary) / 0.2),
      0 0 0 1px rgb(var(--primary) / 0.1);
    outline: none;
  }

  /* Smooth transition for selection */
  ::selection {
    background: rgb(var(--primary) / 0.2);
  }

  /* Fix emoji selection */
  .editable-content:first-child::selection {
    background: transparent;
  }

  @media (max-width: 768px) {
    .editable-content {
      -webkit-tap-highlight-color: rgb(var(--primary) / 0.1);
    }
  }
</style>