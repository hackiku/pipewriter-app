<!-- $lib/iframe/Frame.svelte -->
<script lang="ts">
  import Dropper from '$lib/iframe/Dropper.svelte';
  import TopBar from '$lib/iframe/TopBar.svelte';
  // import ElementsDropper from '$lib/iframe/ElementsDropper.svelte';
  // import BottomBar from '$lib/iframe/BottomBar.svelte';
  import { elements } from '$lib/iframe/elements.ts';

  // Dummy callGAS function for demonstration purposes
  function callGAS(action: string, params: Record<string, any>) {
    console.log(`Action: ${action}`, params);
  }
</script>

<!-- --------------------- TOP BAR --------------------------------- -->

<main>
	<TopBar />
	<hr>
  <Dropper {elements} {callGAS} />
</main>
