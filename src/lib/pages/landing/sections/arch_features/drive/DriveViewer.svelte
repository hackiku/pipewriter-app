<!-- src/lib/pages/landing/sections/features/drive/DriveViewer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
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
  $: isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  onMount(() => {
    // Start expanded (not compact)
    driveStore.toggleCompact(false);

    const handleResize = () => {
      const wasMobile = isMobile;
      isMobile = window.innerWidth < 768;
      
      // Reset to expanded when switching views
      if (wasMobile !== isMobile) {
        driveStore.toggleCompact(false);
      }
    };
    window.addEventListener('resize', handleResize);

    // Mobile-only intersection observer for sticky behavior
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isMobile) return;
        
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

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
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
  />

  <div 
    class="relative transition-all duration-300
           {isCompact ? 'h-[3.5em] overflow-hidden' : ''}"
  >
    <div class="overflow-y-auto scrollbar-hide {isCompact ? 'absolute inset-0' : ''}">
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

  <!-- CTA Button -->
  <div class="p-4 border-t border-white/10">
    <AddToCart
      text="Get Drive Access"
      source="features-drive"
      showPrice={false}
      price="40% OFF"
    />
  </div>
</div>

<style>
  .drive-viewer-container {
    will-change: min-height;
  }
  
  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
</style>