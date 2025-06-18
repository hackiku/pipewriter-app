<!-- src/lib/pages/landing/sections/features/video/PreviewCard.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import PlayButtons from "./PlayButtons.svelte";
  import type { ProcessStep } from "../processData";
  
  export let step: ProcessStep;
  export let isActive: boolean = false;
  export let onFullVideo: () => void;
  export let onTimestampVideo: () => void;
</script>

<div class={cn(
  "w-full aspect-video rounded-xl overflow-hidden relative group",
  "border-2 transition-all duration-300 cursor-pointer",
  isActive 
    ? "border-0 p-[1px] bg-gradient-to-r from-[#3644FE] to-[#B345ED] shadow-xl" 
    : "border-white/10 hover:border-primary/20 shadow-lg hover:shadow-xl"
)}>
  
  <!-- Inner container for gradient border effect -->
  <div class={cn(
    "relative h-full w-full rounded-xl overflow-hidden",
    isActive ? "bg-zinc-950" : "bg-zinc-900"
  )}>
    
    <!-- Video Frame Background -->
    <div class="absolute inset-0">
      <img 
        src={step.videoFrame} 
        alt="{step.title} demo" 
        class="w-full h-full object-cover"
      />
    </div>
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    
    <!-- Content Overlay -->
    <div class="absolute inset-x-0 bottom-0 p-6">
      <div class="space-y-3">
        <!-- Process Number & Title -->
        <div class="flex items-center gap-3">
          <div class={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold",
            isActive 
              ? "bg-primary border-primary text-white" 
              : "border-white/40 text-white/80"
          )}>
            {step.id === 'addon' ? '1' : step.id === 'templates' ? '2' : step.id === 'theming' ? '3' : '4'}
          </div>
          
          <h3 class={cn(
            "text-xl font-semibold transition-colors",
            isActive ? "text-primary" : "text-white"
          )}>
            {step.title}
          </h3>
          
          <!-- Active Indicator -->
          {#if isActive}
            <div class="w-2 h-2 bg-primary rounded-full animate-pulse ml-auto" />
          {/if}
        </div>
        
        <!-- Description -->
        <p class="text-sm text-white/80 leading-relaxed max-w-md">
          {step.description}
        </p>
        
        <!-- Features List (if available) -->
        {#if step.features && step.features.length > 0}
          <div class="flex flex-wrap gap-2 mt-3">
            {#each step.features.slice(0, 3) as feature}
              <span class={cn(
                "px-2 py-1 text-xs font-medium rounded-md",
                "bg-white/10 text-white/90 border border-white/20"
              )}>
                {feature}
              </span>
            {/each}
            {#if step.features.length > 3}
              <span class="px-2 py-1 text-xs font-medium rounded-md bg-white/5 text-white/60">
                +{step.features.length - 3} more
              </span>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Play Buttons - Always Visible -->
    <PlayButtons
      {isActive}
      timestamp={step.timestamp}
      {onFullVideo}
      {onTimestampVideo}
    />
    
    <!-- Hover State Enhancement -->
    <div class={cn(
      "absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300",
      "group-hover:opacity-100"
    )} />
  </div>
</div>