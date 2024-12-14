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
    <div class="container relative z-10 pt-28 md:pt-44 pb-16">
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold">
          Writer's Block
        </h1>
        <p class="text-xl text-muted-foreground">
          Tips, tricks, and stories about writing-first product development.
        </p>

        <!-- Email Form -->
        <div class="pt-8">
          <EmailForm size="sm" />
        </div>
      </div>
    </div>
  </section>

  <!-- Articles Grid -->
  <section class="container py-24">
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each posts as article}
        <ArticleCard {...article} />
      {/each}
    </div>
  </section>
</main>