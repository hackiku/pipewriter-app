<!-- src/lib/components/pricing/WaitlistCta.svelte -->
<script lang="ts">
	import { Clock, Check } from "lucide-svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import EmailForm from "$lib/components/cta/email/EmailForm.svelte";

</script>

<!-- Simplified CTA Section -->
<!-- Background elements -->
<div class="absolute inset-0 pointer-events-none">
	<div
		class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
	></div>
	<div
		class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
	></div>
</div>

<div class="max-w-7xl mx-auto relative z-10">
	<!-- Header -->
	<div class="text-center mb-16 max-w-3xl mx-auto">
		<div
			class="inline-flex items-center gap-2 px-4 py-2 rounded-full
                  bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6"
		>
			<Clock class="w-4 h-4 text-amber-600 dark:text-amber-400" />
			<span class="text-sm font-medium text-amber-700 dark:text-amber-300">
				Pending Google Approval
			</span>
		</div>

		<h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">
			Be First in Line When We
			<span
				class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent"
			>
				Launch
			</span>
		</h2>

		<p class="text-xl text-muted-foreground leading-relaxed">
			Join 200+ writers waiting for the Google Docs wireframing tool that's
			changing how we prototype.
		</p>

		
	</div>

	<!-- Two-column CTA -->
	<div class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
		<!-- Left: Waitlist (Primary) -->
		<div
			class="relative bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all"
		>
			<div class="space-y-6">
				<div class="space-y-3">
					<h3 class="text-2xl font-semibold">Join Free Waitlist</h3>
					<p class="text-muted-foreground">
						Get notified the moment Google gives us the green light
					</p>
				</div>

				<EmailForm
					buttonText="Join Waitlist"
					size="default"
					wrap={false}
					source="Landing CTA"
					className="w-full"
				/>

				<div class="flex items-center gap-8 text-sm text-muted-foreground">
					<span class="flex items-center gap-2">
						<svg
							class="w-4 h-4 text-green-500"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
						14-day free trial
					</span>
					<span class="flex items-center gap-2">
						<svg
							class="w-4 h-4 text-green-500"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
						No credit card required
					</span>
				</div>
			</div>
		</div>

		<!-- Right: Bundle Pre-order (Secondary) -->
		<div class="relative">
			<!-- Popular badge -->
			<div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
				<div
					class="px-4 py-2 rounded-full text-xs font-medium
                      bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white
                      shadow-lg"
				>
					🔥 Limited Time - 30% Off
				</div>
			</div>

			<div
				class="relative p-8 rounded-2xl h-full
                    border-transparent bg-gradient-to-b from-primary/5 to-primary/10 shadow-xl"
			>
				<!-- Gradient border -->
				<div
					class="absolute inset-0 rounded-2xl p-[1px]
                      bg-gradient-to-b from-[#3644FE]/20 to-[#B345ED]/20 -z-10"
				>
					<div class="absolute inset-[1px] rounded-2xl bg-background"></div>
				</div>

				<div class="space-y-6">
					<div class="space-y-3">
						<h3 class="text-2xl font-semibold">Pre-Order Bundle</h3>
						<div class="flex items-center gap-3">
							<div class="text-3xl font-bold">$67</div>
							<div class="text-xl text-muted-foreground line-through">$97</div>
							<div
								class="px-2 py-1 text-xs font-medium rounded-full
                           bg-primary/10 text-primary border border-primary/20"
							>
								Save $30
							</div>
						</div>
						<p class="text-sm text-muted-foreground">one-time payment</p>
					</div>

					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<div
								class="mt-0.5 p-1 rounded-full bg-primary text-primary-foreground"
							>
								<Check class="w-3 h-3" />
							</div>
							<span class="text-sm">100+ premium wireframe templates</span>
						</li>
						<li class="flex items-start gap-3">
							<div
								class="mt-0.5 p-1 rounded-full bg-primary text-primary-foreground"
							>
								<Check class="w-3 h-3" />
							</div>
							<span class="text-sm">3 months Pro subscription included</span>
						</li>
						<li class="flex items-start gap-3">
							<div
								class="mt-0.5 p-1 rounded-full bg-primary text-primary-foreground"
							>
								<Check class="w-3 h-3" />
							</div>
							<span class="text-sm">Lifetime template access</span>
						</li>
						<li class="flex items-start gap-3">
							<div
								class="mt-0.5 p-1 rounded-full bg-primary text-primary-foreground"
							>
								<Check class="w-3 h-3" />
							</div>
							<span class="text-sm">VIP early access + onboarding</span>
						</li>
					</ul>

					<Button
						class="w-full py-3 bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                     hover:shadow-lg hover:shadow-primary/25 transition-all"
						href="/bundle"
					>
						Secure Early Access
					</Button>

					<p class="text-xs text-center text-muted-foreground">
						⚡ Launch day pricing jumps to $97 • Limited spots available
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom note -->
	<div class="text-center mt-12">
		<p class="text-muted-foreground">
			Both options include instant access when Google approves our marketplace
			listing
		</p>
	</div>
</div>
