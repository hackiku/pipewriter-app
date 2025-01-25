<!-- src/lib/(space)/components/chute/Scene.svelte -->
<script lang="ts">
  import Parachutist from './Parachutist.svelte';
  import PlanetGrid from './PlanetGrid.svelte';
  import FlyingObjects from './FlyingObjects.svelte';
  import { chuteStore } from '../../stores/chuteStore';
  
  export let startAnimation: () => void;
  
  $: chutePosition = {
    x: 'calc(65vw)',
    y: 'calc(35vh)'
  };
</script>

<div class="fixed inset-0 pointer-events-none">
  <!-- Planet Background -->
  <div class="absolute w-full aspect-square origin-bottom">
    <PlanetGrid />
  </div>

  <!-- Flying Objects -->
  <FlyingObjects 
    targetX={chutePosition.x}
    targetY={chutePosition.y}
    velocity={$chuteStore.velocity}
  />

  <!-- Parachutist -->
  <div 
    class="absolute transition-all duration-300"
    style:transform="translate({chutePosition.x}, {chutePosition.y})"
  >
    <Parachutist {startAnimation} />
  </div>
</div>