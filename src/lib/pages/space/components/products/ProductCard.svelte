<!-- src/lib/pages/space/components/products/ProductCard.svelte -->
<script lang="ts">
  import type { Product } from '../../types';
  import { fade } from 'svelte/transition';
  import { spaceStore } from '../../stores/spaceStore';
  import CardContent from './CardContent.svelte';
  import ProductModal from './ProductModal.svelte';
  
  export let product: Product;
  export let index: number;
  
  let showModal = false;
  
  $: isActive = $spaceStore.activeProductIndex === index;
  $: isInactive = $spaceStore.activeProductIndex !== null && !isActive;
  
  function handleClick() {
    if (isActive) {
      showModal = true;
    } else {
      spaceStore.setActiveProduct(index);
    }
  }
</script>

<div 
  class="relative transition-all duration-500 ease-out"
  class:transform-inactive="{isInactive}"
  class:transform-deeper="{index > ($spaceStore.activeProductIndex ?? -1) + 1}"
  style="z-index: {50 - index}; margin-top: {index === 0 ? '0' : '-12rem'}"
>
  <button
    on:click={handleClick}
    class="w-full text-left focus:outline-none 
           focus-visible:ring-2 focus-visible:ring-primary"
  >
    <div 
      class="group relative rounded-xl border bg-card overflow-hidden 
             shadow-lg hover:shadow-xl transition-all duration-300"
      class:scale-102={isActive}
    >
      <!-- Image -->
      <div class="aspect-[21/9] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          class="w-full h-full object-cover transition-transform duration-300
                 group-hover:scale-105"
        />
      </div>
      
      <CardContent {product} {index} onClick={handleClick} />
    </div>
  </button>
</div>

{#if showModal}
  <ProductModal 
    {product} 
    onClose={() => showModal = false} 
  />
{/if}

<style>
  .scale-102 {
    transform: scale(1.02);
  }
  
  .transform-inactive {
    transform: translateY(-1.5rem) scale(0.95);
    opacity: 0.75;
  }
  
  .transform-deeper {
    transform: translateY(-3rem) scale(0.9);
    opacity: 0.5;
  }
</style>