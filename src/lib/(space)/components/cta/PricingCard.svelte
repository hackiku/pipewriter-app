<!-- src/lib/(space)/components/cta/PricingCard.svelte -->
<script lang="ts">
  import { Rocket, ChevronDown } from "lucide-svelte";
  import { slide } from 'svelte/transition';
  import { browser } from '$app/environment';
  
  let isExpanded = false;
  
  const features = [
    "7-day redesign",
    "Your stack & brand",
    "High conversion UX"
  ];
</script>

<div class="rounded-xl border bg-card text-card-foreground">
  <!-- Header with expand button -->
  <div class="bg-black/40 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-2.5">
      <img src="pages/space/icons/parachute.svg" class="w-4 h-4 filter invert opacity-80" alt="" />
      <span class="text-sm font-medium tracking-wide uppercase text-muted-foreground">
        Chute Repack
      </span>
    </div>
    
    <!-- Mobile expand button -->
    <button 
      class="lg:hidden rounded-full p-1.5 hover:bg-white/10 transition-all"
      on:click={() => isExpanded = !isExpanded}
    >
      <ChevronDown 
        class="w-4 h-4 transition-transform duration-200"
        style="transform: {isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}"
      />
    </button>
  </div>
  
  <!-- Content -->
  <div class="p-6 space-y-6">
    <!-- Price -->
    <div class="flex items-baseline gap-2">
      <span class="text-4xl lg:text-5xl font-light tracking-tight">$2000</span>
      <div class="flex flex-col text-muted-foreground">
        <span class="text-lg">/ page</span>
      </div>
    </div>
		<span class="text-sm text-muted-foreground/80">Less for more pages</span>

    <!-- Features list -->
    {#if !browser || isExpanded || window.matchMedia('(min-width: 1024px)').matches}
      <div transition:slide={{ duration: 200 }}>
        <ul class="space-y-4">
          {#each features as feature}
            <li class="flex items-start gap-3">
              <Rocket class="w-4 h-4 text-primary mt-1 opacity-80" />
              <span class="text-base text-muted-foreground">{feature}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>