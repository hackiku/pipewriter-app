<!-- src/lib/pages/landing/sections/features/WriterStep.svelte -->
<script lang="ts">
	import { fade } from "svelte/transition";
	import { shoutouts } from "../../data/shoutouts.ts"


	export let activeStep = 0;
</script>

<div class="space-y-6">
	<!-- Writer Info -->
	{#key activeStep}
		<!-- Quote -->
		<blockquote
			class="text-md font-medium text-muted-foreground"
			in:fade={{ duration: 200, delay: 100 }}
		>
			"{shoutouts[activeStep].quote}"
		</blockquote>

		<div class="flex items-center gap-4" in:fade={{ duration: 200 }}>
			<!-- Avatar -->
			<div class="w-10 h-10 rounded-full overflow-hidden border">
				<img
					src={shoutouts[activeStep].image}
					alt={shoutouts[activeStep].writer}
					class="w-full h-full object-cover"
				/>
			</div>

			<!-- Writer Details -->
			<div class="flex flex-col gap-1">
				<div class="text-sm font-medium">{shoutouts[activeStep].writer}</div>
				<div class="text-xs text-muted-foreground">
					{shoutouts[activeStep].role}
				</div>
			</div>

		</div>
	{/key}

	<!-- Step Navigation -->
	<div class="flex gap-2 pt-4">
		{#each shoutouts as _, i}
			<button
				class="w-2 h-2 rounded-full transition-colors duration-200
               {i === activeStep
					? 'bg-primary'
					: 'bg-muted hover:bg-primary/50'}"
				on:click={() => (activeStep = i)}
			>
				<span class="sr-only">Step {i + 1}</span>
			</button>
		{/each}
	</div>
</div>
