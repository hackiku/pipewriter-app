<!-- $lib/components/cta/EarlyAccessDrawer.svelte -->
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";
  import { drawerStore } from '$lib/stores/earlyAccessStore';
  import { onDestroy } from 'svelte';
  
  let isOpen = false;
  $: isOpen = $drawerStore.isOpen;
  
  function handleClose() {
    drawerStore.close();
  }

  onDestroy(() => {
    drawerStore.reset();
  });
</script>

<Drawer.Root bind:open={isOpen}>
  <slot name="trigger" />
  
  {#if isOpen}
    <Drawer.Portal>
      <Drawer.Overlay class="fixed inset-0 bg-black/40 z-50" />
      <Drawer.Content 
        class="fixed bottom-0 left-0 right-0 bg-background z-50 
               border-t border-border shadow-lg rounded-t-xl"
      >
        <div class="mx-auto w-full max-w-2xl p-6">
          <div class="flex justify-center mb-2">
            <div class="w-12 h-1.5 rounded-full bg-muted" />
          </div>
          
          <Drawer.Header class="text-center">
            <Drawer.Title class="text-2xl font-bold">Early Access</Drawer.Title>
            <Drawer.Description class="text-muted-foreground">
              Join the beta program for Pipewriter
            </Drawer.Description>
          </Drawer.Header>
          
          <div class="p-4">
            <slot />
          </div>

          <Drawer.Footer class="flex justify-center">
            <Button 
              variant="ghost" 
              on:click={handleClose}
            >
              Close
            </Button>
          </Drawer.Footer>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  {/if}
</Drawer.Root>