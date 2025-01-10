<!-- src/lib/pages/space/content/Products.svelte -->
<script lang="ts">
  import { Plane, Stars, Code, ExternalLink } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { fade, slide } from 'svelte/transition';
  import { products } from '../data/products';

  let selectedIndex: number | null = null;

  function toggleCard(index: number) {
    selectedIndex = selectedIndex === index ? null : index;
  }
</script>

<div class="container max-w-4xl mx-auto">
  <div class="relative space-y-4">
    {#each products as product, i}
      <div 
        class="relative {selectedIndex !== null && selectedIndex !== i ? '-translate-y-8 opacity-50' : ''} 
               transition-all duration-300 ease-out"
        style="z-index: {selectedIndex === i ? 20 : 10 - i}"
      >
        <button
          on:click={() => toggleCard(i)}
          class="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div 
            class="group relative rounded-xl border bg-card overflow-hidden shadow-lg
                   hover:shadow-xl transition-all duration-300
                   {selectedIndex === i ? 'scale-102 shadow-xl' : ''}"
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
              
              {#if selectedIndex === i}
                <div transition:slide>
                  <div class="pt-6 border-t">
                    <Button 
                      href={product.link}
                      variant="default"
                      class="w-full group/button"
                    >
                      <span class="inline-flex items-center gap-2">
                        View Project
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
    {/each}
  </div>
</div>

<style>
  .scale-102 {
    transform: scale(1.02);
  }
</style>