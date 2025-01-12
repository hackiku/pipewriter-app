<!-- src/lib/blog/components/blocks/CodeDemo.svelte -->
<script lang="ts">
  export let code: string;
  export let language: string;
</script>

<div class="code-demo">
  <pre><code class="language-{language}">{code}</code></pre>
  {#if language === 'svelte'}
    <div class="preview">
      <svelte:component this={eval(code)} />
    </div>
  {/if}
</div>