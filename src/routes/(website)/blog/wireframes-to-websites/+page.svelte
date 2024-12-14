<!-- routes/(website)/blog/wireframes-to-websites/+page.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight } from "lucide-svelte";
  import LoomVideo from "$lib/components/LoomVideo.svelte";

  // Blog post data - can be moved to central data management later
  const post = {
    title: "From Wireframes to Websites: The AI Bridge for Writers",
    date: "December 14, 2024",
    author: "Ivan Karaman",
    readingTime: "4 min read",
    category: "Product Updates",
    heroImage: "/images/blog/wireframe-to-web.webp",
    excerpt: "Converting Google Docs wireframes into production-ready websites with a single AI prompt. A new way for writers to lead product development.",
    content: `
      We just shipped something exciting: instant conversion from Google Docs wireframes to production-ready websites. No more hand-coding or back-and-forth with developers. Just write, structure, and convert.

      ## The Writer's Dilemma

      As writers in tech, we often start with the content first - using headings, paragraphs, and document structure to outline the user experience. But translating that into a working website usually means:

      1. Exporting to HTML (losing styling)
      2. Manual coding (time-consuming)
      3. Back-and-forth with developers (communication overhead)
      4. Multiple iterations to get it right (delays)

      ## The AI Bridge

      What if you could keep writing in Google Docs, using familiar tools and workflows, and then transform your content into a fully-styled website with a single prompt?

      That's exactly what our new AI conversion feature does:

      - Preserves heading structure for consistent styling
      - Converts document sections to semantic HTML
      - Adds Tailwind CSS classes for instant styling
      - Supports custom design instructions via comments

      ## How It Works

      The magic happens in three steps:

      1. Write your content using Pipewriter's pre-styled components
      2. Add design comments (optional) to guide the AI
      3. Convert to HTML with our specialized prompt

      The AI understands document structure and design intent, producing clean, production-ready code that doesn't need heavy refactoring.

      ## What's Next

      This is just the beginning. We're working on:

      - More design system options
      - Component library integration
      - Custom styling presets
      - Direct deployment options

      ## Join the Revolution

      We're in beta, offering special pricing for early adopters. Previous template users get 50% off - check your email for the discount code.

      Ready to transform how you build websites? Start with words, end with working code. That's the future of content-first design.
    `
  };
</script>

<article class="container max-w-4xl mx-auto py-24 px-4">
  <!-- Hero -->
  <header class="space-y-8 mb-16">
    <div class="space-y-2">
      <div class="flex items-center gap-3 text-sm text-muted-foreground">
        <span class="rounded-full bg-primary/10 px-3 py-1 text-primary">
          {post.category}
        </span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
        {post.title}
      </h1>

      <p class="text-xl text-muted-foreground">
        {post.excerpt}
      </p>
    </div>

    <!-- Hero Image -->
    <img 
      src={post.heroImage} 
      alt="Wireframe to Website Conversion"
      class="w-full aspect-video rounded-xl object-cover"
    />
  </header>

  <!-- Content -->
  <div class="prose prose-lg dark:prose-invert max-w-none">
    {@html post.content}
  </div>

  <!-- CTA -->
  <div class="mt-16 p-8 rounded-xl bg-muted/50 border space-y-4 text-center">
    <h3 class="text-2xl font-semibold">
      Ready to try it yourself?
    </h3>
    <p class="text-muted-foreground">
      Join the beta and start building websites the writer's way.
    </p>
    <Button size="lg" class="mt-4">
      Get Early Access
      <ArrowRight class="ml-2 h-4 w-4" />
    </Button>
  </div>
</article>