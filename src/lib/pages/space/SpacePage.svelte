<!-- SpacePage.svelte -->
<script lang="ts">
  import { Rocket, Stars } from "lucide-svelte";
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import Hero from "./Hero.svelte";
  import BeforeAfter from "./BeforeAfter.svelte";
  import Process from "./Process.svelte";
  import Products from "./Products.svelte";
  import Testimonials from "./Testimonials.svelte";
  import Pricing from "./Pricing.svelte";
  import SpaceButton from "./SpaceButton.svelte";
  import SpaceDrawer from "./SpaceDrawer.svelte";
</script>

<main class="bg-backgrounds text-foreground relative">
  <!-- Fixed Background Pattern -->
  <div class="fixed inset-0 pointer-events-none">
    <BackgroundPattern size="lg" opacity="high" gradient={true} />
  </div>

  <!-- Content -->
  <div class="relative">
    <!-- Hero Section -->
    <Hero />

    <!-- Before/After Gallery -->
    <section class="relative -mt-6 pb-24">
      <div class="container">
        <BeforeAfter />
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-24 relative">
      <div class="container">
        <!-- Section Header -->
        <div class="flex justify-end mb-16">
          <div class="w-3/5 space-y-4">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 
                        rounded-full bg-primary/10 text-primary border border-primary/20">
              <Stars class="w-4 h-4" />
              <span class="text-sm font-medium">Our Process</span>
            </div>
            
            <h2 class="text-5xl font-bold">Space Startup Redesign</h2>
            <p class="text-xl text-muted-foreground">
              Your landing page rebuilt in your live code stack.
              No templates, no compromises.
            </p>
          </div>
        </div>

        <Process />
      </div>
    </section>

		<!-- Products Section -->
    <section class="py-24 relative border-t border-border/50">
      <div class="container">
        <div class="flex justify-center mb-16">
          <div class="w-3/5 space-y-4">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 
                        rounded-full bg-primary/10 text-primary border border-primary/20">
              <Rocket class="w-4 h-4" />
              <span class="text-sm font-medium">Why Space?</span>
            </div>
            
            <h2 class="text-5xl font-bold">From Engineer to Engineer</h2>
            <p class="text-xl text-muted-foreground">
              Building tools for the next generation of space exploration.
              Here's what we're working on:
            </p>
          </div>
        </div>

        <Products />
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 relative">
      <div class="container">
        <div class="text-center mb-16 space-y-4">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 
                      rounded-full bg-primary/10 text-primary border border-primary/20">
            <Stars class="w-4 h-4" />
            <span class="text-sm font-medium">Client Stories</span>
          </div>
          
          <h2 class="text-4xl font-bold">From the Launch Pad</h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how other space startups transformed their digital presence
          </p>
        </div>

        <Testimonials />
      </div>
    </section>



    <!-- Pricing Section -->
    <Pricing />

    <!-- Final CTA -->
    <section class="py-24 relative">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center space-y-8">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 
                      rounded-full bg-primary/10 text-primary border border-primary/20">
            <Rocket class="w-4 h-4" />
            <span class="text-sm font-medium">Ready?</span>
          </div>

          <h2 class="text-5xl font-bold">Time for Launch</h2>
          
          <p class="text-xl text-muted-foreground">
            Book a quick call to discuss your redesign needs.
            72-hour turnaround guaranteed.
          </p>

          <div class="pt-4">
            <SpaceDrawer>
              <div slot="trigger">
                <SpaceButton size="lg" text="Schedule a Call" source="final_cta" />
              </div>
            </SpaceDrawer>

            <p class="mt-6 text-sm text-muted-foreground">
              Or email directly at 
              <a href="mailto:ivan@pipewriter.io" 
                 class="text-primary hover:underline">
                ivan@pipewriter.io
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

<!-- <style>
  /* Optional: Smooth scroll behavior */
  :global(html) {
    scroll-behavior: smooth;
  }
</style> -->