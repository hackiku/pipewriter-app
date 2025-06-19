<!-- src/lib/pages/landing/sections/cta/WaitlistCta.svelte -->
<!-- Waitlist CTA Section -->
<script lang="ts">
	import { Clock, FileText, Package, Store } from "lucide-svelte";
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
		<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full 
					bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
			<Clock class="w-4 h-4 text-amber-600 dark:text-amber-400" />
			<span class="text-sm font-medium text-amber-700 dark:text-amber-300">
				Pending Google Approval
			</span>
		</div>

		<h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6 {HEADLINE}">
			Be First to Get the 
			<span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] bg-clip-text text-transparent">
				Complete System
			</span>
		</h2>

		<p class="text-xl text-muted-foreground leading-relaxed mb-8">
			Join 200+ writers waiting for the Google Docs wireframing ecosystem that turns 
			copy docs into professional deliverables.
		</p>

		<!-- Main Email Form -->
		<div class="max-w-2xl mx-auto mb-12">
			<EmailForm
				buttonText="Join Waitlist"
				size="lg"
				wrap={false}
				source="Landing CTA"
				className="w-full"
			/>
			<p class="text-sm text-muted-foreground mt-3">
				Get notified the moment Google gives us the green light ✅
			</p>
		</div>
	</div>

	<!-- Three Overview Cards -->
	<div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
		
		<!-- 1. App Card -->
		<div class="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
			<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
				<FileText class="w-6 h-6 text-primary" />
			</div>
			
			<h3 class="text-xl font-semibold mb-2">Sidebar App</h3>
			<p class="text-muted-foreground text-sm mb-4 leading-relaxed">
				Native Google Docs add-on with 90+ wireframe elements. Click to insert at cursor.
			</p>
			
			<div class="space-y-2 text-sm">
				<div class="flex items-center justify-between">
					<span class="text-muted-foreground">Free tier</span>
					<span class="font-medium">$0</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-muted-foreground">Pro access</span>
					<span class="font-medium">$10/month</span>
				</div>
			</div>
			
			<div class="mt-4 text-xs text-muted-foreground">
				14-day free trial • No credit card required
			</div>
		</div>

		<!-- 2. Pro Templates Card -->
		<div class="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
			<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
				<Package class="w-6 h-6 text-primary" />
			</div>
			
			<h3 class="text-xl font-semibold mb-2">Pro Templates</h3>
			<p class="text-muted-foreground text-sm mb-4 leading-relaxed">
				100+ premium elements in organized docs. Copy-paste into your wireframes.
			</p>
			
			<div class="space-y-2 text-sm">
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-primary rounded-full"></div>
					<span>Light & dark mode versions</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-primary rounded-full"></div>
					<span>New elements added monthly</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-primary rounded-full"></div>
					<span>Advanced components & layouts</span>
				</div>
			</div>
		</div>

		<!-- 3. Template Store Card -->
		<div class="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
			<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
				<Store class="w-6 h-6 text-primary" />
			</div>
			
			<h3 class="text-xl font-semibold mb-2">Template Store</h3>
			<p class="text-muted-foreground text-sm mb-4 leading-relaxed">
				Complete wireframe documents for specific industries and use cases.
			</p>
			
			<div class="space-y-2 text-sm">
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-primary rounded-full"></div>
					<span>SaaS, eCommerce, Agency bundles</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-primary rounded-full"></div>
					<span>Battle-tested on $5K+ projects</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-primary rounded-full"></div>
					<span>Ready-to-customize layouts</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Note -->
	<div class="text-center">
		<p class="text-muted-foreground">
			Get instant access to the complete Pipewriter ecosystem when Google approves our marketplace listing
		</p>
	</div>
</div>