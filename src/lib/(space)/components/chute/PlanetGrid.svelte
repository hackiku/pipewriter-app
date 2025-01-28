<!-- src/lib/(space)/components/chute/PlanetGrid.svelte -->
<script lang="ts">
  import { chuteStore } from '../../stores/chuteStore';
  import { VIEWPORT } from './coordinates';

  export let progress = 0;
  export let position: { x: number; y: number; scale: number };
  
  $: gridColor = $chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936';
  
  const GRID = {
    lines: 12,
    baseSize: 140,
    opacity: {
      base: 0.8,    // Increased base opacity
      fade: 0.3     // Increased fade amount for better contrast
    }
  };

  $: size = GRID.baseSize * position.scale;
  $: opacity = GRID.opacity.base - progress * GRID.opacity.fade;
</script>

<div 
  class="fixed left-1/2 transform-gpu will-change-transform pointer-events-none"
  style="
    bottom: {position.y}vh;
    width: {size}vh;
    height: {size/2}vh;
    transform: translate(-50%, 50%) 
               translateX({position.x}vw)
               perspective(1400px) 
               rotateX(60deg);  <!-- Adjusted rotation for better visibility -->
    transform-origin: center bottom;
  "
>
  <!-- Grid container with improved positioning -->
  <div 
    class="absolute inset-0 overflow-hidden"
    style="border-radius: {size/2}vh {size/2}vh 0 0;"
  >
    <!-- Horizontal grid lines with improved contrast -->
    {#each Array(GRID.lines) as _, i}
      <div
        class="absolute w-full h-px transform-gpu"
        style="
          top: {(i + 1) * (100 / (GRID.lines + 1))}%;
          opacity: {opacity * (1 - i/GRID.lines * 0.4)};
          background: linear-gradient(
            90deg,
            transparent,
            {gridColor}80 20%,
            {gridColor}80 80%,
            transparent
          );
          transform: scale(${1 - (i/GRID.lines) * 0.25}, 1)
                    translateY(-${(i/GRID.lines) * 40}%);
        "
      />
    {/each}

    <!-- Vertical grid lines with improved visibility -->
    {#each Array(GRID.lines) as _, i}
      <div
        class="absolute top-0 bottom-0 w-px transform-gpu"
        style="
          left: {(i + 1) * (100 / (GRID.lines + 1))}%;
          opacity: {opacity * (1 - Math.abs(GRID.lines/2 - i)/(GRID.lines/2) * 0.4)};
          background: linear-gradient(
            0deg,
            {gridColor}80,
            {gridColor}40 50%,
            transparent
          );
          transform: rotateY(${-25 + i * (50/GRID.lines)}deg);
        "
      />
    {/each}

    <!-- Enhanced surface glow -->
    <div
      class="absolute inset-0"
      style="
        background: radial-gradient(
          circle at 50% 100%,
          {gridColor}30 0%,
          transparent 60%
        );
      "
    />
  </div>
</div>

<style>
  div {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
</style>