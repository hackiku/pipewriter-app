<!-- src/lib/pages/landing/sections/features/PreviewSection.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { cn } from "$lib/utils";
  import { Clock } from "lucide-svelte";
  import PreviewCard from './video/PreviewCard.svelte';
  import { processSteps } from './processData';
  
  export let currentStep: number = 0;
  export let onTimestampVideo: (timestamp: number) => void;

  // Create observer to update current step on scroll
  function createObserver(node: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            // Dispatch event to parent to update current step
            node.dispatchEvent(new CustomEvent('stepChange', { 
              detail: { stepIndex },
              bubbles: true 
            }));
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: "-20% 0px -30% 0px"
      }
    );

    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
  
  // Format timestamp for display
  function formatTimestamp(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }
</script>

<!-- Preview Sections -->
<div class="space-y-24 md:space-y-32 pb-32 md:pb-24">
  {#each processSteps as step, index}
    <div 
      class="preview-section"
      data-step={index}
      use:createObserver
      in:fade={{ duration: 200 }}
      on:stepChange
    >
      
      <!-- Desktop: 2-Column Grid (Wider video column) -->
      <div class="hidden md:grid md:grid-cols-5 md:gap-16 items-center">
        
        <!-- Left: Step Info (2/5 width) -->
        <div class="col-span-2 space-y-6">
          <!-- Step Number & Title Row -->
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class={cn(
                "w-12 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-bold transition-all",
                currentStep === index
                  ? "bg-primary border-primary text-primary-foreground shadow-lg"
                  : index < currentStep
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-muted-foreground/30 text-muted-foreground"
              )}>
                {index + 1}
              </div>
              <h3 class={cn(
                "text-2xl font-semibold transition-colors",
                currentStep === index ? "text-primary" : "text-foreground"
              )}>
                {step.title}
              </h3>
            </div>

            <!-- Timestamp Button -->
            <button
              class={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                "transition-all duration-200 hover:scale-105 shrink-0",
                currentStep === index
                  ? "bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20"
                  : "bg-muted/50 border border-border hover:bg-muted hover:border-primary/20"
              )}
              on:click={() => onTimestampVideo(step.timestamp)}
            >
              <Clock class="w-4 h-4" />
              <span>{formatTimestamp(step.timestamp)}</span>
            </button>
          </div>

          <!-- Description -->
          <p class="text-lg text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>

        <!-- Right: Preview Card (3/5 width - wider) -->
        <div class="col-span-3 relative">
          <PreviewCard 
            {step}
            isActive={currentStep === index}
          />
        </div>

      </div>

      <!-- Mobile: Single Column -->
      <div class="md:hidden space-y-6">
        
        <!-- Step Number & Title Row -->
        <div class="flex items-center justify-between gap-4 px-4">
          <div class="flex items-center gap-3">
            <div class={cn(
              "w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-all",
              currentStep === index
                ? "bg-primary border-primary text-primary-foreground"
                : index < currentStep
                ? "bg-primary/20 border-primary text-primary"
                : "border-muted-foreground/30 text-muted-foreground"
            )}>
              {index + 1}
            </div>
            <h3 class={cn(
              "text-xl font-semibold transition-colors",
              currentStep === index ? "text-primary" : "text-foreground"
            )}>
              {step.title}
            </h3>
          </div>

          <!-- Timestamp Button -->
          <button
            class={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
              "transition-all duration-200 shrink-0",
              currentStep === index
                ? "bg-primary/10 border border-primary/30 text-primary"
                : "bg-muted/50 border border-border hover:bg-muted"
            )}
            on:click={() => onTimestampVideo(step.timestamp)}
          >
            <Clock class="w-3 h-3" />
            <span>{formatTimestamp(step.timestamp)}</span>
          </button>
        </div>

        <!-- Description -->
        <p class="text-base text-muted-foreground leading-relaxed px-4">
          {step.description}
        </p>

        <!-- Preview Card -->
        <div class="px-4">
          <PreviewCard 
            {step}
            isActive={currentStep === index}
          />
        </div>

      </div>

    </div>
  {/each}
</div>

<style>
  .preview-section {
    scroll-margin-top: 10vh;
  }
</style>