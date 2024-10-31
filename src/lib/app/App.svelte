<!-- lib/app/App.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import Header from "./layout/Header.svelte";
  import ElementsDropper from './layout/Dropper.svelte';
  import Canvas from './Canvas.svelte';
  import ModeSelector from './layout/ModeSelector.svelte';
  import { editorMode } from './stores/editor';
</script>

<Header />

<main class="flex flex-col min-h-screen bg-background text-foreground pt-24">
  {#if $editorMode !== 'story'}
    <ElementsDropper />
  {/if}
  
  <div class={$editorMode}>
    <Canvas />
  </div>

  <ModeSelector />
</main>

<style>
	html {
		overflow-y: hidden;
	}
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