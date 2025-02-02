<!-- src/lib/components/BackgroundGrid.svelte -->
<script lang="ts">
  export let gridSize = "48"; // Grid cell size in pixels
  export let fadeSize = "150%"; // Size of the gradient fade
  export let speed = "30s";
  export let opacity = "0.08"; // Grid line opacity
  
  export let BG: string;      // Format: "[#FF0000]"
  export let BG_DARK: string; // Format: "[#212121]"
</script>

<div class="absolute inset-0 pointer-events-none overflow-hidden">
  <!-- Base Grid - Using contrast colors for better visibility -->
  <div 
    class="absolute inset-0
           [background-size:_{gridSize}px_{gridSize}px]
           [background-image:linear-gradient(to_right,rgb(23_23_23_/_var(--grid-opacity))_1px,transparent_1px),
                           linear-gradient(to_bottom,rgb(23_23_23_/_var(--grid-opacity))_1px,transparent_1px)]
           dark:[background-image:linear-gradient(to_right,rgb(236_237_230_/_var(--grid-opacity))_1px,transparent_1px),
                                                linear-gradient(to_bottom,rgb(236_237_230_/_var(--grid-opacity))_1px,transparent_1px)]"
    style="--grid-opacity: {opacity}"
  />
  
  <!-- Animated Gradient Overlay -->
  <div 
    class="absolute inset-[-50%]
           motion-reduce:hidden
           animate-grid-fade"
    style="
      --speed: {speed};
      --fade-size: {fadeSize};
      --bg-color: #{BG.slice(1,-1)};
      --bg-dark: #{BG_DARK.slice(1,-1)};
    "
  />
</div>

<style>
  @keyframes grid-fade {
    0%, 100% {
      transform: translate(-25%, -25%) rotate(0deg);
    }
    25% {
      transform: translate(0%, -15%) rotate(90deg);
    }
    50% {
      transform: translate(25%, 0%) rotate(180deg);
    }
    75% {
      transform: translate(0%, 25%) rotate(270deg);
    }
  }

  .animate-grid-fade {
    animation: grid-fade var(--speed) ease-in-out infinite;
    will-change: transform;
    transform: translate(-25%, -25%) scale(var(--fade-size));
    background: radial-gradient(
      circle at center,
      #var(--bg-color) 0%,
      rgba(var(--bg-color-rgb) / 0.8) 25%,
      transparent 60%
    );
  }

  :global(.dark) .animate-grid-fade {
    background: radial-gradient(
      circle at center,
      #var(--bg-dark) 0%,
      rgba(var(--bg-dark-rgb) / 0.8) 25%,
      transparent 60%
    );
  }
</style>