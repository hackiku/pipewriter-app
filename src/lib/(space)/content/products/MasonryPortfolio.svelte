<!-- src/lib/(space)/content/products/MasonryPortfolio.svelte -->
<script lang="ts">
  import { products } from '../../data/products';
  import { projects } from '../../data/projects';
  import ProductCard from './ProductCard.svelte';
  import ProjectCard from './ProjectCard.svelte';
</script>

<div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Product 0 (SpaceFOMO): Always first, spans cols on md+ -->
  <div class="col-span-1 md:col-span-2">
    <ProductCard 
      product={products[0]}
      index={0}
      class="aspect-video"
    />
  </div>

  <!-- Product 1 (6Pack): Mobile layout, always second -->
  <div class="col-span-1 md:row-span-2 lg:row-span-3">
    <ProductCard 
      product={products[1]}
      index={1}
      isMobileAsset
      class="h-[32rem] md:h-full" 
    />
  </div>

  <!-- Project (HandyFly) -->
  <div class="hidden md:block">
    <ProjectCard 
      project={projects[0]}
      index={0}
      class="aspect-[4/3] mb-4"
    />
  </div>

  <!-- Product 2 (JZRO) -->
  <div class="hidden md:block">
    <ProductCard 
      product={products[2]}
      index={2}
      class="aspect-[4/3]"
    />
  </div>
</div>