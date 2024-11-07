<!-- $lib/iframe/Frame.svelte -->

<script lang="ts">
	import { onMount } from "svelte";
	import { fade, slide } from "svelte/transition";
	import * as Resizable from "$lib/components/ui/resizable";
	
	import Dropper from "./layout/Dropper.svelte";
	import TopBar from "./layout/TopBar.svelte";
	import BottomBar from "./layout/BottomBar.svelte";
	import Tabs from "./layout/Tabs.svelte";
	import AppAbout from "./layout/AppAbout.svelte";
	
	import { elements } from "./elements";
	import { showInfo, zenMode } from "./stores";
	import { showAboutModal } from "./stores/aboutStore";

	function callGAS(action: string, payload: Record<string, any> = {}) {
    const message = {
      action,
      payload: {
        ...payload
      }
    };
    console.log('Frame forwarding message:', message);
    window.parent.postMessage(JSON.stringify(message), "*");
  }

  function handleMessage(event: MessageEvent) {
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      console.log("Frame received message:", data);
			
      if (data.action) {
        callGAS(data.action, data.payload || {});
      }
		} catch (error) {
			console.error("Error handling message:", error);
		}
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

<main class="flex flex-col h-[95vh] overflow-hidden -my-4 -mx-1">
	<section class="flex-none">
		<TopBar />
		<hr />
	</section>

	<div class="flex-1 overflow-hidden">
		<Resizable.PaneGroup direction="vertical" class="h-full">
			<Resizable.Pane defaultSize={65} minSize={30} maxSize={88}>
				<Dropper {elements} {callGAS} on:elementDropped={handleElementDrop} />
			</Resizable.Pane>

			<Resizable.Handle withHandle />

			<Resizable.Pane defaultSize={35}></Resizable.Pane>
		</Resizable.PaneGroup>
	</div>

	{#if !$zenMode}
		<section
			class="fixed bottom-0 w-[16.8rem] flex-none"
			in:fade={{ duration: 200 }}
			out:slide={{ duration: 200, axis: "y" }}
		>
			<div class="mb-2">
				<Tabs />
			</div>
			<AppAbout />
			<BottomBar />
		</section>
	{/if}
</main>
