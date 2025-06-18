<!-- src/lib/pages/landing/sections/features/ActionBar.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import { Play, ArrowRight } from "lucide-svelte";
  import { processSteps } from "./processData";
  
  export let currentStep: number = 0;
  export let onStepChange: (index: number) => void;
  export let onFullVideo: () => void;

  function handleGetStarted() {
    window.location.href = '/waitlist';
  }

  function handleStepClick(index: number) {
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
</script>

<!-- Sticky Action Bar -->
<div class="sticky bottom-0 left-0 right-0 z-40 bg-landing dark:bg-[#040D12] border-t border-border/20 backdrop-blur-sm">
  
  <!-- Mobile Step Navigation -->
  <div class="md:hidden border-b border-border/10">
    <div class="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">
      {#each processSteps as step, index}
        <button
          class={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shrink-0",
            "transition-all duration-200",
            currentStep === index
              ? "bg-primary/20 border border-primary/40 text-primary"
              : "border border-border/30 text-muted-foreground hover:bg-muted hover:border-primary/30"
          )}
          on:click={() => handleStepClick(index)}
        >
          <div class={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold",
            currentStep === index
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground/50 text-muted-foreground"
          )}>
            {index + 1}
          </div>
          <span>{step.title}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Animated Progress Bar -->
  <div class="h-1 bg-border">
    <div 
      class="h-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] transition-all duration-500"
      style="width: {((currentStep + 1) / processSteps.length) * 100}%"
    ></div>
  </div>

  <!-- Main Action Bar -->
  <div class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-4">
    <div class="flex items-center justify-center gap-4 max-w-7xl mx-auto">
      
      <!-- Left: Watch Demo (Primary) -->
      <button
        class={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
          "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
          "text-white shadow-lg hover:shadow-xl hover:shadow-primary/25",
          "transition-all duration-200 hover:scale-105 active:scale-95"
        )}
        on:click={() => onFullVideo()}
      >
        <Play class="w-4 h-4" />
        <span>Watch Demo</span>
      </button>

      <!-- Right: Try Pipewriter (Secondary) -->
      <button
        class={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
          "border border-border hover:border-primary/30",
          "bg-background hover:bg-muted transition-all duration-200",
          "hover:scale-105 active:scale-95"
        )}
        on:click={handleGetStarted}
      >
        <span>Try Pipewriter</span>
        <ArrowRight class="w-4 h-4" />
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