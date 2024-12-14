<!-- routes/(website)/blog/[slug]/+page.svelte -->
<script lang="ts">
  import type { BlogPost } from '$lib/pages/blog/types';
  import { onMount } from 'svelte';
  import EmailForm from "$lib/components/EmailForm.svelte";
  
  export let data;
  let blogPost: BlogPost = data.post;
  
  // Optional: Add view tracking
  onMount(() => {
    // Track pageview
  });
</script>

<svelte:head>
  <title>{blogPost.title}</title>
  <meta name="description" content={blogPost.excerpt} />
</svelte:head>

<article class="container max-w-4xl mx-auto py-24 px-4">
  <!-- Hero -->
  <header class="space-y-8 mb-16">
    <div class="space-y-2">
      <div class="flex items-center gap-3 text-sm text-muted-foreground">
        <span class="rounded-full bg-primary/10 px-3 py-1 text-primary">
          {blogPost.category}
        </span>
        <span>{blogPost.date}</span>
        <span>·</span>
        <span>{blogPost.readingTime}</span>
      </div>

      <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
        {blogPost.title}
      </h1>

      <p class="text-xl text-muted-foreground">
        {blogPost.excerpt}
      </p>
    </div>

    {#if blogPost.heroImage}
      <img 
        src={blogPost.heroImage} 
        alt={blogPost.title}
        class="w-full aspect-video rounded-xl object-cover bg-muted"
      />
    {/if}
  </header>

  <!-- Content -->
  <div class="prose prose-lg dark:prose-invert max-w-none space-y-12">
    <!-- Intro -->
    {#if blogPost.content.intro}
      <p class="lead">
        {blogPost.content.intro}
      </p>
    {/if}

    <!-- Video -->
    {#if blogPost.content.videoEmbed}
      <div class="not-prose my-12">
        {@html blogPost.content.videoEmbed}
      </div>
    {/if}

    <!-- Chapters -->
    {#each blogPost.content.chapters as chapter}
      <section>
        <h2>{chapter.title}</h2>
        <div class="mt-4">
          {@html chapter.content}
        </div>
      </section>
    {/each}

    <!-- Email Section -->
    <div class="not-prose bg-muted/50 rounded-xl p-8 my-16">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-2">{blogPost.content.emailSection.title}</h2>
        {#if blogPost.content.emailSection.subtitle}
          <p class="text-muted-foreground">{blogPost.content.emailSection.subtitle}</p>
        {/if}
      </div>
      <EmailForm size="sm" />
    </div>

    <!-- Conclusion -->
    {#if blogPost.content.conclusion}
      <div class="lead">
        {@html blogPost.content.conclusion}
      </div>
    {/if}
  </div>
</article>