<!-- $lib/components/Footer.svelte -->
<script lang="ts">
	import { ArrowRight } from "lucide-svelte";
	// import EmailForm from "$lib/components/cta/EmailForm.svelte";
	import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
	import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import SocialLink from "./cta/SocialLink.svelte";

	// import ContactModal from "./ContactModal.svelte";
	import { contactModalStore } from "$lib/stores/contactModalStore";
  import { socialLinks, footerSections } from '$lib/data/navigation';
  import { mainNavItems } from '$data/navigation';
	
	const year = new Date().getFullYear();

</script>

<footer
	class="w-full bg-slate-100 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-800"
>
	<!-- {#if $contactModalStore}
  	<ContactModal on:close={() => $contactModalStore = false} />
	{/if} -->

	<div class="container px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44 py-8">
		<!-- Main Grid -->
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
		>
			<!-- Brand & Social - Spans full width on mobile, half on medium, 5 cols on large -->
			<div class="md:col-span-1 lg:col-span-5 flex flex-col justify-between">
				
				
				<!-- Logo & Description -->
				<div class="space-y-4">
					<div class="flex items-center gap-1">
						<div>✍️</div>
						<h3 class="text-2xl font-semibold">Pipewriter</h3>
					</div>
					<p class="text-muted-foreground text-sm max-w-xs">
						Professional website copy decks in Google Docs. Design-ready
						templates + sidebar app.
					</p>
					<!-- Early Access Button -->
					<div class="pt-2">
						<EarlyAccessButton
							size="md"
							source="footer"
							className="w-fit font-normal"
						/>
					</div>
				</div>

				<!-- Social Icons -->
				<div class="flex gap-6 mt-8">
					{#each socialLinks as social}
						<a
							href={social.url}
							class="text-muted-foreground hover:text-foreground transition-colors"
							aria-label={social.ariaLabel}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={social.svg}
								alt={social.name}
								width="20"
								height="20"
								class="hover:scale-110 transition-transform duration-200"
								onerror="this.onerror=null; this.src='';"
							/>
							<svelte:component
								this={social.icon}
								size={20}
								class="hidden hover:scale-110 transition-transform duration-200"
							/>
						</a>
					{/each}
				</div>
			</div>

			<!-- Links - Spans half width on medium, 3 cols on large -->
			<div class="md:col-span-1 lg:col-span-3">
				<h4 class="text-lg font-medium mb-4">Quick Links</h4>
				<nav class="grid grid-cols-1 gap-2 text-sm">
					{#each mainNavItems as item}
						<a
							href={item.href}
							class="text-muted-foreground hover:text-foreground transition-colors w-fit"
							on:click={(e) => {
								if (item.onClick) {
									e.preventDefault();
									item.onClick();
								}
							}}
						>
							{item.label}
						</a>
					{/each}
				</nav>
			</div>

			<!-- Newsletter - Spans full width on mobile, spans remaining space on larger screens -->
			<div class="md:col-span-2 lg:col-span-4 lg:pl-4">
				<h4 class="text-lg font-medium mb-4">UX-up your inbox</h4>
				<EmailForm size="sm" wrap={true} />
				
				<!-- <div class="flex gap-1 mt-4 h-full items-middle justify-center">
					<a href="/space"
						 class="text-sm text-foreground/50 hover:text-foreground font-medium"
					>
						aerospace <br>
						startup? 
					</a>
					<ArrowRight class="w-4"/>
				</div> -->
			</div>
		</div>

		<!-- Copyright -->
		<div class="mt-12 pt-4 border-t border-gray-200 dark:border-gray-800">
			<div class="text-sm text-muted-foreground">
				<span>Copyalright © {year} Pipewriter</span>
				<span class="mx-2">|</span>
				<a href="/terms" class="hover:underline">Terms</a>
				<span class="mx-2">|</span>
				<a href="/privacy" class="hover:underline">Privacy</a>
			</div>
		</div>
	</div>
</footer>
