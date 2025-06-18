<!-- src/lib/pages/landing/sections/features/video/PreviewArea.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { cn } from "$lib/utils";
  import { Play, Clock } from "lucide-svelte";
  import PreviewCard from './PreviewCard.svelte';
  import { processSteps } from '../processData';
  
  export let currentStep: number = 0;
  export let onFullVideo: () => void;
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
        rootMargin: "-20% 0px -40% 0px"
      }
    );

    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  // Get current step data
  $: currentStepData = processSteps[currentStep];
  $: currentTimestamp = currentStepData?.timestamp || 0;
  
  // Format timestamp for display
  function formatTimestamp(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }
</script>

<div class="relative">
  <!-- Preview Cards with Descriptions -->
  <div class="space-y-32 pt-[15vh] pb-[35vh]">
    {#each processSteps as step, index}
      <div 
        class="preview-section-container"
        data-step={index}
        use:createObserver
        in:fade={{ duration: 200 }}
        on:stepChange
      >
        <!-- Step Description Header -->
        <div class="max-w-4xl mx-auto mb-8 px-4">
          <div class="flex items-center justify-between gap-6">
            <!-- Description Content -->
            <div class="flex-1 space-y-3">
              <div class="flex items-center gap-3">
                <div class={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all",
                  currentStep === index
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}>
                  {index + 1}
                </div>
                <h3 class={cn(
                  "text-2xl md:text-3xl font-semibold transition-colors",
                  currentStep === index ? "text-primary" : "text-foreground"
                )}>
                  {step.title}
                </h3>
              </div>
              <p class="text-lg text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>

            <!-- Timestamp Button -->
            <button
              class={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium",
                "transition-all duration-200 hover:scale-105 shrink-0",
                currentStep === index
                  ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                  : "bg-muted/50 border-border hover:bg-muted hover:border-primary/20"
              )}
              on:click={() => onTimestampVideo(step.timestamp)}
            >
              <Clock class="w-4 h-4" />
              <span>{formatTimestamp(step.timestamp)}</span>
            </button>
          </div>
        </div>

        <!-- Preview Card -->
        <PreviewCard 
          {step}
          isActive={currentStep === index}
        />
      </div>
    {/each}
  </div>

  <!-- Enhanced Sticky Controls -->
  <div class="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
    <!-- Gradient Fade -->
    <div class="h-32 bg-gradient-to-t from-landing dark:from-[#040D12] via-landing/90 dark:via-[#040D12]/90 to-transparent"></div>
    
    <!-- Controls Container -->
    <div class="bg-landing dark:bg-[#040D12] border-t border-border/20 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-6">
        
        <!-- Current Step Info + Controls -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <!-- Current Step Info -->
          <div class="flex items-center gap-4 text-center sm:text-left">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/30 
                        flex items-center justify-center">
              <span class="text-lg font-bold text-primary">{currentStep + 1}</span>
            </div>
            <div>
              <div class="font-semibold text-foreground">
                {currentStepData?.title || 'Select a process step'}
              </div>
              <div class="text-sm text-muted-foreground">
                Step {currentStep + 1} of {processSteps.length}
              </div>
            </div>
          </div>

          <!-- Play Buttons -->
          <div class="flex items-center gap-3 pointer-events-auto">
            
            <!-- Jump to Current Step -->
            <button
              class={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium",
                "bg-muted/80 border border-border hover:bg-muted hover:border-primary/20",
                "transition-all duration-200 hover:scale-105"
              )}
              on:click={() => onTimestampVideo(currentTimestamp)}
            >
              <Clock class="w-4 h-4" />
              <span class="hidden sm:inline">Jump to</span>
              <span>{formatTimestamp(currentTimestamp)}</span>
            </button>

            <!-- Main Demo Button -->
            <button
              class={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold",
                "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
                "text-white shadow-lg hover:shadow-xl hover:shadow-primary/25",
                "transition-all duration-200 hover:scale-105 active:scale-95"
              )}
              on:click={() => onFullVideo()}
            >
              <Play class="w-5 h-5" />
              <span>Watch Full Demo</span>
              <span class="text-xs opacity-90 hidden sm:inline">(5min)</span>
            </button>
          </div>
          
        </div>

        <!-- Progress Bar -->
        <div class="mt-4 w-full h-1 bg-muted rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] rounded-full transition-all duration-500"
            style="width: {((currentStep + 1) / processSteps.length) * 100}%"
          ></div>
        </div>
        
      </div>
    </div>
  </div>
</div>

<style>
  .preview-section-container {
    scroll-margin-top: 15vh;
  }
</style>