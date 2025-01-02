<!-- src/lib/components/BackgroundPattern.svelte -->
<script lang="ts">
  type GridSize = "xs" | "sm" | "md" | "lg" | "xl";
  type PatternOpacity = "low" | "medium" | "high";

  export let size: GridSize = "md";
  export let opacity: PatternOpacity = "medium";
  export let gradient = true;

  const gridSizes: Record<GridSize, string> = {
    xs: "12px",
    sm: "24px",
    md: "48px",
    lg: "64px",
    xl: "96px"
  };

  const opacityValues: Record<PatternOpacity, string> = {
    low: "0.03",
    medium: "0.08",  // Increased for better visibility
    high: "0.12"     // Increased for better visibility
  };

  // CSS Grid Background with dynamic size
  $: gridBackground = `linear-gradient(to right, rgb(128 128 128 / ${opacityValues[opacity]}) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(128 128 128 / ${opacityValues[opacity]}) 1px, transparent 1px)`;

  $: gridSize = `${gridSizes[size]} ${gridSizes[size]}`;
</script>

<div class="absolute inset-0 pointer-events-none overflow-hidden">
  <!-- Grid Pattern -->
  <div 
    class="absolute inset-0" 
    style:background-image={gridBackground}
    style:background-size={gridSize}
  />
  
  <!-- Gradient Overlay - Fixed with absolute positioning -->
  {#if gradient}
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
  {/if}
</div>