<!-- $lib/components/cta/EarlyAccessButton.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ArrowUp } from "lucide-svelte";
  import * as Drawer from "$lib/components/ui/drawer";
  
  export let size: "default" | "lg" = "default";
  export let className = "";
  let open = false;
</script>

<Drawer.Root bind:open>
  <Drawer.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      class="relative group overflow-hidden {size === 'lg' ? 'h-12 text-lg' : 'h-10 text-sm'} 
             px-8 font-medium rounded-lg bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
             hover:shadow-md hover:shadow-primary/10 
             transition-all duration-300 {className}"
    >
      <span class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
      />
      
      <div class="relative z-10 flex items-center justify-center text-white">
        <div class="flex items-center gap-1.5 ml-3">
          <span class="transform transition-transform duration-300 group-hover:-translate-y-1">Early Access</span>
          <ArrowUp class="w-4 h-4 transform transition-all duration-300 
                         translate-y-4 opacity-0 
                         group-hover:translate-y-0 group-hover:opacity-100" />
        </div>
      </div>
    </Button>
  </Drawer.Trigger>

  <Drawer.Content>
    <div class="mx-auto w-full max-w-2xl px-4">
      <Drawer.Header class="text-center">
        <Drawer.Title class="text-3xl font-bold">10× Your Copy Decks</Drawer.Title>
        <Drawer.Description class="text-lg text-muted-foreground">
          Get writer-first wireframing tools in Google Docs
        </Drawer.Description>
      </Drawer.Header>
      
      <div class="flex flex-col items-center gap-8 p-4">
        <!-- CartButton centered -->
        <div>
          <slot name="cart-button" />
        </div>
        
        <!-- Mockup of Gumroad embed -->
        <div class="w-full aspect-video rounded-lg bg-black/5 backdrop-blur-sm 
                    border border-white/10 flex items-center justify-center">
          <span class="text-sm text-muted-foreground">Gumroad Embed Preview</span>
        </div>
      </div>

      <Drawer.Footer class="flex justify-center">
        <Drawer.Close asChild let:builder>
          <Button builders={[builder]} variant="ghost">Close</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>