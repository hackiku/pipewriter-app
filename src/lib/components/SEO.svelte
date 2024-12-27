<!-- $lib/components/SEO.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { getSEOData } from '$lib/utils/seo';
  import type { SEOData } from '$lib/data/seo/types';

  // Allow override of any SEO field via props
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let type: SEOData['type'] | undefined = undefined;
  export let image: string | undefined = undefined;

  // Get data based on current route
  $: seoData = getSEOData($page.url.pathname, $page.data);
  
  // Props override default/page-specific data
  $: finalSEO = {
    ...seoData,
    ...(title && { title }),
    ...(description && { description }),
    ...(type && { type }),
    ...(image && { image })
  };
</script>

<svelte:head>
  <!-- Basic Meta -->
  <title>{finalSEO.title}</title>
  <meta name="description" content={finalSEO.description} />
  <link rel="canonical" href={`https://pipewriter.io${$page.url.pathname}`} />

  <!-- Open Graph -->
  <meta property="og:title" content={finalSEO.title} />
  <meta property="og:description" content={finalSEO.description} />
  <meta property="og:type" content={finalSEO.type} />
  <meta property="og:url" content={`https://pipewriter.io${$page.url.pathname}`} />
  {#if finalSEO.image}
    <meta property="og:image" content={finalSEO.image} />
  {/if}

  <!-- Additional meta based on page type -->
  {#if finalSEO.type === 'article'}
    {#if finalSEO.datePublished}
      <meta property="article:published_time" content={finalSEO.datePublished} />
    {/if}
    {#if finalSEO.dateModified}
      <meta property="article:modified_time" content={finalSEO.dateModified} />
    {/if}
    {#if finalSEO.author}
      <meta property="article:author" content={finalSEO.author} />
    {/if}
  {/if}

  <!-- JSON-LD Structured Data -->
  {#if finalSEO.structuredData}
    <script type="application/ld+json">
      {JSON.stringify(finalSEO.structuredData)}
    </script>
  {/if}

  <!-- No index if specified -->
  {#if finalSEO.noIndex}
    <meta name="robots" content="noindex" />
  {/if}
</svelte:head>