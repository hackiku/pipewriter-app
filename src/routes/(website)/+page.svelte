<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Sparkles, FileText, Layout } from "lucide-svelte";
	import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
	import DropperGrid from "$lib/iframe/features/dropper/DropperGrid.svelte";
	import LogosMarquee from "$lib/components/LogosMarquee.svelte";
	import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
	import LoomVideo from "$lib/components/marketing/LoomVideo.svelte";
</script>

<BackgroundPattern />

<div class="flex flex-col min-h-screen">
	<main class="container flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
		<!-- Main Content -->
		<div class="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-20 lg:pt-40">
			<!-- Text Content -->
			<div class="flex flex-col items-start space-y-8 lg:w-[45%]">
				<div
					class="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary border border-primary/20"
				>
					<Sparkles class="w-4 h-4" />
					<span class="text-sm font-medium">Type + Prototype</span>
				</div>

				<h1
					class="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
				>
					Wireframes for Writers in Google Docs
				</h1>

				<EarlyAccessButton
					size="lg"
					fullWidth={true}
					source="hero-home"
				/>
			</div>

			<!-- Dropper Preview -->
			<div
				class="relative flex-1 lg:max-w-[500px] min-h-[300px] lg:min-h-[400px]"
			>
				<div
					class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-10"
				/>
				<div class="absolute inset-0 overflow-hidden">
					<DropperGrid />
				</div>
			</div>
		</div>

		<div class="py-8">
			<LogosMarquee />
		</div>

		<section class="bg-background">
			<h2 class="text-4xl text-center sm:text-5xl font-semibold mb-12">
				10× Your Copy Decks
			</h2>
		</section>

		<LoomVideo />

		<section class="py-16 flex flex-col items-center gap-12">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<!-- Feature cards -->
				<div class="flex flex-col items-center text-center group">
					<div class="mb-4">
						<FileText
							class="w-12 h-12 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
						/>
					</div>
					<h3 class="text-xl font-semibold mb-2">Native Docs App</h3>
					<p class="text-muted-foreground">
						Write and wireframe without leaving Google Docs
					</p>
				</div>

				<div class="flex flex-col items-center text-center group">
					<div class="mb-4">
						<Layout
							class="w-12 h-12 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
						/>
					</div>
					<h3 class="text-xl font-semibold mb-2">Fancy Formatted Docs</h3>
					<p class="text-muted-foreground">
						Pre-formatted templates that impress clients
					</p>
				</div>

				<div class="flex flex-col items-center text-center group">
					<div
						class="mb-4 font-bold text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-300"
					>
						80+
					</div>
					<h3 class="text-xl font-semibold mb-2">UI Elements</h3>
					<p class="text-muted-foreground">
						Components ready to copy and paste
					</p>
				</div>
			</div>
			
			<div class="flex flex-col items-center my-8">
				<h2 class="text-3xl text-center sm:text-4xl font-semibold mb-8">
					Check out writer-first prototyping
				</h2>
				<EarlyAccessButton
					size="lg"
					source="bottom-home"
				/>
			</div>
		</section>
	</main>
</div>