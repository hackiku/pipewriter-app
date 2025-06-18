<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  import ProcessMenu from "./process/ProcessMenu.svelte";
  import WriterShoutout from "./WriterShoutout.svelte";
  import PreviewArea from "./video/PreviewArea.svelte";
  import VideoPlayer from "./video/VideoPlayer.svelte";
  import { processSteps } from "./processData";

  // State
  let currentStep = 0;
  let isVideoOpen = false;
  let videoStartTime = 0;
  let isCompact = false;
  let isMobile = false;

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  });

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

  // Handle scroll-based step changes from PreviewArea
  function handlePreviewStepChange(event: CustomEvent) {
    currentStep = event.detail.stepIndex;
  }

  // Toggle compact mode for mobile sticky behavior
  function toggleCompact() {
    isCompact = !isCompact;
  }

  // Update writer shoutout based on current step
  $: {
    if (typeof window !== 'undefined') {
      const currentStepData = processSteps[currentStep];
      window.dispatchEvent(new CustomEvent('stepChanged', { 
        detail: { shoutoutId: currentStepData?.shoutoutId } 
      }));
    }
  }
</script>

<div class="relative">
  <!-- Desktop Layout -->
  <div class="hidden md:grid grid-cols-6 gap-8">
    
    <!-- Left Column: Process Menu + Writer Testimonials -->
    <div class="col-span-2">
      <div class="sticky top-4 space-y-6 z-50 pb-12">
        
        <!-- Process Menu -->
        <ProcessMenu
          {currentStep}
          onStepChange={handleStepChange}
          {isCompact}
        />

        <!-- Writer Testimonials -->
        <div class="px-4 pt-[20%]">
          <WriterShoutout />
        </div>
      </div>
    </div>

    <!-- Right Column: Preview Area -->
    <div class="col-span-4">
      <PreviewArea
        {currentStep}
        onFullVideo={openFullVideo}
        onTimestampVideo={openVideoAtTimestamp}
        on:stepChange={handlePreviewStepChange}
      />
    </div>
  </div>

  <!-- Mobile Layout -->
  <div class="md:hidden">
    
    <!-- Sticky Header with Process Menu -->
    <div class="sticky top-4 z-[999] bg-background/80 backdrop-blur-sm pb-6">
      <ProcessMenu
        {currentStep}
        onStepChange={handleStepChange}
        isCompact={true}
      />
    </div>

    <!-- Writer Testimonials - Between menu and preview -->
    <div class="px-4 py-6">
      <WriterShoutout />
    </div>

    <!-- Preview Area -->
    <div class="px-4">
      <PreviewArea
        {currentStep}
        onFullVideo={openFullVideo}
        onTimestampVideo={openVideoAtTimestamp}
        on:stepChange={handlePreviewStepChange}
      />
    </div>
  </div>
</div>

<!-- Video Modal -->
{#if isVideoOpen}
  <VideoPlayer 
    onClose={closeVideo}
    startTime={videoStartTime}
  />
{/if}