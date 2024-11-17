<script lang="ts">
  import Frame from '$lib/iframe/Frame.svelte';
  import { onMount } from 'svelte';

  // Keep track of whether we're in the iframe for testing
  let isIframe = false;

  // Function to return focus to parent document
  function returnFocusToParent() {
    if (isIframe) {
      // When in iframe, post message to parent
      window.parent.focus();
    } else {
      // During testing/development, just blur the current element
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }

  // Handle background clicks to manage focus
  function handleBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Ignore clicks on or within interactive elements
    if (target.closest('button, input, select, textarea, [role="button"], [tabindex="0"]')) {
      return;
    }

    returnFocusToParent();
  }

  onMount(() => {
    // Detect if we're running in an iframe
    isIframe = window !== window.parent;

    // Listen for escape key to return focus to parent
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        returnFocusToParent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<!-- Container with click handler and tabindex to prevent focus capture -->
<div 
  class="h-full"  
  on:click={handleBackgroundClick}
  tabindex="-1"
>
  <Frame />
</div>

<style>
  /* Remove focus styles from non-interactive elements */
  :global(*:not(button):not(input):not(select):not(textarea):not([role="button"]):not([tabindex="0"])) {
    outline: none !important;
  }

  /* Keep focus styles on interactive elements */
  :global(button:focus-visible),
  :global(input:focus-visible),
  :global(select:focus-visible),
  :global(textarea:focus-visible),
  :global([role="button"]:focus-visible),
  :global([tabindex="0"]:focus-visible) {
    outline: 2px solid var(--ring-color, #3b82f6) !important;
    outline-offset: 2px !important;
  }

  /* Prevent text selection on non-interactive elements */
  div {
    user-select: none;
  }

  /* But allow text selection within form controls */
  :global(input), 
  :global(textarea), 
  :global([contenteditable="true"]) {
    user-select: text;
  }
</style>