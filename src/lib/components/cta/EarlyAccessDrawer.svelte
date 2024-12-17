<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";
  
  export let open = false;
</script>

<Drawer.Root bind:open>
  <slot name="trigger" />
  <Drawer.Content class="bg-background mt-24">
    <div class="mx-auto w-full max-w-2xl">
      <Drawer.Header class="text-center">
        <Drawer.Title>Early Access</Drawer.Title>
        <Drawer.Description>
          Join the beta program for Pipewriter
        </Drawer.Description>
      </Drawer.Header>
      
      <div class="p-4">
        <slot />
      </div>

      <Drawer.Footer class="flex justify-center">
        <Drawer.Close asChild let:builder>
          <Button builders={[builder]} variant="ghost">Close</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>