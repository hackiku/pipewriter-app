<!-- src/lib/pages/space/components/products/ProductCard.svelte -->
<script lang="ts">
  import type { Product } from '../../types';
  import { ExternalLink } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { slide } from 'svelte/transition';
  import { spaceStore } from '../../stores/spaceStore';
  
  export let product: Product;
  export let index: number;
  
  $: isActive = $spaceStore.activeProductIndex === index;
  $: isInactive = $spaceStore.activeProductIndex !== null && !isActive;
  $: wasActive = $spaceStore.previousProductIndex === index;
  
  function handleClick() {
    spaceStore.setActiveProduct(isActive ? null : index);
  }
</script>

<div 
  class="relative {isInactive ? '-translate-y-12 opacity-50 scale-[0.98]' : ''} 
         {wasActive ? 'transition-transform duration-500' : 'transition-all duration-300'}"
  style="z-index: {isActive ? 50 : 10 - index}; 
         margin-top: {index === 0 ? '0' : '-6rem'}"
>
  <button
    on:click={handleClick}
    class="w-full text-left focus:outline-none focus-visible:ring-2 
           focus-visible:ring-primary rounded-xl"
  >
    <div 
      class="group relative rounded-xl border bg-card overflow-hidden shadow-lg
             hover:shadow-xl transition-all duration-300
             {isActive ? 'scale-102 shadow-xl translate-y-3' : ''}"
    >
      <!-- Image Container -->
      <div class="aspect-[21/9] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          class="w-full h-full object-cover transition-transform duration-300
                 group-hover:scale-105"
        />
      </div>
      
      <!-- Content -->
      <div class="p-8">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div class="w-12 h-12 rounded-lg bg-primary/10 
                     flex items-center justify-center shrink-0">
            <svelte:component 
              this={product.icon} 
              class="w-6 h-6 text-primary" 
            />
          </div>
          
          <span class="inline-block px-2 py-1 text-xs rounded-full 
                     bg-muted text-muted-foreground">
            {product.status}
          </span>
        </div>
        
        <h3 class="text-2xl font-semibold mb-3">{product.title}</h3>
        <p class="text-muted-foreground text-lg mb-6">{product.description}</p>
        
        {#if isActive}
          <div transition:slide>
            <div class="pt-6 border-t">
              <Button 
                href={product.link}
                variant="default"
                class="w-full group/button"
              >
                <span class="inline-flex items-center gap-2">
                  Visit {product.status === "Early Alpha" ? "Project" : "Coming Soon"}
                  <ExternalLink 
                    class="w-4 h-4 transition-transform duration-200
                           group-hover/button:translate-x-1" 
                  />
                </span>
              </Button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </button>
</div>

<style>
  .scale-102 {
    transform: scale(1.02);
  }
</style>