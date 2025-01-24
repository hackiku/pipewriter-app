<!-- $lib/(space)/content/products/ProjectCard.svelte -->
<script lang="ts">
  import type { Project } from '../../types';
  import CardContent from './CardContent.svelte';
  
  export let project: Project;
  export let index: number;
  
  let showModal = false;
  
  // Create a product-compatible object for CardContent
  $: productData = {
    title: project.title,
    description: project.description,
    link: project.link,
    tech: project.tech,
    status: project.status,
    image: project.image
  };
</script>

<div class="group relative rounded-xl overflow-hidden border bg-card 
            hover:shadow-lg transition-all duration-300">
  <div class="aspect-video relative">
    <img 
      src={project.image} 
      alt={project.title}
      class="w-full h-full object-cover transition-transform duration-300
             group-hover:scale-105"
    />
    
    <CardContent 
      product={productData}
      {showModal}
      on:openModal={() => showModal = true}
    />
  </div>
</div>