<!-- src/lib/pages/landing/sections/features/drive/DriveViewer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronDown } from 'lucide-svelte';
  import { driveStore } from '../../../stores/driveStore';
  import { driveRoot } from '../../../data/folders';
  import Row from './Row.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import AddToCart from "$lib/components/cta/buy/AddToCart.svelte";
  
  $: currentPath = $driveStore.currentPath;
  $: items = driveRoot.children || [];
  $: isCompact = $driveStore.isCompact;

  // Get current active index for scrolling
  $: activeIndex = items.findIndex(item => 
    item.path === currentPath || currentPath.startsWith(item.path + '/')
  );

  let driveContainer: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            driveStore.toggleCompact(true);
          } else {
            driveStore.toggleCompact(false);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px"
      }
    );

    if (driveContainer) observer.observe(driveContainer);
    return () => observer.disconnect();
  });

  // Scroll active item into view when compact
  $: if (isCompact && driveContainer && activeIndex !== -1) {
    const rows = driveContainer.querySelectorAll('.drive-row');
    const activeRow = rows[activeIndex];
    if (activeRow) {
      const containerHeight = driveContainer.clientHeight;
      const rowHeight = activeRow.clientHeight;
      const scrollPos = activeRow.offsetTop - (containerHeight - rowHeight) / 2;
      driveContainer.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  }

  function handleItemClick(path: string) {
    driveStore.navigate(path);
  }
</script>

<div 
  class="drive-viewer-container flex flex-col rounded-xl border overflow-hidden 
         bg-zinc-950 text-white transition-all duration-300"
  role="navigation"
  aria-label="Drive folder navigation"
  bind:this={driveContainer}
>
  <Breadcrumbs
    breadcrumbs={['Pipewriter', ...(currentPath !== '/' ? currentPath.split('/').filter(Boolean) : [])]}
    onClick={(part, index) => driveStore.handleBreadcrumbClick(part, index)}
    {currentPath}
    {isCompact}
  />

  <div 
    class="overflow-hidden transition-all duration-300 relative
           {isCompact ? 'h-24' : 'h-auto'}"
  >
    <div class="absolute inset-0 overflow-y-auto">
      {#each items as item, i (item.path)}
        <Row
          {item}
          {currentPath}
          onClick={handleItemClick}
          compact={isCompact}
          class="drive-row"
        />
      {/each}
    </div>
  </div>

  <!-- CTA Button - Now consistent across layouts -->
  <div class="p-4 border-t border-white/10">
    <AddToCart
      text="Get Drive Access"
      source="features-drive"
      showPrice={true}
      price="• 40% OFF"
    />
  </div>
</div>

<style>
  .drive-viewer-container {
    will-change: min-height;
  }
</style>