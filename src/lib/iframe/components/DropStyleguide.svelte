<!-- $lib/iframe/components/DropStyleguide.svelte -->

<script lang="ts">
	import { Type } from 'lucide-svelte';

	const callGAS = () => {
		return null;
	}

</script>

<!-- Style guide row -->
<div class="flex justify-between items-center w-full mb-4">
	<div class="flex gap-2">
		<button
			on:click={() => callGAS("getElement", { elementId: "styleguide" })}
			class="w-7 h-7 bg-gray-500 rounded-full border border-gray-400
        shadow-md hover:shadow-blue-300 hover:border-brandBlue transition-all"
			title="Style Guide"
		>
			<Type class="h-4 w-4 text-gray-700 mx-auto" />
		</button>
	</div>
</div>
