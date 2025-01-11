<!-- src/lib/pages/space/components/products/ProductModal.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { ExternalLink, X, ChevronUp } from 'lucide-svelte';
  import type { Product } from '../../types';
  
  export let product: Product;
  export let onClose: () => void;

  let isInfoExpanded = false;
  let drawerHeight: number;
  let touchStart = 0;
  let startHeight = 0;

  // Handle ESC key
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  function toggleInfo() {
    isInfoExpanded = !isInfoExpanded;
  }

  // Touch handlers for smooth drawer interaction
  function handleTouchStart(e: TouchEvent) {
    touchStart = e.touches[0].clientY;
    startHeight = drawerHeight;
  }

  function handleTouchMove(e: TouchEvent) {
    const deltaY = e.touches[0].clientY - touchStart;
    drawerHeight = Math.max(80, Math.min(startHeight - deltaY, window.innerHeight * 0.8));
  }

  function handleTouchEnd() {
    const threshold = window.innerHeight * 0.4;
    isInfoExpanded = drawerHeight > threshold;
  }
</script>

<div 
  class="fixed inset-0 z-50 flex items-start justify-center"
  transition:fade={{ duration: 200 }}
>
  <!-- Backdrop -->
  <div 
    class="absolute inset-0 bg-black/50 backdrop-blur-sm"
    on:click={onClose}
  />
  
  <div class="relative w-full h-full p-8">
    <!-- Close Button -->
    <button
      on:click={onClose}
      class="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-lg
             bg-muted/50 hover:bg-muted text-sm
             transition-colors duration-200 z-10"
    >
      <X class="w-4 h-4" />
      <span>ESC</span>
    </button>
    
    <!-- Modal -->
    <div 
      class="relative w-full h-full max-w-7xl mx-auto bg-card rounded-xl shadow-xl
             overflow-hidden mt-8"
      transition:scale={{ duration: 300, easing: quintOut }}
    >    
      <!-- Desktop Layout -->
      <div class="hidden lg:grid lg:grid-cols-[1.5fr,1fr] h-full">
        <!-- Left: Website Preview -->
        <div class="relative h-full bg-black/20">
          <iframe 
            src={product.link}
            title={`${product.title} preview`}
            class="w-full h-full"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        <!-- Right: Content -->
        <div class="p-8 overflow-y-auto">
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
          
          <div class="prose prose-lg dark:prose-invert max-w-none mb-8">
            {#each product.longDescription.split('\n\n') as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>
          
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

      <!-- Mobile Layout -->
      <div class="lg:hidden h-full">
        <!-- Website Preview -->
        <div class="h-[calc(100%-6rem)] bg-black/20">
          <iframe 
            src={product.link}
            title={`${product.title} preview`}
            class="w-full h-full"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        <!-- Mobile Info Drawer -->
        <div 
          class="fixed bottom-0 left-0 right-0 bg-card rounded-t-xl shadow-xl
                 transition-all duration-300 ease-out"
          class:h-[80vh]={isInfoExpanded}
          class:h-24={!isInfoExpanded}
          bind:clientHeight={drawerHeight}
          on:touchstart={handleTouchStart}
          on:touchmove={handleTouchMove}
          on:touchend={handleTouchEnd}
        >
          <!-- Drawer Handle -->
            <button
              class="w-full p-4 flex items-center justify-between border-b"
              on:click={toggleInfo}
            >
              <div class="flex items-center gap-3">
                <svelte:component 
                  this={product.icon} 
                  class="w-5 h-5 text-primary" 
                />
                <span class="font-medium">{product.title}</span>
                <span class="text-sm text-muted-foreground">{product.status}</span>
              </div>
              <ChevronUp 
                class={`w-5 h-5 transition-transform duration-300 ${!isInfoExpanded ? 'rotate-180' : ''}`}
              />
            </button>


          <!-- Scrollable Content -->
          <div class="overflow-y-auto h-[calc(100%-6rem)] p-6 pb-24">
            <div class="prose prose-sm dark:prose-invert max-w-none mb-6">
              {#each product.longDescription.split('\n\n') as paragraph}
                <p>{paragraph}</p>
              {/each}
            </div>
            
            <div class="space-y-3">
              <h3 class="text-base font-medium">Built with:</h3>
              <div class="flex flex-wrap gap-2">
                {#each product.tech as tech}
                  <span class="px-2.5 py-0.5 rounded-full text-sm
                             bg-primary/10 text-primary">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
          </div>

          <!-- Fixed Bottom Button -->
          <div class="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card via-card to-transparent">
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full flex items-center justify-center gap-2 px-6 py-3
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
    </div>
  </div>
</div>

<style>
  /* Hide iframe scrollbar but keep functionality */
  iframe {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  iframe::-webkit-scrollbar {
    display: none;
  }
</style>