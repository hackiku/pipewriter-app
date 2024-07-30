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

<main class="flex flex-col gap-2 overflow-none">
	
	<section>
		<TopBar />
	</section>
	
	<!-- <hr> -->
	
	<section class="h-[50vh] overflow-hidden overflow-y-auto custom-scrollbar mb-6">
		<Dropper {elements} {callGAS} />
	</section>
		
	<!-- <hr> -->
	
	<section class="mt-6">
		<ColorPicker />
	</section>

	<section>
		<p class="text-xs opacity-30">
			styles
		</p>
	</section>

	<hr class="border-1 border-gray-500 opacity-20 mt-4" />
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