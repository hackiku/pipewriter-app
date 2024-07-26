<script lang="ts">
  export let data: { title: string; subtitle: string };
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
</script>

<div class="mb-12 text-center">
  <h1 class="text-4xl font-bold mb-4">
    <textarea 
      bind:value={data.title} 
      on:input={autoGrow}
      class="w-full bg-transparent text-center resize-none"
    ></textarea>
  </h1>
  <p class="text-xl">
    <textarea 
      bind:value={data.subtitle} 
      on:input={autoGrow}
      class="w-full bg-transparent text-center resize-none"
    ></textarea>
  </p>
  <button on:click={() => dispatch('remove')}>Remove</button>
</div>

<style>
  textarea {
    overflow: hidden;
  }
</style>