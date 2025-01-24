<!-- $lib/(space)/content/products/MasonryPortfolio.svelte -->
<script lang="ts">
  import { products } from '../../data/products';
  import { projects } from '../../data/projects';
  import ProductCard from './ProductCard.svelte';
  import ProjectCard from './ProjectCard.svelte';
  
  // Get specific products
  const spaceFOMO = products.find(p => p.title === 'SpaceFOMO');
  const sixPack = products.find(p => p.title === '6Pack');
  
  // Get first 4 projects
  const featuredProjects = projects.slice(0, 4);
</script>

<div class="container mx-auto px-4">
  <!-- Grid Container -->
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Row 1: SpaceFOMO (2) + 2 Projects -->
    <div class="lg:col-span-2 lg:row-span-2">
      {#if spaceFOMO}
        <ProductCard product={spaceFOMO} index={0} />
      {/if}
    </div>
    <div class="lg:col-span-1">
      {#if featuredProjects[0]}
        <ProjectCard project={featuredProjects[0]} index={0} />
      {/if}
    </div>
    <div class="lg:col-span-1">
      {#if featuredProjects[1]}
        <ProjectCard project={featuredProjects[1]} index={1} />
      {/if}
    </div>
    
    <!-- Row 2: 2 Projects + 6Pack (2) -->
    <div class="lg:col-span-1">
      {#if featuredProjects[2]}
        <ProjectCard project={featuredProjects[2]} index={2} />
      {/if}
    </div>
    <div class="lg:col-span-1">
      {#if featuredProjects[3]}
        <ProjectCard project={featuredProjects[3]} index={3} />
      {/if}
    </div>
    <div class="lg:col-span-2 lg:row-span-2">
      {#if sixPack}
        <ProductCard product={sixPack} index={1} />
      {/if}
    </div>
  </div>
</div>