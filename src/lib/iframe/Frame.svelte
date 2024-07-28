<!-- $lib/iframe/Frame.svelte -->
<script lang="ts">
  import ColorPicker from '$lib/iframe/ColorPicker.svelte';	
  import Dropper from '$lib/iframe/Dropper.svelte';
  import TopBar from '$lib/iframe/TopBar.svelte';	
  // import BottomBar from '$lib/iframe/BottomBar.svelte';
  import { elements } from '$lib/iframe/elements.ts';

  // Dummy callGAS function for demonstration purposes
  function callGAS(action: string, params: Record<string, any>) {
    console.log(`Action: ${action}`, params);
  }
</script>

<!-- --------------------- TOP BAR --------------------------------- -->

<main class="flex flex-col gap-4">
	
	<section>
		<TopBar />
	</section>
	
	<hr>
  
	<!-- <div class="h-[50vh] overflow-scroll-y"> -->
		<div class="h-[50vh] overflow-hidden overflow-y-auto custom-scrollbar">
			<Dropper {elements} {callGAS} />
		</div>
		
	<hr>
	
	<ColorPicker />

</main>


<style>
	.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 1px solid transparent; 
  background-clip: content-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

</style>