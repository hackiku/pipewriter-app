<!-- $lib/(space)/content/products/MasonryPortfolio.svelte -->

<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import { products } from '../../data/products';
  import { projects } from '../../data/projects';
  import { fade } from 'svelte/transition';
  
  // Combine featured products and projects into a single array
  const featuredItems = [
    {
      ...products.find(p => p.title === 'SpaceFOMO'),
      type: 'featured',
      span: 'col-span-2 row-span-2'
    },
    {
      ...products.find(p => p.title === '6Pack'),
      type: 'featured',
      span: 'col-span-2 row-span-2'
    },
    ...projects.map(project => ({
      ...project,
      type: 'project',
      span: 'col-span-1 row-span-1'
    }))
  ];

  let selectedProduct: any = null;
</script>

<div class="container mx-auto px-4 py-12">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each featuredItems as item}
      <div 
        class="group relative overflow-hidden rounded-xl bg-card border 
               transition-all duration-300 hover:shadow-lg {item.span}"
      >
        {#if item.type === 'featured'}
          <!-- Featured Product Card -->
          <div class="relative h-full">
            <div class="aspect-video w-full">
              <img 
                src={item.image}
                alt={item.title}
                class="w-full h-full object-cover transition-transform duration-300
                       group-hover:scale-105"
              />
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t 
                         from-black/60 via-black/30 to-transparent" />
            </div>
            
            <!-- Content -->
            <div class="absolute inset-x-0 bottom-0 p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-2xl font-semibold text-white mb-2">{item.title}</h3>
                  <p class="text-white/80">{item.description}</p>
                </div>
                <div class="shrink-0 ml-4">
                  <svelte:component 
                    this={item.icon} 
                    class="w-6 h-6 text-primary" 
                  />
                </div>
              </div>
              
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mt-4">
                {#each item.tech as tech}
                  <span class="px-2 py-1 text-xs rounded-full
                             bg-primary/20 text-primary">
                    {tech}
                  </span>
                {/each}
              </div>
              
              <!-- Visit Link -->
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 mt-4 text-white/90
                       hover:text-white transition-colors"
              >
                <span>Visit Site</span>
                <ExternalLink class="w-4 h-4" />
              </a>
            </div>
          </div>
        {:else}
          <!-- Regular Project Card -->
          <div class="aspect-video relative">
            <img 
              src={item.image}
              alt={item.title}
              class="w-full h-full object-cover transition-transform duration-300
                     group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 p-4">
              <h3 class="text-lg font-medium text-white">{item.title}</h3>
              <p class="text-sm text-white/80">{item.description}</p>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>