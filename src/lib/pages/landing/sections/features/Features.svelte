<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import { FileText } from 'lucide-svelte';
  import DemoVideo from './DemoVideo.svelte';
  import DrivePreview from './DrivePreview.svelte';
  
  let activeFeature: string | null = 'elements'; // Start with elements selected
</script>

<div class="container max-w-7xl">
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
    <!-- Left Side: Drive Preview (sticky) -->
    <div class="lg:col-span-2 hidden lg:block">
      <div class="sticky top-32">
        <DrivePreview activeFeature={activeFeature} />
      </div>
    </div>

    <!-- Mobile: Drive Preview (non-sticky) -->
    <div class="lg:hidden mb-16">
      <DrivePreview activeFeature={activeFeature} />
    </div>

    <!-- Right Side: Feature Text -->
    <div class="space-y-32">
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
</div>