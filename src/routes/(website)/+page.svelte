<!-- src/routes/+page.svelte -->
<script lang="ts">
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import LoomVideo from "$lib/components/marketing/LoomVideo.svelte";
  import Demo from "$lib/pages/Demo.svelte";
</script>

<BackgroundPattern />

<div class="flex flex-col min-h-screen">
  <main class="container flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <!-- Demo Section -->
    <Demo />

    <!-- Logos Section -->
    <div class="py-8">
      <LogosMarquee />
    </div>

    <!-- Features Section -->
    <section class="bg-background">
      <h2 class="text-4xl text-center sm:text-5xl font-semibold mb-12">
        10× Your Copy Decks
      </h2>
    </section>

    <LoomVideo />

    <!-- Features Grid -->
    <section class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col items-center text-center group">
          <div class="mb-4 font-bold text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-300">
            80+
          </div>
          <h3 class="text-xl font-semibold mb-2">UI Elements</h3>
          <p class="text-muted-foreground">Components ready to copy and paste</p>
        </div>

        <div class="flex flex-col items-center text-center group">
          <div class="mb-4 font-bold text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-300">
            📝
          </div>
          <h3 class="text-xl font-semibold mb-2">Native Docs App</h3>
          <p class="text-muted-foreground">Write and wireframe without leaving Google Docs</p>
        </div>

        <div class="flex flex-col items-center text-center group">
          <div class="mb-4 font-bold text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-300">
            ✨
          </div>
          <h3 class="text-xl font-semibold mb-2">Fancy Formatted Docs</h3>
          <p class="text-muted-foreground">Pre-formatted templates that impress clients</p>
        </div>
      </div>
    </section>
  </main>
</div>