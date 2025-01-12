<!-- src/lib/blog/BlogPage.svelte -->
<script lang="ts">
  import ArticleGrid from "./components/ui/ArticleGrid.svelte";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  import Turtles from "./components/ui/Turtles.svelte";
  import Title from "./components/ui/Title.svelte";
  import EmailOptin from "./components/cta/EmailOptin.svelte";
  import type { BlogPost } from './types';
  
  export let posts: BlogPost[];
  $: regularPosts = posts;
</script>

<main class="text-foreground relative overflow-x-hidden">
  <section class="relative flex items-start pt-32 md:pt-36 md:px-16 lg:px-20 xl:px-44 overflow-hidden">
    <div class="container relative z-10">
      <div class="max-w-3xl relative">
        <!-- Category badge -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 
                    rounded-full bg-primary/10 text-primary border border-primary/20 mb-2">
          <span class="text-sm font-medium">Blog</span>
        </div>

        <!-- Echoing title -->
        <Title 
          text="writing on writing"
          className="mb-8"
        />

        <div class="space-y-8">
          <p class="-mt-4 text-2xl md:text-2xl text-muted-foreground leading-relaxed">
            It's turtles all the way down.
          </p>

          <EmailForm 
            buttonText="Subscribe"
            size="sm"
            wrap={false}
            source="Blog Post"
            className="max-w-sm"
          />
        </div>

      </div>
			<!-- <Turtles 
				position="bottom-right"
				size="lg"
				opacity={0.05}
				echoes={3}
			/> -->
    </div>
  </section>

  <!-- Articles Grid with column selector -->
	 <section class="container py-12 md:px-16 lg:px-20 xl:px-44 overflow-hidden">
    <ArticleGrid posts={regularPosts} />
  </section>
  
  <section class="container">
    <EmailOptin />
  </section>
</main>