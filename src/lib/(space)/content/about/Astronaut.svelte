<!-- src/lib/(space)/content/about/Astronaut.svelte -->
<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Add model-viewer script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);
  });
</script>

<div class="w-full h-full">
  <model-viewer
    src="space/3d/starman.glb"
    auto-rotate
    camera-controls
    disable-zoom
    rotation-per-second="30deg"
    camera-orbit="0deg 75deg 105%"
    exposure="1"
    shadow-intensity="1"
    shadow-softness="1"
    style="width: 100%; height: 100%; background: transparent;"
  >
    <div slot="progress-bar"></div> <!-- Hide progress bar -->
  </model-viewer>
</div>

<style>
  :global(model-viewer) {
    --progress-bar-height: 0;
    --progress-mask: transparent;
  }
</style>