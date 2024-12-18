<!-- src/lib/components/cta/GumroadEmbed.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  export let productUrl = "https://pipewriter.gumroad.com/l/wires-for-writers";
  export let height = "100%";
  export let showGradient = true;
  
  let mounted = false;
  
  function handleGradientClick() {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth"
    });
  }
  
  onMount(() => {
    // Load Gumroad embed script
    const script = document.createElement('script');
    script.src = "https://gumroad.com/js/gumroad-embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      mounted = true;
    };
    
    return () => {
      document.body.removeChild(script);
    };
  });
</script>

<div class="relative bg-background overflow-hidden" style:height={height}>
  <div class="h-full overflow-y-auto">
    {#if mounted}
      <div class="gumroad-product-embed">
        <a href={productUrl}>Loading...</a>
      </div>
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <span class="text-muted-foreground">Loading Gumroad...</span>
      </div>
    {/if}
  </div>
  
  {#if showGradient}
    <div
      class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent 
             cursor-grab transition-opacity hover:opacity-75"
      on:click={handleGradientClick}
    />
  {/if}
</div>

<style>
  /* Hide scrollbar but keep functionality */
  .overflow-y-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
  
  /* Fix Gumroad embed container */
  :global(.gumroad-product-embed) {
    height: 100% !important;
  }
</style>