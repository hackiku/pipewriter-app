<!-- src/lib/pages/landing/sections/features/video/PlayButtons.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import { Play, ExternalLink } from "lucide-svelte";
  
  export let onFullVideo: () => void;
  export let onTimestampVideo: () => void;
  export let timestamp: number = 0;
  export let isActive: boolean = false;
</script>

<div class={cn(
  "absolute bottom-4 left-1/2 -translate-x-1/2 z-20",
  "flex items-center gap-3",
  "transition-all duration-300",
  isActive ? "opacity-100 translate-y-0" : "opacity-80 hover:opacity-100"
)}>
  
  <!-- Quick Preview Button -->
  <button
    class={cn(
      "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium",
      "rounded-full border backdrop-blur-sm transition-all duration-200",
      "hover:scale-105 active:scale-95",
      isActive 
        ? "bg-primary/20 border-primary/40 text-primary hover:bg-primary/30" 
        : "bg-black/40 border-white/20 text-white hover:bg-black/60"
    )}
    on:click={(e) => {
      e.stopPropagation();
      onTimestampVideo();
    }}
  >
    <Play class="w-4 h-4" />
    <span>Preview</span>
    {#if timestamp > 0}
      <span class="text-xs opacity-75">
        {Math.floor(timestamp / 60)}:{String(timestamp % 60).padStart(2, '0')}
      </span>
    {/if}
  </button>

  <!-- Full Video Button -->
  <button
    class={cn(
      "inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium",
      "rounded-full border backdrop-blur-sm transition-all duration-200",
      "hover:scale-105 active:scale-95",
      "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
      "border-primary/20 text-white hover:shadow-lg hover:shadow-primary/25"
    )}
    on:click={(e) => {
      e.stopPropagation();
      onFullVideo();
    }}
  >
    <ExternalLink class="w-4 h-4" />
    <span>Full Demo</span>
  </button>
</div>