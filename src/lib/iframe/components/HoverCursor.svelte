<!-- $lib/iframe/components/HoverCursor.svelte -->

<script lang="ts">
  import { Plus } from 'lucide-svelte';
  import * as Tooltip from "$lib/components/ui/tooltip";

  export let visible = false;
</script>

{#if visible}
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200">
        <Plus class="text-white" size={24} />
      </div>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Click to drop this element into your document</p>
    </Tooltip.Content>
  </Tooltip.Root>
{/if}

<style>
  div {
    opacity: 0;
  }

  div:hover {
    opacity: 1;
  }
</style>