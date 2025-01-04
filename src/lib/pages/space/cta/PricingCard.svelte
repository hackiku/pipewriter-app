<!-- src/lib/pages/space/PricingCard.svelte -->
 
<script lang="ts">
  import { Rocket } from "lucide-svelte";
	import SpaceButton from "./SpaceButton.svelte";

  
  const features = [
    "72-hour delivery guarantee",
    "Full redesign in your stack",
    "Performance optimization",
    "Technical SEO included"
  ];
</script>

<div class="p-8 rounded-xl border bg-card backdrop-blur-sm">
  <div class="space-y-8">
    <!-- Price -->
    <div>
      <div class="flex items-baseline gap-2">
        <span class="text-6xl font-bold tracking-tight">$2,000</span>
        <span class="text-xl text-muted-foreground">/page</span>
      </div>
      <p class="mt-2 text-muted-foreground">
        From wireframe to production code
      </p>
    </div>

    <!-- Features -->
    <ul class="space-y-4">
      {#each features as feature}
        <li class="flex items-start gap-3">
          <Rocket class="w-5 h-5 text-primary mt-1" />
          <span class="text-lg">{feature}</span>
        </li>
      {/each}
    </ul>

		<SpaceButton size="lg" />

    <!-- Added Value -->
    <div class="pt-4 border-t">
      <p class="text-sm text-muted-foreground">
        Includes <span class="text-primary">unlimited revisions</span> during the development phase
      </p>
    </div>
  </div>
</div>