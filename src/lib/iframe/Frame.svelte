<!-- $lib/iframe/Frame.svelte -->
<script lang="ts">
	import { onMount } from "svelte";
	import { fade, slide } from "svelte/transition";
	import * as Resizable from "$lib/components/ui/resizable";

	import Dropper from "./layout/Dropper.svelte";
	import TopBar from "./layout/TopBar.svelte";
	import BottomBar from "./layout/BottomBar.svelte";
	import Tabs from "./layout/Tabs.svelte";

	import { elements } from "./elements";
	import { showInfo, zenMode } from "./stores";

	function callGAS(action: string, payload: Record<string, any> = {}) {
		const message = { action, payload };
		window.parent.postMessage(JSON.stringify(message), "*");
	}

	function handleMessage(event: MessageEvent) {
		console.log("Received message:", event.data);
	}

	onMount(() => {
		window.addEventListener("message", handleMessage);
		return () => {
			window.removeEventListener("message", handleMessage);
		};
	});

	function handleElementDrop(event: CustomEvent<{ elementId: string }>) {
		callGAS("getElement", { elementId: event.detail.elementId });
	}
</script>

<main class="flex flex-col h-[95vh] overflow-hidden -my-3 -mr-2">
	<!-- Top Section -->
	<section class="flex-none">
		<TopBar />
		<hr />
	</section>

	<!-- Middle Section with Resizable -->
	<div class="flex-1 overflow-hidden">
		<Resizable.PaneGroup direction="vertical" class="h-full">
			<Resizable.Pane defaultSize={60} minSize={30} maxSize={88}>
				<Dropper {elements} {callGAS} on:elementDropped={handleElementDrop} />
			</Resizable.Pane>

			<Resizable.Handle withHandle />

			<Resizable.Pane defaultSize={40}></Resizable.Pane>
		</Resizable.PaneGroup>
	</div>

	{#if !$zenMode}
		<!-- Bottom Section -->
		<section
			class="fixed bottom-0 w-[16.8rem] flex-none"
			in:fade={{ duration: 200 }}
			out:slide={{ duration: 200, axis: "y" }}
		>
			<div class="mb-2">
				<Tabs />
			</div>
			<div class="border-t border-gray-200 dark:border-gray-700">
				<BottomBar />
			</div>
		</section>
	{/if}
</main>
