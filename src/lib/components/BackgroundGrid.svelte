<!-- src/lib/components/BackgroundGrid.svelte -->
<script lang="ts">
  export let gridSize = "6";
  export let speed = "10s";
  export let opacity = "0.36";
</script>

<div class="absolute inset-0 pointer-events-none overflow-hidden">
  <svg 
    class="w-full h-full"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1000 1000" 
  >
    <defs>
      <pattern 
        id="grid" 
        width={gridSize} 
        height={gridSize} 
        patternUnits="userSpaceOnUse"
      >
        <path 
          d={`M ${gridSize} 0 V ${gridSize}`}
          fill="none" 
          stroke="rgb(128,128,128)" 
          stroke-width="0.5"
          stroke-opacity={opacity}
        />
        <path 
          d={`M 0 ${gridSize} H ${gridSize}`}
          fill="none" 
          stroke="rgb(128,128,128)" 
          stroke-width="0.5"
          stroke-opacity={opacity}
        />
      </pattern>

      <radialGradient id="mask-gradient">
        <stop offset="0%" stop-color="white" />
        <stop offset="70%" stop-color="white" />
        <stop offset="100%" stop-color="black" />
      </radialGradient>

      <mask id="fade-mask">
        <circle 
          class="animate-gradient"
          r="1000" 
          fill="url(#mask-gradient)"
          style="animation-duration: {speed}"
        />
      </mask>
    </defs>

    <rect
      width="200%" 
      height="200%"
      x="-50%" 
      y="-50%"
      fill="url(#grid)"
      mask="url(#fade-mask)"
    />
  </svg>
</div>

<style>
  .animate-gradient {
    animation: move-gradient infinite ease-in-out;
    transform-origin: center;
  }

  @keyframes move-gradient {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
    }
    25% {
      transform: translate(0%, 0%) scale(0.5);
    }
    50% {
      transform: translate(50%, 50%) scale(0.5);
    }
    75% {
      transform: translate(0%, 100%) scale(0.5);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
</style>