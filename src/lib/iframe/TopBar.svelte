<!-- $lib/gdocs/TopBar.svelte -->
<script lang="ts">
  import { showLabels } from '$lib/iframe/stores';
  import { Eye } from 'lucide-svelte';

  function toggleShowLabels() {
    showLabels.update(n => !n);
  }


  let pressedColor = '#3801cd';
</script>

<div class="flex items-center py-2">
	<!-- title -->
	<div class="flex-1 flex justify-start gap-2.5 h-full">
		pipewriter
	</div>
	
	<!-- Buttons right -->
	<div class="flex-1 flex items-center justify-end gap-1">
		<div class="flex rounded-full gap-2">
			<!-- Show Labels Button -->
			<button on:click={toggleShowLabels} title="Show labels"
				class="hover:bg-zinc-100 transition-all rounded-full p-1"
			>
				<Eye class="h-4 w-4" stroke={$showLabels ? pressedColor : 'gray'} />
			</button>
	
			<!-- Dark Mode Toggle Placeholder -->
			<div class="h-4 w-4 border rounded-full"></div>
		</div>
	</div>
</div>
