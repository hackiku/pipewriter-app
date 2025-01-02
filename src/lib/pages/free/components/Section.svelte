<!-- src/lib/pages/free/components/Section.svelte -->
 
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { editorStore } from '../stores/editorStore';
  import type { Section } from '../types';
  import { Trash2 } from 'lucide-svelte';
  
  export let section: Section;
  
  function handleDelete() {
    editorStore.removeSection(section.id);
  }
</script>

<div 
  class="group relative"
  in:fade={{ duration: 200 }}
>
  <!-- Delete Button -->
  <button
    class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
    on:click={handleDelete}
  >
    <Trash2 class="w-5 h-5 text-destructive hover:text-destructive/80" />
  </button>
  
  <!-- Section Content -->
  <slot />
</div>