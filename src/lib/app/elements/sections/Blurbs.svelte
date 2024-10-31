<!-- lib/app/elements/content/Blurbs.svelte -->
<script lang="ts">
  import Element from '../base/Element.svelte';
  import { createEventDispatcher } from 'svelte';

  export let element: {
    id: string;
    type: string;
    props: {
      items: Array<{ title: string; description: string }>;
    };
  };

  const dispatch = createEventDispatcher();

  function autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
</script>
