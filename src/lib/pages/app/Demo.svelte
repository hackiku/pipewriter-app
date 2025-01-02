<!-- src/lib/pages/app/Demo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { editorStore } from './stores/content';
  import type { SectionType } from './types';
  
  // Section components
  import Hero from './components/sections/Hero.svelte';
  
  const sectionComponents = {
    hero: Hero,
    // We'll add more as we build them
  };
  
  // Method to add new section
  export function showElement(elementId: string) {
    // We'll implement this later
    console.log('Adding element:', elementId);
  }
</script>

<div class="space-y-24">
  {#each $editorStore.sections.sort((a, b) => a.order - b.order) as section (section.id)}
    <div 
      id={section.id}
      class="transition-all duration-500"
    >
      <svelte:component 
        this={sectionComponents[section.type]} 
        content={section.content}
        visible={section.visible}
      />
    </div>
  {/each}
</div>