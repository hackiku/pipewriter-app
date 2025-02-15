<!-- src/lib/pages/use-cases/WireframingGoogleDocs.svelte -->
<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import DocsDemo from "$lib/components/demo/docs/DocsDemo.svelte";
  import UserCard from "$lib/pages/landing/sections/proof/UserCard.svelte";
  
  // Static testimonial data for this page
  const testimonial = {
    quote: "I've never seen a tool like this that works natively in Docs. Been building wireframes by hand using tables, even for five-figure contracts. This changes everything for us UX writers.",
    author: {
      name: "Eoin Cronolly",
      role: "SaaS Copywriter",
      avatar: "/people/testimonials/eoin-cronolly.png"
    }
  };

  // SEO data specific to this page
  const seoData = {
    title: "Wireframing in Google Docs — UX Writing Tools by Pipewriter",
    description: "Create professional UX wireframes directly in Google Docs. The first writer-first prototyping tool for UX writers and content designers. No Figma needed.",
    type: "product",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Pipewriter Google Docs Wireframing",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web browser",
      "description": "Professional UX wireframing tool built for Google Docs",
      "offers": {
        "@type": "Offer",
        "price": "59",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "30"
      }
    }
  };
</script>

<SEO {...seoData} />

<main class="flex flex-col min-h-screen">
  <!-- Hero Section -->
  <section class="pt-32 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
        Wireframe Like a Pro in Google&nbsp;Docs
      </h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
        Stop juggling between writing tools and design software. Create professional UX deliverables right where you write, with pre-made components and AI-powered workflows.
      </p>
    </div>
  </section>

  <!-- Demo Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-muted/5">
    <div class="max-w-5xl mx-auto">
      <DocsDemo />
      <div class="mt-8 text-center">
        <p class="text-sm text-muted-foreground">
          Interactive demo coming soon. Preview the full app in Early Access.
        </p>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-16">
        Everything You Need for UX Writing
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="p-6 rounded-lg border bg-card">
          <h3 class="text-xl font-semibold mb-3">90+ UI Components</h3>
          <p class="text-muted-foreground">
            Pre-formatted tables and layouts you can copy-paste. From hero sections to
            feature grids, everything's ready to use.
          </p>
        </div>

        <div class="p-6 rounded-lg border bg-card">
          <h3 class="text-xl font-semibold mb-3">AI-Powered Exports</h3>
          <p class="text-muted-foreground">
            Convert your wireframes to HTML/CSS with one click. Use built-in AI
            prompts to transform mockups into live code.
          </p>
        </div>

        <div class="p-6 rounded-lg border bg-card">
          <h3 class="text-xl font-semibold mb-3">Design System Ready</h3>
          <p class="text-muted-foreground">
            All components follow modern design principles. Your wireframes will
            look professional and be ready for handoff.
          </p>
        </div>

        <div class="p-6 rounded-lg border bg-card">
          <h3 class="text-xl font-semibold mb-3">Writer-First Workflow</h3>
          <p class="text-muted-foreground">
            Built for content people. No design skills needed. If you can use
            Google Docs, you can create great wireframes.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonial Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-muted/5">
    <div class="max-w-3xl mx-auto">
      <UserCard testimonial={testimonial} />
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-24 px-4 sm:px-6 lg:px-8 text-center">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-6">
        Ready to Level Up Your UX Writing?
      </h2>
      <p class="text-xl text-muted-foreground mb-8">
        Join the first wave of writer-first wireframers. Early access available now.
      </p>
      <a
        href="/early"
        class="inline-flex items-center px-6 py-3 text-base font-medium rounded-full
               text-white bg-primary hover:bg-primary/90 transition-colors"
      >
        Get Early Access
      </a>
    </div>
  </section>
</main>