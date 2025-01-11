<!-- src/lib/(space)/repacks/firefly/sections/Vehicles.svelte -->
<script lang="ts">
  import { vehicles } from '../data/vehicles';
  import ProductCard from '../components/products/ProductCard.svelte';
  import ProductModal from '../components/products/ProductModal.svelte';
  import SecondaryButton from '../components/cta/SecondaryButton.svelte';
  import { fireflyStore } from '../stores/fireflyStore';
  import { ArrowUpDown } from 'lucide-svelte';
</script>

<section class="py-24 bg-black relative">
  <div class="container">
    <!-- Header -->
    <div class="flex justify-between items-start mb-16">
      <div class="space-y-2">
        <h2 class="text-lg text-[#F5FF00] font-medium tracking-wider">
          VEHICLES
        </h2>
        <h3 class="text-4xl font-light text-white">
          Launch Solutions
        </h3>
      </div>

      <SecondaryButton>
        <span>Compare</span>
        <ArrowUpDown class="ml-2 h-4 w-4" />
      </SecondaryButton>
    </div>

    <!-- Grid -->
    <div class="grid md:grid-cols-2 gap-8">
      {#each vehicles as vehicle (vehicle.id)}
        <ProductCard {vehicle} />
      {/each}
    </div>
  </div>

  <!-- Modal -->
  <ProductModal />
</section>