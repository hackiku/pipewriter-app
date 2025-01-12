<!-- src/lib/blog/components/blocks/CodeDemo.svelte -->
<script lang="ts">
  export let code: string | undefined = undefined;
  export let language: string = 'text';

  // Create a container for slot content
  let container: HTMLDivElement;
  
  // Get code content, either from prop or slot
  $: displayCode = code || (container?.textContent || '');
</script>

<div class="relative rounded-lg bg-zinc-900 p-4 my-4">
  {#if $$slots.default}
    <div bind:this={container} class="hidden">
      <slot />
    </div>
    <pre><code class="language-{language}">{displayCode}</code></pre>
  {:else}
    <pre><code class="language-{language}">{code}</code></pre>
  {/if}
</div>

<style>
  pre {
    margin: 0;
    padding: 0;
  }
  code {
    color: #fff;
    font-family: monospace;
    white-space: pre-wrap;
  }
  .hidden {
    display: none;
  }
</style>