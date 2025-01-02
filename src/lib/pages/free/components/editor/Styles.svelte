<!-- src/lib/pages/free/components/editor/Styles.svelte -->
<script lang="ts">
  import { editorStore } from '../../stores/editorStore';
  import type { StylesProps } from './types';
  
  export let sectionId: StylesProps['sectionId'];
  export let className: StylesProps['className'] = '';
  
  $: isActive = $editorStore.editingField?.startsWith(sectionId);
</script>

<div 
  class="relative transition-all duration-300 {className}"
  class:active={isActive}
>
  <slot />
  
  <!-- Hover/Active Border Effect -->
  <div 
    class="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300
           hover:opacity-100 active:opacity-100 rounded-lg border-2 border-dashed border-primary/30
           {isActive ? 'opacity-100 bg-primary/5' : ''}"
  />
</div>

<style>
  /* Mobile optimization */
  @media (max-width: 768px) {
    div {
      cursor: text;
      -webkit-tap-highlight-color: rgba(var(--primary), 0.1);
    }
  }
</style>