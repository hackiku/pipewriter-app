<!-- $lib/gdocs/TopBar.svelte -->
<script lang="ts">
	import { toggleMode } from "mode-watcher";
  import { showLabels } from '$lib/iframe/stores';
	import { Eye, Sun, Moon } from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";

  function toggleShowLabels() {
    showLabels.update(n => !n);
  }


  let pressedColor = '#3801cd';
</script>

<div class="flex items-center">
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
	
			<!-- Dark Mode -->
			<Button on:click={toggleMode} variant="outline" size="icon">
      	<Sun
        	class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      	/>
      	<Moon
        	class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      	/>
      	<span class="sr-only">Toggle theme</span>
    </Button>

		</div>
	</div>
</div>
