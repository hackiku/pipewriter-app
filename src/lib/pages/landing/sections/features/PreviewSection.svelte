<!-- src/lib/pages/landing/sections/features/PreviewSection.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { cn } from "$lib/utils";
  import { Clock } from "lucide-svelte";
  import PreviewCard from './video/PreviewCard.svelte';
  import FreeGoogleDoc from './FreeGoogleDoc.svelte';
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
  
  // Handle step navigation click
  function handleStepClick(index: number) {
    const targetElement = document.querySelector(`[data-step="${index}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }

  // Handle full video open
  function handleFullVideo() {
    onTimestampVideo(0);
  }
</script>

<!-- Desktop: Sticky Sidebar + Scrolling Preview -->
<div class="hidden md:block">
  <div class="flex gap-8 items-start">
    
    <!-- Left: Sticky Steps Navigation (Reduced width) -->
    <div class="w-72 sticky top-24 flex flex-col min-h-[80vh]">
      
      <!-- Current Step Content -->
      <div class="flex-1">
        {#each processSteps as step, index}
          {#if currentStep === index}
            <div class="space-y-6" in:fade={{ duration: 200 }}>
              
              <!-- Headline -->
              <div class="space-y-2">
                <h3 class="text-2xl font-semibold text-primary">
                  {step.title}
                </h3>
                
                <!-- Timestamp Button -->
                <button
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-200 hover:scale-105"
                  on:click={() => onTimestampVideo(step.timestamp)}
                >
                  <Clock class="w-3 h-3" />
                  <span>{formatTimestamp(step.timestamp)}</span>
                </button>
              </div>

              <!-- Description -->
              <p class="text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              
              <!-- Bullets -->
              {#if step.features}
                <ul class="space-y-3">
                  {#each step.features as feature}
                    <li class="flex items-center gap-3 text-sm text-muted-foreground">
                      <!-- Custom Gradient Bullet -->
                      <div class="w-2 h-2 rounded-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/if}
        {/each}
      </div>

      <!-- Free Google Doc Button (Bottom with clearance) -->
      <div class="mt-auto mb-24">
        <FreeGoogleDoc />
      </div>
    </div>

    <!-- Right: Scrolling Preview Cards (More space) -->
    <div class="flex-1 space-y-32">
      {#each processSteps as step, index}
        <div 
          class="preview-section min-h-[80vh] flex items-center"
          data-step={index}
          use:createObserver
          in:fade={{ duration: 200 }}
          on:stepChange
        >
          <PreviewCard 
            {step}
            isActive={currentStep === index}
            {onTimestampVideo}
            onFullVideo={handleFullVideo}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Mobile: Keep Existing Layout But Add Features -->
<div class="md:hidden space-y-24 pb-32">
  {#each processSteps as step, index}
    <div 
      class="preview-section"
      data-step={index}
      use:createObserver
      in:fade={{ duration: 200 }}
      on:stepChange
    >
      <!-- Step Number & Title Row -->
      <div class="flex items-center justify-between gap-4 px-4 mb-6">
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
      <p class="text-base text-muted-foreground leading-relaxed px-4 mb-4">
        {step.description}
      </p>
      
      <!-- Features for Mobile -->
      {#if step.features}
        <div class="px-4 mb-6">
          <ul class="space-y-2">
            {#each step.features as feature}
              <li class="flex items-center gap-3 text-sm text-muted-foreground">
                <!-- Custom Gradient Bullet -->
                <div class="w-2 h-2 rounded-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] flex-shrink-0"></div>
                <span>{feature}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Preview Card -->
      <div class="px-4">
        <PreviewCard 
          {step}
          isActive={currentStep === index}
          {onTimestampVideo}
          onFullVideo={handleFullVideo}
        />
      </div>
    </div>
  {/each}

  <!-- Mobile Free Doc Button -->
  <div class="px-4">
    <FreeGoogleDoc />
  </div>
</div>

<style>
  .preview-section {
    scroll-margin-top: 10vh;
  }
</style>