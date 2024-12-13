<!-- routes/(website)/about/+page.svelte -->
<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import Founder from "$lib/pages/about/Founder.svelte";
  import PlayPiano from "$lib/pages/about/PlayPiano.svelte";
  import TeamGrid from "$lib/pages/about/TeamGrid.svelte";
  import ToolsList from "$lib/pages/about/ToolsList.svelte";
  import AboutCTA from "$lib/pages/about/AboutCTA.svelte";
</script>
<Nav />

<main class="bg-background text-foreground">
  <!-- Hero -->
  <section class="relative min-h-[50vh] flex items-center border-b">
    <div class="container relative z-10 pt-20">
      <div class="max-w-2xl">
        <h1 class="text-4xl sm:text-5xl font-bold mb-6">
          We the Writers
        </h1>
        <p class="text-xl text-muted-foreground">
          Building tools for technical writers, by technical writers.
        </p>
      </div>
    </div>
  </section>

  <PlayPiano />
  <TeamGrid />
  <Founder />
  
  <!-- Tools -->
  <section class="container py-24 border-t">
    <h2 class="text-3xl font-bold mb-12">Tools We Use</h2>
    <ToolsList />
  </section>

  <AboutCTA />
</main>
