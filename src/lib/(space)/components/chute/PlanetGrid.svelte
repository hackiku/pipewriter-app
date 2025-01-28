<!-- src/lib/(space)/components/chute/PlanetGrid.svelte -->
<script lang="ts">
  import { chuteStore } from '../../stores/chuteStore';
  import { VIEWPORT } from './coordinates';

  export let progress = 0;
  export let position: { x: number; y: number; scale: number };
  
  $: gridColor = $chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936';
  
  const GRID = {
    baseSize: 140,      // Base size in vh units
    opacity: 0.15       // Background opacity
  };

  $: size = GRID.baseSize * position.scale;
  
  // Debug info
  $: debugInfo = {
    size: size.toFixed(1) + 'vh',
    pos: `x:${position.x.toFixed(1)} y:${position.y.toFixed(1)}`,
    scale: position.scale.toFixed(2),
    progress: (progress * 100).toFixed(0) + '%'
  };
</script>

<!-- Planet Container -->
<div 
  class="absolute left-1/2 top-1/2 transform-gpu"
  style="
    width: {size}vh;
    height: {size}vh;
    transform: translate(-50%, -50%) 
               translate({position.x}vw, {position.y}vh)
               perspective(1400px) 
               rotateX(60deg);
    transform-origin: center center;
  "
>
  <!-- Debug Info -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8
              font-mono text-xs text-foreground/20 whitespace-pre text-center z-10">
    size: {debugInfo.size}
    pos: {debugInfo.pos}
    scale: {debugInfo.scale}
    prog: {debugInfo.progress}
  </div>

  <!-- Planet Circle -->
  <div 
    class="absolute inset-0 rounded-full border transform-gpu"
    style="
      background-color: {gridColor};
      opacity: {GRID.opacity};
      border-color: {gridColor};
      border-opacity: 0.3;
    "
  />
</div>