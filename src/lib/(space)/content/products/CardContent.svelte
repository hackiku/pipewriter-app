<!-- src/lib/pages/space/components/products/CardContent.svelte -->
<script lang="ts">
  import type { Product } from '../../types';
  import { Plus, ExternalLink } from "lucide-svelte";
  import { spaceStore } from '../../stores/spaceStore';
  import { createEventDispatcher } from 'svelte';
  
  export let product: Product;
  export let index: number;
  export let showModal: boolean;
  
  const dispatch = createEventDispatcher();
  
  $: isActive = $spaceStore.activeProductIndex === index;

  // Split title and description for styling
  const [title, ...descParts] = product.description.split(':');
  const description = descParts.join(':').trim();

  function handlePlusClick(e: MouseEvent) {
    e.stopPropagation();
    dispatch('openModal');
  }

  function handleLinkClick(e: MouseEvent) {
    e.stopPropagation();
  }
</script>

<div class="absolute inset-0">
  <!-- Gradient Overlay - Bottom 40% with higher start -->
  <div 
    class="absolute inset-x-0 bottom-0 h-2/5
           bg-gradient-to-t from-card via-card/95 to-transparent
           pointer-events-none"
  />
  
  <!-- Pulsating Plus Button - Only on active card -->
  {#if isActive && !showModal}
    <div class="absolute inset-0 flex items-center justify-center">
      <button
        on:click={handlePlusClick}
        class="group relative w-16 h-16 rounded-full 
               bg-primary/5 hover:bg-primary/10
               transition-all duration-300"
      >
        <div class="absolute inset-0 rounded-full
                    bg-gradient-to-r from-indigo-600/20 to-purple-600/20
                    animate-[pulse_3s_ease-in-out_infinite]" 
        />
        <Plus class="w-8 h-8 text-primary absolute 
                    left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    transition-all duration-300
                    animate-[fade_3s_ease-in-out_infinite]
                    group-hover:scale-110" 
        />
      </button>
    </div>
  {/if}
  
  <!-- Content Container -->
  <div class="absolute bottom-0 left-0 right-0 p-6">
    <div class="flex justify-between items-start">
      <!-- Title & Description -->
      <div class="flex-1">
        <h3 class="text-2xl">
          <span class="font-semibold text-primary">{product.title}</span>
          <span class="text-muted-foreground ml-2">
            {description}
          </span>
        </h3>
      </div>

      <!-- Status Badge -->
      <span class="shrink-0 px-2 py-1 text-xs rounded-full 
                   bg-muted text-muted-foreground ml-4">
        {product.status}
      </span>
    </div>

    <!-- Tech Stack & Visit Link -->
    <div class="flex justify-between items-center mt-4">
      <!-- Tech Stack -->
      <div class="flex gap-1.5">
        {#each product.tech.slice(0, 4) as tech}
          <div class="w-6 h-6 rounded-full bg-primary/10 
                      flex items-center justify-center
                      group hover:bg-primary/20 transition-colors">
            <span class="text-[10px] text-primary">{tech[0]}</span>
          </div>
        {/each}
      </div>

      <!-- Visit Link -->
      {#if isActive}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          on:click={handleLinkClick}
          class="flex items-center gap-1.5 text-primary hover:text-primary/80
                 transition-colors duration-300 text-sm"
        >
          Visit Site
          <ExternalLink class="w-4 h-4" />
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  @keyframes fade {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.1; }
    50% { transform: scale(1.1); opacity: 0.3; }
  }
</style>