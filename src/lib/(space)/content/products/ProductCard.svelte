<!-- src/lib/(space)/content/products/ProductCard.svelte -->
<script lang="ts">
  import type { Product } from '../../types';
  import { createEventDispatcher } from 'svelte';
  import CardContent from './CardContent.svelte';
  
  export let product: Product;
  export let index: number;
  export let class_ = '';
  
  let showModal = false;
  let isHovered = false;
  
  const dispatch = createEventDispatcher();

  function handleInteraction() {
    dispatch('openModal');
  }
</script>

<button 
  class="group relative block w-full h-full text-left {class_}"
  on:click={handleInteraction}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  aria-label="Open {product.title} details"
>
  <!-- Glow Effect -->
  <div 
    class="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/50 to-purple-500/50 
           rounded-2xl opacity-0 group-hover:opacity-100 blur-lg
           transition-all duration-500" 
    aria-hidden="true"
  />
              
  <!-- Card -->
  <div class="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 h-full">
    <!-- Image Container -->
    <div class="relative h-full">
      <img 
        src={product.image} 
        alt=""
        aria-hidden="true"
        class="w-full h-full object-cover transition-transform duration-500
               group-hover:scale-105"
      />
      
      <!-- Status Badge -->
      <div 
        class="absolute top-3 right-3 px-2 py-1 text-xs 
               rounded-full bg-white/10 backdrop-blur-sm"
        aria-hidden="true"
      >
        {product.status}
      </div>
      
      <CardContent 
        {product} 
        {index}
        {showModal}
        on:openModal={handleInteraction}
      />
    </div>
  </div>
</button>