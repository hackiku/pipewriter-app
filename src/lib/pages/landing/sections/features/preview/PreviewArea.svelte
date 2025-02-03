<!-- src/lib/pages/landing/sections/features/preview/PreviewArea.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { driveStore } from '../../../stores/driveStore';
  import { driveRoot, type DriveNode } from '../../../data/folders';
  import { shoutouts } from '../../../data/shoutouts';

  // Get all previewable items and sort by order
  function getPreviewableItems(node: DriveNode): DriveNode[] {
    const items: DriveNode[] = [];
    
    function traverse(node: DriveNode) {
      if (node.preview) {
        items.push(node);
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    
    traverse(node);
    return items.sort((a, b) => (a.preview?.order || 99) - (b.preview?.order || 99));
  }

  // Get previewable items
  $: previewItems = getPreviewableItems(driveRoot);
  $: currentPath = $driveStore.currentPath;
  $: activeNode = previewItems.find(item => item.path === currentPath) || previewItems[0];
  
  // Get matching shoutout
  $: shoutout = activeNode?.preview?.shoutout 
    ? shoutouts.find((s, i) => `writer${i + 1}` === activeNode?.preview?.shoutout)
    : null;

  // Create observer to highlight drive items on scroll
  function createObserver(node: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const path = entry.target.id.replace('preview-', '');
            driveStore.navigate(path);
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
</script>

<div class="space-y-8">
  {#each previewItems as item}
    <div 
      id="preview-{item.path}"
      class="w-full aspect-video rounded-xl overflow-hidden border bg-zinc-950 text-white
             preview-card transition-all duration-300
             {currentPath === item.path ? 'border-primary scale-[1.02]' : 'border-white/10'}"
      use:createObserver
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