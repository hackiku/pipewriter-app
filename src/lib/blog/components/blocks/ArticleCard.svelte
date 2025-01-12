<!-- src/lib/blog/components/blocks/ArticleCard.svelte -->
<script lang="ts">
  import { ArrowRight } from "lucide-svelte";
  import type { BlogPost } from '../../types';

  export let post: BlogPost;

  $: {
    console.log('Card rendering post:', post); // Debug log
  }
</script>

{#if post}
  <a 
    href="/blog/{post.slug}" 
    class="group block rounded-xl border bg-card p-6 transition-all 
           hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
  >
    <div class="space-y-4">
      <div class="flex items-center gap-3 text-sm text-muted-foreground">
        {#if post.category}
          <span class="rounded-full bg-primary/10 px-3 py-1 text-primary">
            {post.category}
          </span>
        {/if}
        <span>{post.date}</span>
        {#if post.readingTime}
          <span>·</span>
          <span>{post.readingTime}</span>
        {/if}
      </div>

      <h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
        {post.title}
      </h3>

      {#if post.excerpt}
        <p class="text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
      {/if}

      {#if post.author}
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          {#if post.author.avatar}
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              class="w-6 h-6 rounded-full"
            />
          {/if}
          <span>{post.author.name}</span>
        </div>
      {/if}

      <div class="flex items-center text-sm font-medium text-primary">
        Read more
        <ArrowRight class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </a>
{/if}