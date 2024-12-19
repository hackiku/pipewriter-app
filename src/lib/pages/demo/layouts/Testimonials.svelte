<!-- src/lib/pages/demo/Testimonials.svelte -->
<!-- Testimonials.svelte -->
<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { ExternalLink } from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import { demoStore } from "$lib/stores/demoStore";
	import EditableStyles from "../EditableStyles.svelte";
	import { editingStore } from "$lib/stores/editingStore";

	export let visible = false;

	// Get testimonials from store
	$: cards = $demoStore.content.testimonials.cards;

	function handleInput(event: Event, index: number, field: string) {
		const target = event.target as HTMLElement;
		demoStore.updateContent(
			["testimonials", "cards", index.toString(), field],
			target.innerText,
		);
	}

	function handleEditStart(id: string) {
		editingStore.startEditing(id);
	}

	function handleEditStop() {
		editingStore.stopEditing();
	}
</script>

{#if visible}
	<div class="relative w-full" in:fade={{ duration: 300 }}>
		<div
			class="flex flex-col md:flex-row gap-8 md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-4 scroll-smooth"
		>
			{#each cards as card, i}
				<div
					class="relative flex-shrink-0 md:w-[500px] flex flex-col md:flex-row gap-6 p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all snap-center"
					in:fly={{
						x: 1000,
						duration: 800,
						delay: 150 * (i + 1),
						easing: quintOut,
					}}
					style="transform: rotate({-1 + Math.random() * 2}deg)"
				>
					<div class="shrink-0">
						<div class="w-16 h-16 rounded-full bg-muted overflow-hidden">
							<img
								src={card.imgSrc}
								alt={`${card.firstName} ${card.lastName}`}
								class="w-full h-full object-cover"
							/>
						</div>
					</div>

					<div class="flex-1 space-y-4">
						<EditableStyles elementId="testimonial-{i}-quote">
							<blockquote
								class="text-lg text-muted-foreground italic outline-none"
								contenteditable="true"
								bind:innerText={card.quote}
								on:input={(e) => handleInput(e, i, "quote")}
								on:focus={() => handleEditStart(`testimonial-${i}-quote`)}
								on:blur={handleEditStop}
							/>
						</EditableStyles>

						<div class="flex items-end justify-between">
							<div>
								<EditableStyles elementId="testimonial-{i}-name">
									<div
										class="font-semibold outline-none"
										contenteditable="true"
										on:input={(e) => {
											const [first, ...rest] = e.target.innerText.split(" ");
											demoStore.updateContent(
												["testimonials", "cards", i.toString(), "firstName"],
												first,
											);
											demoStore.updateContent(
												["testimonials", "cards", i.toString(), "lastName"],
												rest.join(" "),
											);
										}}
										on:focus={() => handleEditStart(`testimonial-${i}-name`)}
										on:blur={handleEditStop}
									>
										{card.firstName}
										{card.lastName}
									</div>
								</EditableStyles>
								<EditableStyles elementId="testimonial-{i}-role">
									<div
										class="text-sm text-muted-foreground outline-none"
										contenteditable="true"
										bind:innerText={card.role}
										on:input={(e) => handleInput(e, i, "role")}
										on:focus={() => handleEditStart(`testimonial-${i}-role`)}
										on:blur={handleEditStop}
									/>
								</EditableStyles>
							</div>

							<Button
								variant="outline"
								size="sm"
								class="group whitespace-nowrap"
							>
								Hire {card.firstName}
								<ExternalLink
									class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</Button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div
			class="hidden md:block absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"
		/>
		<div
			class="hidden md:block absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"
		/>
	</div>
{/if}

<style>
	.scroll-smooth {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.scroll-smooth::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: 768px) {
		.scroll-smooth {
			scroll-behavior: smooth;
			-webkit-overflow-scrolling: touch;
		}
	}
</style>
