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
  $: isNext = index === $spaceStore.activeProductIndex + 1;
  $: isPrev = index < $spaceStore.activeProductIndex;
  
  function handleClick() {
    if (!isActive && !isPrev) {
      spaceStore.setActiveProduct(index);
    } else if (isActive) {
      showModal = true;
    }
  }

  function handleContentClick() {
    if (isActive) {
      showModal = true;
    }
  }
</script>

<div 
  class="relative transition-all duration-500 ease-out cursor-pointer"
  class:transform-small={isPrev}
  class:transform-medium={isNext}
  style="z-index: {50 - Math.abs(index - $spaceStore.activeProductIndex)}; 
         margin-top: {index === 0 ? '0' : '-12rem'}"
  on:click={handleClick}
>
  <div 
    class="group relative rounded-xl border overflow-hidden shadow-lg
           {isActive ? 'bg-card' : 'bg-card/80'}
           hover:shadow-xl transition-all duration-300
           {isActive ? 'scale-100' : 'hover:scale-[1.02]'}"
  >
    <!-- Laptop Aspect Ratio Container -->
    <div class="aspect-[16/10] w-full relative overflow-hidden">
      <img 
        src={product.image} 
        alt={product.title}
        class="absolute inset-0 w-full h-full object-cover 
               transition-transform duration-300
               group-hover:scale-105"
      />
      <CardContent {product} {index} onClick={handleContentClick} />
    </div>
  </div>
</div>

{#if showModal}
  <ProductModal 
    {product} 
    onClose={() => showModal = false} 
  />
{/if}

<style>
  .transform-small {
    transform: translateY(-2rem) scale(0.85);
    opacity: 0.5;
  }
  
  .transform-medium {
    transform: translateY(-1rem) scale(0.92);
    opacity: 0.7;
  }
</style>