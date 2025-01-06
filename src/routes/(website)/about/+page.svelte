<!-- routes/(website)/about/+page.svelte -->
<script lang="ts">
	import { Sparkles } from "lucide-svelte";
  import Nav from "$lib/components/Nav.svelte";
  import Founder from "$lib/pages/about/Founder.svelte";
  import PlayPiano from "$lib/pages/about/PlayPiano.svelte";
	import CaplesAbout from "$lib/pages/about/CaplesAbout.svelte";
  import TeamGrid from "$lib/pages/about/TeamGrid.svelte";
  import ToolsList from "$lib/pages/about/ToolsList.svelte";
  import AboutCTA from "$lib/pages/about/AboutCTA.svelte";

	import ComingSoon from "$lib/components/ComingSoon.svelte";

</script>

  <ComingSoon 
    title="About Us Coming Soon"
    description="Indie-founding this FTW, pls have patience."
  />

<Nav />

<main class="bg-background text-foreground">

  <section class="relative min-h-[60vh] flex items-center border-b">
    <div class="container relative z-10 pt-20">
      <div class="max-w-2xl mx-auto">
        
						<div
							class="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
						>
							<Sparkles class="w-4 h-4" />
							<div class="text-sm font-medium tracking-tight">
								About
							</div>
						</div>

				<h1 class="text-4xl sm:text-5xl md:text-7xl font-medium mb-6">
          Writers are the &lt;3 of product development
        </h1>
        <!-- <p class="text-xl text-muted-foreground">
					Research, IA, tone of voice. 
        </p> -->
      </div>
    </div>
  </section>

  <!-- Each component is now self-contained with its own section wrapper -->
  <!-- <PlayPiano /> -->
  
	<!-- <CaplesAbout /> -->

  <!-- Team section with title -->
  <!-- <section class="container py-24 border-t">
    <h2 class="text-3xl font-bold mb-12">Thanks for helping it to life 🫶</h2>
    <TeamGrid />
  </section> -->
  
  <!-- <Founder /> -->
  
  <!-- Tools section -->
  <section class="container py-24 border-t">
    <h2 class="text-3xl font-bold mb-12">Tools We Use</h2>
    <ToolsList />
  </section>

  <AboutCTA />
</main>