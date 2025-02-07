<!-- src/lib/components/pricing/PricingGrid.svelte -->
<script lang="ts">
  import ProCard from './cards/ProCard.svelte';
  import FreeCard from './cards/FreeCard.svelte';
  import ContactCard from './cards/ContactCard.svelte';
</script>

<div class="grid gap-8 sm:grid-cols-8">
  <!-- Left Column -->
  <div class="sm:col-span-4 grid gap-6 order-2 sm:order-1">
    <div class="order-1 sm:order-1">
      <FreeCard />
    </div>
    <div class="order-3 sm:order-2">
      <ContactCard />
    </div>
  </div>
  
  <!-- Right Column (Main Pro Card) -->
  <div class="sm:col-span-4 order-1 sm:order-2">
    <ProCard
      className="h-full shadow-lg hover:shadow-xl 
                 hover:shadow-primary/5 transition-all duration-300"
    />
  </div>
</div>