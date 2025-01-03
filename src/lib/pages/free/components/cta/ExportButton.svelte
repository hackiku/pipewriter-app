<!-- $lib/pages/free/components/cta/ExportButton.svelte -->
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Save, RotateCcw } from "lucide-svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { editorStore } from '../../stores/editorStore';
  import FreeFormDialog from './FreeFormDialog.svelte';
  import { cn } from "$lib/utils";

  export let text = "Export";
  export let icon = Save;
  export let showReset = false;
  export let iconOnly = false;

  function handleReset(event: MouseEvent) {
    event.stopPropagation();
    editorStore.reset();
  }
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger>
    <div class="flex items-center gap-2">
      <Button 
        variant="outline" 
        size={iconOnly ? "icon" : "sm"}
        class={cn(
          "relative",
          iconOnly ? "w-10" : "gap-2"
        )}
      >
        <svelte:component this={icon} class="w-[1.2rem] h-[1.2rem]" />
        {#if !iconOnly}
          <span>{text}</span>
        {/if}
      </Button>

      {#if showReset && !iconOnly}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              on:click={handleReset}
              class="rounded-full"
            >
              <RotateCcw class="w-4 h-4" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>Reset all copy</p>
          </Tooltip.Content>
        </Tooltip.Root>
      {/if}
    </div>
  </AlertDialog.Trigger>
  
  <FreeFormDialog {showReset} />
</AlertDialog.Root>