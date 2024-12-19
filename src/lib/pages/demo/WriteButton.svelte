<!-- src/lib/pages/demo/WriteButton.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Edit2, Save } from "lucide-svelte";
  import { editingStore } from "$lib/stores/editingStore";
  import { scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  export let onClick: () => void = () => {};
  export let onExport: () => void = () => {};
  
  $: isEditing = $editingStore.isEditing;
</script>

<div class="flex items-center gap-2">
  <Button
    on:click={onClick}
    variant="outline"
    class="relative group h-10 px-4 inline-flex items-center gap-2 rounded-full transition-all duration-300 {isEditing ? 'bg-gradient-to-r from-primary/10 to-purple-500/10' : 'hover:bg-muted/80'} {isEditing ? 'border-transparent' : 'border-input'}"
  >
    <!-- Gradient border when active -->
    {#if isEditing}
      <div 
        class="absolute inset-0 rounded-full transition-opacity duration-300 opacity-100"
        style="
          padding: 1px;
          background: linear-gradient(90deg, #3644FE, #B345ED);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        "
      />
    {/if}

    <!-- Status indicator circle with ripple -->
    <div class="relative flex items-center">
      <div 
        class="w-2.5 h-2.5 rounded-full transition-all duration-300 {isEditing ? 'animate-pulse' : ''}"
        style:background={isEditing ? 
          'linear-gradient(90deg, #3644FE, #B345ED)' : 
          'rgb(var(--muted-foreground))'
        }
      />
      
      <!-- Ripple effect when active -->
      {#if isEditing}
        <div 
          class="absolute inset-0 rounded-full animate-ping"
          style="background: linear-gradient(90deg, #3644FE33, #B345ED33)"
        />
      {/if}
    </div>

    <!-- Text with gradient when active -->
    <span 
      class="text-sm font-medium transition-all duration-300"
      style={isEditing ? 
        'background: linear-gradient(90deg, #3644FE, #B345ED); -webkit-background-clip: text; -webkit-text-fill-color: transparent;' : 
        ''
      }
    >
      {isEditing ? 'Writing...' : 'Write now'}
    </span>

    <!-- Icon in circle -->
    <div 
      class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-12 {isEditing ? 
        'bg-gradient-to-r from-primary/20 to-purple-500/20' : 
        'bg-muted'
      }"
    >
      <Edit2 class="w-3.5 h-3.5" />
    </div>
  </Button>

  <!-- Export button that appears when editing -->
  {#if isEditing}
    <div 
      class="relative group"
      in:scale={{duration: 400, easing: elasticOut, delay: 200}}
      out:scale={{duration: 200}}
    >
      <Button
        on:click={onExport}
        variant="default"
        size="icon"
        class="h-10 w-10 rounded-full transition-all duration-300 hover:scale-105"
      >
        <Save class="w-4 h-4" />
      </Button>
      
      <!-- Tooltip -->
      <div 
        class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
      >
        <div class="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          Export
          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-popover" />
        </div>
      </div>
    </div>
  {/if}
</div>