<!-- src/lib/pages/landing/sections/preview/PreviewArea.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { driveStore } from '../../../stores/driveStore';
  import { driveRoot, type DriveNode } from '../../../data/folders';

	import FeatureCard from "./FeatureCard.svelte"

  // Flatten drive structure to get all previewable items
  function getPreviewableItems(node: DriveNode): DriveNode[] {
    const items: DriveNode[] = [];
    
    if (node.preview) {
      items.push(node);
    }
    
    if (node.children) {
      node.children.forEach(child => {
        items.push(...getPreviewableItems(child));
      });
    }
    
    return items;
  }

  // Get all previewable items
  $: previewItems = getPreviewableItems(driveRoot);
  
  // Current path for highlighting
  $: currentPath = $driveStore.currentPath;
</script>

<div class="space-y-8">
  {#each previewItems as item}
    <div 
      id="preview-{item.path}"
      class="w-full aspect-video rounded-xl overflow-hidden border bg-zinc-950 text-white
             preview-card transition-colors duration-300
             {currentPath === item.path ? 'border-primary' : 'border-white/10'}"
      in:fade={{ duration: 200 }}
    >
      <div class="relative h-full flex items-center justify-center">
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        
        <div class="relative space-y-8 text-center px-8">
          <div class="text-6xl">{item.preview?.emoji}</div>
          <div class="space-y-2">
            <h3 class="text-2xl font-medium">{item.preview?.title}</h3>
            <p class="text-white/70">{item.preview?.description}</p>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>