<!-- $lib/components/free/FreeForm.svelte -->

<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Save } from "lucide-svelte";
  import FreeFormDialog from './FreeFormDialog.svelte';
  
  export let showReset = false;
  export let text = "Export";
  export let icon = Save;
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger>
    <Button variant="default" size="sm">
      <svelte:component this={icon} class="w-4 h-4 mr-2" />
      {text}
    </Button>
  </AlertDialog.Trigger>
  
  <FreeFormDialog {showReset} />
</AlertDialog.Root>