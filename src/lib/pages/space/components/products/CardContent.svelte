<!-- src/lib/pages/space/components/products/CardContent.svelte -->
<script lang="ts">
  import type { Product } from '../../types';
  import { Plus, ExternalLink } from "lucide-svelte";
  import { spaceStore } from '../../stores/spaceStore';
  
  export let product: Product;
  export let index: number;
  export let onClick: () => void;
  
  $: isActive = $spaceStore.activeProductIndex === index;
</script>

<div class="relative w-full">
  <!-- Gradient Overlay -->
  <div 
    class="absolute inset-0 bg-gradient-to-t 
           from-card via-card/95 to-transparent
           pointer-events-none"
  />
  
  <!-- Main Content -->
  <div class="relative p-8">
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
    
    <!-- Title and Description -->
    <h3 class="text-2xl font-semibold mb-3">{product.title}</h3>
    <p class="text-muted-foreground text-lg">{product.description}</p>
    
    <!-- Action Area -->
    <div class="flex items-center justify-between mt-6 pt-6 border-t">
      <!-- Pulsating Plus Icon -->
      <button
        on:click={onClick}
        class="group relative w-12 h-12 rounded-full 
               bg-primary/5 hover:bg-primary/10
               transition-colors duration-300"
      >
        <div class="absolute inset-0 rounded-full
                    bg-gradient-to-r from-indigo-600/20 to-purple-600/20
                    animate-pulse" 
        />
        <Plus class="w-6 h-6 text-primary absolute 
                    left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    transition-transform duration-300
                    group-hover:scale-110" 
        />
      </button>
      
      <!-- Link Button -->
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-lg font-medium
               text-primary hover:text-primary/80
               transition-colors duration-300"
      >
        Visit Site
        <ExternalLink class="w-5 h-5 transition-transform duration-300
                            group-hover:translate-x-1" 
        />
      </a>
    </div>
  </div>
</div>