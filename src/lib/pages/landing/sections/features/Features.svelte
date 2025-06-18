<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import PreviewSection from "./PreviewSection.svelte";
  import WriterShoutout from "./WriterShoutout.svelte";
  import ActionBar from "./ActionBar.svelte";
  import VideoPlayer from "./video/VideoPlayer.svelte";

  // State
  let currentStep = 0;
  let isVideoOpen = false;
  let videoStartTime = 0;

  // Handle step changes
  function handleStepChange(stepIndex: number) {
    currentStep = stepIndex;
  }

  // Handle video actions
  function openFullVideo() {
    videoStartTime = 0;
    isVideoOpen = true;
  }

  function openVideoAtTimestamp(timestamp: number) {
    videoStartTime = timestamp;
    isVideoOpen = true;
  }

  function closeVideo() {
    isVideoOpen = false;
  }

  // Handle scroll-based step changes from PreviewSection
  function handlePreviewStepChange(event: CustomEvent) {
    currentStep = event.detail.stepIndex;
  }

  // Update writer shoutout based on current step
  $: {
    if (typeof window !== 'undefined') {
      const shoutoutId = `writer${currentStep + 1}`;
      window.dispatchEvent(new CustomEvent('stepChanged', { 
        detail: { shoutoutId } 
      }));
    }
  }
</script>

<div class="relative">
  
  <!-- Main Preview Section -->
  <PreviewSection
    {currentStep}
    onTimestampVideo={openVideoAtTimestamp}
    on:stepChange={handlePreviewStepChange}
  />

  <!-- Sticky Writer Shoutout - Desktop Only, Bottom Left -->
  <div class="hidden md:block sticky bottom-2 left-4 sm:left-6 md:left-12 lg:left-16 xl:left-24 2xl:left-32 z-30 w-80">
    <WriterShoutout />
  </div>

</div>

<!-- Sticky Action Bar -->
<ActionBar
  {currentStep}
  onStepChange={handleStepChange}
  onFullVideo={openFullVideo}
/>

<!-- Video Modal -->
{#if isVideoOpen}
  <VideoPlayer 
    onClose={closeVideo}
    startTime={videoStartTime}
  />
{/if}