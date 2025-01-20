<!-- src/lib/(space)/components/chute/PlanetGrid.svelte -->
<script lang="ts">
  import { chuteStore } from '../../stores/chuteStore';

  export let progress = 0;
  
  $: gridColor = $chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936';
  
  // Grid properties
  $: size = 140 + progress * 60;       // Base size grows with progress
  $: opacity = 0.5 - progress * 0.2;   // Slight fade as we progress
  $: lines = 12;                       // Number of grid lines
</script>

<div 
  class="fixed left-1/2 pointer-events-none"
  style="
    width: {size}vh;
    height: {size/2}vh;
    bottom: -{size * 0.1}vh;
    transform: translateX(-50%)
               perspective(1400px)
               rotateX(75deg);
  "
>
  <!-- Grid Container -->
  <div 
    class="absolute inset-0 overflow-hidden"
    style="border-radius: {size}vh {size}vh 0 0;"
  >
    <!-- Horizontal curved lines -->
    {#each Array(lines) as _, i}
      <div
        class="absolute w-full h-px transform-gpu"
        style="
          top: {(i + 1) * (100 / (lines + 1))}%;
          opacity: {opacity * (1 - i/lines * 0.5)};
          background: linear-gradient(
            90deg,
            transparent,
            {gridColor}60 20%,
            {gridColor}60 80%,
            transparent
          );
          transform: scale(${1 - (i/lines) * 0.3}, 1)
                    translateY(-${(i/lines) * 50}%);
        "
      />
    {/each}

    <!-- Vertical curved lines -->
    {#each Array(lines) as _, i}
      <div
        class="absolute top-0 bottom-0 w-px transform-gpu"
        style="
          left: {(i + 1) * (100 / (lines + 1))}%;
          opacity: {opacity * (1 - Math.abs(lines/2 - i)/(lines/2) * 0.5)};
          background: linear-gradient(
            0deg,
            {gridColor}60,
            {gridColor}30 50%,
            transparent
          );
          transform: rotateY(${-30 + i * (60/lines)}deg);
        "
      />
    {/each}

    <!-- Surface glow -->
    <div
      class="absolute inset-0"
      style="
        background: radial-gradient(
          circle at 50% 0%,
          {gridColor}20 0%,
          transparent 70%
        );
      "
    />
  </div>
</div>