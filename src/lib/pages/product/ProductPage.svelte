<!-- src/lib/pages/product/ProductPage.svelte -->
<script lang="ts">
  import { Sparkles, Play } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import EarlyAccess from "$lib/components/cta/EarlyAccess.svelte";
  import EarlyAccessDrawer from "$lib/components/cta/EarlyAccessDrawer.svelte";
</script>

<main class="bg-background text-foreground">
  <!-- Hero Section -->
  <section class="relative min-h-[80vh] flex items-center justify-center">
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
          Writer-first wireframing tools for copywriters and UX writers
        </p>

        <!-- Hero CTA -->
        <div class="flex justify-center">
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

  <!-- Video Demo Section -->
  <section class="py-2 bg-background relative overflow-hidden">
    <div class="container">
    
      <!-- Video Placeholder -->
      <div class="relative w-full max-w-4xl mx-auto">
        <div class="w-full aspect-video bg-black/5 backdrop-blur-sm rounded-xl overflow-hidden">
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />

          <!-- Play Button -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="flex flex-col items-center gap-4">
              <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md 
                         flex items-center justify-center cursor-pointer
                         hover:bg-white/20 transition-colors">
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
  <section class="py-32 bg-background border-t relative">
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>

    <div class="container relative">
      <div class="w-full max-w-5xl mx-auto">
        <EarlyAccess embedded={true} showEmbed={true} />
      </div>
    </div>
  </section>
</main>