<!-- src/lib/pages/free/components/dropper/Dropper.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { elementConfig } from '../../config';
  import ElementCard from './ElementCard.svelte';
  import { editorStore } from '../../stores/editorStore';
  import { Plus, Save } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import { Switch } from "$lib/components/ui/switch";
  import ExportButton from "../cta/ExportButton.svelte";
  
  export let handleElementSelect: (elementId: string) => void;
  
  $: activeElements = elementConfig.slice(0, 6);
  $: previewElements = elementConfig.slice(6, 12);
  $: activeSection = $editorStore.activeSection;
  $: showAll = $editorStore.showAll;

  function onSelect(elementId: string) {
    handleElementSelect(elementId);
  }

  function handleShowAll() {
    editorStore.toggleShowAll();
  }
</script>

<div class="w-[24em] pb-2 backdrop-blur-xl rounded-xl border border-border/50 bg-background/95">
  <div class="relative">
    <!-- Striped Background -->
    <div 
      class="absolute inset-0 rounded-xl overflow-hidden opacity-5"
      style="
        background: repeating-linear-gradient(
          45deg,
          rgba(54, 68, 254, 0.35),
          rgba(179, 69, 237, 0.15) 25%,
          transparent 25%,
          transparent 50%
        );
        background-size: 32px 32px;
      "
    />

    <!-- Active Elements Grid -->
    <div class="grid grid-cols-3 gap-2 p-2 relative">
      {#each activeElements as element (element.id)}
        <ElementCard 
          {element}
          onSelect={() => onSelect(element.id)}
          isActive={element.id === activeSection}
          isEditing={false}
        />
      {/each}
    </div>

    <!-- Preview Elements with Gradient -->
    <div class="relative mt-2">
      <div class="grid grid-cols-3 gap-2 p-2 opacity-50">
        {#each previewElements as element (element.id)}
          <ElementCard 
            {element}
            disabled={true}
            isActive={false}
            isEditing={false}
          />
        {/each}
      </div>

      <!-- Gradient Overlay -->
      <div 
        class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-background/80 to-background"
      >
        <div class="absolute inset-x-0 bottom-0 h-32 flex items-center justify-center">
          <div 
            class="p-3 rounded-full bg-muted/20 border border-muted"
            in:fade
          >
            <Plus class="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute inset-x-0 -bottom-2 px-4 py-6 bg-gradient-to-t from-background via-background/95 to-transparent">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <ExportButton 
            text="Save"
            icon={Save}
            showReset={true}
          />
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          on:click={() => {
            // Add all sections from elementConfig when Show All is clicked
            elementConfig.forEach(config => {
              editorStore.addSection(config.id);
            });
          }}
          class="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Show All Sections
        </Button>
      </div>
    </div>
  </div>
</div>

<style>
  .grid {
    transition: opacity 0.2s ease-out;
  }
</style>