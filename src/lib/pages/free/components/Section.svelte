<!-- src/lib/pages/free/components/Section.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  import { editorStore } from '../stores/editorStore';
  import type { Section } from '../types';
  import { Trash2 } from 'lucide-svelte';
  
  export let section: Section;
  
  let isNearby = false;
  let sectionEl: HTMLElement;
  let observer: IntersectionObserver;
  
  function handleDelete() {
    editorStore.removeSection(section.id);
  }

  onMount(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        isNearby = entry.isIntersecting;
      },
      { 
        rootMargin: '100px 0px',
        threshold: 0.1 
      }
    );
    
    if (sectionEl) {
      observer.observe(sectionEl);
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<div 
  bind:this={sectionEl}
  class="group relative flex items-start gap-4 max-w-screen-xl mx-auto px-4"
  in:fade={{ duration: 200 }}
>
  <!-- Delete Button Container -->
  <div class="sticky top-24 pt-4">
    <button
      class="opacity-0 transition-opacity duration-200 p-2 rounded-lg hover:bg-destructive/10
             {isNearby ? 'group-hover:opacity-100' : ''}"
      on:click={handleDelete}
      aria-label="Delete section"
    >
      <Trash2 class="w-5 h-5 text-destructive hover:text-destructive/80" />
    </button>
  </div>
  
  <!-- Section Content -->
  <div class="flex-1">
    <slot />
  </div>
</div>