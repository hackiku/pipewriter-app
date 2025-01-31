<!-- src/lib/pages/landing/sections/features/DrivePreview.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { driveContents } from '../../data/folders';
  
  export let activeFeature: string | null = 'elements';

  // Filter to only items with preview content
  $: previewItems = driveContents.filter(item => item.preview && item.previewContent);
</script>

<div class="space-y-8">
  {#each previewItems as item}
    <div 
      class="w-full aspect-video rounded-xl overflow-hidden border bg-zinc-950 text-white
             transition-colors duration-300
             {activeFeature === item.id ? 'border-primary' : 'border-white/10'}"
      in:fade={{ duration: 200 }}
    >
      <div class="relative h-full flex items-center justify-center">
        <!-- Gradient Overlay for Text -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        
        <div class="relative space-y-8 text-center px-8">
          <div class="text-6xl">{item.previewContent.emoji}</div>
          <div class="space-y-2">
            <h3 class="text-2xl font-medium">{item.previewContent.title}</h3>
            <p class="text-white/70">{item.previewContent.description}</p>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>