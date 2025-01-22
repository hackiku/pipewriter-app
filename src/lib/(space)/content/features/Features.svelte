<!-- src/lib/(space)/content/features/Features.svelte -->
<script lang="ts">
	import Process from "./Process.svelte";
	import ExampleGroup from "./ExampleGroup.svelte";
	import TechStack from "./TechStack.svelte";
	import { uxExamples } from "../../data/examples";
</script>

<div class="relative">
	<!-- Opening Statement & Groups -->
	<div class="container relative min-h-[100vh] bg-blue-800/10">
		<!-- Problem Statement -->
		<div class="absolute w-full top-1/2 -translate-y-1/2">
			<h3
				class="text-2xl md:text-3xl text-center leading-relaxed max-w-xl mx-auto"
			>
				Your rockets rock hard but your website feels like 1969?
				<span class="text-muted-foreground"
					>You need a Chute Repack. Redesign sprint in your code stack to wow users & investors.</span
				>
		</h3>
		</div>

		<!-- Example Groups -->
		<div class="absolute left-[5%] md:left-[10%] top-[20vh]">
			<ExampleGroup example={uxExamples[0]} />
		</div>

		<!-- <div class="absolute right-[5%] md:right-[10%] bottom-[20vh]">
			<ExampleGroup example={uxExamples[1]} />
		</div> -->
	</div>

	<!-- Process Section -->
	<div class="relative px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
		<!-- Yellow Control Box -->
		<div
			class="sticky top-6 z-30 backdrop-blur-sm
              w-full lg:w-[45%] h-[40vh] lg:h-[70vh]
              bg-yellow-700/10 z-10
              border border-red-500/50
              lg:ml-auto"
		>
			<ExampleGroup example={uxExamples[1]} />
		</div>

		<!-- Process Content -->
		<div class="container relative">
			<div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
				<div class="lg:col-span-3 space-y-32 pt-32 lg:pt-0">
					<Process />
				</div>
			</div>
		</div>
	</div>
	<!-- Tech Stack Section -->
	
	<div
		class="border border-border/50 bg-zinc-950/[0.05] dark:bg-white/[0.03]
              relative rounded-[2.5rem] mx-[3vw]"
	>
		<TechStack />
	</div>
</div>
