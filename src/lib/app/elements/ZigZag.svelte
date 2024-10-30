<script lang="ts">
  export let data: { title: string; content: string; imageUrl: string; reverse: boolean };
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
</script>

<div class={`flex ${data.reverse ? 'flex-row-reverse' : ''} mb-12`}>
  <div class="w-1/2 p-4">
    <h2 class="text-2xl font-semibold mb-2">
      <textarea 
        bind:value={data.title} 
        on:input={autoGrow}
        class="w-full bg-transparent resize-none"
      ></textarea>
    </h2>
    <p>
      <textarea 
        bind:value={data.content} 
        on:input={autoGrow}
        class="w-full bg-transparent resize-none"
      ></textarea>
    </p>
  </div>
  <div class="w-1/2">
    <img src={data.imageUrl} alt="ZigZag Image" class="w-full h-auto">
  </div>
  <button on:click={() => dispatch('remove')}>Remove</button>
</div>

<style>
  textarea {
    overflow: hidden;
  }
</style>