<!-- $lib/components/cta/EarlyAccessDrawer.svelte -->
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";
  import { drawerStore } from '$lib/stores/earlyAccessStore';
  import { onDestroy } from 'svelte';
  import { X } from 'lucide-svelte';
  
  let isOpen = false;
  $: isOpen = $drawerStore.isOpen;
  
  function handleOpenChange(open: boolean) {
    if (!open) drawerStore.close();
  }

  function handleClose() {
    drawerStore.close();
  }

  onDestroy(() => {
    drawerStore.reset();
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
             rounded-t-[10px] shadow-lg
             overflow-hidden"
    >
      <!-- Drawer Handle & Close Button -->
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

      <!-- Main Content Area -->
      <div 
        class="mx-auto w-full max-w-5xl overflow-hidden"
        style="height: calc(85vh - 2rem);"
      >
        <slot />
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>

<style>
  /* Prevent body scroll when drawer is open */
  :global(body.drawer-open) {
    overflow: hidden;
  }
</style>