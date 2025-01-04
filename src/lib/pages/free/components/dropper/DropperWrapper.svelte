<!-- src/lib/pages/free/components/dropper/DropperWrapper.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let isScrolled = false;
  let isMobile = false;
  let isHovered = false;
  let wrapper: HTMLDivElement;
  
  onMount(() => {
    const threshold = window.innerHeight * 0.3;
    const checkMobile = () => isMobile = window.innerWidth < 768;
    
    checkMobile();
    isScrolled = window.scrollY > threshold;
    
    const handleScroll = () => {
      if (!wrapper) return;
      isScrolled = window.scrollY > threshold;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  });

  $: rightMargin = (() => {
    if (!browser) return '2rem';
    if (isMobile) return '50%';
    
    // Just two states: visible or hidden
    return isScrolled && !isHovered ? '-20rem' : '2rem';
  })();

  $: verticalPosition = isMobile ? 
    `bottom: ${isScrolled ? (isHovered ? '2rem' : '-15rem') : '2rem'}; transform: translate(-50%, 0)` : 
    'top: 50vh; transform: translateY(-50%)';

  // Wider hover area for better UX
  $: hoverTriggerClass = isMobile 
    ? "inset-x-0 -top-16 h-24" 
    : "-left-24 top-0 bottom-0 w-16";

  export { isScrolled, isMobile };
</script>

<div 
  bind:this={wrapper}
  class="fixed z-50 transition-all duration-500 ease-out group"
  style={`${isMobile ? 'left: 50%;' : `right: ${rightMargin};`} ${verticalPosition}`}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
>
  {#if isScrolled}
    <!-- Enhanced hover trigger area with gradient -->
    <div 
      class="absolute {hoverTriggerClass} cursor-pointer"
      style="background: linear-gradient(to {isMobile ? 'top' : 'right'}, 
        rgba(54, 68, 254, 0.02),
        rgba(179, 69, 237, 0.03)
      );"
      aria-hidden="true"
    />
  {/if}
  
  <slot />
</div>

<style>
  div {
    will-change: transform;
    backface-visibility: hidden;
  }
</style>