<script lang="ts">
import { onMount } from 'svelte';
import AppHeader from "$lib/components/AppHeader.svelte";
import ElementsDropper from '$lib/components/ElementsDropper.svelte';
import Canvas from '$lib/components/Canvas.svelte';
import { Button } from "$lib/components/ui/button";

let currentMode = 'edit';

function handleKeydown(event: KeyboardEvent) {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
    return; // Don't hijack when user is typing in an input field
  }

  switch (event.key) {
    case '1':
      currentMode = 'edit';
      break;
    case '2':
      currentMode = 'insert';
      break;
    case '3':
      currentMode = 'story';
      break;
    case '4':
      currentMode = 'preview';
      break;
  }
}

onMount(() => {
  window.addEventListener('keydown', handleKeydown);
  return () => {
    window.removeEventListener('keydown', handleKeydown);
  };
});
</script>

<svelte:window on:keydown={handleKeydown} />

<AppHeader />

<main class="flex flex-col min-h-screen bg-background text-foreground pt-24">
	<div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
		<Button variant={currentMode === 'edit' ? 'default' : 'outline'}>Edit (1)</Button>
		<Button variant={currentMode === 'insert' ? 'default' : 'outline'}>Insert (2)</Button>
		<Button variant={currentMode === 'story' ? 'default' : 'outline'}>Story (3)</Button>
		<Button variant={currentMode === 'preview' ? 'default' : 'outline'}>Preview (4)</Button>
	</div>
  {#if currentMode !== 'story'}
    <ElementsDropper />
  {/if}
  
  <div class={currentMode}>
    <Canvas />
  </div>
</main>

<style>
  .edit {
    /* Styles for edit mode */
  }
  .insert {
    /* Styles for insert mode */
  }
  .story {
    /* Styles for story mode */
  }
  .preview {
    /* Styles for preview mode */
  }
</style>