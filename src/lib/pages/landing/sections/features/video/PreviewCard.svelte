<!-- src/lib/pages/landing/sections/features/video/PreviewCard.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import type { ProcessStep } from "../processData";
  
  export let step: ProcessStep;
  export let isActive: boolean = false;
</script>

<div class={cn(
  "w-full aspect-video rounded-xl overflow-hidden relative group",
  "border-2 transition-all duration-300",
  isActive 
    ? "border-0 p-[1px] bg-gradient-to-r from-[#3644FE] to-[#B345ED] shadow-xl" 
    : "border-white/10 hover:border-primary/20 shadow-lg hover:shadow-xl"
)}>
  
  <!-- Inner container for gradient border effect -->
  <div class={cn(
    "relative h-full w-full rounded-xl overflow-hidden",
    isActive ? "bg-zinc-950" : "bg-zinc-900"
  )}>
    
    <!-- Video Frame - Clean, no overlays -->
    <div class="absolute inset-0">
      <img 
        src={step.videoFrame} 
        alt="{step.title} demo" 
        class="w-full h-full object-cover"
      />
    </div>
    
    <!-- Subtle hover overlay -->
    <div class={cn(
      "absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300",
      "group-hover:opacity-100"
    )} />
    
    <!-- Active indicator - minimal -->
    {#if isActive}
      <div class="absolute top-4 right-4">
        <div class="w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg" />
      </div>
    {/if}
  </div>
</div>