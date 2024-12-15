<!-- src/lib/pages/ai/AiPage.svelte -->
<script lang="ts">
	import EarlyButton from "$lib/components/EarlyButton.svelte";
	import Process from "./Process.svelte";
	import VideoDemo from "./VideoDemo.svelte";
	import LiveDemo from "./LiveDemo.svelte";

	import GumroadSection from "./GumroadSection.svelte";
	import { ExternalLink, ArrowRight, Download, Sparkles } from "lucide-svelte";

	const downloadHtml = async () => {
		try {
			const response = await fetch("/samples/horse-tinder/index.html");
			const htmlContent = await response.text();
			const blob = new Blob([htmlContent], { type: "text/html" });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "landing-page.html";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error downloading HTML:", error);
		}
	};
</script>

<main class="bg-background text-foreground">
	<!-- Hero Section -->
	<section class="relative min-h-[50vh] flex items-center XXXborder-b">
		<div class="container relative z-10 pt-20">
			<div class="max-w-3xl mx-auto text-center my-12">
				<!-- New Feature Banner -->
				<div
					class="inline-flex items-center gap-1.5 px-3 py-1 mb-8 rounded-full bg-primary/10 text-primary border border-primary/20"
				>
					<Sparkles class="w-4 h-4" />
					<span class="text-sm font-medium">New AI Feature</span>
				</div>

				<h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6">
					Google Docs Wire <br />to Live Website
				</h1>
				<p class="text-2xl text-muted-foreground mb-8">
					With 2× <kbd
						class="inline-flex items-center px-2 py-1.5 -mb-1 text-sm font-semibold text-muted-foreground bg-muted rounded border shadow-sm"
						>click</kbd
					>
					and 2×
					<kbd
						class="inline-flex items-center px-2 py-1.5 -mb-1 text-sm font-semibold text-muted-foreground bg-muted rounded border shadow-sm"
						>Ctrl</kbd
					>
					+
					<kbd
						class="inline-flex items-center px-2 py-1.5 -mb-1 text-sm font-semibold text-muted-foreground bg-muted rounded border shadow-sm"
						>C</kbd
					>
				</p>
				<EarlyButton />
			</div>
		</div>
	</section>

	<!-- Video Demo Section -->
	<section class="py-8 bg-background">
		<VideoDemo />
	</section>

	<!-- Process Section -->
	<section class="py-20 bg-background">
		<Process />
	</section>

	<!-- Live Demo Section -->
	<section class="py-20 bg-background">
		<h2 class="text-center text-2xl sm:text-5xl md:text-5xl font-semibold mb-10">
			See it Live
		</h2>
			<LiveDemo />
			
	</section>
	<!-- Pricing Section -->
	<GumroadSection />

	<!-- <section class="h-72 bg-indigo-500 bg-opacity-10"></section> -->
	 
</main>

<style>
	kbd {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
			"Liberation Mono", "Courier New", monospace;
	}
</style>
