<!-- src/lib/pages/space/SpacePage.svelte -->
<script lang="ts">
  import { Rocket, Code, Stars } from "lucide-svelte";
  import Hero from "./Hero.svelte";
  import SpaceProcess from "./SpaceProcess.svelte";
  import BeforeAfter from "./BeforeAfter.svelte";
  import SpaceButton from "./SpaceButton.svelte";
  import SpaceDrawer from "./SpaceDrawer.svelte";
  import ToolsGrid from "$lib/components/proof/ToolsGrid.svelte";
  
  const toolsToShow = [
    { name: 'React', icon: '/tools/react.svg' },
    { name: 'Vue', icon: '/tools/vue.svg' },
    { name: 'Svelte', icon: '/tools/svelte.svg' },
    { 
      tools: [
        { name: 'Tailwind', icon: '/tools/tailwind.svg' },
        { name: 'GSAP', icon: '/tools/gsap.svg' }
      ],
      interval: 300
    }
  ];
</script>

<main class="bg-background text-foreground">
  <!-- Hero Section with new editorial layout -->
  <Hero />

  <!-- Before/After Gallery -->
  <section class="py-24 bg-background relative overflow-hidden">
    <div class="container">
      <h2 class="text-3xl font-semibold mb-16 lg:max-w-xl">
        From Legacy to Launch-Ready
      </h2>
      <BeforeAfter />
      
      <div class="mt-16 max-w-xl">
        <p class="text-lg text-muted-foreground mb-8">
          See how we transform outdated space industry websites into modern, 
          high-converting landing pages - all in clean, maintainable code.
        </p>
        
        <SpaceDrawer>
          <div slot="trigger">
            <SpaceButton text="Get Your Redesign" source="gallery" />
          </div>
        </SpaceDrawer>
      </div>
    </div>
  </section>

  <!-- Process Section -->
  <section class="py-24 bg-background relative">
    <div class="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
    <SpaceProcess />
  </section>

  <!-- Export Options -->
  <section class="py-24 bg-background">
    <div class="container">
      <div class="grid grid-cols-12 gap-8 items-center">
        <div class="col-span-12 lg:col-span-5 lg:col-start-2">
          <h2 class="text-3xl font-semibold mb-6">
            Beyond No-Code
          </h2>
          <p class="text-lg text-muted-foreground mb-8">
            Get clean, production-ready code your developers will thank you for. Export to
            any modern framework - no WordPress, no Webflow, just pure semantic markup.
          </p>

          <SpaceDrawer>
            <div slot="trigger">
              <SpaceButton text="Schedule a Demo" source="frameworks" />
            </div>
          </SpaceDrawer>
        </div>

        <div class="col-span-12 lg:col-span-4 lg:col-start-8">
          <ToolsGrid tools={toolsToShow} columns={2} gap="md" />
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="relative py-32 bg-background border-t">
    <div class="container">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl font-semibold mb-6">
          Ready for Liftoff?
        </h2>
        <p class="text-xl text-muted-foreground mb-8">
          Book a 30-minute call to discuss your redesign needs.
        </p>
        
        <SpaceDrawer>
          <div slot="trigger">
            <SpaceButton size="lg" text="Schedule Your Call" source="final_cta" />
          </div>
        </SpaceDrawer>

        <p class="mt-6 text-sm text-muted-foreground">
          Or email directly at <a href="mailto:ivan@pipewriter.io" class="text-primary hover:underline">ivan@pipewriter.io</a>
        </p>
      </div>
    </div>
  </section>
</main>