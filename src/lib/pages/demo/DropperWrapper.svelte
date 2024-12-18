<!-- src/lib/pages/demo/DropperWrapper.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let isScrolled = false;
  
  onMount(() => {
    // Initial check
    isScrolled = window.scrollY > window.innerHeight * 0.3;
    
    const handleScroll = () => {
      isScrolled = window.scrollY > window.innerHeight * 0.3;
    };

    window.addEventListener('scroll', handleScroll);
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
  class="fixed z-50 transition-all duration-500 ease-in-out"
  class:translate-x-[85%]={isScrolled}
  style="right: 2rem; top: 50vh; transform: translateY(-50%);"
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
    /* Ensure smooth animation on transform */
    will-change: transform;
  }
</style>