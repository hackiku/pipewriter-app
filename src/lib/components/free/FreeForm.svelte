<!-- lib/components/free/FreeForm.svelte -->

<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import ExportButton from './ExportButton.svelte';
  import FreeFormDialog from './FreeFormDialog.svelte';
  
  export let showReset = false;
  export let text = "Export";
  export let icon = undefined;
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger asChild let:builder>
    <div>
      <ExportButton {text} {icon} {showReset} builders={[builder]} />
    </div>
  </AlertDialog.Trigger>
  
  <FreeFormDialog />
</AlertDialog.Root>

<style>
  :global(.alert-dialog-content) {
    margin: 1.5rem !important;
    padding: 1.5rem !important;
  }
  
  :global(.alert-dialog-overlay) {
    background: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(4px) !important;
  }
</style>
