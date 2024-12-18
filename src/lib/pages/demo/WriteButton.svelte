<!-- src/lib/pages/demo/WriteButton.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Edit2 } from "lucide-svelte";
  import { editingStore } from "$lib/stores/editingStore";

  export let onClick: () => void = () => {};
  
  $: isEditing = $editingStore.isEditing;
</script>

<Button 
  variant="outline" 
  size="lg" 
  class="group flex items-center gap-2 h-12 relative"
  on:click={onClick}
>
  <div class="flex items-center transition-all duration-300" class:gap-3={isEditing} class:gap-2={!isEditing}>
    <!-- Status dot - always visible, changes color based on state -->
    <div 
      class="w-2 h-2 rounded-full transition-all duration-300" 
      class:animate-pulse={isEditing}
      style:background={isEditing ? 
        'linear-gradient(to right, #3644FE, #B345ED)' : 
        'rgb(var(--muted-foreground))'
      }
    />
    
    <!-- Text with conditional gradient -->
    <span class="transition-all duration-300" style={isEditing ? 
      'background: linear-gradient(to right, #3644FE, #B345ED); -webkit-background-clip: text; -webkit-text-fill-color: transparent;' : 
      ''
    }>
      {isEditing ? 'Writing' : 'Write'}
    </span>
    
    <!-- Icon remains unchanged -->
    <Edit2 
      class="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" 
    />
  </div>
</Button>

<style>
  /* Adding a subtle gradient background when editing */
  :global(.group[data-editing="true"]) {
    background: linear-gradient(to right, rgba(54, 68, 254, 0.05), rgba(179, 69, 237, 0.05));
    border-color: transparent;
    border-image: linear-gradient(to right, #3644FE, #B345ED) 1;
  }
</style>