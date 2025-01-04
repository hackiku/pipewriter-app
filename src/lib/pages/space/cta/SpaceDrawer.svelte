<!-- src/lib/pages/space/SpaceDrawer.svelte -->
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { spaceDrawerStore } from '$lib/stores/spaceDrawerStore';
  import { onDestroy } from 'svelte';
  import { X } from 'lucide-svelte';
  import Calendar from './Calendar.svelte';
  
  let isOpen = false;
  $: isOpen = $spaceDrawerStore.isOpen;

  let email = '';
  let message = '';
  
  function handleOpenChange(open: boolean) {
    if (!open) spaceDrawerStore.close();
  }

  function handleClose() {
    spaceDrawerStore.close();
  }

  async function handleSubmit() {
    // Add form submission logic
    console.log('Form submitted:', { email, message });
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
      class="fixed bottom-0 left-0 right-0 z-50 
             bg-background border-t border-border
             rounded-t-[10px] shadow-lg
             overflow-hidden"
    >
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

      <div class="mx-auto w-full max-w-5xl h-[85vh] p-6">
        <div class="grid md:grid-cols-2 gap-8 h-full">
          <!-- Cal.com Embed -->
          <div class="h-full">
            <Calendar />
          </div>

          <!-- Contact Form -->
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold mb-2">Quick Message</h3>
              <p class="text-muted-foreground mb-4">
                Or drop us a line and we'll get back to you within 24 hours.
              </p>
            </div>

            <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
              <div>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  bind:value={email}
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Tell us about your project..."
                  bind:value={message}
                  rows="4"
                />
              </div>

              <Button type="submit" class="w-full">
                Send Message
              </Button>

              <p class="text-sm text-muted-foreground text-center">
                Or email directly: 
                <a href="mailto:ivan@pipewriter.io" class="text-primary hover:underline">
                  ivan@pipewriter.io
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>