<!-- $lib/components/ui/DrawerWrapper.svelte -->
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";
  
  export let open = false;
</script>

<Drawer.Root bind:open>
  <Drawer.Content>
    <div class="mx-auto w-full">
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