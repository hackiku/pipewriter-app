<!-- src/lib/pages/pricing/sections/plans/Plans.svelte -->
<script lang="ts">
	import { Switch } from "$lib/components/ui/switch";
	import PlanCard from './PlanCard.svelte';
	import { plans, annualPlans } from '../../data/plans';
	import { pricingStore } from '../../stores/pricingStore';

	$: isAnnual = $pricingStore.isAnnual;
	$: currentPlans = isAnnual ? annualPlans : plans;

	function toggleBilling() {
		pricingStore.toggleBilling();
	}
</script>

<div class="container mx-auto px-4">
	
	<!-- Billing Toggle -->
	<!-- <div class="flex items-center justify-center mb-16">
		<div class="flex items-center gap-4 p-1 rounded-full border bg-muted/30">
			<label class="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer
										{!isAnnual ? 'bg-background shadow-sm' : 'text-muted-foreground'} 
										transition-all">
				<input 
					type="radio" 
					name="billing" 
					checked={!isAnnual}
					on:change={() => !isAnnual || toggleBilling()}
					class="sr-only"
				/>
				<span class="text-sm font-medium">Monthly</span>
			</label>
			
			<label class="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer
										{isAnnual ? 'bg-background shadow-sm' : 'text-muted-foreground'} 
										transition-all">
				<input 
					type="radio" 
					name="billing" 
					checked={isAnnual}
					on:change={() => isAnnual || toggleBilling()}
					class="sr-only"
				/>
				<span class="text-sm font-medium">Annual</span>
				<span class="px-2 py-1 text-xs font-medium rounded-full
											bg-primary/10 text-primary">
					Save 20%
				</span>
			</label>
		</div>
	</div> -->

	<!-- Plans Grid -->
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
		{#each currentPlans as plan (plan.id)}
			<div class="flex">
				<PlanCard {plan} {isAnnual} />
			</div>
		{/each}
	</div>

	<!-- Bottom note -->
	<div class="text-center mt-16 space-y-4">
		<p class="text-muted-foreground">
			All plans include Google Docs integration and community support
		</p>
		<div class="flex items-center justify-center gap-8 text-sm text-muted-foreground">
			<span class="flex items-center gap-2">
				<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
				</svg>
				14-day free trial
			</span>
			<span class="flex items-center gap-2">
				<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
				</svg>
				Cancel anytime
			</span>
			<span class="flex items-center gap-2">
				<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
				</svg>
				No setup fees
			</span>
		</div>
	</div>
</div>