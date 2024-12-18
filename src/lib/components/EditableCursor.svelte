<!-- src/lib/components/EditableCursor.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Props for customization
  export let color = 'currentColor';
  export let height = '1.2em';
  export let width = '2px';
  export let blinkDuration = '1s';
  
  let visible = false;
  let parentElement: HTMLElement;
  let isEditable = false;

  onMount(() => {
    visible = true;
    
    // Check if parent element is contenteditable
    if (parentElement?.parentElement) {
      isEditable = parentElement.parentElement.hasAttribute('contenteditable');
    }
  });
</script>

<span 
  bind:this={parentElement}
  class="cursor-container {isEditable ? 'in-editable' : ''}"
>
  {#if visible}
    <span 
      class="cursor"
      style="
        --cursor-color: {color};
        --cursor-height: {height};
        --cursor-width: {width};
        --blink-duration: {blinkDuration};
      "
    />
  {/if}
</span>

<style>
  .cursor-container {
    display: inline-block;
    vertical-align: bottom;
    line-height: 0;
  }

  .cursor-container.in-editable {
    margin-left: 1px;
  }

  .cursor {
    display: inline-block;
    width: var(--cursor-width);
    height: var(--cursor-height);
    background-color: var(--cursor-color);
    vertical-align: bottom;
    opacity: 0;
    animation: blink var(--blink-duration) step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
</style>