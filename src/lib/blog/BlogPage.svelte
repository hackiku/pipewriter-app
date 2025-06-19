<!-- src/lib/blog/BlogPage.svelte -->
<script lang="ts">
  import ArticleGrid from "./components/ui/ArticleGrid.svelte";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  import Title from "./components/ui/Title.svelte";
  import EmailOptin from "./components/cta/EmailOptin.svelte";
  import type { BlogPost } from './types';
  
  export let posts: BlogPost[];
  $: regularPosts = posts;

	import ViewportSize from "$lib/components/dev/ViewportSize.svelte";
</script>

<ViewportSize />

<main class="text-foreground relative overflow-x-hidden">
  <section class="relative pt-40 md:pt-32">
    <div class="relative z-10">
      <Title className="mb-6" />

      <div class="container md:px-20 lg:px-20 xl:px-44">
        <div class="space-y-6">
          <p class="text-xl md:text-2xl text-muted-foreground/80 font-normal">
            Thoughts, devlogs, and the occasional aero+space rant nobody asked for.
          </p>

          <EmailForm 
            buttonText="Subscribe"
            size="lg"
            wrap={false}
            source="Blog"
            className="max-w-lg"
          />
        </div>
      </div>

      <!-- Fun corner element - replace turtles with something writing-themed -->
      <div class="absolute -bottom-12 -right-12 md:bottom-0 md:right-12 opacity-60 pointer-events-none">
        <div class="text-6xl md:text-8xl animate-bounce" style="animation-duration: 3s;">
          ✍️
        </div>
      </div>
    </div>
  </section>

  <section class="container z-50 md:px-20 lg:px-20 xl:px-44 py-12 overflow-hidden">
    <ArticleGrid posts={regularPosts} />
  </section>
  
  <section class="container md:px-20 lg:px-20 xl:px-44">
    <EmailOptin />
  </section>

  <!-- Optional: Add a fun writing gif in corner like the penguin -->
  <!-- 
  <img src="/fun/writing-cat.gif"
    alt="cat typing furiously"
    class="fixed bottom-8 right-8 w-24 md:w-32 opacity-70 hover:opacity-100 
           transition-opacity rounded-xl pointer-events-none z-10"
  />
  -->
</main>