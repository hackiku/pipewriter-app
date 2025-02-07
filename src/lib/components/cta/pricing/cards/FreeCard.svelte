<!-- src/lib/components/cta/pricing/cards/FreeCard.svelte -->
<script lang="ts">
  import { Check } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import ProductStat from "../components/ProductStat.svelte";
  import FreeAccessModal from "../components/FreeAccessModal.svelte";

  let showModal = false;

  const features = [
    "Basic UX writing template",
    "Sample microcopy patterns",
    "Community access",
  ];
</script>

<div class="relative p-10 rounded-xl border border-border/40
            bg-card/50 hover:bg-card/60
            transition-all duration-300">
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-2xl font-semibold">Docs Lite</h3>
      </div>
    </div>

    <!-- Price -->
    <div class="flex items-baseline gap-x-2">
      <span class="text-4xl font-medium">Free</span>
    </div>

    <!-- Features -->
    <ul class="space-y-3">
      {#each features as feature}
        <li class="flex items-center gap-3 group">
          <div class="h-5 w-5 rounded-full bg-muted/80
                    flex items-center justify-center shrink-0">
            <Check class="h-3 w-3 text-muted-foreground" />
          </div>
          <span class="text-base text-muted-foreground">
            {feature}
          </span>
        </li>
      {/each}
    </ul>

    <!-- CTA Button -->
		<!-- variant="secondary" -->
    <Button 
      class="w-full"
      on:click={() => showModal = true}
    >
      Get Free Template
    </Button>
  </div>
</div>

<FreeAccessModal bind:open={showModal} />