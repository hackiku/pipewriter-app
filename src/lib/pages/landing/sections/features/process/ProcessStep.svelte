<!-- src/lib/pages/landing/sections/features/ProcessStep.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import { Play, ExternalLink } from "lucide-svelte";

  // Props
  export let step: {
    id: string;
    title: string;
    description: string;
    videoFrame: string;
    timestamp: number;
    shoutoutId: string;
  };
  export let isActive: boolean = false;
  export let onFullVideo: () => void;
  export let onTimestampVideo: () => void;
</script>

<div class={cn(
  "w-full transition-all duration-300",
  isActive ? "opacity-100" : "opacity-70 hover:opacity-90"
)}>
  <!-- Video Preview Container -->
  <div class={cn(
    "relative w-full aspect-video rounded-2xl overflow-hidden",
    "border-2 transition-all duration-300 group cursor-pointer",
    isActive 
      ? "border-0 p-[1px] bg-gradient-to-r from-[#3644FE] to-[#B345ED] shadow-lg" 
      : "border-white/10 hover:border-primary/20"
  )}>
    
    <!-- Inner container for gradient border effect -->
    <div class={cn(
      "relative h-full w-full rounded-2xl overflow-hidden",
      isActive ? "bg-zinc-950" : ""
    )}>
      
      <!-- Video Frame -->
      <div class="absolute inset-0">
        <img 
          src={step.videoFrame} 
          alt="{step.title} demo" 
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Hover Overlay -->
      <div class={cn(
        "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        "flex items-center justify-center"
      )}>
        <div class="flex items-center gap-4">
          <!-- Quick Preview Button -->
          <button
            class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
                   rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20
                   text-white transition-colors"
            on:click={(e) => {
              e.stopPropagation();
              onTimestampVideo();
            }}
          >
            <Play class="w-4 h-4" />
            <span>Preview</span>
          </button>

          <!-- Full Video Button -->
          <button
            class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
                   rounded-full bg-primary/80 hover:bg-primary border border-primary/20
                   text-white transition-colors"
            on:click={(e) => {
              e.stopPropagation();
              onFullVideo();
            }}
          >
            <ExternalLink class="w-4 h-4" />
            <span>Full Demo</span>
          </button>
        </div>
      </div>

      <!-- Step Info Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent">
        <div class="space-y-2">
          <h3 class={cn(
            "text-xl font-semibold text-white transition-colors",
            isActive ? "text-primary" : ""
          )}>
            {step.title}
          </h3>
          <p class="text-sm text-white/80 leading-relaxed max-w-md">
            {step.description}
          </p>
        </div>
      </div>

      <!-- Active Indicator -->
      {#if isActive}
        <div class="absolute top-4 right-4">
          <div class="w-3 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      {/if}
    </div>
  </div>
</div>