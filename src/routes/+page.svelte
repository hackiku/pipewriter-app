<script lang="ts">
import ElementsDropper from '$lib/components/ElementsDropper.svelte';
import Canvas from '$lib/components/Canvas.svelte';
</script>

<main class="flex flex-col min-h-screen bg-background text-foreground pt-24">
  <ElementsDropper />
  <Canvas />
</main>