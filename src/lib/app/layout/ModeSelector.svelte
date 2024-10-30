<!-- lib/app/layout/ModeSelector.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { editorMode } from "../stores/editor";
  
  const modes = [
    { id: 'edit', label: 'Edit', shortcut: '1' },
    { id: 'insert', label: 'Insert', shortcut: '2' },
    { id: 'story', label: 'Story', shortcut: '3' },
    { id: 'preview', label: 'Preview', shortcut: '4' }
  ];

  function handleKeydown(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    const modeIndex = parseInt(event.key) - 1;
    if (modeIndex >= 0 && modeIndex < modes.length) {
      editorMode.set(modes[modeIndex].id);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
  {#each modes as { id, label, shortcut }}
    <Button
      variant={$editorMode === id ? "default" : "outline"}
      class="min-w-24"
      on:click={() => editorMode.set(id)}
    >
      {label} ({shortcut})
    </Button>
  {/each}
</div>