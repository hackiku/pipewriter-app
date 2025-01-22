<!-- src/lib/(space)/content/about/Astronaut.svelte -->
<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
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
    disable-zoom
    interaction-prompt="none"
    camera-controls="true"
    rotation-per-second="12deg"
    min-camera-orbit="auto auto 105%"
    max-camera-orbit="auto auto 105%"
    camera-orbit="-30deg 75deg 105%"
    field-of-view="30deg"
    exposure="1"
    style="width: 100%; height: 100%; background: transparent;"
  >
    <div slot="progress-bar"></div>
    <div slot="poster"></div>
    <div slot="interaction-prompt"></div>
  </model-viewer>
</div>

<style>
  :global(model-viewer) {
    --progress-bar-height: 0;
    --progress-mask: transparent;
    --interaction-prompt-threshold: 0;
    --min-camera-orbit: auto auto 105%;
    --max-camera-orbit: auto auto 105%;
  }
</style>