<!-- $lib/iframe/components/ElementCard.svelte -->
<script lang="ts">
  import type { ElementObject } from '../elements';

  export let element: ElementObject;
  export let onSelect: (id: string) => void;

  function handleClick() {
    onSelect(element.id);
  }
</script>

<button
  class="element image relative cursor-copy w-full h-full"
  on:click={handleClick}
  title={element.description}
>
  <img src={element.src} alt={element.alt} class="w-full h-full object-cover" />
</button>

<style>
  .image {
    transition: transform 0.2s ease-in-out;
  }
  .image:hover {
    transform: translateX(-8%) rotate(-10deg);
    transform-origin: bottom left;
  }
</style>