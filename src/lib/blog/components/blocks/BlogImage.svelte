<!-- lib/blog/components/blocks/BlogImage.svelte -->
<script lang="ts">
  import { cn } from '$lib/utils';
  import { page } from '$app/stores';
  import { dev } from '$app/environment';

  export let src: string;
  export let alt: string = "";
  export let caption: string = "";
  export let className: string = "";
  
  // Get the current post slug
  $: slug = $page.params.slug;
  
  // In dev, use Vite's dev server. In prod, use the server endpoint
  $: resolvedSrc = src.startsWith('http') 
    ? src 
    : dev 
      ? `/src/lib/blog/content/${slug}/${src}`
      : `/blog/${slug}/${src}`;
</script>

<figure class="not-prose my-8">
  <div class={cn(
    "overflow-hidden rounded-lg bg-muted", 
    "border shadow-sm",
    className
  )}>
    <img
      {alt}
      src={resolvedSrc}
      class="w-full h-auto object-cover"
      loading="lazy"
      on:error={(e) => {
        console.error(`Failed to load image: ${resolvedSrc}`);
        console.error(`Original src: ${src}`);
        console.error(`Slug: ${slug}`);
      }}
    />
  </div>
  {#if caption}
    <figcaption class="mt-2 text-sm text-center text-muted-foreground">
      {caption}
    </figcaption>
  {/if}
</figure>