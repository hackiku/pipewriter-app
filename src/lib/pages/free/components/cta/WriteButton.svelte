<!-- src/lib/pages/free/components/cta/WriteButton.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from "$lib/components/ui/button";
  import { Edit2 } from "lucide-svelte";
  import { editorStore } from '../../stores/editorStore';
  import { scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import ExportButton from "./ExportButton.svelte";

  export let size: "default" | "lg" = "default";
  export let headlineElement: HTMLElement | null = null;

  // Track if we're editing any field
  $: isEditing = $editorStore.editingField !== null;

  function focusHeadline() {
    if (headlineElement) {
      // First set the editing field in store
      editorStore.setEditingField('hero-headline');
      
      // Then focus and move cursor to end
      setTimeout(() => {
        headlineElement.focus();
        
        const range = document.createRange();
        const selection = window.getSelection();
        
        // Move cursor to end
        range.selectNodeContents(headlineElement);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }, 0);
    }
  }

  function handleClick() {
    focusHeadline();
  }

  onMount(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      const isEditable = target.closest('[contenteditable="true"]');
      const isWriteButton = target.closest('.write-button');
      
      if (!isEditable && !isWriteButton && isEditing) {
        editorStore.setEditingField(null);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="flex items-center gap-2">
  <Button
    variant="outline"
    on:click={handleClick}
    class="write-button relative group {size === 'lg' ? 'h-12' : 'h-10'} px-4 inline-flex items-center gap-2 rounded-full transition-all duration-300 {isEditing ? 'bg-gradient-to-r from-primary/10 to-purple-500/10' : 'hover:bg-muted/80'} {isEditing ? 'border-transparent' : 'border-input'}"
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
      {isEditing ? 'Writing...' : 'Write'}
    </span>

    <Edit2 class="w-3.5 h-3.5 opacity-50" />
  </Button>

  <!-- Export button that appears when editing -->
  {#if isEditing}
    <div 
      class="relative group"
      in:scale={{duration: 400, easing: elasticOut, delay: 200}}
      out:scale={{duration: 200}}
    >
      <ExportButton iconOnly={true} />
    </div>
  {/if}
</div>