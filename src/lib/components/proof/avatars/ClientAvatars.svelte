<!-- src/lib/components/proof/avatars/ClientAvatars.svelte -->
<script lang="ts">
  // Default data dictionaries
  const writerData = {
    count: 196,
    label: 'writers',
    images: [
      '/people/writers/giorgi-chkoidze.jpeg',
			'/people/writers/beatrice-bianchi.jpeg',
			'/people/writers/warren-west.jpeg',
      '/people/writers/esma-akalin.jpeg',
    ]
  };

  const clientData = {
    count: 47,
    label: 'tech clients',
    images: [
      '/people/clients/tommy-joiner.jpg',
      '/people/clients/david-thomson.jpeg',
      '/people/clients/devon-price.jpeg',
      '/people/clients/ben-carey.jpeg'
    ]
  };

  // Props with defaults for "writer" mode
  export let mode: 'writer' | 'client' = 'writer';
  export let count: number = writerData.count;
  export let label: string = writerData.label;
  export let images: string[] = writerData.images;

  // Update data based on mode if no custom props provided
  $: if (mode === 'client' && count === writerData.count) {
    count = clientData.count;
    label = clientData.label;
    images = clientData.images;
  }
</script>

<div class="flex items-center gap-3"> 
  <!-- Static Overlapping Avatars -->
  <div class="flex -space-x-2">
    {#each images.slice(0, 4) as imgSrc, i}
      <div class="relative w-6 h-6 rounded-full 
                  ring-2 ring-background overflow-hidden
                  {i === 3 ? 'z-10' : 'opacity-80'}">
        <img
          src={imgSrc}
          alt={mode === 'client' ? 'Client' : 'Writer'}
          class="w-full h-full object-cover"
        />
      </div>
    {/each}
  </div>

  <!-- Counter -->
  <p class="text-sm text-muted-foreground">
    <span class="font-medium text-foreground">{count}</span> 
    {label}
  </p>
</div>