<!-- $lib/(space)/content/products/CardContent.svelte -->
<script lang="ts">
  import type { Product } from '../../types';
  import { ExternalLink } from "lucide-svelte";
  import { createEventDispatcher } from 'svelte';
  import { spaceStore } from '../../stores/spaceStore';
  import TechBadge from './TechBadge.svelte';
  
  export let product: Product;
  export let index: number;
  export let showModal = false;
  
  const dispatch = createEventDispatcher();

  $: isActive = $spaceStore.activeProductIndex === index;
  
  function handleClick() {
    spaceStore.setActiveProduct(index);
  }
  
  function openModal() {
    dispatch('openModal');
  }
</script>

<div class="absolute inset-0 flex flex-col justify-end">
  <!-- Base Gradient -->
  <div class="absolute inset-0 bg-gradient-to-t 
              from-black/80 via-black/40 to-transparent" />
  
  <!-- Content Drawer -->
  <div class="relative transition-all duration-300"
       on:click={handleClick}>
    <!-- Always Visible Header -->
    <div class="flex items-center justify-between p-4 group-hover:border-t 
                group-hover:border-primary/20 transition-all duration-300">
      <div class="flex items-center gap-3">
        <h3 class="text-lg font-medium text-white">{product.title}</h3>
        <span class="text-sm text-white/60">{product.status}</span>
      </div>
      
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 text-sm text-white/80
               hover:text-white transition-colors group"
      >
        Visit
        <ExternalLink class="w-4 h-4 transition-transform 
                          group-hover:translate-x-0.5" />
      </a>
    </div>

    <!-- Expandable Content -->
    <div class="max-h-0 overflow-hidden transition-all duration-300
                group-hover:max-h-48 bg-black/60">
      <div class="p-4 space-y-4">
        <!-- Description -->
        <p class="text-sm text-white/80">{product.description}</p>

        <!-- Tech Stack -->
        <div class="flex flex-wrap gap-2">
          {#each product.tech.slice(0, 4) as tech}
            <TechBadge 
              icon={`/icons/tech/${tech.toLowerCase()}.svg`}
              name={tech}
              size="sm"
            />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>