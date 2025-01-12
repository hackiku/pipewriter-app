<!-- lib/blog/components/blocks/BlogImage.svelte -->
<script lang="ts">
  import { cn } from '$lib/utils';

  export let src: string;
  export let alt: string = "";
  export let caption: string = "";
  export let className: string = "";
  
  // Handle both local and remote images
  const isRemote = src.startsWith('http');
  const localSrc = isRemote ? src : `/blog/${src}`;
</script>

<figure class="not-prose my-8">
  <div class={cn(
    "overflow-hidden rounded-lg bg-muted", 
    "border shadow-sm",
    className
  )}>
    <img
      {alt}
      src={localSrc}
      class="w-full h-auto object-cover"
      loading="lazy"
    />
  </div>
  {#if caption}
    <figcaption class="mt-2 text-sm text-center text-muted-foreground">
      {caption}
    </figcaption>
  {/if}
</figure>