<!-- src/lib/blog/BlogPage.svelte -->
<script lang="ts">
  import { Stars } from "lucide-svelte";
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import ArticleCard from "./components/blocks/ArticleCard.svelte";
  import EmailOptin from "./components/cta/EmailOptin.svelte";
  import type { BlogPost } from './types';
  
  export let posts: BlogPost[];

  // Get featured post (most recent)
  $: featuredPost = posts[0];
  $: regularPosts = posts.slice(1);
</script>

<main class="bg-zinc-300/40 dark:bg-zinc-950 text-foreground relative overflow-x-hidden">
  <!-- Background Pattern -->
  <div class="fixed inset-0 pointer-events-none">
    <BackgroundPattern size="sm" opacity="high" gradient={true} />
  </div>

  <!-- Hero Section -->
  <section class="relative min-h-[80vh] flex items-start pt-28 md:pt-32 overflow-hidden">
    <div class="container relative z-10">
      <div class="grid grid-cols-12 gap-8">
        <!-- Blog Intro -->
        <div class="col-span-12 lg:col-span-6 lg:col-start-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 
                      rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
            <Stars class="w-4 h-4" />
            <span class="text-sm font-medium">Writer's Blog</span>
          </div>

          <h1 class="text-5xl sm:text-5xl md:text-7xl font-regular leading-tight mb-6">
            Writing on Writing
          </h1>
          <h1 class="pl-12 text-4xl sm:text-5xl md:text-6xl font-regular leading-tight mb-6 opacity-30">
            on Writing on Writing
          </h1>

          <p class="text-2xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Exploring the intersection of writing, technology, and product development.
          </p>
        </div>

        <!-- Featured Post -->
        {#if featuredPost}
          <div class="col-span-12 lg:col-span-4 lg:col-start-8 relative">
            <!-- Decorative turtles -->
            <div class="absolute -top-24 -left-24 w-48 h-48 opacity-20 pointer-events-none">
              <svg viewBox="0 0 100 100" class="w-full h-full rotate-180">
                <path 
                  d="M50 90 C70 90, 90 70, 90 50 C90 30, 70 10, 50 10 C30 10, 10 30, 10 50 C10 70, 30 90, 50 90" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="1"
                />
              </svg>
            </div>
            
            <ArticleCard post={featuredPost} />
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Articles Grid -->
  <section class="container py-24">
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each regularPosts as post}
        <ArticleCard post={post} />
      {/each}
    </div>
  </section>
  
  <section class="container pb-24">
    <EmailOptin />
  </section>
</main>