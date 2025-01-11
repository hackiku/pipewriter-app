<!-- src/lib/(space)/repacks/firefly/components/products/ProductCard.svelte -->
<script lang="ts">
  import { fireflyStore } from '../../stores/fireflyStore';
  
  export let vehicle: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
</script>

<button
  class="group relative w-full text-left border border-[#F5FF00]/20 p-6
         hover:bg-[#F5FF00]/[0.03] transition-colors duration-300"
  on:click={() => fireflyStore.selectVehicle(vehicle.id)}
>
  <!-- Content -->
  <div class="space-y-4">
    <div class="aspect-video bg-zinc-900 rounded overflow-hidden">
      <img 
        src={vehicle.image} 
        alt={vehicle.name}
        class="w-full h-full object-cover"
      />
    </div>
    
    <div class="space-y-2">
      <h4 class="text-xl text-white group-hover:text-[#F5FF00] transition-colors">
        {vehicle.name}
      </h4>
      <p class="text-zinc-400">{vehicle.description}</p>
    </div>
  </div>

  <!-- Hover Border Effect -->
  <div class="absolute inset-0 border border-[#F5FF00]/0 
              group-hover:border-[#F5FF00]/20 transition-colors" />
</button>