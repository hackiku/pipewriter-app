<!-- src/lib/components/BackgroundPattern.svelte -->
<script lang="ts">
  import { backgroundStore } from "$lib/stores/backgroundStore";

  // Define types for the props
  type GridSize = "xs" | "sm" | "md" | "lg" | "xl";
  type PatternOpacity = "low" | "medium" | "high";

  interface BackgroundPatternProps {
    size?: GridSize;
    opacity?: PatternOpacity;
    gradient?: boolean;
  }

  // Accept props with default values from the store
  export let size: GridSize = $backgroundStore.size;
  export let opacity: PatternOpacity = $backgroundStore.opacity;
  export let gradient: boolean = $backgroundStore.gradient;

  const gridSizes: Record<GridSize, string> = {
    xs: "12px",
    sm: "24px",
    md: "48px",
    lg: "64px",
    xl: "96px"
  };

  const opacityValues: Record<PatternOpacity, string> = {
    low: "0.03",
    medium: "0.08",
    high: "0.12"
  };

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
  
  <!-- Gradient Overlay -->
  {#if gradient}
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
  {/if}
</div>