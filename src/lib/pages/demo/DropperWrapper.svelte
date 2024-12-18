<!-- src/lib/pages/demo/DropperWrapper.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { cubicInOut } from 'svelte/easing';
  
  let isScrolled = false;
  let wrapper: HTMLDivElement;
  
  onMount(() => {
    const threshold = window.innerHeight * 0.3;
    
    // Initial check
    isScrolled = window.scrollY > threshold;
    
    const handleScroll = () => {
      if (!wrapper) return;
      
      const newScrolled = window.scrollY > threshold;
      if (newScrolled !== isScrolled) {
        isScrolled = newScrolled;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleMouseEnter() {
    if (isScrolled) {
      isScrolled = false;
    }
  }

  function handleMouseLeave() {
    if (window.scrollY > window.innerHeight * 0.3) {
      isScrolled = true;
    }
  }
</script>

<div 
  bind:this={wrapper}
  class="fixed z-50 transition-transform duration-500 ease-out"
  class:translate-x-[85%]={isScrolled}
  style="right: 2rem; top: 50vh; transform: translateY(-50%) {isScrolled ? 'translateX(85%)' : ''};"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <!-- Hover trigger area when scrolled -->
  {#if isScrolled}
    <div 
      class="absolute -left-16 top-0 bottom-0 w-24 cursor-pointer"
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