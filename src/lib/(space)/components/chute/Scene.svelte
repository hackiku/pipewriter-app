<!-- src/lib/(space)/components/chute/Scene.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { VIEWPORT, interpolatePosition } from "./coordinates";
  import Parachutist from "./Parachutist.svelte";
  import PlanetGrid from "./PlanetGrid.svelte";
  // import FlyingObjects from "./FlyingObjects.svelte";
  import { chuteStore } from "../../stores/chuteStore";
  import { spaceStore } from "../../stores/spaceStore";

  export let startAnimation: () => void;
  export let pauseAnimation: () => void;

  let sceneLoaded = false;
  let parachuteStartAnimation: () => void;
  let parachutePauseAnimation: () => void;
  
  // Scene opacity based on controls and scroll
  $: sceneOpacity = $spaceStore.isControlsOpen 
    ? 1 
    : Math.max(0., 1 - ($spaceStore.scrollY / 800));

  // Animation progress based on scroll position
  $: progress = Math.min(1, $spaceStore.scrollY / 800);

  // Planet position calculations using viewport coordinates
  $: planetPosition = {
    x: interpolatePosition(VIEWPORT.planet.initial.x, VIEWPORT.planet.final.x, progress),
    y: interpolatePosition(VIEWPORT.planet.initial.y, VIEWPORT.planet.final.y, Math.pow(progress, 1.5)),
    scale: interpolatePosition(
      VIEWPORT.planet.initial.scale,
      VIEWPORT.planet.final.scale,
      Math.pow(progress, 1.2)
    )
  };

  // Forward animation controls
  $: {
    if (parachuteStartAnimation) startAnimation = parachuteStartAnimation;
    if (parachutePauseAnimation) pauseAnimation = parachutePauseAnimation;
  }

  onMount(() => {
    sceneLoaded = true;
  });
</script>

<div 
  class="__fixed relative inset-0 w-screen h-screen overflow-hidden pointer-events-none"
  style="opacity: {sceneOpacity}; transition: opacity 200ms ease-out;"
>
  {#if sceneLoaded}
    <!-- Planet Grid - Background Layer -->
    <div class="absolute inset-0" style="z-index: 0;">
      <PlanetGrid position={planetPosition} />
    </div>

    <!-- Flying Objects - Middle Layer -->
    <div class="absolute inset-0" style="z-index: 10;">
      <!-- <FlyingObjects
        targetX="{VIEWPORT.parachutist.x}vw"
        targetY="{VIEWPORT.parachutist.y}vh"
        velocity={$chuteStore.velocity}
      /> -->
    </div>

    <!-- Parachutist - Top Layer -->
    <div
      class="absolute transform-gpu will-change-transform transition-transform duration-300"
      style="
        transform: translate({VIEWPORT.parachutist.x}vw, {VIEWPORT.parachutist.y}vh);
        z-index: 20;
      "
    >
      <Parachutist 
        bind:startAnimation={parachuteStartAnimation}
        bind:pauseAnimation={parachutePauseAnimation}
      />
    </div>
  {/if}
</div>

<style>
  div {
    backface-visibility: hidden;
    /* transform-style: preserve-3d; */
    will-change: transform, opacity;
  }
</style>