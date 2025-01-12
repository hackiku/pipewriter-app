<!-- src/lib/blog/components/BlogPost.svelte -->
<script lang="ts">
  import { Stars } from "lucide-svelte";
  import EmailOptin from "./cta/EmailOptin.svelte";
  import TableOfContents from "./blocks/TableOfContents.svelte";
  
  export let post;
</script>

<main class="bg-background text-foreground">
  <article class="container max-w-4xl mx-auto py-24 px-4">
    <!-- Header section stays the same -->
    <header class="space-y-8 mb-16">
      <div class="space-y-2">
        {#if post.category}
          <div class="inline-flex items-center gap-1.5 px-3 py-1 
                      rounded-full bg-primary/10 text-primary border border-primary/20">
            <Stars class="w-4 h-4" />
            <span class="text-sm font-medium">{post.category}</span>
          </div>
        {/if}

        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          {#if post.date}
            <span>{post.date}</span>
          {/if}
          {#if post.readingTime}
            <span>·</span>
            <span>{post.readingTime}</span>
          {/if}
        </div>

        <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
          {post.title}
        </h1>

        {#if post.excerpt}
          <p class="text-xl text-muted-foreground">
            {post.excerpt}
          </p>
        {/if}
      </div>
    </header>

    <!-- Content section with minimal prose styling -->
    <div class="prose dark:prose-invert prose-zinc max-w-none">
      <svelte:component this={post.content} />
    </div>

    <EmailOptin />
  </article>
</main>

<style>
  :global(.prose) {
    line-height: 1.75;
  }
  
  :global(.prose h1, .prose h2, .prose h3, .prose h4) {
    margin-top: 2em;
    margin-bottom: 1em;
    font-weight: 600;
  }
  
  :global(.prose p) {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
  
  :global(.prose pre) {
    background-color: hsl(var(--muted));
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
  }
  
  :global(.prose code) {
    color: hsl(var(--primary));
    background-color: hsl(var(--muted));
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
  }
  
  :global(.dark .prose code) {
    background-color: hsl(var(--muted));
  }
</style>