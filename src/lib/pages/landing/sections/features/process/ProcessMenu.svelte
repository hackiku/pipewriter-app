<!-- src/lib/pages/landing/sections/features/process/ProcessMenu.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import { processSteps } from "../processData";
  import { ArrowRight, Play } from "lucide-svelte";
  
  export let currentStep: number = 0;
  export let onStepChange: (index: number) => void;
  export let isCompact: boolean = false;
  
  function handleItemClick(index: number) {
    onStepChange(index);
    
    // Smooth scroll to the corresponding preview section
    const targetElement = document.querySelector(`[data-step="${index}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }
  
  function handleGetStartedClick() {
    window.location.href = '/waitlist';
  }
</script>

<!-- Clean menu without wrapper -->
<div class={cn(
  "transition-all duration-300",
  isCompact ? "space-y-1" : "space-y-3"
)}>
  
  <!-- Desktop: Vertical Stack -->
  <div class="hidden sm:block">
    {#each processSteps as step, index}
      <button
        class={cn(
          "group flex items-center gap-4 px-4 py-3 w-full text-left rounded-xl",
          "transition-all duration-300 hover:bg-white/5 relative overflow-hidden",
          currentStep === index && "bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
        )}
        on:click={() => handleItemClick(index)}
      >
        <!-- Background glow for active state -->
        {#if currentStep === index}
          <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50 rounded-xl"></div>
        {/if}
        
        <!-- Step indicator -->
        <div class={cn(
          "relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all",
          "group-hover:scale-110",
          currentStep === index
            ? "bg-primary border-primary text-primary-foreground shadow-lg"
            : index < currentStep
            ? "bg-primary/20 border-primary text-primary"
            : "border-white/30 text-white/70 group-hover:border-primary/50"
        )}>
          {index + 1}
        </div>
        
        <!-- Step content -->
        <div class="relative z-10 flex-1 min-w-0">
          <div class={cn(
            "font-semibold transition-colors",
            currentStep === index ? "text-primary" : "text-white group-hover:text-primary"
          )}>
            {step.title}
          </div>
          {#if !isCompact}
            <div class="text-sm text-white/60 group-hover:text-white/80 transition-colors mt-1">
              {step.description.slice(0, 40)}...
            </div>
          {/if}
        </div>

        <!-- Active indicator -->
        {#if currentStep === index}
          <div class="relative z-10 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        {/if}
      </button>
    {/each}
    
    <!-- Get Started - Desktop -->
    <div class="pt-4 border-t border-white/10 mt-6">
      <button
        class="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-primary 
               hover:text-primary/80 transition-all duration-200 group w-full text-left rounded-xl
               hover:bg-primary/5"
        on:click={handleGetStartedClick}
      >
        <div class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center
                    group-hover:bg-primary/20 transition-colors">
          <Play class="w-4 h-4" />
        </div>
        <span>Try Pipewriter</span>
        <ArrowRight class="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>

  <!-- Mobile: Horizontal Scrollable -->
  <div class="sm:hidden">
    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {#each processSteps as step, index}
        <button
          class={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium",
            "transition-all duration-200 hover:scale-105 shrink-0 min-w-fit",
            currentStep === index
              ? "bg-primary/20 border-primary/40 text-primary shadow-lg"
              : "border-white/20 text-white/80 hover:bg-white/5 hover:border-primary/30"
          )}
          on:click={() => handleItemClick(index)}
        >
          <div class={cn(
            "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold",
            currentStep === index
              ? "bg-primary border-primary text-primary-foreground"
              : "border-white/30 text-white/70"
          )}>
            {index + 1}
          </div>
          <span class="whitespace-nowrap">{step.title}</span>
        </button>
      {/each}
    </div>
    
    <!-- Get Started - Mobile -->
    <div class="mt-4 pt-4 border-t border-white/10">
      <button
        class="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold 
               bg-primary/10 border border-primary/20 text-primary rounded-xl
               hover:bg-primary/20 transition-all"
        on:click={handleGetStartedClick}
      >
        <Play class="w-4 h-4" />
        <span>Try Pipewriter</span>
      </button>
    </div>
  </div>
</div>

<style>
  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
</style>