<!-- src/lib/pages/product/ProductPage.svelte -->
<script lang="ts">
  import { Sparkles, Play } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import EarlyAccess from "$lib/components/cta/EarlyAccess.svelte";
  import EarlyAccessDrawer from "$lib/components/cta/EarlyAccessDrawer.svelte";
  
  let drawerOpen = false;
</script>

<main class="bg-background text-foreground">
  <!-- Hero Section -->
  <section class="relative min-h-[70vh] flex items-center">
    <div class="container relative z-10 pt-20">
      <div class="max-w-3xl mx-auto text-center my-12">
        <!-- Beta Badge -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-8 rounded-full bg-primary/10 text-primary border border-primary/20">
          <Sparkles class="w-4 h-4" />
          <span class="text-sm font-medium">Beta Launch Special</span>
        </div>

        <!-- Hero Text -->
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6">
          Write Docs that <br/>Look Like Figma
        </h1>
        <p class="text-xl sm:text-2xl text-muted-foreground mb-8">
          Writer-first wireframing tools for copywriters and UX writers
        </p>

        <!-- Hero CTA -->
        <EarlyAccessDrawer bind:open={drawerOpen}>
          <div slot="trigger">
            <EarlyAccessButton bind:open={drawerOpen} size="lg" fullWidth={true} />
          </div>
          <EarlyAccess />
        </EarlyAccessDrawer>
      </div>
    </div>
  </section>

  <!-- Video Demo Section -->
  <section class="py-20 bg-background">
    <div class="container">
      <h2 class="text-3xl sm:text-4xl font-semibold text-center mb-12">
        See it in Action
      </h2>
      
      <!-- Video Placeholder -->
      <div class="relative w-full max-w-4xl mx-auto">
        <div class="w-full aspect-video bg-black/5 backdrop-blur-sm rounded-xl overflow-hidden">
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
          
          <!-- Play Button -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="flex flex-col items-center gap-4">
              <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Play class="w-8 h-8 text-white/70" />
              </div>
              <p class="text-base text-white/70">Watch the Demo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Bottom CTA Section -->
  <section class="py-20 bg-background border-t">
    <div class="container">
      <EarlyAccess embedded={true} showEmbed={false} />
    </div>
  </section>
</main>