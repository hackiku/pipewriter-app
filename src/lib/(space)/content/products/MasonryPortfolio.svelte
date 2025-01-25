<!-- src/lib/(space)/content/products/MasonryPortfolio.svelte -->
<script lang="ts">
  import { products } from '../../data/products';
  import { projects } from '../../data/projects';
  import ProductCard from './ProductCard.svelte';
  import ProjectCard from './ProjectCard.svelte';
  
  // Predefined aspect ratio classes
  const aspectRatios = {
    productLg: "aspect-[16/9]", // 16:9 for large product cards
    productSm: "aspect-[4/3]",  // 4:3 for mobile product cards
    project: "aspect-[3/2]"     // 3:2 for project cards
  };

  // Get specific products by ID
  const spaceFOMO = products.find(p => p.id === 'spacefomo');
  const sixPack = products.find(p => p.id === '6pack');
  const jzro = products.find(p => p.id === 'jzro');
  const handyFly = projects.find(p => p.id === 'handyfly');
</script>

<div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-min">
  <!-- SpaceFOMO - Large Card -->
  {#if spaceFOMO}
    <div class="md:col-span-2 lg:row-span-2">
      <ProductCard 
        product={spaceFOMO} 
        aspectRatio={aspectRatios.productLg}
        index={0} 
      />
    </div>
  {/if}

  <!-- JZRO -->
  {#if jzro}
    <div class="col-span-1">
      <ProductCard 
        product={jzro} 
        aspectRatio={aspectRatios.project}
        index={1} 
      />
    </div>
  {/if}

  <!-- HandyFly -->
  {#if handyFly}
    <div class="col-span-1">
      <ProjectCard 
        project={handyFly}
        aspectRatio={aspectRatios.project}
        index={0} 
      />
    </div>
  {/if}

  <!-- 6Pack - Large Mobile View -->
  {#if sixPack}
    <div class="lg:col-span-2 lg:row-span-2">
      <ProductCard 
        product={sixPack} 
        aspectRatio={aspectRatios.productLg}
        index={2} 
      />
    </div>
  {/if}
</div>