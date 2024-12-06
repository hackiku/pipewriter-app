<!-- src/routes/+page.svelte -->
<script lang="ts">
  import EarlyButton from "$lib/components/EarlyButton.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import DropperGrid from "$lib/iframe/features/dropper/DropperGrid.svelte";
</script>

<BackgroundPattern />

<div class="flex flex-col min-h-screen bg-background">
  <main class="container flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-32 lg:pt-40 h-[calc(100vh-8rem)]">
      <!-- Text Content -->
      <div class="flex flex-col items-start space-y-8 lg:w-[45%]">
        <!-- Eyebrow -->
        <div class="inline-flex h-6 items-center rounded-full border px-3 text-xs font-medium
                    bg-muted/50">
          type + prototype
        </div>
        
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Wireframes for Writers in Google Docs
        </h1>
        
        <EarlyButton size="lg" />
      </div>

      <!-- Dropper Preview -->
      <div class="relative flex-1 min-h-[500px] lg:min-h-0">
        <!-- Gradient Overlay -->
        <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t 
                    from-background to-transparent z-10"></div>
        
        <!-- Dropper Grid Container -->
        <div class="absolute inset-0 overflow-hidden">
          <DropperGrid />
        </div>
      </div>
    </div>

    <!-- Logos Marquee - Positioned absolutely for viewport alignment -->
    <div class="absolute bottom-8 left-0 right-0 z-20">
      <div class="container px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
        <LogosMarquee />
      </div>
    </div>
  </main>
</div>

<style>
  /* Ensure the page takes up full height but doesn't scroll unnecessarily */
  /* :global(html, body) {
    height: 100%;
  } */
</style>