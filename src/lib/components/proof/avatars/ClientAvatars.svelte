<!-- src/lib/components/proof/ClientAvatars.svelte -->
<script lang="ts">
  const TOTAL_CLIENTS = 39;
  
  const CLIENT_IMAGES = [
    '/people/clients/tommy-joiner.jpg',
    '/people/writers/giorgi-chkoidze.jpg',
    'people/clients/david-thomson.jpeg',
    'people/clients/devon-price.jpeg',
    'people/clients/ben-carey.jpeg'
  ];
</script>

<div class="flex items-center gap-3">
  <!-- Static Overlapping Avatars -->
  <div class="flex -space-x-2">
    {#each CLIENT_IMAGES.slice(0, 4) as imgSrc, i}
      <div class="relative w-6 h-6 rounded-full 
                  ring-2 ring-background overflow-hidden
                  {i === 3 ? 'z-10' : 'opacity-80'}">
        <img
          src={imgSrc}
          alt="Client"
          class="w-full h-full object-cover"
        />
      </div>
    {/each}
  </div>

  <!-- Counter -->
  <p class="text-sm text-muted-foreground">
    <span class="font-medium text-foreground">{TOTAL_CLIENTS}+</span> 
    tech clients
  </p>
</div>