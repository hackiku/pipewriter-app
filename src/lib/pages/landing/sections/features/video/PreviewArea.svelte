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
  <!-- Preview Cards -->
  <div class="space-y-20 pt-[20vh] pb-[30vh]">
    {#each processSteps as step, index}
      <div 
        class="preview-card-container"
        data-step={index}
        use:createObserver
        in:fade={{ duration: 200 }}
        on:stepChange
      >
			        <p class="text-sm text-white/80 leading-relaxed">
          {currentStepData?.description || 'Select a process step to see details'}
        </p>
        <PreviewCard 
          {step}
          isActive={currentStep === index}
        />
      </div>
    {/each}
  </div>

  <!-- Sticky Video Controls at Bottom -->
    <div class="sticky h-24 -bottom-1 bg-gradient-to-b 
			border border-red-500/40	
			from-transparent to-landing dark:to-[#040D12] h-22">
      
      <!-- Description -->
      <!-- <div class="_text-center mb-4 max-w-md">
        <p class="text-sm text-white/80 leading-relaxed">
          {currentStepData?.description || 'Select a process step to see details'}
        </p>
      </div> -->
      
      <!-- Buttons -->
      <div class="flex items-center gap-4">
        
        <!-- Main Demo Button -->
        <button
          class={cn(
            "flex items-center gap-3 px-4 py-3 rounded-full",
            "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
            "text-white font-medium transition-all duration-200",
            "hover:shadow-sm hover:shadow-primary/25 hover:scale-105",
            "active:scale-95"
          )}
          on:click={() => onFullVideo()}
        >
          <Play class="w-5 h-5" />
          <span class="text-xs">Watch Demo</span>
          <span class="text-[0.6em] opacity-75">(5m)</span>
        </button>

        <!-- Jump to Timestamp Button -->
        <!-- <button
          class={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl text-sm",
            "bg-white/10 border border-white/20 text-white",
            "hover:bg-white/20 transition-all duration-200",
            "hover:scale-105 active:scale-95"
          )}
          on:click={() => onTimestampVideo(currentTimestamp)}
        >
          <Clock class="w-4 h-4" />
          <span>Jump to {formatTimestamp(currentTimestamp)}</span>
        </button> -->
      </div>
    </div>
  </div>
<!-- </div> -->

<style>
  .preview-card-container {
    scroll-margin-top: 20vh;
  }
</style>