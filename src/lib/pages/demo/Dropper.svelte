<!-- src/lib/pages/demo/Dropper.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Checkbox } from "$lib/components/ui/checkbox";
  import ElementCard from "./ElementCard.svelte";
  import { Save, Plus } from "lucide-svelte";
  import ExportButton from "$lib/components/free/ExportButton.svelte";
  import { activeElements, sectionToElement } from './dropperConfig';
  import { editingStore } from '$lib/stores/editingStore';
  import { demoStore } from '$lib/stores/demoStore';
  import { get } from 'svelte/store';
  
  export let onSelect: (elementId: string) => void;

  // First 6 elements are clickable
  $: clickableElements = activeElements.slice(0, 6);
  // Rest are for display
  $: displayElements = activeElements.slice(6, 12);

  // Track active section from the store
  $: activeSections = $demoStore.sections
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order);
  $: activeSectionId = get(editingStore).activeElement?.split('-')[0] || 
    activeSections[activeSections.length - 1]?.id || null;

  // Helper to check if an element corresponds to active section
  function isElementActive(elementId: string): boolean {
    if (!activeSectionId) return false;
    const activeElement = sectionToElement[activeSectionId];
    return activeElement === elementId;
  }

  // Helper to check if a section is being edited
  function isElementBeingEdited(elementId: string): boolean {
    const section = Object.entries(sectionToElement)
      .find(([_, el]) => el === elementId)?.[0];
    if (!section) return false;
    return get(editingStore).activeElement?.startsWith(section) || false;
  }

  function handleElementSelect(elementId: string) {
    onSelect(elementId);
  }
</script>

<div class="w-[24em] h-[40vh] md:h-[40vh] pb-2 backdrop-blur-xl rounded-xl">
  <div class="relative">
    <!-- Clickable Elements -->
    <div class="grid grid-cols-3 gap-2">
      {#each clickableElements as element (element.id)}
        <ElementCard 
          {element}
          onSelect={() => handleElementSelect(element.id)}
          isActive={isElementActive(element.id)}
          isEditing={isElementBeingEdited(element.id)}
        />
      {/each}
    </div>

    <!-- Display Elements with Gradient -->
    <div class="relative mt-2">
      <div class="grid grid-cols-3 gap-2 opacity-50">
        {#each displayElements as element (element.id)}
          <ElementCard 
            element={element}
            disabled={true}
            isActive={false}
            isEditing={false}
          />
        {/each}
      </div>

      <!-- Gradient Overlay with Icon -->
      <div 
        class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-background/80 to-background flex items-center justify-center"
      >
        <div 
          class="mt-12 p-3 rounded-full bg-muted/20 border border-muted"
          in:fade
        >
          <Plus class="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </div>
    
<!-- Export and Reset buttons -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-4 pb-4 flex items-center gap-4">
      <ExportButton 
        text="Export"
        icon={Save}
        showReset={true}
      />
      
      <div class="flex items-center space-x-2">
        <Checkbox
          id="show-all"
          checked={$demoStore.showAll}
          onCheckedChange={() => demoStore.toggleShowAll()}
        />
        <label
          for="show-all"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show All
        </label>
      </div>
    </div>
  </div>
</div>

<style>
  /* Smooth transitions */
  .grid {
    transition: opacity 0.2s ease-out;
  }
</style>