<!-- src/lib/pages/free/components/editor/Styles.svelte -->
<script lang="ts">
  import { editorStore } from '../../stores/editorStore';
  import type { StylesProps } from './types';
  
  export let sectionId: StylesProps['sectionId'];
  export let className = '';
  export let padding = true; // Allow disabling padding for specific cases
  
  $: isActive = $editorStore.editingField?.startsWith(sectionId);
  $: isHovered = false;
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<div 
  class="relative transition-all duration-300 rounded-lg {className}"
  class:active={isActive}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <slot />
  
  <!-- Interactive Border and Background Effect -->
  <div 
    class="absolute {padding ? '-inset-2' : '-inset-px'} rounded-xl pointer-events-none
           transition-all duration-300 opacity-0 border-2 border-dashed border-transparent
           {isActive || isHovered ? 'opacity-100' : ''}"
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