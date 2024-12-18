<!-- src/lib/pages/demo/Dropper.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ElementCard from "./ElementCard.svelte";
  import { elements } from "$lib/iframe/elements";
  
  export let onElementSelect: (elementId: string) => void;
  export let startOpen = false;

  const clickableElements = [
    'hero',
    'zz-left',
    'zz-right',
    'blurbs-3',
    'button-left',
    'cards-2'
  ];

  const allElements = Object.values(elements)
    .filter(element => !element.id.startsWith('container-') && !element.id.startsWith('background-'));

  $: activeElements = allElements
    .filter(el => clickableElements.includes(el.id))
    .slice(0, 6);

  $: previewElements = allElements
    .filter(el => !clickableElements.includes(el.id))
    .slice(0, 9);

  let isCollapsed = !startOpen;
  let isVisible = true;
  let lastScrollY = 0;

  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Desktop behavior
      if (window.innerWidth >= 1024) {
        if (startOpen && currentScrollY > 100) {
          isCollapsed = true;
        } else if (startOpen && currentScrollY <= 100) {
          isCollapsed = false;
        }
      } 
      // Mobile behavior - smoother transitions
      else {
        if (currentScrollY > lastScrollY) {
          isCollapsed = true;
        } else if (currentScrollY < lastScrollY && currentScrollY <= 100) {
          isCollapsed = false;
        }
      }
      
      lastScrollY = currentScrollY;
      
      // Visibility check
      const demoSection = document.querySelector('#demo-section');
      if (demoSection) {
        const rect = demoSection.getBoundingClientRect();
        isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div 
  class="fixed z-[100] transition-all duration-300 ease-out overflow-visible bg-transparent"
  class:translate-x-[85%]={isCollapsed}
  class:opacity-0={!isVisible}
  class:pointer-events-none={!isVisible}
  style="width: min(500px, calc(100vw - 2rem));"
>
  <div class="relative w-full max-h-[70vh] overflow-hidden">
    <!-- Hover trigger -->
    {#if isCollapsed}
      <div 
        class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background/50 to-transparent z-10 cursor-pointer"
        on:mouseenter={() => isCollapsed = false}
      />
    {/if}

    <!-- Content -->
    <div 
      class="overflow-auto max-h-[70vh] hide-scrollbar"
      on:mouseleave={() => window.scrollY > 100 && (isCollapsed = true)}
    >
      <!-- Active elements -->
      <div class="grid grid-cols-3 gap-2 bg-background p-4 rounded-lg shadow-lg border border-border/50 mb-2">
        {#each activeElements as element (element.id)}
          <ElementCard 
            {element} 
            onSelect={onElementSelect}
            disabled={false}
          />
        {/each}
      </div>

      <!-- Preview elements -->
      <div class="relative">
        <div class="grid grid-cols-3 gap-2 bg-background p-4 rounded-lg shadow-lg border border-border/50 opacity-50">
          {#each previewElements as element (element.id)}
            <ElementCard 
              {element} 
              onSelect={onElementSelect}
              disabled={true}
            />
          {/each}
        </div>
        
        <!-- Fade out -->
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  </div>
</div>

<style>
  /* Hide scrollbar but keep functionality */
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Desktop positioning */
  @media (min-width: 1024px) {
    div {
      right: 1rem;
      top: 50vh;
      transform: translateY(-50%);
    }
  }

  /* Mobile positioning */
  @media (max-width: 1023px) {
    div {
      right: 1rem;
      bottom: 1rem;
      transform: none;
    }
  }
</style>