<!-- // src/lib/components/cta/pricing/PricingGrid.svelte -->
<script lang="ts">
  import { plans } from '$data/pricing';
  import PricingCard from './PricingCard.svelte';
  import FreeCard from './FreeCard.svelte';
  import { ArrowUpRight } from 'lucide-svelte';
  
  export let showEmailSection = true;
  export let isDrawer = false;
</script>

<div class="grid gap-8 {isDrawer ? 'lg:grid-cols-1' : 'lg:grid-cols-5'}">
  <!-- Left Column -->
  <div class="lg:col-span-2 space-y-6">
    <!-- Trial Card -->
    <PricingCard 
      plan={plans[0]}
      className="bg-card/50 hover:bg-card/80 transition-colors"
    />
    
    <!-- Free Template Card -->
    <FreeCard />
  </div>
  
  <!-- Right Column (Main Product Card) -->
  <div class="lg:col-span-3">
    <PricingCard 
      plan={plans[1]}
      className="h-full shadow-lg hover:shadow-xl transition-all"
    />
  </div>
</div>

<!-- Email Section -->
{#if showEmailSection && !isDrawer}
  <div class="mt-16 flex flex-col items-center text-center">
    <a 
      href="mailto:ivan@pipewriter.io"
      class="inline-flex items-center gap-2 group"
    >
      <span class="text-xl md:text-2xl font-medium 
                   bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent
                   group-hover:opacity-80 transition-opacity">
        ivan@pipewriter.io
      </span>
      <ArrowUpRight class="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
    
    <p class="text-sm text-muted-foreground mt-4">
      Questions? Send me an email or check out the <a href="/faq" class="text-primary hover:underline">FAQ</a>
    </p>
  </div>
{/if}
