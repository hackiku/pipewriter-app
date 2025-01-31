<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import DriveFolder from './DriveFolder.svelte';
  import DrivePreview from './DrivePreview.svelte';
  import { Button } from "$lib/components/ui/button";
  import { ShoppingCart } from 'lucide-svelte';
  
  let activeFeature: string | null = 'elements';

  function handleDriveSelect(id: string) {
    activeFeature = id;
  }

  function handleGumroadCheckout() {
    window.location.href = 'https://gum.co/pipewriter';
  }
</script>

<div class="relative">
  <!-- Desktop Layout -->
  <div class="hidden lg:grid grid-cols-4 gap-8">
    <!-- Left Column: Drive Folder & CTA -->
    <div class="relative">
      <div class="sticky top-28 space-y-6">
        <DriveFolder activeId={activeFeature} onSelect={handleDriveSelect} />
        <Button 
          variant="ghost" 
          class="w-full group"
          on:click={handleGumroadCheckout}
        >
          <ShoppingCart class="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
          <span class="opacity-50 group-hover:opacity-100 transition-opacity">Add to Cart</span>
        </Button>
      </div>
    </div>

    <!-- Right Column: Preview -->
    <div class="col-span-3">
      {#if activeFeature}
        <DrivePreview {activeFeature} />
      {/if}
    </div>
  </div>

  <!-- Mobile Layout -->
  <div class="lg:hidden space-y-6">
    <!-- Top Bar with Folder and Cart -->
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-3">
        <DriveFolder activeId={activeFeature} onSelect={handleDriveSelect} />
      </div>
      <Button 
        variant="ghost"
        size="icon"
        class="h-auto aspect-square"
        on:click={handleGumroadCheckout}
      >
        <div class="flex flex-col items-center gap-1">
          <ShoppingCart class="w-6 h-6" />
          <span class="text-xs">Buy</span>
        </div>
      </Button>
    </div>

    <!-- Preview Card -->
    {#if activeFeature}
      <DrivePreview {activeFeature} />
    {/if}
  </div>
</div>