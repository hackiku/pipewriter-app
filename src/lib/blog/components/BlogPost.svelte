<!-- src/lib/blog/components/BlogPost.svelte -->
<script lang="ts">
  import { Stars, Calendar, Clock } from "lucide-svelte";
  import EmailOptin from "./cta/EmailOptin.svelte";
  import TableOfContents from "./blocks/TableOfContents.svelte";
  
  export let post;

  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    });
  };
</script>

<main class="text-foreground">
  <!-- Cover-style header -->
  <header class="relative bg-gradient-to-br from-muted/20 to-muted/40 border-b">
    <!-- Background pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div class="relative container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      <div class="max-w-4xl mx-auto py-24 md:py-32 space-y-8">
        
        <!-- Breadcrumb & Meta -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          {#if post.category}
            <div class="inline-flex items-center gap-2 px-4 py-2 
                        rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
              <Stars class="w-4 h-4" />
              <span class="text-sm font-medium">{post.category}</span>
            </div>
          {/if}
          
          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            {#if post.date}
              <div class="flex items-center gap-1.5">
                <Calendar class="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
            {/if}
            {#if post.readingTime}
              <div class="flex items-center gap-1.5">
                <Clock class="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            {/if}
          </div>
        </div>

        <!-- Main title -->
        <div class="space-y-6">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            {post.title}
          </h1>

          {#if post.excerpt}
            <p class="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          {/if}
        </div>

        <!-- Author info if available -->
        {#if post.author}
          <div class="flex items-center gap-4 pt-6 border-t border-border/50">
            <div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 
                        flex items-center justify-center">
              <span class="text-primary font-medium">
                {post.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <div class="font-medium text-foreground">{post.author.name}</div>
              <div class="text-sm text-muted-foreground">Writer & Founder</div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </header>

  <!-- Main content area -->
  <article class="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mx-auto">
      
      <!-- Content with generous spacing -->
      <div class="py-16 md:py-24">
        <div class="prose prose-lg prose-zinc dark:prose-invert max-w-none
                    prose-headings:font-semibold prose-headings:tracking-tight
                    prose-p:leading-relaxed prose-p:text-lg
                    prose-li:text-lg prose-li:leading-relaxed
                    prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded
                    prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-border">
          <svelte:component this={post.content} />
        </div>
      </div>

      <!-- Separator -->
      <div class="py-8">
        <div class="flex items-center gap-4">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          <div class="text-sm text-muted-foreground font-medium">📝</div>
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>
      </div>

      <!-- Email optin with extra space -->
      <div class="pb-24">
        <EmailOptin />
      </div>
    </div>
  </article>
</main>

<style>
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgb(209 213 219 / 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(209 213 219 / 0.1) 1px, transparent 1px);
    background-size: 2rem 2rem;
  }
  
  :global(.dark) .bg-grid-pattern {
    background-image: linear-gradient(to right, rgb(82 82 91 / 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(82 82 91 / 0.1) 1px, transparent 1px);
  }
</style>