<!-- lib/blog/components/BlogPost.svelte -->
<script lang="ts">
  import { Stars } from "lucide-svelte";
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import EmailOptin from "./cta/EmailOptin.svelte";
  import TableOfContents from "./blocks/TableOfContents.svelte";
  
  export let post;
</script>

<main class="bg-zinc-300/40 dark:bg-zinc-950 text-foreground relative overflow-x-hidden pt-12">
  <!-- Background Pattern -->
  <div class="fixed inset-0 pointer-events-none">
    <BackgroundPattern size="md" opacity="high" gradient={true} />
  </div>

  <article class="container max-w-4xl mx-auto py-24 px-4 relative z-10">
    <header class="space-y-8 mb-16">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 
                    rounded-full bg-primary/10 text-primary border border-primary/20">
          <Stars class="w-4 h-4" />
          <span class="text-sm font-medium">{post.category}</span>
        </div>

        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
          {post.title}
        </h1>

        <p class="text-xl text-muted-foreground">
          {post.excerpt}
        </p>
      </div>

      {#if post.heroImage}
        <img 
          src={post.heroImage} 
          alt={post.title}
          class="w-full aspect-video rounded-xl object-cover bg-muted"
        />
      {/if}
    </header>

    <!-- Content -->
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <svelte:component this={post.content} />
    </div>

    <EmailOptin />
  </article>
</main>