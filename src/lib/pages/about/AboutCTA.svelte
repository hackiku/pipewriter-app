<!-- $lib/pages/about/AboutCTA.svelte -->
<script lang="ts">
  import EarlyButton from "$lib/components/EarlyButton.svelte";
</script>

<section class="container py-24 px-4">
  <div class="relative max-w-4xl mx-auto">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl" />
    <div class="absolute inset-0 bg-grid-pattern opacity-5" />
    
    <!-- Main content card -->
    <div class="relative rounded-3xl border bg-background/80 backdrop-blur-sm p-12 space-y-8">
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <h2 class="text-4xl font-bold">
          ✍️ Copyrighters, Rise
        </h2>
        
        <p class="text-xl text-muted-foreground leading-relaxed">
          Join the first wave of writer-first wireframers. No more clicking 5 times in Figma just to edit a headline.
          Get early access to the app that's changing how we build products.
        </p>

        <div class="flex flex-col items-center gap-4 pt-6">
          <EarlyButton size="lg" />
          
          <p class="text-sm text-muted-foreground">
            Beta Launch Special — $59 One-Time (Until Jan 1st)
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgb(209 213 219 / 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(209 213 219 / 0.1) 1px, transparent 1px);
    background-size: 4rem 4rem;
  }
</style>