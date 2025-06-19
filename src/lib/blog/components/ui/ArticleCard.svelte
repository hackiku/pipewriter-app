<!-- lib/blog/components/ui/ArticleCard.svelte -->
<script lang="ts">
  import { ArrowRight, User } from "lucide-svelte";
  import type { BlogPost } from '../../types';

  export let post: BlogPost;

  // Format date to "12 Jan 2025"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
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

  @keyframes float-up {
    0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
    50% { transform: translateY(-4px) rotate(var(--rotation)); }
  }
  
  .float-on-hover:hover {
    animation: float-up 0.6s ease-in-out;
  }
</style>

{#if post}
  <a 
    href="/blog/{post.slug}" 
    class="group relative block overflow-hidden rounded-xl border bg-card p-6
           -rotate-[0.5deg] odd:rotate-[0.5deg] transition-all duration-300 
           hover:shadow-xl hover:shadow-primary/10 float-on-hover"
    style="--rotation: {Math.random() > 0.5 ? '0.5deg' : '-0.5deg'}"
  >
    <div class="relative space-y-6">
      <!-- Top Row: Category and Meta with space-between -->
      <div class="flex items-center justify-between">
        {#if post.category}
          <span class="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary 
                       border border-primary/20 group-hover:bg-primary/20 transition-colors">
            {post.category}
          </span>
        {/if}
        
        <!-- Date with year -->
        <div class="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">
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
                <div class="w-6 h-6 rounded-full border border-border/50 flex items-center justify-center
                           group-hover:border-primary/30 transition-colors">
                  <User class="w-4 h-4 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
                </div>
                <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {post.author.name}
                </span>
              </div>
            {/if}
            {#if post.readingTime}
              <div class="flex items-center gap-1">
                <span class="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">
                  {post.readingTime}
                </span>
                <ArrowRight class="w-4 h-4 text-muted-foreground/50 group-hover:text-primary 
                                   group-hover:translate-x-1 transition-all duration-200" />
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <!-- Subtle corner accent -->
    <div class="absolute top-2 right-2 w-2 h-2 bg-primary/20 rounded-full 
                group-hover:bg-primary/40 transition-colors"></div>
  </a>
{/if}