<!-- src/lib/pages/free/components/dropper/Dropper.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { elementConfig } from '../../config';
  import ElementCard from './ElementCard.svelte';
  import { editorStore } from '../../stores/editorStore';
  import { Plus } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";

  export let onSelect: (elementId: string) => void;

  const activeElements = elementConfig.slice(0, 6);
  const previewElements = elementConfig.slice(6, 12);

  $: activeSection = $editorStore.activeSection;
  $: showAll = $editorStore.showAll;
  
  function handleShowAll() {
    const sections = elementConfig.map(config => config.id);
    sections.forEach(id => editorStore.addSection(id));
  }
</script>

<div class="w-[24em] h-[40vh] pb-2 backdrop-blur-xl rounded-xl">
  <div class="relative">
    <!-- Active Elements Grid -->
    <div class="grid grid-cols-3 gap-2">
      {#each activeElements as element (element.id)}
        <ElementCard 
          {element}
          {onSelect}
          isActive={element.id === activeSection}
        />
      {/each}
    </div>

    <!-- Preview Elements with Gradient -->
    <div class="relative mt-2">
      <div class="grid grid-cols-3 gap-2 opacity-50">
        {#each previewElements as element (element.id)}
          <ElementCard 
            {element}
            disabled={true}
          />
        {/each}
      </div>

      <!-- Gradient Overlay -->
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

    <!-- Controls -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-4 pb-4 flex items-center gap-4">
      <Button 
        variant="ghost" 
        size="sm"
        on:click={handleShowAll}
        class="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Show All Sections
      </Button>
    </div>
  </div>
</div>