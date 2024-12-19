<!-- lib/components/free/ExportButton.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Save, RotateCcw } from "lucide-svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { demoStore } from '$lib/stores/demoStore';

  export let icon = Save;
  export let text = "Export";
  export let showReset = false;
</script>

<div class="flex items-center gap-2">
  <Button on:click variant="default" size="sm">
    <svelte:component this={icon} class="w-4 h-4 mr-2" />
    {text}
  </Button>

  {#if showReset}
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          on:click={() => demoStore.reset()}
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
