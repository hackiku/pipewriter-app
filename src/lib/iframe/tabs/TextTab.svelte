<!-- $lib/iframe/tabs/TextTab.svelte -->
<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import { fade, slide } from "svelte/transition";
	import { Button } from "$lib/components/ui/button";
	import {
		Save,
		Loader2,
		ThumbsUp,
		AlertCircle,
		Heading,
		ChevronDown,
	} from "lucide-svelte";
	import { getElement } from "../elements";
	import ElementCard from "../components/ElementCard.svelte";
	import { elementsTheme, showInfo } from "../stores";
	import { cn } from "$lib/utils";
	import OutlineButton from "../components/OutlineButton.svelte";
	import { GASCommunicator } from "../gasUtils";

	const headingOptions = [
		{
			value: "HEADING1",
			label: "<h1>Headline",
			description: "Heading 1",
			saved: false,
		},
		{
			value: "HEADING2",
			label: "<h2>Header",
			description: "Heading 2",
			saved: false,
		},
		{
			value: "HEADING3",
			label: "<h3>Feature Title",
			description: "Heading 3",
			saved: false,
		},

		{
			value: "HEADING4",
			label: "<button>CTA",
			description: "Heading 4",
			saved: false,
		},
		{
			value: "HEADING5",
			label: "<h5>Eyebrow",
			description: "Heading 5",
			saved: false,
		},
		{
			value: "HEADING6",
			label: "<p>Body text",
			description: "Heading 6",
			saved: false,
		},
		{
			value: "NORMAL",
			label: "Notes",
			description: "Normal text",
			saved: false,
		},
	];

	let numberSaved: number = 4;

	const dispatch = createEventDispatcher();
	const elementId = "styleguide";
	const element = getElement(elementId);
	const gas = GASCommunicator.getInstance(5000);

	let isProcessing = false;
	let status: StatusUpdate | null = null;
	let selectedHeading: string = headingOptions[0].value;
	let showOptions = false;

	interface StatusUpdate {
		type: "success" | "error" | "processing";
		message: string;
		executionTime?: number;
	}

	function getSelectedHeadingInfo() {
		return headingOptions.find((h) => h.value === selectedHeading);
	}

	async function handleStyleGuideInsert() {
		if (isProcessing) return;
		isProcessing = true;
		dispatch("processingStart");

		try {
			const response = await gas.sendMessage(
				"getElement",
				{
					elementId: "styleguide",
				},
				updateStatus,
			);

			if (!response.success) {
				throw new Error(response.error || "Failed to insert style guide");
			}
		} catch (error) {
			updateStatus({
				type: "error",
				message:
					error instanceof Error
						? error.message
						: "Failed to insert style guide",
			});
		} finally {
			isProcessing = false;
			dispatch("processingEnd");
		}
	}

	function handleSetHeading(value: string) {
		if (isProcessing) return;
		selectedHeading = value;
		showOptions = false;

		gas.sendMessage("setHeading", { heading: value }, updateStatus);
	}

	async function handleUpdateHeading() {
		if (isProcessing) return;
		isProcessing = true;
		dispatch("processingStart");

		try {
			const response = await gas.sendMessage("updateHeading", {}, updateStatus);
			if (!response.success) {
				throw new Error(response.error || "Failed to update styles");
			}
		} catch (error) {
			updateStatus({
				type: "error",
				message:
					error instanceof Error ? error.message : "Failed to update styles",
			});
		} finally {
			isProcessing = false;
			dispatch("processingEnd");
		}
	}

	function updateStatus(newStatus: StatusUpdate) {
		status = newStatus;
		if (newStatus.type !== "processing") {
			setTimeout(() => (status = null), 3000);
		}
	}

	$: statusClass =
		status &&
		{
			success: "bg-green-500/5 border-green-500/10 text-green-700",
			error: "bg-red-500/5 border-red-500/10 text-red-700",
			processing: "bg-blue-500/5 border-blue-500/10 text-blue-700",
		}[status.type];

	$: selectedInfo = getSelectedHeadingInfo();
</script>

{#if status}
	<div
		class="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center gap-2 border-t {statusClass}"
		transition:fade={{ duration: 200 }}
	>
		<div class="flex items-center gap-2">
			{#if status.type === "processing"}
				<Loader2 class="h-3 w-3 animate-spin" />
			{:else if status.type === "success"}
				<ThumbsUp class="h-3 w-3" />
			{:else if status.type === "error"}
				<AlertCircle class="h-3 w-3" />
			{/if}
			<span class="text-xs font-medium">{status.message}</span>
			{#if status.executionTime}
				<span class="text-xs opacity-50">({status.executionTime}ms)</span>
			{/if}
		</div>
	</div>
{/if}

<div class="relative flex flex-col items-stretch w-full gap-2 pt-4">
	{#if showOptions}
		<div
			class="relative z-10 w-full p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg"
			transition:slide={{ duration: 150, axis: "y" }}
		>
			<div class="flex flex-col gap-0.5">
				{#each headingOptions as option}
					<button
						class="w-full px-2 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700
                   transition-colors rounded-sm text-[10px] font-mono"
						on:click={() => handleSetHeading(option.value)}
					>
						<!-- if saved add x lucide-svelte icon to delete from saved, and give it a thicker border to indicate its saved -->
						<div class="flex items-center justify-between">
							<span class="opacity-70">{option.label}</span>
							<span class="text-[9px] text-muted-foreground"
								>{option.description}</span
							>
						</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<div class="flex gap-2 h-8 mb-2">
		<Button
			variant="outline"
			class="h-7 w-full justify-between px-3 font-mono text-xs"
			disabled={isProcessing}
			on:click={() => (showOptions = !showOptions)}
		>
			<span class="flex items-center gap-2">
				{selectedInfo?.label || "Select style"}
				<!-- Saved:	{numberSaved}  -->
			</span>
			<ChevronDown
				class={cn(
					"h-4 w-4 transition-transform duration-200",
					showOptions && "rotate-180",
				)}
			/>
		</Button>

		<!-- <div class=""> -->
		<Button
			variant="outline"
			class="h-full w-6 aspect-square rounded-full justify-between font-mono text-xs"
			disabled={isProcessing}
			on:click={() => (showOptions = !showOptions)}
		>
			<!-- {numberSaved} -->
			<div class="text-xl w-full h-full invisible hover:visible">
				x
			</div>
		</Button>
		<!-- </div> -->

	
	</div>


	<div class="flex items-start gap-4 h-24">
		<!-- Left side: Element Card -->
		<div class="w-2/5 h-full">
			{#if element}
				<ElementCard
					{element}
					onSelect={handleStyleGuideInsert}
					theme={$elementsTheme}
				/>
			{:else}
				<div
					class="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
				>
					<span class="text-muted-foreground">Style guide not found</span>
				</div>
			{/if}
		</div>

		<!-- Right side: Actions -->
		<div class="flex flex-col w-3/5 gap-2">
			<!-- Current Selection Button -->

			<!-- Update Button - Using existing OutlineButton design -->

			<div class="flex flex-col gap-2 items-center justify-middle">
				<OutlineButton
					icon={Save}
					label="Save"
					onClick={handleUpdateHeading}
					class="h-6"
					disabled={isProcessing}
				/>
				<OutlineButton
					icon={Heading}
					label="Apply"
					onClick={handleUpdateHeading}
					class="h-6"
					disabled={isProcessing}
				/>
			</div>
		</div>
	</div>
</div>
