<!-- $lib/components/SEO.svelte -->
<script lang="ts">
  import { page } from '$app/stores';

  export let title = "Pipewriter — Wireframes for Writers in Google Docs";
  export let description = "Build landing pages and copy decks right in Google Docs. Made for UX writers, copywriters, and content strategists who understand that words are the heart of product development.";
  // export let image = "https://pipewriter.io/og.png"; // Replace with actual OG image URL
  export let type = "website";
  
  // Compute canonical URL
  $: canonicalUrl = `https://pipewriter.io${$page.url.pathname}`;
</script>

<svelte:head>
  <!-- Basic Meta -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonicalUrl} />
  <!-- <meta property="og:image" content={image} /> -->
  <meta property="og:site_name" content="Pipewriter" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@pipewriter" /> <!-- Replace with actual Twitter handle -->
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <!-- <meta name="twitter:image" content={image} /> -->

  <!-- Other Important Meta -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#3644FE" /> <!-- Using your brand blue -->
  
  <!-- Application-specific -->
  <meta name="application-name" content="Pipewriter" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="Pipewriter" />
</svelte:head>