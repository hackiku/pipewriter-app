<script lang="ts">
  export let data: { items: Array<{ title: string; content: string }> };
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  {#each data.items as blurb, blurbIndex}
    <div class="p-6 bg-secondary rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-2">
        <textarea 
          bind:value={blurb.title} 
          on:input={autoGrow}
          class="w-full bg-transparent resize-none"
        ></textarea>
      </h2>
      <p>
        <textarea 
          bind:value={blurb.content} 
          on:input={autoGrow}
          class="w-full bg-transparent resize-none"
        ></textarea>
      </p>
    </div>
  {/each}
  <button on:click={() => dispatch('remove')}>Remove</button>
</div>

<style>
  textarea {
    overflow: hidden;
  }
</style>