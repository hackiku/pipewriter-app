<!-- src/lib/components/BackgroundGrid.svelte -->
<script lang="ts">
  export let gridSize = "48";
  export let speed = "30s";
  export let opacity = "0.12";
</script>

<div class="absolute inset-0 pointer-events-none overflow-hidden">
  <!-- Base Grid with Animated Opacity Mask -->
  <div 
    class="absolute inset-0"
    style="
      background-size: {gridSize}px {gridSize}px;
      background-image: linear-gradient(to right, rgb(128 128 128 / {opacity}) 1px, transparent 1px),
                       linear-gradient(to bottom, rgb(128 128 128 / {opacity}) 1px, transparent 1px);
      -webkit-mask-image: radial-gradient(circle at var(--x) var(--y), transparent 0%, black 50vmin);
      mask-image: radial-gradient(circle at var(--x) var(--y), transparent 0%, black 50vmin);
      animation: moveAround {speed} ease-in-out infinite;
    "
  />
</div>

<style>
  @keyframes moveAround {
    0%, 100% { --x: 33vw; --y: 33vh; }
    25% { --x: 66vw; --y: 25vh; }
    50% { --x: 50vw; --y: 75vh; }
    75% { --x: 25vw; --y: 50vh; }
  }
</style>