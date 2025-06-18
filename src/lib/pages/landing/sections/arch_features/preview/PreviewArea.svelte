<!-- src/lib/pages/landing/sections/features/preview/PreviewArea.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { driveStore } from '../../../stores/driveStore';
  import { driveRoot, type DriveNode } from '../../../data/folders';
  import { shoutouts } from '../../../data/shoutouts';
  import PreviewCard from './PreviewCard.svelte';

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

  // Map videos to specific cards
  const mediaMap = new Map([
    ['/App.gdoc', { type: 'image' as const, src: '/demo/videos/wireframing-demo.webp' }],
    ['/Darkmode.gdoc', { type: 'image' as const, src: '/demo/videos/darkmode.webp' }]
  ]);
</script>

<div class="space-y-8 pt-[35vh] pb-[25vh]">
  {#each previewItems as item}
    <div 
      id="preview-{item.path}"
      class="preview-card"
      use:createObserver
      in:fade={{ duration: 200 }}
    >
      <PreviewCard 
        {item} 
        isActive={currentPath === item.path}
        media={mediaMap.get(item.path)}
      />
    </div>
  {/each}
</div>