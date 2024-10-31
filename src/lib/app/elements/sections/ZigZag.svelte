<!-- lib/app/elements/content/ZigZag.svelte -->
<script lang="ts">
  import Element from '../base/Element.svelte';
  import { createEventDispatcher } from 'svelte';

  export let element: {
    id: string;
    type: string;
    props: {
      title: string;
      description: string;
      image: string;
      reversed: boolean;
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
  <div class={`flex ${element.props.reversed ? 'flex-row-reverse' : ''} mb-12`}>
    <div class="w-1/2 p-4">
      <h2 class="text-2xl font-semibold mb-2">
        <textarea 
          bind:value={element.props.title} 
          on:input={autoGrow}
          class="w-full bg-transparent resize-none"
        ></textarea>
      </h2>
      <p>
        <textarea 
          bind:value={element.props.description} 
          on:input={autoGrow}
          class="w-full bg-transparent resize-none"
        ></textarea>
      </p>
    </div>
    <div class="w-1/2">
      <img src={element.props.image} alt="ZigZag Content" class="w-full h-auto">
    </div>
  </div>
</Element>

<style>
  textarea {
    overflow: hidden;
  }
</style>
