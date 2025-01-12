<!-- lib/blog/components/ui/ArticleCard.svelte -->
<script lang="ts">
  import { ArrowRight, User } from "lucide-svelte";
  import type { BlogPost } from '../../types';

  export let post: BlogPost;

  // Format date to "12 Jan"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  };
</script>

<style>
  @keyframes wiggle {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(3px); }
    75% { transform: translateX(-2px); }
  }
  
  .wiggle-on-hover:hover {
    animation: wiggle 0.5s ease-in-out;
  }
</style>

{#if post}
  <a 
    href="/blog/{post.slug}" 
    class="group relative block overflow-hidden rounded-xl border bg-card p-6
           -rotate-[0.5deg] odd:rotate-[0.5deg] transition-all duration-300 
           hover:shadow-xl hover:shadow-primary/10"
  >
    <div class="relative space-y-6">
      <!-- Top Row: Category and Meta with space-between -->
      <div class="flex items-center justify-between">
        {#if post.category}
          <span class="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary border border-primary/20">
            {post.category}
          </span>
        {/if}
        
        <!-- Date -->
        <div class="text-sm text-muted-foreground">
          {formatDate(post.date)}
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-3xl font-regular leading-tight group-hover:text-primary transition-colors">
        {post.title}
      </h3>

      <!-- Excerpt -->
      {#if post.excerpt}
        <div class="space-y-4">
          <p class="text-muted-foreground text-lg leading-relaxed">
            {post.excerpt}
          </p>
          
          <div class="flex items-center justify-between">
            {#if post.author}
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full border border-border/50 flex items-center justify-center">
                  <User class="w-4 h-4 text-muted-foreground/50" />
                </div>
                <span class="text-sm text-muted-foreground">{post.author.name}</span>
              </div>
            {/if}
            {#if post.readingTime}
              <span class="text-sm text-muted-foreground">{post.readingTime}</span>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </a>
{/if}