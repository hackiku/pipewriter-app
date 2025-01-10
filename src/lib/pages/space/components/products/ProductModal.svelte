<!-- src/lib/pages/space/components/products/ProductModal.svelte -->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { ExternalLink, X } from 'lucide-svelte';
  import type { Product } from '../../types';
  
  export let product: Product;
  export let onClose: () => void;
</script>

<div 
  class="fixed inset-0 z-50 flex items-center justify-center p-4"
  transition:fade={{ duration: 200 }}
>
  <!-- Backdrop -->
  <div 
    class="absolute inset-0 bg-black/50 backdrop-blur-sm"
    on:click={onClose}
  />
  
  <!-- Modal -->
  <div 
    class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto
           bg-card rounded-xl shadow-xl"
    transition:scale={{ duration: 300, easing: quintOut }}
  >
    <!-- Close Button -->
    <button
      on:click={onClose}
      class="absolute top-4 right-4 p-2 rounded-full
             bg-muted/50 hover:bg-muted
             transition-colors duration-200"
    >
      <X class="w-5 h-5" />
    </button>
    
    <!-- Content -->
    <div class="p-8">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-lg bg-primary/10 
                    flex items-center justify-center">
          <svelte:component 
            this={product.icon} 
            class="w-6 h-6 text-primary" 
          />
        </div>
        <div>
          <h2 class="text-3xl font-semibold">{product.title}</h2>
          <span class="text-sm text-muted-foreground">{product.status}</span>
        </div>
      </div>
      
      <!-- Screenshot -->
      <div class="aspect-[21/9] rounded-lg overflow-hidden mb-8">
        <img 
          src={product.image} 
          alt={product.title}
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Long Description -->
      <div class="prose prose-lg dark:prose-invert max-w-none mb-8">
        {#each product.longDescription.split('\n\n') as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
      
      <!-- Tech Stack -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Built with:</h3>
        <div class="flex flex-wrap gap-2">
          {#each product.tech as tech}
            <span class="px-3 py-1 rounded-full text-sm
                       bg-primary/10 text-primary">
              {tech}
            </span>
          {/each}
        </div>
      </div>
      
      <!-- Visit Link -->
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 mt-8 px-6 py-3
               bg-gradient-to-r from-indigo-600 to-purple-600
               text-white rounded-lg font-medium
               hover:from-indigo-500 hover:to-purple-500
               transition-all duration-300"
      >
        Visit {product.title}
        <ExternalLink class="w-5 h-5" />
      </a>
    </div>
  </div>
</div>