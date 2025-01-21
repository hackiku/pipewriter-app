<!-- src/lib/pages/product/ProductPage.svelte -->
<script lang="ts">
  import { Sparkles } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import EarlyAccess from "$lib/components/cta/EarlyAccess.svelte";
  import EarlyAccessDrawer from "$lib/components/cta/EarlyAccessDrawer.svelte";
  import Navigation from "./products/Navigation.svelte";
  import VideoDemo from "../ai/VideoDemo.svelte";
</script>

<main class="bg-background text-foreground">
  <!-- Hero Section -->
  <section class="relative min-h-[80vh] flex items-center justify-center">
    <!-- Background Grid -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>

    <div class="container relative z-10 py-20">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Beta Badge -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-8 
                    rounded-full bg-primary/10 text-primary border border-primary/20">
          <Sparkles class="w-4 h-4" />
          <span class="text-sm font-medium">Beta Launch Special</span>
        </div>

        <!-- Hero Text -->
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6">
          Write Docs that <br />Look Like Figma
        </h1>
        <p class="text-xl sm:text-2xl text-muted-foreground mb-8">
          Writer-first wireframing tools for copywriters and UX writers. <br class="hidden sm:block" />
          Design without leaving Google Docs.
        </p>

        <!-- Hero CTA -->
        <div class="flex justify-center items-center gap-4">
          <EarlyAccessDrawer>
            <div slot="trigger">
              <EarlyAccessButton
                size="lg"
                fullWidth={true}
                source="hero"
              />
            </div>
            <EarlyAccess />
          </EarlyAccessDrawer>
        </div>
      </div>
    </div>
  </section>

  <!-- Process Section -->
  <Navigation />

  <!-- Video Demo -->
  <VideoDemo />
  
  <!-- Bottom CTA Section -->
  <section class="py-32 bg-background border-t relative">
    <div class="container relative">
      <div class="w-full max-w-5xl mx-auto">
        <!-- Social Proof -->
        <figure class="max-w-2xl mx-auto text-center mb-16">
          <blockquote class="text-lg sm:text-xl text-muted-foreground italic mb-4">
            "I've never seen a tool like this that works natively in Docs. I've been building wireframes 
            by hand using tables, even for five-figure contracts. This changes everything for us UX writers."
          </blockquote>
          <figcaption class="text-sm font-medium">
            — Eoin Cronolly, SaaS Copywriter
          </figcaption>
        </figure>

        <EarlyAccess embedded={true} showEmbed={true} />
      </div>
    </div>
  </section>
</main>