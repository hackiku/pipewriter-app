<!-- src/lib/pages/landing/sections/features/DrivePreview.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import DriveFolder from './DriveFolder.svelte';
  
  export let activeFeature: string | null = 'elements';

  const previews = {
    samples: {
      emoji: "📦",
      title: "90+ UI Elements",
      description: "Copy-paste components for rapid prototyping"
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
      activeFeature = null;
    } else {
      activeFeature = id;
    }
  }
</script>

<div class="space-y-4 lg:max-w-fit">
  <!-- Drive Folder - Auto height -->
  <div class="min-h-[30vh] max-h-[80vh] lg:min-h-0 lg:h-auto w-full">
    <DriveFolder activeId={activeFeature} onSelect={handleSelect} />
  </div>

  <!-- Preview Window -->
  {#if activeFeature && previews[activeFeature]}
    <div 
      class="aspect-video lg:min-w-[640px] w-full rounded-xl overflow-hidden border bg-zinc-950 text-white"
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