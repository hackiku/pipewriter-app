<!-- lib/blog/components/blocks/SvelteRenderer.svelte -->
<script lang="ts">
  export let component: any;
  export let props = {};
  export let showSource = false;
</script>

<div class="not-prose space-y-4">
  {#if showSource}
    <div class="bg-muted rounded-lg p-4">
      <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
    </div>
  {/if}
  
  <div class="p-8 rounded-xl bg-card border flex items-center justify-center">
    <svelte:component this={component} {...props} />
  </div>
</div>