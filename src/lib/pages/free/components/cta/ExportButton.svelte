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
  export let variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" = "default";

  let isHovered = false;

  function handleReset(event: MouseEvent) {
    event.stopPropagation();
    editorStore.reset();
  }
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger>
    <div class="flex items-center gap-2">
      <Button 
        {variant}
        size={iconOnly ? "icon" : "sm"}
        class={cn(
          "relative overflow-visible transition-[width,box-shadow] duration-300 ease-out",
          "inline-flex items-center justify-center",
          iconOnly && "w-10",
          isHovered && iconOnly && "w-auto px-4",
          !iconOnly && "gap-2 px-4",
          "hover:ring-2 hover:ring-primary/20"
        )}
        on:mouseenter={() => isHovered = true}
        on:mouseleave={() => isHovered = false}
      >
        <!-- Content wrapper -->
        <div class="flex items-center justify-center gap-3">
          <svelte:component this={icon} class="w-[1.2rem] h-[1.2rem]" />
          
          {#if !iconOnly || isHovered}
            <span class="whitespace-nowrap">{text}</span>
          {/if}
        </div>

        <!-- Glow effect -->
        <div
          class={cn(
            "absolute inset-0 -z-10",
            "rounded-md opacity-0 transition-opacity duration-300",
            "bg-primary/10",
            "blur-md",
            isHovered && "opacity-100"
          )}
        />
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