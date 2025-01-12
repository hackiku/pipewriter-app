<!-- lib/blog/components/blocks/ArticleCard.svelte -->
<script lang="ts">
  import { ArrowRight } from "lucide-svelte";
  import type { BlogPost } from '../../types';

  export let post: BlogPost;
</script>

{#if post}
  <a 
    href="/blog/{post.slug}" 
    class="group relative block overflow-hidden rounded-xl bg-card transition-all 
           duration-300 hover:shadow-xl hover:shadow-primary/10"
  >
    <!-- Card Content -->
    <div class="relative space-y-6 p-8">
      <!-- Category & Meta -->
      <div class="flex flex-wrap items-center gap-4">
        {#if post.category}
          <span class="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            {post.category}
          </span>
        {/if}
        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{post.date}</span>
          {#if post.readingTime}
            <span>·</span>
            <span>{post.readingTime}</span>
          {/if}
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-2xl font-semibold leading-tight group-hover:text-primary transition-colors">
        {post.title}
      </h3>

      <!-- Excerpt -->
      {#if post.excerpt}
        <p class="text-muted-foreground text-lg leading-relaxed">
          {post.excerpt}
        </p>
      {/if}

      <!-- Author -->
      {#if post.author}
        <div class="flex items-center gap-3 pt-4 border-t border-border">
          {#if post.author.avatar}
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              class="w-8 h-8 rounded-full"
            />
          {/if}
          <span class="text-muted-foreground">{post.author.name}</span>
        </div>
      {/if}

      <!-- Read More -->
      <div class="flex items-center font-medium text-primary">
        Read article
        <ArrowRight class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>

    <!-- Background Gradient Effect -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 
                transition-opacity duration-300 group-hover:opacity-100" />
  </a>
{/if}