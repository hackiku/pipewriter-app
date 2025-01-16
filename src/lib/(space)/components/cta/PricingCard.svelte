<!-- src/lib/(space)/components/cta/PricingCard.svelte -->
<script lang="ts">
  import { Rocket } from "lucide-svelte";
  
  const features = [
    "7-day redesign",
    "On-brand ",
    "Production-ready code",
    "Conversion-focused UX"
  ];
</script>

<div class="rounded-xl border bg-card text-card-foreground">
  <!-- Header "Tab" -->
  <div class="bg-black/40 border-b rounded-t-xl px-6 py-4">
    <div class="flex items-center gap-2.5">
      <img src="pages/space/icons/parachute.svg" class="w-4 h-4 filter invert opacity-80" alt="" />
      <span class="text-sm font-medium tracking-wide uppercase text-muted-foreground">
        Chute Repack
      </span>
    </div>
  </div>
  
  <!-- Content -->
  <div class="p-6 space-y-8">
    <!-- Price -->
    <div class="flex items-baseline gap-2">
      <span class="text-5xl font-light tracking-tight">$3,000</span>
      <span class="text-lg text-muted-foreground">/page</span>
    </div>

    <!-- Features -->
    <ul class="space-y-4">
      {#each features as feature}
        <li class="flex items-start gap-3">
          <Rocket class="w-4 h-4 text-primary mt-1 opacity-80" />
          <span class="text-base text-muted-foreground">{feature}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>