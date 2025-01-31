<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import { FileText } from 'lucide-svelte';
  import DemoVideo from './DemoVideo.svelte';
  import DrivePreview from './DrivePreview.svelte';
  import AiPipe from './AiPipe.svelte';
  import { onMount } from 'svelte';
  
  let activeFeature: string | null = 'elements';
  let showMobilePreview = false;
  let featuresSection: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        showMobilePreview = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (featuresSection) {
      observer.observe(featuresSection);
    }

    return () => observer.disconnect();
  });
</script>

<div class="container max-w-7xl" bind:this={featuresSection}>
  <!-- First Feature - Video Demo -->
  <div class="mb-32">
    <div class="flex gap-4 items-center mb-16">
      <div class="inline-flex items-center justify-center w-16 h-16 
                  rounded-full bg-primary bg-opacity-10">
        <FileText class="w-8 h-8 text-primary" />
      </div>
      <h2 class="text-4xl font-medium">Wireframes where you write</h2>
    </div>

    <div class="grid lg:grid-cols-5 gap-16 items-start">
      <div class="lg:col-span-2 space-y-6">
        <p class="text-xl text-muted-foreground">
          Build website layouts right in Google Docs. No switching apps, 
          no learning curve - just write and watch your ideas take shape.
        </p>
      </div>

      <div class="lg:col-span-3">
        <DemoVideo />
      </div>
    </div>
  </div>

  <!-- Second Feature - Drive Integration -->
  <div class="relative grid lg:grid-cols-3 gap-16 min-h-[150vh]">
    <!-- Desktop: Left Side Drive Preview (sticky) -->
    <div class="lg:col-span-2 hidden lg:block">
      <div class="sticky top-8">
        <DrivePreview activeFeature={activeFeature} />
      </div>
    </div>

    <!-- Mobile: Sticky Drive Preview (only shown when scrolled into view) -->
    {#if showMobilePreview}
      <div class="lg:hidden fixed inset-x-0 top-0 z-40 px-4 bg-background/80 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto">
          <DrivePreview activeFeature={activeFeature} />
        </div>
        <!-- Gradient fade for content below -->
        <div class="absolute -bottom-8 left-0 right-0 h-8 
                    bg-gradient-to-b from-background/80 to-transparent" />
      </div>
    {/if}

    <!-- Right Side: Feature Text -->
    <div class="space-y-[50vh] mt-[30vh] lg:mt-0">
      <!-- Mobile spacing to account for fixed preview -->
      <div class="h-[100vh] lg:hidden" />
      
      {#each ['Design Components', 'Pro Templates', 'Dark Mode Built-in'] as feature}
        <div class="space-y-4">
          <h3 class="text-3xl font-medium">{feature}</h3>
          <p class="text-xl text-muted-foreground">
            {#if feature === 'Design Components'}
              90+ copy-paste UI elements for rapid wireframing.
            {:else if feature === 'Pro Templates'}
              12 pre-formatted docs that present like a $10k deliverable.
            {:else}
              Switch themes with one click. Your docs, your vibe.
            {/if}
          </p>
        </div>
      {/each}
    </div>
  </div>

	<!-- 3rd feature -->
	<AiPipe />

</div>