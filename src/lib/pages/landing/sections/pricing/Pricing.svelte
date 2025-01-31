<!-- src/lib/pages/landing/sections/pricing/Pricing.svelte -->
<script lang="ts">
  import PricingGrid from "$lib/components/cta/pricing/PricingGrid.svelte";

</script>

<div class="container max-w-5xl">
  <div class="text-center mb-16">
    <h2 class="text-[5vh] md:text-[6vh] lg:text-[7vh] 
              font-medium leading-[1.1] tracking-tight mb-16
              max-w-[20ch] mx-auto text-center">
      Start Pipewriting Away
    </h2>
    <!-- <p class="text-xl text-muted-foreground">
      Start with a $1 trial or go all-in with the complete toolkit.
    </p> -->
  </div>

	<PricingGrid />
</div> 