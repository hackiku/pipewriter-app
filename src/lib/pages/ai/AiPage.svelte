<!-- src/lib/pages/ai/AiPage.svelte -->
<script lang="ts">
  // import EarlyButton from "$lib/components/EarlyButton.svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import CartButton from "$lib/components/cta/CartButton.svelte";
  import GumroadCartButton from "$lib/components/cta/GumroadCartButton.svelte";
  import GumroadExternalButton from "$lib/components/cta/GumroadExternalButton.svelte";
	

  import Process from "./Process.svelte";
  import VideoDemo from "./VideoDemo.svelte";
  import LiveDemo from "./LiveDemo.svelte";
  import ToolsGrid from "$lib/components/proof/ToolsGrid.svelte";
  import GumroadSection from "./GumroadSection.svelte";
  import { Sparkles } from "lucide-svelte";
  import { tools } from "$lib/data/assets/tools";

  const toolsToShow = [
    tools.googleDocs,
    tools.googleAppsScript,
    {
			tools: [tools.claude, tools.gpt4, tools.gemini],
      interval: 300
    },
		tools.sveltekit
  ];
</script>

<main class="bg-background text-foreground">
  <section class="relative min-h-[50vh] flex items-center">
    <div class="container relative z-10 pt-20">
      <div class="max-w-3xl mx-auto text-center my-12">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-8 rounded-full bg-primary/10 text-primary border border-primary/20">
          <Sparkles class="w-4 h-4" />
          <span class="text-sm font-medium">New AI Feature</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6">
          Google Docs Wire <br />to Live Website
        </h1>
        <p class="text-2xl text-muted-foreground mb-8">
          With 2× <kbd>click</kbd> and 2× <kbd>Ctrl</kbd> + <kbd>C</kbd>
        </p>
        <!-- <EarlyAccessButton /> -->
        <div class="flex justify-center items-center gap-4">
					<GumroadCartButton text="Add to Cart"/>
					<GumroadExternalButton />
					<!-- <CartButton /> -->
				</div>
				<!-- <p class="text-sm mt-2 opacity-50">One-Time Early Access</p> -->
      </div>
    </div>
  </section>

  <section class="py-8 bg-background">
    <VideoDemo />
  </section>

  <section class="py-20 bg-background">
    <Process />
  </section>

  <section class="bg-background">
    <h2 class="text-center text-2xl sm:text-5xl md:text-5xl font-semibold mb-10">
      See it Live
    </h2>
    <LiveDemo />
  </section>

  <section class="py-12 mb-12 bg-background">
		<!-- <h2 class="text-2xl text-center mb-4 font-semibold">All Google Docs, any LLM</h2> -->
    <ToolsGrid tools={toolsToShow} columns={4} gap="md" />
  </section>

  <GumroadSection />
</main>

<style>
  kbd {
    @apply inline-flex items-center px-2 py-1.5 -mb-1 text-sm font-semibold text-muted-foreground bg-muted rounded border shadow-sm;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
  }
</style>