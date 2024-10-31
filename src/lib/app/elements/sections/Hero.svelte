<!-- lib/app/elements/content/Hero.svelte -->
<script lang="ts">
  import Element from '../base/Element.svelte';
  import { createEventDispatcher } from 'svelte';

  export let element: {
    id: string;
    type: string;
    props: {
      title: string;
      subtitle: string;
    };
  };

  const dispatch = createEventDispatcher();

  function autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
</script>

<Element {element}>
  <div class="mb-12 text-center">
    <h1 class="text-4xl font-bold mb-2">
      <textarea 
        bind:value={element.props.title} 
        on:input={autoGrow}
        class="w-full bg-transparent text-center resize-none"
      ></textarea>
    </h1>
    <p class="text-xl">
      <textarea 
        bind:value={element.props.subtitle} 
        on:input={autoGrow}
        class="w-full bg-transparent text-center resize-none"
      ></textarea>
    </p>
  </div>
</Element>

<style>
  textarea {
    overflow: hidden;
  }
</style>

