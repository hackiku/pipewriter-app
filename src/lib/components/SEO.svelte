<!-- // src/lib/components/SEO.svelte -->
 
<script lang="ts">
    import { page } from '$app/stores';
    import type { SEOData } from '$data/seo/types';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { generateStructuredData } from '$data/seo/utils';

    // Accept server-loaded SEO data
    $: baseSEO = $page.data.seo as SEOData;

    // Component-level overrides
    export let title: string | undefined = undefined;
    export let description: string | undefined = undefined;
    export let type: SEOData['type'] | undefined = undefined;
    export let image: string | undefined = undefined;
    export let noindex: boolean = false;
    export let structuredData: object | undefined = undefined;

    // Combine server data with overrides
    $: finalSEO = {
        ...baseSEO,
        ...(title && { title }),
        ...(description && { description }),
        ...(type && { type }),
        ...(image && { image }),
        noIndex: noindex
    };

    // Generate or use provided structured data
    $: pageStructuredData = structuredData || 
        generateStructuredData(finalSEO, $page.url.pathname);

    // Dynamic structured data injection
    onMount(() => {
        if (browser && pageStructuredData) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(pageStructuredData);
            document.head.appendChild(script);
            
            return () => {
                document.head.removeChild(script);
            };
        }
    });
</script>

<svelte:head>
    <!-- Essential Meta Tags -->
    <title>{finalSEO.title}</title>
    <meta name="description" content={finalSEO.description} />
    <link rel="canonical" href={`https://pipewriter.io${$page.url.pathname}`} />
    
    <!-- Open Graph -->
    <meta property="og:site_name" content="Pipewriter" />
    <meta property="og:title" content={finalSEO.title} />
    <meta property="og:description" content={finalSEO.description} />
    <meta property="og:type" content={finalSEO.type} />
    <meta property="og:url" content={`https://pipewriter.io${$page.url.pathname}`} />
    {#if finalSEO.image}
        <meta property="og:image" content={finalSEO.image} />
        <meta property="og:image:alt" content={finalSEO.title} />
    {/if}

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={finalSEO.title} />
    <meta name="twitter:description" content={finalSEO.description} />
    {#if finalSEO.image}
        <meta name="twitter:image" content={finalSEO.image} />
    {/if}

    <!-- Article Metadata -->
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
        {#if finalSEO.keywords}
            <meta name="keywords" content={finalSEO.keywords.join(', ')} />
        {/if}
    {/if}

    <!-- Indexing Control -->
    {#if finalSEO.noIndex}
        <meta name="robots" content="noindex,nofollow" />
    {:else}
        <meta name="robots" content="index,follow" />
    {/if}
</svelte:head>