<!-- lib/components/cta/GumroadCartButton.svelte -->
<script lang="ts">
  import { ShoppingCart, X } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  
  export let price = "$59";
  export let text = "Add to Cart";
  export let href = "https://app.gumroad.com/checkout?product=qmifdo&quantity=1";
  export let className = "";
  export let useEmbed = false;

  let showEmbed = false;

  onMount(() => {
    if (useEmbed && !(window as any).GumroadEmbed) {
      const script = document.createElement('script');
      script.src = 'https://gumroad.com/js/gumroad-embed.js';
      document.head.appendChild(script);
    }
  });

  function handleClick(e: MouseEvent) {
    if (useEmbed) {
      e.preventDefault();
      showEmbed = true;
    }
  }

  function closeEmbed() {
    showEmbed = false;
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeEmbed();
    }
  }
</script>

<a 
  {href}
  target="_blank"
  rel="noopener noreferrer"
  on:click={handleClick}
  class={cn(
    "relative inline-flex items-center gap-3",
    "bg-[#FF90E8] hover:bg-[#FF90E8]/80 text-black font-medium",
    "px-4 py-2 text-base rounded-lg border-2 border-black",
    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    "hover:translate-x-[2px] hover:translate-y-[2px]",
    "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    "transition-all duration-200",
    className
  )}>
  <ShoppingCart class="w-4 h-4" />
  {text}<span class="opacity-40">— {price}</span>
</a>

{#if showEmbed}
  <!-- Modal Overlay -->
  <div
    class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
    on:click={handleBackdropClick}
    transition:fade={{ duration: 200 }}
  >
    <!-- Close Button -->
    <button
      class="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      on:click={closeEmbed}
    >
      <X class="w-6 h-6" />
    </button>
    
    <!-- Embed Container -->
    <div 
      class="fixed inset-4 md:inset-8 bg-white rounded-xl overflow-hidden"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <div class="gumroad-product-embed h-full">
        <a {href}>Loading...</a>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Make embed iframe fill container */
  :global(.gumroad-product-embed iframe) {
    width: 100% !important;
    height: 100% !important;
  }
</style>