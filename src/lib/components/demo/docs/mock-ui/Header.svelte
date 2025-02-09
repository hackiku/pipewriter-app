<!-- src/lib/components/demo/docs/mock-ui/Header.svelte -->
<script lang="ts">
	import Dropdown from "./Dropdown.svelte";

	const menuItems = ["File", "Edit", "View", "Insert", "...", "Pipewriter"];
	let isDropdownOpen = false;
</script>

<div class="flex flex-col px-4">
	<div class="flex bg-white dark:bg-zinc-900 items-center py-2 justify-between">
		<!-- Logo Column -->
		<div class="flex items-center gap-2 w-16">
			<img src="/tools/gdocs.svg" alt="Google Docs" class="h-14 p-2" />

			<!-- Content Column -->
			<div class="flex flex-col mt-1">
				<!-- Document Title -->
				<span class="text-md -mb-1 font-medium text-zinc-700 dark:text-zinc-300">
					Landing Page v1
				</span>

				<!-- Menu Bar -->
				<div class="flex items-center gap-3 text-lg">
					{#each menuItems as item}
						{#if item === "Pipewriter"}
							<Dropdown
								on:click={() => (isDropdownOpen = !isDropdownOpen)}
								open={isDropdownOpen}
								on:close={() => (isDropdownOpen = false)}
							>
								<button
									class="_text-[13px] text-zinc-600 hover:text-zinc-900
                          dark:text-zinc-400 dark:hover:text-zinc-200"
								>
									{item}
								</button>
							</Dropdown>
						{:else}
							<button
								class="text-[13px] text-zinc-600 hover:text-zinc-900
                        dark:text-zinc-400 dark:hover:text-zinc-200"
							>
								{item}
							</button>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- user mock -->
		<div class="bg-foreground/30 rounded-full h-8 w-8 aspect-square"></div>
	</div>

	<!-- Toolbar -->
	<div class="h-[38px] w-[50vw] relative">
		<!-- Fixed height instead of h-full -->
		<img
			src="/demo/assets/docs-toolbar.svg"
			alt="Google Docs Toolbar"
			class="h-full w-full object-cover object-left block dark:hidden"
		/>
		<img
			src="/demo/assets/docs-toolbar-dark.svg"
			alt="Google Docs Toolbar"
			class="h-full w-full object-cover object-left  hidden dark:block"
		/>

		<div
			class="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-r from-transparent
           to-[#F9FBFD] dark:to-zinc-900 pointer-events-none"
		></div>
	</div>
</div>
