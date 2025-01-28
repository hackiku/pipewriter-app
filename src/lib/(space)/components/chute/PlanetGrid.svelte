<!-- src/lib/(space)/components/chute/PlanetGrid.svelte -->
<script lang="ts">
  import { chuteStore } from '../../stores/chuteStore';
  import { VIEWPORT } from './coordinates';
  import { PLANETS } from './physics';

  export let position: { x: number; y: number; scale: number };
  
  $: planetData = PLANETS[$chuteStore.planet];
  $: planetColor = planetData.color;
  
  const PLANET = {
    baseSize: 80,       // Smaller initial size
    opacity: 0.12,
    glowOpacity: 0.05,
    glowSize: 1.15,     // Glow effect scale
    finalScale: 3.5     // Much larger final size for dramatic effect
  };

  // Calculate actual size with smooth scaling
  $: size = PLANET.baseSize * (position.scale * PLANET.finalScale) * (planetData?.scaleMultiplier || 1);
  $: glowSize = size * PLANET.glowSize;
</script>

<!-- Planet Container -->
<div 
  class="absolute left-1/2 transform-gpu"
  style="
    width: {glowSize}vh;
    height: {glowSize}vh;
    bottom: {position.y}vh;
    transform: translate(-50%, 50%);
  "
>
  <!-- Glow Effect -->
  <div 
    class="absolute inset-0 rounded-full blur-xl transform-gpu"
    style="
      background-color: {planetColor};
      opacity: {PLANET.glowOpacity};
    "
  />
  
  <!-- Main Planet Circle -->
  <div 
    class="absolute rounded-full transform-gpu"
    style="
      top: {(glowSize - size) / 2}vh;
      left: {(glowSize - size) / 2}vh;
      width: {size}vh;
      height: {size}vh;
      background-color: {planetColor};
      opacity: {PLANET.opacity};
      border: 1px solid {planetColor};
    "
  />
</div>