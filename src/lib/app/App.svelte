<!-- lib/app/App.svelte -->

<script lang="ts">
  import Header from "./layout/Header.svelte";
  import Dropper from "./layout/Dropper.svelte";
  import ModeSelector from "./layout/ModeSelector.svelte";
  import Canvas from "./Canvas.svelte";
  import { editorMode } from "./stores/editor";
</script>

<div class="min-h-screen bg-background text-foreground">
  <Header />
  
  <main class="relative pt-24">
    <Dropper />
    <Canvas />
  </main>

  <ModeSelector />
</div>