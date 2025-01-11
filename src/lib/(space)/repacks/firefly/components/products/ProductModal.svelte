<!-- src/lib/(space)/repacks/firefly/components/products/ProductModal.svelte -->
<script lang="ts">
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from "$lib/components/ui/dialog";
  import { X } from "lucide-svelte";
  import { vehicles } from "../../data/vehicles";
  import { fireflyStore } from "../../stores/fireflyStore";
  
  $: selectedVehicle = vehicles.find(v => v.id === $fireflyStore.selectedVehicleId);
</script>

<Dialog 
  open={$fireflyStore.isModalOpen} 
  onOpenChange={() => fireflyStore.closeModal()}
>
  <DialogContent class="bg-black/95 border-[#F5FF00]/20 max-w-4xl">
    <!-- Close Button -->
    <button
      class="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
      on:click={() => fireflyStore.closeModal()}
    >
      <X class="h-4 w-4" />
    </button>

    {#if selectedVehicle}
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Image -->
        <div class="aspect-square bg-zinc-900 rounded overflow-hidden">
          <img 
            src={selectedVehicle.image} 
            alt={selectedVehicle.name}
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Content -->
        <div class="space-y-6">
          <DialogHeader>
            <DialogTitle class="text-2xl font-light">
              {selectedVehicle.name}
            </DialogTitle>
          </DialogHeader>

          <p class="text-zinc-400">
            {selectedVehicle.description}
          </p>

          <!-- Specs -->
          <div class="grid grid-cols-2 gap-4">
            {#each Object.entries(selectedVehicle.specs) as [key, value]}
              <div class="space-y-1">
                <div class="text-[#F5FF00] text-sm tracking-wider uppercase">
                  {key}
                </div>
                <div class="text-white">{value}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </DialogContent>
</Dialog>