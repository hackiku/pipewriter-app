<!-- src/lib/blog/components/LegalPost.svelte -->
<script lang="ts">
  import { Stars } from "lucide-svelte";
  import EmailOptin from "$lib/blog/components/cta/EmailOptin.svelte";
  export let post;
</script>

<article class="container text-foreground md:max-w-3xl smx-auto mt-32">
	<!-- Header section stays the same -->
	<header class="space-y-8 mb-16">
		<div class="space-y-2">
			{#if post.category}
				<div class="inline-flex items-center gap-1.5 px-3 py-1 
										rounded-full bg-primary/10 text-primary border border-primary/20">
					<Stars class="w-4 h-4" />
					<span class="text-sm font-medium">{post.category}</span>
				</div>
			{/if}

			<div class="flex items-center gap-3 text-sm text-muted-foreground">
				{#if post.date}
					<span>{post.date}</span>
				{/if}
				{#if post.readingTime}
					<span>·</span>
					<span>{post.readingTime}</span>
				{/if}
			</div>

			<h1 class="text-4xl sm:text-5xl font-medium leading-tight">
				{post.title}
			</h1>

			{#if post.excerpt}
				<p class="text-xl text-muted-foreground">
					{post.excerpt}
				</p>
			{/if}
		</div>
	</header>

	<!-- Content section with minimal prose styling -->
	<div class="prose prose-zinc dark:prose-invert max-w-none">
		<svelte:component this={post.content} />
	</div>

	<EmailOptin />
</article>