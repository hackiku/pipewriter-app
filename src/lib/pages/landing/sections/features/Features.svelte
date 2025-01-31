<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import { FileText } from 'lucide-svelte';
  import DemoVideo from './DemoVideo.svelte';
  import DrivePreview from './DrivePreview.svelte';

  let activePreview: number | null = null;
  
  const stats = [
    {
      number: "90+",
      label: "UI elements",
      description: "Copy paste away.",
      previewId: 1
    },
    {
      number: "12",
      label: "template docs",
      description: "Formatted to look like a million bucks.",
      previewId: 2
    },
    {
      number: "2×",
      label: "color modes",
      description: "Light and dark, perfectly themed.",
      previewId: 3
    }
  ];
</script>

<div class="container max-w-7xl">
  <!-- First Feature - Video Demo -->
  <div class="mb-32">
    <!-- Headline -->
    <div class="flex gap-4 items-center mb-16">
      <div class="inline-flex items-center justify-center w-16 h-16 
                  rounded-full bg-primary bg-opacity-10">
        <FileText class="w-8 h-8 text-primary" />
      </div>
      <h2 class="text-4xl font-medium">Wireframes where you write</h2>
    </div>

    <!-- Content Grid -->
    <div class="grid lg:grid-cols-4 gap-16 items-start">
      <div class="space-y-6">
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

  <!-- Second Feature - Drive Preview -->
  <div class="relative">
    <!-- Fixed Drive Preview -->
    <div class="lg:sticky lg:top-24 lg:w-[45%] lg:ml-auto">
      <DrivePreview activeId={activePreview} />
    </div>

    <!-- Scrolling Stats -->
    <div class="relative lg:w-1/2 space-y-32 py-16">
      {#each stats as stat}
        <div 
          class="space-y-4"
          on:mouseenter={() => activePreview = stat.previewId}
          on:mouseleave={() => activePreview = null}
        >
          <div class="space-y-1">
            <div class="text-4xl font-medium">
              {stat.number} <span class="text-muted-foreground">{stat.label}</span>
            </div>
            <p class="text-xl text-muted-foreground">
              {stat.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>