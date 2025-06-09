<!-- src/lib/pages/legal/LegalPage.svelte -->
<script lang="ts">
	import type { LegalPolicy } from './utils/policies';
	
	export let policy: LegalPolicy;
</script>

<article class="container mx-auto max-w-4xl px-4 py-32">
	<!-- <header class="mb-12 space-y-4">
		<h1 class="text-4xl font-bold text-foreground">
			{policy.title}
		</h1>
		<p class="text-muted-foreground">
			Last updated: {policy.lastUpdated}
		</p>
	</header> -->

	<div class="prose prose-zinc dark:prose-invert max-w-none 
		prose-headings:font-semibold prose-h1:text-5xl md:prose-h1:text-6xl prose-h2:text-2xl prose-h3:text-xl">
		<svelte:component this={policy.content} />
	</div>
</article>