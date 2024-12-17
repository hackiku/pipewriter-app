<!-- $lib/components/cta/EarlyAccess.svelte -->
<script lang="ts">
  import GumroadCartButton from "./GumroadCartButton.svelte";
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";
  
  export let open = false;
</script>

<Drawer.Root bind:open>
  <Drawer.Content>
    <div class="mx-auto w-full max-w-2xl px-4">
      <Drawer.Header class="text-center">
        <Drawer.Title class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED]">
          Writer-First Wireframing
        </Drawer.Title>
        <Drawer.Description class="text-lg text-muted-foreground mt-2">
          Join the first wave of copywriters using AI-powered design tools
        </Drawer.Description>
      </Drawer.Header>
      
      <div class="flex flex-col items-center gap-8 p-4">
        <GumroadCartButton text="Get Early Access $59" source="early_drawer" className="w-full max-w-sm"/>
        
        <!-- Mockup of future Gumroad embed -->
        <div class="w-full max-w-2xl aspect-[4/3] rounded-lg bg-black/5 backdrop-blur-sm 
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