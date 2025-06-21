<!-- src/lib/components/pricing/WaitlistCta.svelte -->
<script lang="ts">
	import { Clock, FileText, Package, Store, Zap, Sparkles } from "lucide-svelte";
	import EmailForm from "$lib/components/cta/email/EmailForm.svelte";

	export let HEADLINE = "text-[#171717] dark:text-[#CFCFCF]";
</script>

<!-- Background elements -->
<div class="absolute inset-0 pointer-events-none">
	<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
	<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
</div>

<div class="max-w-7xl mx-auto relative z-10">
	<!-- Header -->
	<div class="text-center mb-16 max-w-4xl mx-auto">
		<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
			<span class="text-sm font-medium text-amber-700 dark:text-amber-300">Built & Ready</span>
			<Clock class="w-4 h-4 text-amber-600 dark:text-amber-400" />
			<span class="text-sm font-medium text-amber-700 dark:text-amber-300">Pending Google Approval</span>
		</div>

		<h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6 {HEADLINE}">
			Be First to Get the
			<span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent">
				Complete System
			</span>
		</h2>

		<!-- <p class="text-xl text-muted-foreground leading-relaxed mb-8">
			Join 200+ writers waiting for the Google Docs wireframing ecosystem that turns copy docs into professional deliverables.
		</p> -->
	</div>

	<!-- Masonry Layout: App Left, Templates Right -->
	<div class="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
		
		<!-- Left: Main App Card (Larger) -->
		<div class="relative bg-gradient-to-br from-card to-card/80 border-2 border-primary/20 rounded-3xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
			<!-- Badge -->
			<div class="absolute top-6 right-6">
				<div class="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
					Core Product
				</div>
			</div>

			<div class="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#3644FE]/10 to-[#B345ED]/10 flex items-center justify-center mb-6">
				<FileText class="w-8 h-8 text-primary" />
			</div>

			<h3 class="text-2xl font-bold mb-3">Sidebar App</h3>
			<p class="text-muted-foreground mb-6 leading-relaxed">
				Native Google Docs wireframing app. Insert elements, edit styles, export to AI-friendly formats.
			</p>

			<!-- Pricing Tiers -->
			<div class="space-y-3 mb-6">
				<div class="flex items-center justify-between p-3 rounded-xl bg-muted/30">
					<div class="flex items-center gap-3">
						<div class="w-2 h-2 bg-green-500 rounded-full"></div>
						<span class="font-medium">Free Tier</span>
					</div>
					<span class="text-lg font-bold">$0</span>
				</div>
				<div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
					<div class="flex items-center gap-3">
						<Zap class="w-4 h-4 text-primary" />
						<span class="font-medium">Pro Access</span>
					</div>
					<span class="text-lg font-bold">$10/mo</span>
				</div>
			</div>

			<div class="text-sm text-muted-foreground">
				14-day free trial • No credit card required
			</div>
		</div>

		<!-- Right: Template Cards (Stacked) -->
		<div class="space-y-6">
			
			<!-- Pro Templates Card -->
			<div class="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all group">
				<div class="flex items-start justify-between mb-4">
					<div class="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
						<Package class="w-6 h-6 text-orange-600" />
					</div>
					<div class="px-2 py-1 rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium">
						One-time extra
					</div>
				</div>

				<h3 class="text-xl font-semibold mb-2">Pro Template Pack</h3>
				<p class="text-muted-foreground text-sm mb-4 leading-relaxed">
					100+ premium elements in organized docs. Copy-paste advanced components.
				</p>

				<div class="flex flex-wrap gap-2">
					<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs">
						<Sparkles class="w-3 h-3" />
						Light/Dark modes
					</span>
					<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs">
						<Sparkles class="w-3 h-3" />
						Monthly updates
					</span>
				</div>
			</div>

			<!-- Template Store Card -->
			<div class="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all group">
				<div class="flex items-start justify-between mb-4">
					<div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
						<Store class="w-6 h-6 text-purple-600" />
					</div>
					<div class="px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium">
						On-demand
					</div>
				</div>

				<h3 class="text-xl font-semibold mb-2">Template Store</h3>
				<p class="text-muted-foreground text-sm mb-4 leading-relaxed">
					Complete wireframe documents for specific industries and use cases.
				</p>

				<div class="flex flex-wrap gap-2">
					<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs">
						<Sparkles class="w-3 h-3" />
						SaaS bundles
					</span>
					<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs">
						<Sparkles class="w-3 h-3" />
						$5K+ proven
					</span>
					<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs">
						<Sparkles class="w-3 h-3" />
						Ready layouts
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Email Form -->
	<EmailForm
		buttonText="Join Waitlist"
		size="lg"
		wrap={false}
		source="Landing CTA"
		className="mx-auto"
	/>
	<p class="text-sm text-center text-muted-foreground mt-3">
		Get notified the moment Google gives us the green light ✅
	</p>
</div>