<!-- src/lib/components/cta/buy/BuyDrawer.svelte -->
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { X } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { buyStore } from '$lib/stores/buyStore';
  import PricingGrid from "../pricing/PricingGrid.svelte";
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  let isOpen = false;
  let isPeeking = false;
  $: isOpen = $buyStore.drawer.isOpen;
  
  onMount(() => {
    if (!browser) return;

    // Set up hover watchers for peek functionality
    const buttons = document.querySelectorAll('[data-buy-button]');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handlePeek);
      button.addEventListener('mouseleave', handleUnpeek);
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handlePeek);
        button.removeEventListener('mouseleave', handleUnpeek);
      });
    };
  });

  function handlePeek() {
    if (!isOpen) isPeeking = true;
  }

  function handleUnpeek() {
    isPeeking = false;
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      buyStore.closeDrawer();
      isPeeking = false;
    }
  }

  function handleClose() {
    buyStore.closeDrawer();
    isPeeking = false;
  }

  onDestroy(() => {
    if (browser) {
      buyStore.reset();
    }
  });

  $: overlayClasses = cn(
    "fixed inset-0 bg-black/40 z-50 backdrop-blur-sm",
    "transition-opacity duration-300",
    (!isOpen && !isPeeking) ? "opacity-0" : "opacity-100"
  );

  $: contentClasses = cn(
    "fixed bottom-0 left-0 right-0 z-50",
    "bg-background border-t border-border",
    "rounded-t-[10px] shadow-lg",
    "transition-transform duration-300",
    isPeeking && !isOpen ? "translate-y-[98%]" : "",
    isOpen ? "translate-y-0" : "",
    !isOpen && !isPeeking ? "translate-y-full" : ""
  );
</script>

<Drawer.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
  <slot name="trigger" />
  
  <Drawer.Portal>
    <Drawer.Overlay 
      class={overlayClasses}
      on:click={handleClose}
    />
    <Drawer.Content class={contentClasses}>
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
      <div class="mx-auto w-full max-w-5xl px-6 overflow-y-auto
                  scrollbar-none" 
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

<style>
  /* Hide scrollbar but keep functionality */
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
</style>