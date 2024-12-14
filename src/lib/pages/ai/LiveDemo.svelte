<!-- src/lib/pages/ai/LiveDemo.svelte -->
<script lang="ts">
	import { Download, ExternalLink } from "lucide-svelte";

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

<div class="max-w-4xl mx-auto">
	<div class="relative rounded-lg border overflow-hidden">
		<iframe
			src="/samples/horse-tinder/index.html"
			class="w-full h-[600px] border-0"
			title="Generated Landing Page Demo"
		></iframe>

		<!-- Gradient Overlay -->
		<div
			class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"
		>
			<div class="absolute bottom-0 left-0 right-0 p-6 text-center">
				<h3 class="text-xl font-semibold mb-4">
					See what you can build with Pipewriter
				</h3>
				<div class="flex gap-3 justify-center">
					<button
						class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground"
						on:click={downloadHtml}
					>
						<Download class="w-4 h-4 mr-2" />
						Download
					</button>
					<a
						href="/samples/horse-tinder/index.html"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex h-10 items-center justify-center rounded-md border bg-background px-6 text-sm font-medium"
					>
						<ExternalLink class="w-4 h-4 mr-2" />
						View Full Page
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
