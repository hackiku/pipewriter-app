<!-- src/lib/pages/landing/sections/features/video/PreviewArea.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { cn } from "$lib/utils";
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

  function handleTimestampVideo(step: any) {
    onTimestampVideo(step.timestamp);
  }
</script>

<div class="space-y-8 pt-[20vh] pb-[20vh]">
  {#each processSteps as step, index}
    <div 
      class="preview-card-container"
      data-step={index}
      use:createObserver
      in:fade={{ duration: 200 }}
      on:stepChange
    >
      <PreviewCard 
        {step}
        isActive={currentStep === index}
        {onFullVideo}
        onTimestampVideo={() => handleTimestampVideo(step)}
      />
    </div>
  {/each}
</div>

<style>
  .preview-card-container {
    scroll-margin-top: 20vh;
  }
</style>