<!-- src/lib/pages/demo/DropperWrapper.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let isScrolled = false;
  let isMobile = false;
  let isHovered = false;
  let wrapper: HTMLDivElement;
  
  onMount(() => {
    const threshold = window.innerHeight * 0.3;
    
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    // Initial checks
    checkMobile();
    isScrolled = window.scrollY > threshold;
    
    const handleScroll = () => {
      if (!wrapper) return;
      isScrolled = window.scrollY > threshold;
    };

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }

  $: rightMargin = (() => {
    if (!browser) return '2rem';
    if (isMobile) return '50%';
    
    // When scrolled and not hovered, hide almost completely
    if (isScrolled && !isHovered) {
      return '-20rem';
    }
    
    // When scrolled and hovered, show partially
    if (isScrolled && isHovered) {
      return '-5rem';
    }
    
    // Initial position (not scrolled), aligned with content
    return window.innerWidth > 1280 ? '11rem' : 
           window.innerWidth > 1024 ? '6rem' : 
           window.innerWidth > 768 ? '4rem' : '2rem';
  })();

  $: verticalPosition = isMobile ? 
    `bottom: ${isScrolled ? (isHovered ? '2rem' : '-15rem') : '2rem'}; transform: translate(-50%, 0)` : 
    'top: 50vh; transform: translateY(-50%)';

  $: hoverTriggerClass = isMobile 
    ? "inset-x-0 -top-16 h-24" 
    : "-left-32 top-0 bottom-0 w-24";
</script>

<div 
  bind:this={wrapper}
  class="fixed z-50 transition-all duration-500 ease-out"
  style={`${isMobile ? 'left: 50%;' : `right: ${rightMargin};`} ${verticalPosition}`}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <!-- Hover trigger area -->
  {#if isScrolled}
    <div 
      class="absolute cursor-pointer {hoverTriggerClass}"
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