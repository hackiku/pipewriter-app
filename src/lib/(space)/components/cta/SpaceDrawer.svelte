<!-- src/lib/(space)/components/cta/SpaceDrawer.svelte -->
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { X } from 'lucide-svelte';
  import { spaceDrawerStore } from '$lib/stores/spaceDrawerStore';
  import { onDestroy } from 'svelte';
  import Calendar from './Calendar.svelte';
  import SpaceForm from './SpaceForm.svelte';
  
  let isOpen = false;
  $: isOpen = $spaceDrawerStore.isOpen;

  function handleOpenChange(open: boolean) {
    if (!open) spaceDrawerStore.close();
  }

  function handleClose() {
    spaceDrawerStore.close();
  }

  onDestroy(() => {
    spaceDrawerStore.reset();
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
      class="fixed bottom-0 left-12 right-12 top-0 z-50 
             bg-background border-t border-border
             rounded-t-[10px] shadow-lg"
    >
      <!-- Header with price -->
      <div class="container py-6 border-b border-border/50">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-medium">Chute Repack</h2>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-medium">$2,000</span>
            <span class="text-muted-foreground">/page</span>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="container py-8">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Left: Form -->
          <SpaceForm />

          <!-- Right: Calendar -->
          <div class="h-[600px]">
            <Calendar />
          </div>
        </div>
      </div>

      <!-- Close button -->
      <button 
        class="absolute right-4 top-4 
               text-muted-foreground hover:text-foreground
               transition-colors p-2"
        on:click={handleClose}
      >
        <X class="h-5 w-5" />
        <span class="sr-only">Close</span>
      </button>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>