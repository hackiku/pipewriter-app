<!-- routes/(website)/blog/+page.svelte -->
<script lang="ts">
  import EmailForm from "$lib/components/EmailForm.svelte";
  import ArticleCard from "$lib/pages/blog/ArticleCard.svelte";

  export let data;
  const { posts } = data;
</script>

<main class="bg-background">
  <!-- Hero Section -->
  <section class="relative min-h-[50vh] flex items-center border-b">
    <div class="container relative z-10 pt-28 md:pt-36 pb-24">
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <div class="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
          <span class="text-sm font-medium">Coming Soon</span>
        </div>
				<h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold">
          Writer's Unblock
        </h1>
        <p class="text-xl text-muted-foreground">
          Tips, tricks, and stories about writing-first product development.
        </p>

        <!-- Email Form -->
        <div class="pt-4">
          <EmailForm size="default" className="max-w-xl"/>
        </div>
      </div>
    </div>
  </section>

  <!-- Articles Grid -->
  <!-- <section class="container py-24">
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each posts as article}
        <ArticleCard {...article} />
      {/each}
    </div>
  </section> -->
</main>