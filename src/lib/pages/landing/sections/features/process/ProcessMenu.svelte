<!-- src/lib/pages/landing/sections/features/process/ProcessMenu.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import { processSteps } from "../processData";
  import { ArrowRight } from "lucide-svelte";
  
  export let currentStep: number = 0;
  export let onStepChange: (index: number) => void;
  export let onSubmenuToggle: (index: number) => void;
  
  function handleItemClick(index: number) {
    onSubmenuToggle(index);
  }
  
  function handleGetStartedClick() {
    window.location.href = '/waitlist';
  }
</script>

<!-- Clean menu without wrapper -->
<div class="space-y-2">
  
  <!-- Desktop: Vertical Stack -->
  <div class="hidden sm:block space-y-1">
    {#each processSteps as step, index}
      <button
        class={cn(
          "flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg",
          "transition-all duration-200 hover:bg-white/5"
        )}
        on:click={() => handleItemClick(index)}
      >
        <div class={cn(
          "w-3 h-3 rounded-full border-2 transition-colors",
          index <= currentStep
            ? "bg-primary border-primary" 
            : "border-white/30"
        )} />
        
        <span class="text-sm font-medium text-white">{step.title}</span>
      </button>
    {/each}
    
    <!-- Get Started - Desktop -->
    <button
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary 
             hover:text-primary/80 transition-colors mt-4"
      on:click={handleGetStartedClick}
    >
      <ArrowRight class="w-3 h-3" />
      <span>Get Started</span>
    </button>
  </div>

  <!-- Mobile: Horizontal + Get Started Below -->
  <div class="sm:hidden space-y-3">
    
    <!-- Process Steps - Horizontal -->
    <div class="flex gap-2 text-xs">
      {#each processSteps as step, index}
        <button
          class={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md border transition-all",
            index <= currentStep
              ? "bg-primary/20 border-primary/40 text-primary"
              : "border-white/20 text-white/80 hover:bg-white/5"
          )}
          on:click={() => handleItemClick(index)}
        >
          <div class={cn(
            "w-2 h-2 rounded-full",
            index <= currentStep ? "bg-primary" : "bg-white/30"
          )} />
          <span class="font-medium">{step.title}</span>
        </button>
      {/each}
    </div>
    
    <!-- Get Started - Mobile (New Line) -->
    <button
      class="flex items-center gap-2 text-xs font-medium text-primary 
             hover:text-primary/80 transition-colors"
      on:click={handleGetStartedClick}
    >
      <ArrowRight class="w-3 h-3" />
      <span>Get Started</span>
    </button>
  </div>
</div>