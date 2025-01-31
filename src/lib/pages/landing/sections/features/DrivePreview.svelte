<!-- src/lib/pages/landing/sections/features/DrivePreview.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import DriveFolder from './DriveFolder.svelte';
  import { onMount } from 'svelte';
  
  export let activeFeature: string | null = 'elements'; // Start with elements selected

  const previews = {
    samples: {
      emoji: "📦",
      title: "Sample Templates",
      description: "Ready-made examples to build from"
    },
    guides: {
      emoji: "📖",
      title: "Quick Start Guides",
      description: "Learn the basics in 5 minutes"
    },
    elements: {
      emoji: "🎨",
      title: "90+ UI Elements",
      description: "Copy-paste components for rapid prototyping"
    },
    darkmode: {
      emoji: "🌗",
      title: "Dark Mode Built-in",
      description: "Switch themes with one click"
    }
  };

  function handleSelect(id: string) {
    if (id === activeFeature) {
      // Toggle off if clicking the active item
      activeFeature = null;
    } else {
      activeFeature = id;
    }
  }
</script>

<!-- Container with max-width constraint -->
<div class="max-w-[calc(100%-4rem)] space-y-[3vh]">
  <!-- Drive Folder View -->
  <div class="h-[45vh] lg:h-[35vh]">
    <DriveFolder activeId={activeFeature} onSelect={handleSelect} />
  </div>

  <!-- Preview Window -->
  {#if activeFeature && previews[activeFeature]}
    <div 
      class="aspect-video w-full rounded-xl overflow-hidden border bg-zinc-950 text-white"
      in:fade={{ duration: 200 }}
    >
      <div class="relative h-full flex items-center justify-center">
        <div class="space-y-[3vh] text-center px-8">
          <div class="text-[8vh]">{previews[activeFeature].emoji}</div>
          <div class="space-y-[1vh]">
            <h3 class="text-2xl font-medium">{previews[activeFeature].title}</h3>
            <p class="text-white/70">{previews[activeFeature].description}</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Fix for iOS vh issues */
  /* @supports (-webkit-touch-callout: none) {
    .h-[45vh] {
      height: 45dvh;
    }
    .h-[35vh] {
      height: 35dvh;
    }
  } */
</style>