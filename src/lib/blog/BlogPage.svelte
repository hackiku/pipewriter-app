<!-- // src/lib/blog/BlogPage.svelte -->
<script lang="ts">
  import { Stars } from "lucide-svelte";
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import ArticleCard from "./components/ArticleCard.svelte";
  
  export let posts: Array<any>;
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
        <div class="col-span-12 lg:col-span-6 lg:col-start-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 
                      rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
            <Stars class="w-4 h-4" />
            <span class="text-sm font-medium">Writer's Blog</span>
          </div>

          <h1 class="text-5xl sm:text-5xl md:text-7xl font-regular leading-tight mb-6">
            Writing for the Future
          </h1>

          <p class="text-2xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Exploring the intersection of writing, technology, and product development.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Articles Grid -->
  <section class="container py-24">
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each posts as post}
        <ArticleCard {...post} />
      {/each}
    </div>
  </section>
</main>