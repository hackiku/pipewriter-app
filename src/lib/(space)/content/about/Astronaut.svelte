<!-- src/lib/(space)/content/about/Astronaut.svelte -->
<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);
  });

	const gradientStyles = {
    1: 'linear-gradient(45deg, rgb(79, 70, 229) 0%, rgb(147, 51, 234) 100%)',
    2: 'linear-gradient(180deg, rgb(79, 70, 229) 0%, transparent 100%)',
    3: 'linear-gradient(-45deg, rgb(147, 51, 234) 0%, transparent 70%)',
    4: 'linear-gradient(90deg, rgb(79, 70, 229) 0%, rgb(147, 51, 234) 50%, transparent 100%)'
  };

</script>

<div class="w-full h-full">
  <model-viewer
    src="space/3d/starman.glb"
    auto-rotate
    disable-zoom
    interaction-prompt="none"
    camera-controls="false"
    rotation-per-second="15deg"
    min-camera-orbit="auto auto 105%"
    max-camera-orbit="auto auto 105%"
    camera-orbit="0deg 75deg auto"
    field-of-view="30deg"
    auto-rotate-delay="0"
    camera-target="0m 0m 0m"
    interpolation-decay="200"
    orbit-sensitivity="2"
    style="width: 100%; height: 100%; background: transparent;"		
		>
    <!-- <div slot="progress-bar"></div>
    <div slot="poster"></div>
    <div slot="interaction-prompt"></div> -->
  </model-viewer>
</div>

<style>
  model-viewer {
    --progress-bar-height: 0;
    --progress-mask: transparent;
    --interaction-prompt-threshold: 0;
    --min-camera-orbit: auto auto 105%;
    --max-camera-orbit: auto auto 105%;
    /* --model-opacity: 0.2;
    --model-color: linear-gradient(45deg, rgb(79, 70, 229) 0%, rgb(147, 51, 234) 100%);
    --background: transparent; */
    --width: 100%; 
    --height: 100%;
  }
</style>