<!-- src/lib/pages/Blurbs.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  
  export let visible = false;

  let firstHeading: HTMLElement;

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
  <div 
    class="grid grid-cols-1 md:grid-cols-3 gap-8"
    in:fade={{ duration: 300 }}
  >
    <div 
      class="flex flex-col text-left space-y-3"
      in:fly={{ y: 20, duration: 300, delay: 150, easing: quintOut }}
    >
      <div class="mb-2 font-bold text-3xl text-primary/80">
        80+
      </div>
      <h3 
        bind:this={firstHeading}
        class="text-2xl font-semibold outline-none cursor-text"
        contenteditable="true"
      >
        UI Elements
      </h3>
      <p class="text-lg text-muted-foreground">
        Components ready to copy and paste
      </p>
    </div>

    <div 
      class="flex flex-col text-left space-y-3"
      in:fly={{ y: 20, duration: 300, delay: 300, easing: quintOut }}
    >
      <div class="mb-2 font-bold text-3xl text-primary/80">
        📝
      </div>
      <h3 
        class="text-2xl font-semibold outline-none cursor-text"
        contenteditable="true"
      >
        Native Docs App
      </h3>
      <p class="text-lg text-muted-foreground">
        Write and wireframe without leaving Google Docs
      </p>
    </div>

    <div 
      class="flex flex-col text-left space-y-3"
      in:fly={{ y: 20, duration: 300, delay: 450, easing: quintOut }}
    >
      <div class="mb-2 font-bold text-3xl text-primary/80">
        ✨
      </div>
      <h3 
        class="text-2xl font-semibold outline-none cursor-text"
        contenteditable="true"
      >
        Fancy Formatted Docs
      </h3>
      <p class="text-lg text-muted-foreground">
        Pre-formatted templates that impress clients
      </p>
    </div>
  </div>
{/if}