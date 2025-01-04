<!-- src/lib/pages/free/components/dropper/Dropper.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { elementConfig } from '../../config';
  import ElementCard from './ElementCard.svelte';
  import { editorStore } from '../../stores/editorStore';
  import { Plus, Save } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import ExportButton from "../cta/ExportButton.svelte";
  
  export let handleElementSelect: (elementId: string) => void;
  
  // Show first 6 as clickable, next 2 as disabled, rest hidden by gradient
  $: activeElements = elementConfig.slice(0, 6);
  $: disabledElements = elementConfig.slice(6, 8);
  $: activeSection = $editorStore.activeSection;

  function onSelect(elementId: string) {
    handleElementSelect(elementId);
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

    <!-- Disabled Elements with Gradient -->
    <div class="relative mt-2">
      <div class="grid grid-cols-3 gap-2 p-2">
        {#each disabledElements as element (element.id)}
          <ElementCard 
            {element}
            disabled={true}
            isActive={false}
            isEditing={false}
          />
        {/each}
      </div>

      <!-- Enhanced Gradient Overlay -->
      <div 
        class="absolute inset-0 pointer-events-none"
        style="
          background: linear-gradient(to bottom, 
            transparent 0%,
            rgba(54, 68, 254, 0.03) 40%,
            rgba(179, 69, 237, 0.05) 60%,
            var(--background) 100%
          );
        "
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
        <ExportButton 
          text="Save"
          icon={Save}
          showReset={true}
        />
        
        <Button
          variant="ghost"
          size="sm"
          on:click={() => elementConfig.forEach(config => editorStore.addSection(config.id))}
          class="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Show All Sections
        </Button>
      </div>
    </div>
  </div>
</div>