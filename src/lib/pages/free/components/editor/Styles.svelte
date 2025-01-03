<!-- src/lib/pages/free/components/editor/Styles.svelte -->
<script lang="ts">
  import { editorStore } from '../../stores/editorStore';
  import type { StylesProps } from './types';
  
  export let sectionId: StylesProps['sectionId'];
  export let className: StylesProps['className'] = '';
  
  $: isActive = $editorStore.editingField?.startsWith(sectionId);
</script>

<div 
  class="relative transition-all duration-300 rounded-lg {className}"
  class:active={isActive}
>
  <slot />
  
  <!-- Border and Background Effect -->
  <div 
    class="absolute -inset-2 rounded-xl pointer-events-none transition-opacity duration-300
           opacity-0 hover:opacity-100 border-2 border-dashed border-transparent
           {isActive ? 'opacity-100' : ''}"
    style="background: {isActive ? 'linear-gradient(to right, rgba(54,68,254,0.05), rgba(179,69,237,0.05))' : 'transparent'};
           border-image: linear-gradient(to right, #3644FE, #B345ED) 1;"
  />
</div>

<style>
  /* Mobile optimization */
  @media (max-width: 768px) {
    div {
      cursor: text;
      -webkit-tap-highlight-color: rgba(179,69,237,0.1);
    }
  }
</style>