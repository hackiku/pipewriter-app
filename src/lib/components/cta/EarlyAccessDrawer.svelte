<!-- $lib/components/cta/EarlyAccessDrawer.svelte -->
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";
  import { drawerStore } from '$lib/stores/earlyAccessStore';
  import { onDestroy } from 'svelte';
  
  let isOpen = false;
  $: isOpen = $drawerStore.isOpen;
  
  function handleOpenChange(open: boolean) {
    if (!open) drawerStore.close();
  }

  onDestroy(() => {
    drawerStore.reset();
  });
</script>

<Drawer.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
  <slot name="trigger" />
  
  <Drawer.Portal>
    <Drawer.Overlay class="fixed inset-0 bg-black/40 z-50" />
    <Drawer.Content 
      class="fixed bottom-0 left-0 right-0 z-50 
             bg-background border-t border-border
             rounded-t-[10px] shadow-lg"
    >
      <!-- Drawer Handle -->
      <div class="mx-auto w-full max-w-5xl">
        <div class="flex h-7 items-center justify-center">
          <div class="w-12 h-1.5 rounded-full bg-muted/60" />
        </div>
      </div>

      <!-- Main Content -->
      <div class="mx-auto w-full max-w-5xl px-6 pb-6">
        <!-- <Drawer.Header class="text-center pb-4">
          <Drawer.Title class="text-2xl font-bold">Early Access</Drawer.Title>
          <Drawer.Description class="text-muted-foreground">
            Join the beta program for Pipewriter
          </Drawer.Description>
        </Drawer.Header> -->
        
        <!-- Scrollable Content Area -->
        <div class="relative max-h-[calc(80vh-12rem)] overflow-y-auto">
          <slot />
        </div>

        <Drawer.Footer class="flex justify-center pt-4">
          <Drawer.Close asChild let:builder>
            <Button 
              variant="ghost" 
              builders={[builder]}
            >
              Close
            </Button>
          </Drawer.Close>
        </Drawer.Footer>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>