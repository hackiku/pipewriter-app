<!-- src/lib/pages/space/components/products/StackedCards.svelte -->
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
  $: distanceFromActive = index - $spaceStore.activeProductIndex;
  
  // Determine if there are cards between this one and the active card
  $: hasCardsBetween = Math.abs(distanceFromActive) > 1;
  
  // Calculate scale based on relative position to active card
  $: scale = (() => {
    const baseScale = 1;        // Active card
    const mediumScale = 0.92;   // Adjacent cards
    const smallScale = 0.85;    // Cards with something between them and active
    
    if (isActive) return baseScale;
    if (hasCardsBetween) return smallScale;
    return mediumScale;
  })();
  
  // Z-index: stack from active outward
  $: zIndex = 30 - (Math.abs(distanceFromActive) * 10);
  
  // Y offset increases with distance from active
  $: translateY = (() => {
    if (isActive) return 0;
    const baseOffset = -2;
    return baseOffset * Math.abs(distanceFromActive);
  })();
  
  function handleClick() {
    spaceStore.setActiveProduct(index);
  }
</script>

<div 
  class="relative transition-all duration-500 ease-out cursor-pointer"
  style="z-index: {zIndex}; 
         transform: translateY({translateY}rem) scale({scale})"
  on:click={handleClick}
>
  <div 
    class="group relative rounded-xl border overflow-hidden shadow-lg
           bg-card hover:shadow-xl transition-all duration-300"
  >
    <!-- Portfolio Container -->
    <div class="aspect-[16/9] relative">
      <img 
        src={product.image} 
        alt={product.title}
        class="w-full h-full object-cover 
               transition-transform duration-300
               group-hover:scale-105"
      />
      <CardContent {product} {index} 
                  {showModal} 
                  on:openModal={() => showModal = true} />
    </div>
  </div>
</div>

{#if showModal}
  <ProductModal 
    {product} 
    onClose={() => showModal = false} 
  />
{/if}