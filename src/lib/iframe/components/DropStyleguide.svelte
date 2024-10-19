<!-- $lib/iframe/components/DropStyleguide.svelte -->

<script lang="ts">
  import { Type } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  
  function callGAS(action: string, params: Record<string, any>) {
    const message = { action, params };
    window.parent.postMessage(JSON.stringify(message), '*');
  }
</script>

<div class="flex justify-between items-center w-full mb-4">
  <div class="flex gap-2">
    <Button
      variant="outline"
      size="icon"
      class="rounded-full bg-gray-500 hover:bg-gray-600 text-white"
      on:click={() => callGAS("getElement", { elementId: "styleguide" })}
      title="Style Guide"
    >
      <Type class="h-4 w-4" />
    </Button>
  </div>
</div>