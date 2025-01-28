<!-- src/lib/(space)/components/chute/Scene.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { VIEWPORT, interpolatePosition } from "./coordinates";
  import Parachutist from "./Parachutist.svelte";
  import PlanetGrid from "./PlanetGrid.svelte";
  import FlyingObjects from "./FlyingObjects.svelte";
  import { chuteStore } from "../../stores/chuteStore";
  import { spaceStore } from "../../stores/spaceStore";

  export let startAnimation: () => void;

  let sceneLoaded = false;
  
  // Compute scene opacity based on controls state
  $: sceneOpacity = $spaceStore.isControlsOpen 
    ? 1 
    : Math.max(0.1, 1 - ($spaceStore.scrollY / 800));

  // Animation progress drives all movement
  $: progress = Math.min(1, $spaceStore.scrollY / 800);

  // Planet position interpolation with easing
  $: planetPosition = {
    x: interpolatePosition(VIEWPORT.planet.initial.x, VIEWPORT.planet.final.x, progress),
    y: interpolatePosition(VIEWPORT.planet.initial.y, VIEWPORT.planet.final.y, Math.pow(progress, 1.5)),
    scale: interpolatePosition(
      VIEWPORT.planet.initial.scale,
      VIEWPORT.planet.final.scale,
      Math.pow(progress, 1.2)
    )
  };

  onMount(() => {
    sceneLoaded = true;
  });
</script>

<div 
  class="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none"
  style="opacity: {sceneOpacity}; transition: opacity 200ms ease-out;"
>
  {#if sceneLoaded}
    <!-- Planet Grid with corrected positioning -->
    <PlanetGrid 
      progress={progress}
      position={planetPosition}
    />

    <!-- Flying Objects with viewport units -->
    <FlyingObjects
      targetX="{VIEWPORT.parachutist.x}vw"
      targetY="{VIEWPORT.parachutist.y}vh"
      velocity={$chuteStore.velocity}
    />

    <!-- Parachutist with consistent viewport positioning -->
    <div
      class="absolute transform-gpu will-change-transform transition-transform duration-300"
      style="transform: translate({VIEWPORT.parachutist.x}vw, {VIEWPORT.parachutist.y}vh)"
    >
      <Parachutist {startAnimation} />
    </div>
  {/if}
</div>

<style>
  div {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>