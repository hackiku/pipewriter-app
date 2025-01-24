<!-- $lib/(space)/content/products/ProductCard.svelte -->
<script lang="ts">
  import type { Product } from '../../types';
  import { createEventDispatcher } from 'svelte';
  import CardContent from './CardContent.svelte';
  
  export let product: Product;
  export let index: number;
  
  let showModal = false;
  let isHovered = false;
  
  const dispatch = createEventDispatcher();
</script>

<div 
  class="group relative"
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
>
  <!-- Glow Effect -->
  <div class="absolute -inset-[2px] bg-gradient-to-r from-indigo-500/50 to-purple-500/50 
              rounded-xl opacity-0 group-hover:opacity-100 blur-lg
              transition-all duration-500" />
              
  <!-- Card -->
  <div class="relative rounded-xl overflow-hidden border bg-card">
    <!-- Image Container -->
    <div class="aspect-video relative">
      <img 
        src={product.image} 
        alt={product.title}
        class="w-full h-full object-cover transition-transform duration-500
               group-hover:scale-105"
      />
      
      <CardContent 
        {product} 
        {index}
        {showModal}
        on:openModal={() => showModal = true}
      />
    </div>
  </div>
</div>