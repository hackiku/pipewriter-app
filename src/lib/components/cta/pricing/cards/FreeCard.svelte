<!-- src/lib/components/cta/pricing/cards/FreeCard.svelte -->
<script lang="ts">
  import { Check } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import ProductStat from "../components/ProductStat.svelte";
  import FreeAccessModal from "../components/FreeAccessModal.svelte";

  let showModal = false;

  const features = [
    "Google Docs wireframe",
    "Basic conversion scripts",
    "Wire to code AI prompt",
  ];
</script>

<div 
  class="relative p-10 rounded-xl
         border border-border/80 hover:border-border
         bg-gradient-to-b from-card/50 to-background/50
         dark:from-[#1A1A1A]/50 dark:to-[#151515]/50
         hover:from-card/60 hover:to-background/60
         transition-all duration-300
         hover:shadow-lg hover:shadow-foreground/5"
>


<!-- <div class="relative p-10 rounded-xl 
            border border-border/40 hover:border-border/60
            bg-[#1A1A1A]/50 ___bg-card/50 hover:bg-[#1A1A1A]/70
            transition-all duration-300
            hover:shadow-lg hover:shadow-primary/5"> -->
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-2xl font-semibold">Docs Lite</h3>
      </div>
      <div class="flex justify-center gap-3">
        <ProductStat count="1" icon="docs" />
        <ProductStat count="5" icon="scripts" />
      </div>
    </div>

    <!-- Price -->
    <div class="flex items-baseline gap-x-2">
      <span class="text-4xl font-medium">Free</span>
      <span class="text-lg text-muted-foreground">forever</span>
    </div>

    <!-- Features -->
    <ul class="space-y-3">
      {#each features as feature}
        <li class="flex items-center gap-3 group">
          <div class="h-5 w-5 rounded-full bg-muted/80
                      flex items-center justify-center shrink-0
                      group-hover:bg-muted transition-colors">
            <Check class="h-3 w-3 text-muted-foreground" />
          </div>
          <span class="text-lg text-muted-foreground group-hover:text-foreground
                       transition-colors">
            {feature}
          </span>
        </li>
      {/each}
    </ul>

    <!-- CTA Button -->
	<Button 
		variant="outline"
		class="w-full rounded-full font-medium
					border border-primary/30 hover:border-primary/40
					bg-primary/5 hover:bg-primary/10
					text-primary/90 hover:text-primary
					shadow hover:shadow-md hover:shadow-primary/10
					transition-all duration-300"
		on:click={() => showModal = true}
	>
		Get Free Template 
	</Button>
	</div>
</div>

<FreeAccessModal bind:open={showModal} />