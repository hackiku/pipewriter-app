<!-- src/lib/(space)/content/products/ProjectCard.svelte -->
<script lang="ts">
  import type { Project } from '../../types';
  import CardContent from './CardContent.svelte';
  
  export let project: Project;
  export let index: number;
  export let class_ = '';
  
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

  function handleInteraction() {
    showModal = true;
  }
</script>

<button 
  class="group relative block w-full h-full text-left {class_}"
  on:click={handleInteraction}
  aria-label="Open {project.title} details"
>
  <!-- Card -->
  <div class="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 h-full">
    <div class="relative h-full">
      <img 
        src={project.image} 
        alt=""
        aria-hidden="true"
        class="w-full h-full object-cover transition-transform duration-500
               group-hover:scale-105"
      />
      
      <CardContent 
        product={productData}
        {index}
        {showModal}
        on:openModal={handleInteraction}
      />
    </div>
  </div>
</button>