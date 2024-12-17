<!-- src/lib/pages/product/ProductPage.svelte -->
<script lang="ts">
  import { Sparkles } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import EarlyAccess from "$lib/components/cta/EarlyAccess.svelte";
  import LoomVideo from "$lib/components/marketing/LoomVideo.svelte";
</script>

<main class="bg-background text-foreground">
  <!-- Hero Section -->
  <section class="relative min-h-[70vh] flex items-center">
    <div class="container relative z-10 pt-20">
      <div class="max-w-3xl mx-auto text-center my-12">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-8 rounded-full bg-primary/10 text-primary border border-primary/20">
          <Sparkles class="w-4 h-4" />
          <span class="text-sm font-medium">Beta Launch Special</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6">
          Write Docs that <br/>Look Like Figma
        </h1>
        <p class="text-xl sm:text-2xl text-muted-foreground mb-8">
          Writer-first wireframing tools for copywriters and UX writers
        </p>

        <EarlyAccessButton size="lg" fullWidth={true} />
      </div>
    </div>
  </section>

  <!-- Video Demo Section -->
  <section class="py-20 bg-background">
    <div class="container">
      <h2 class="text-3xl sm:text-4xl font-semibold text-center mb-12">
        See it in Action
      </h2>
      <LoomVideo />
    </div>
  </section>

  <!-- Bottom CTA Section -->
  <section class="py-20 bg-background border-t">
    <div class="container">
      <EarlyAccess embedded={true} showEmbed={false} />
    </div>
  </section>
</main>