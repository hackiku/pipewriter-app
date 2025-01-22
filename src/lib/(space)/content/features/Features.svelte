<!-- src/lib/(space)/content/features/Features.svelte -->
<script lang="ts">
	import Process from "./Process.svelte";
	import ExampleGroup from "./ExampleGroup.svelte";
	import TechStack from "./TechStack.svelte";
	import { uxExamples } from "../../data/examples";
</script>

<div class="relative">
	<!-- Opening Statement & Groups -->
	<div class="container relative h-[100vh] bg-blue-800/10">
		<!-- Problem Statement -->
		<div class="absolute w-full top-1/3 -translate-y-1/3">
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
		<div class="absolute left-[5vw] Xmd:left-[10%] bottom-[8vh]">
			<ExampleGroup example={uxExamples[0]} />
		</div>

	</div>

	<!-- Process Section -->
	<div class="relative px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
		<!-- Yellow Control Box -->
		<div
			class="sticky p-4 top-[5vh] md:top-[20vh] z-30 backdrop-blur-sm
              w-full lg:w-[40%] h-[35vh] md:h-[60vh]
              bg-yellow-700/10 z-10
              border border-red-500/50
              lg:ml-auto"
		>
			<ExampleGroup example={uxExamples[1]} />
		</div>

		<!-- Process Content -->
		<div class="container relative pr-12">
			<div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
				<div class="lg:col-span-3 space-y-2 pt-32 lg:pt-0">
					<Process />
				</div>
			</div>
		</div>
	</div>
	<!-- Tech Stack Section -->
	
	<TechStack />
	<!-- <div
	class="border border-border/50 bg-zinc-950/[0.05] dark:bg-white/[0.03]
	relative rounded-[2.5rem] mx-[3vw]"
	>
	</div> -->
</div>
