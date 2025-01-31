<!-- src/lib/components/cta/pricing/PricingGrid.svelte -->
<script lang="ts">
  import { plans } from '$data/pricing';
  import ProCard from './cards/ProCard.svelte';
  import FreeCard from './cards/FreeCard.svelte';
  import ContactCard from './cards/ContactCard.svelte';
  
  export let isDrawer = false;
</script>

<div class="grid gap-8 sm:grid-cols-5">
  <!-- Left Column -->
  <div class="sm:col-span-2 space-y-6">
    <FreeCard plan={plans[0]}/>
    <ContactCard />
  </div>
  
  <!-- Right Column (Main Pro Card) -->
  <div class="sm:col-span-3">
    <ProCard
      plan={plans[1]}
      className="h-full bg-zinc-950 border-primary/20 hover:border-primary/40
                shadow-lg hover:shadow-xl hover:shadow-primary/5
                transition-all duration-300"
    />
  </div>
</div>