<!-- routes/(website)/blog/+page.svelte -->
<script lang="ts">
  import EmailForm from "$lib/components/EmailForm.svelte";
  import ArticleCard from "$lib/pages/blog/ArticleCard.svelte";

  // Dummy articles data
  const articles = [
    {
      title: "Why Writers Should Lead Product Development",
      excerpt: "Great products start with words, not wireframes. Here's how technical writers can drive the product development process from day one.",
      date: "Dec 12, 2024",
      slug: "writers-lead-product-development",
      readingTime: "5 min read",
      category: "Product Design"
    },
    {
      title: "From Google Docs to Wireframes: A Writer's Journey",
      excerpt: "How I transformed my copywriting process by treating Google Docs as a design tool, and why it made my clients happier.",
      date: "Dec 10, 2024",
      slug: "google-docs-wireframes",
      readingTime: "4 min read",
      category: "Case Study"
    },
    {
      title: "The Content-First Design Revolution",
      excerpt: "Content isn't just king - it's the whole kingdom. Learn how leading tech companies are putting writers at the heart of their design process.",
      date: "Dec 8, 2024",
      slug: "content-first-design",
      readingTime: "6 min read",
      category: "Industry"
    }
  ];
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
      {#each articles as article}
        <ArticleCard {...article} />
      {/each}
    </div>
  </section>
</main>