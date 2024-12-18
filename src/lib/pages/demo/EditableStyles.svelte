<!-- src/lib/pages/demo/EditableStyles.svelte -->

<script lang="ts">
  import { editingStore } from "$lib/stores/editingStore";
  
  export let elementId: string;
  
  $: isActiveElement = $editingStore.activeElement === elementId;
</script>

<div 
  class="editable-container relative transition-all duration-300"
  class:active={isActiveElement}
>
  <slot />
</div>

<style>
  .editable-container {
    border-radius: 8px;
  }

  .editable-container::before {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: 12px;
    padding: 8px;
    pointer-events: none;
    transition: all 0.3s ease;
    opacity: 0;
  }

  .editable-container:hover::before {
    opacity: 1;
    border: 2px dashed transparent;
    border-image: linear-gradient(to right, #3644FE, #B345ED) 1;
  }

  .editable-container.active::before {
    opacity: 1;
    border: 2px dashed transparent;
    border-image: linear-gradient(to right, #B345ED, #3644FE) 1;
    background: linear-gradient(to right, rgba(54,68,254,0.05), rgba(179,69,237,0.05));
  }

  /* Mobile optimization */
  @media (max-width: 768px) {
    .editable-container {
      cursor: text;
      -webkit-tap-highlight-color: rgba(179,69,237,0.1);
    }
  }
</style>