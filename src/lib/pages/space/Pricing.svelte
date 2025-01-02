<!-- src/lib/pages/space/Pricing.svelte -->
 
<script lang="ts">
  import { Rocket } from "lucide-svelte";
  import SpaceButton from "./SpaceButton.svelte";
  import SpaceDrawer from "./SpaceDrawer.svelte";
  
  const features = [
    "Full redesign in pure, semantic code",
    "Export to React, Vue, or Svelte",
    "72-hour turnaround time",
    "Technical SEO optimization",
    "Performance optimization",
    "Analytics setup"
  ];
</script>

<section class="py-24 bg-background relative overflow-hidden">
  <!-- Decorative elements -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    <div class="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
  </div>

  <div class="container relative">
    <div class="max-w-4xl mx-auto">
      <div class="p-8 rounded-xl border bg-card backdrop-blur-sm">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full 
                      bg-primary/10 text-primary text-sm font-medium mb-4">
            <Rocket class="w-4 h-4" />
            Limited Time Offer
          </div>
          <h2 class="text-3xl font-bold mb-4">Space-Grade Landing Pages</h2>
          <p class="text-muted-foreground">
            Get your message across without sacrificing technical accuracy
          </p>
        </div>

        <!-- Price -->
        <div class="flex items-center justify-center gap-2 mb-8">
          <span class="text-5xl font-bold">$2,000</span>
          <span class="text-xl text-muted-foreground">/page</span>
        </div>

        <!-- Features -->
        <div class="grid md:grid-cols-2 gap-4 mb-8">
          {#each features as feature}
            <div class="flex items-start gap-2">
              <Rocket class="w-5 h-5 text-primary mt-1" />
              <span>{feature}</span>
            </div>
          {/each}
        </div>

        <!-- CTA -->
        <div class="flex flex-col gap-4">
          <SpaceDrawer>
            <div slot="trigger">
              <SpaceButton text="Schedule Your Redesign" source="pricing" fullWidth={true} />
            </div>
          </SpaceDrawer>
          
          <p class="text-center text-sm text-muted-foreground">
            72-hour delivery guarantee or your money back
          </p>
        </div>
      </div>
    </div>
  </div>
</section>