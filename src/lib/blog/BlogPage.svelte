<!-- src/lib/blog/BlogPage.svelte -->
<script lang="ts">
  import { Stars } from "lucide-svelte";
  import ArticleCard from "./components/blocks/ArticleCard.svelte";
  import EmailOptin from "./components/cta/EmailOptin.svelte";
  // import EmailForm from "$lib/components/cta/EmailForm.svelte";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  import Turtles from "./components/ui/Turtles.svelte";
  import Title from "./components/ui/Title.svelte";
  import type { BlogPost } from './types';
  
  export let posts: BlogPost[];
  $: regularPosts = posts;
</script>

<main class="text-foreground relative overflow-x-hidden">
  <!-- <section class="relative flex items-start py-pt-20 md:pt-28 pb-12 overflow-hidden"> -->
  <section class="relative flex items-start py-32 md:py-32 md:px-16 lg:px-20 xl:px-44 overflow-hidden">
    <div class="container relative z-10">
      <div class="max-w-3xl relative">
        <!-- Category badge -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 
                    rounded-full bg-primary/10 text-primary border border-primary/20 mb-2">
          <!-- <Stars class="w-4 h-4" /> -->
          <span class="text-sm font-medium">Blog</span>
        </div>

        <!-- Echoing title -->
        <Title 
          text="writing on writing"
          className="mb-8"
          echoes={2}
        />

        <div class="space-y-8">
          <p class="text-2xl md:text-2xl text-muted-foreground leading-relaxed">
            It's turtles all the way down.
          </p>

          <!-- Email form below subhead -->
          <!-- <div class="max-w-sm"> -->
					<EmailForm 
						buttonText="Subscribe"
						size="sm"
						wrap={false}
						source="Blog Post"
						className="max-w-md"
					/>
          <!-- </div> -->
        </div>

        <!-- Decorative turtles -->
        <Turtles 
          position="bottom-right"
          size="lg"
          opacity={0.15}
          echoes={3}
        />
      </div>
    </div>
  </section>

  <!-- Articles Grid -->
  <section class="container pb-24">
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