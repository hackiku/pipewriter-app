<!-- $lib/iframe/components/DropStyleguide.svelte -->

<script lang="ts">
  import { Type } from 'lucide-svelte';
  import OutlineButton from './OutlineButton.svelte';
  
  function callGAS(action: string, params: Record<string, any>) {
    const message = { action, params };
    window.parent.postMessage(JSON.stringify(message), '*');
  }
</script>

<OutlineButton
  icon={Type}
  label="Style Guide"
  onClick={() => callGAS("getElement", { elementId: "styleguide" })}
/>