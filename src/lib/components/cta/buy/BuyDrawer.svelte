<!-- src/lib/components/cta/buy/BuyDrawer.svelte -->
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { X } from 'lucide-svelte';
  import { buyStore } from '$lib/stores/buyStore';
  import PricingGrid from "../pricing/PricingGrid.svelte";
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  let isOpen = false;
  $: isOpen = $buyStore.drawer.isOpen;
  
  // Handle scrollbar compensation
  let scrollbarWidth = 0;
  
  onMount(() => {
    if (browser) {
      // Calculate scrollbar width once
      scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    }
  });

  function handleOpenChange(open: boolean) {
    if (!open) {
      buyStore.closeDrawer();
    } else if (browser) {
      // Add padding to prevent content shift when scrollbar disappears
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    }
  }

  function handleClose() {
    buyStore.closeDrawer();
    if (browser) {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
  }

  onDestroy(() => {
    if (browser) {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
    buyStore.reset();
  });
</script>

<Drawer.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
  <slot name="trigger" />
  
  <Drawer.Portal>
    <Drawer.Overlay 
      class="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
      on:click={handleClose}
    />
    <Drawer.Content 
      class="fixed bottom-0 left-0 right-0 z-50 
             bg-background border-t border-border
             rounded-t-[10px] shadow-lg"
    >
      <!-- Handle & Close -->
      <div class="mx-auto w-full">
        <div class="flex h-7 items-center justify-center relative">
          <div class="w-12 h-1.5 rounded-full bg-muted/60" />
          <button 
            class="absolute right-4 top-1/2 -translate-y-1/2 
                   text-muted-foreground hover:text-foreground
                   transition-colors p-1"
            on:click={handleClose}
          >
            <X class="h-4 w-4" />
            <span class="sr-only">Close</span>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="mx-auto w-full max-w-5xl overflow-y-auto px-6"
           style="height: calc(85vh - 2rem);">
        <div class="py-8">
          <!-- Header -->
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-3">
              Start Writing Better
            </h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose a plan that works for you. All plans include lifetime access
              and future updates at no additional cost.
            </p>
          </div>

          <!-- Pricing Grid -->
          <PricingGrid isDrawer={true} showEmailSection={false} />
        </div>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>