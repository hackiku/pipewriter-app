<!-- src/lib/components/cta/pricing/PricingGrid.svelte -->
<script lang="ts">
  import ProCard from './cards/ProCard.svelte';
  import FreeCard from './cards/FreeCard.svelte';
  import ContactCard from './cards/ContactCard.svelte';
</script>

<div class="grid gap-8 sm:grid-cols-5">
  <!-- Left Column -->
  <div class="sm:col-span-2 space-y-6">
    <FreeCard />
    <ContactCard />
  </div>
  
  <!-- Right Column (Main Pro Card) -->
  <div class="sm:col-span-3">
    <ProCard
      className="h-full shadow-lg hover:shadow-xl 
                 hover:shadow-primary/5 transition-all duration-300"
    />
  </div>
</div>
