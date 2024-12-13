<!-- $lib/components/MasonryGallery.svelte -->
<script lang="ts">
  interface Image {
    src: string;
    alt: string;
  }

  export let images: Image[];
  
  // Split images into columns for masonry effect
  const columns = [
    images.filter((_, i) => i % 3 === 0),
    images.filter((_, i) => i % 3 === 1),
    images.filter((_, i) => i % 3 === 2)
  ];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each columns as column}
    <div class="flex flex-col gap-4">
      {#each column as image}
        <div class="relative rounded-lg overflow-hidden bg-muted hover:opacity-90 transition-opacity">
          <img 
            src={image.src} 
            alt={image.alt}
            class="w-full h-auto"
            loading="lazy"
          />
        </div>
      {/each}
    </div>
  {/each}
</div>