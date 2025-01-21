<!-- src/lib/(space)/components/cta/CTA.svelte -->
<script lang="ts">
  // import SpaceForm from './SpaceForm.svelte';
  import PricingCard from './PricingCard.svelte';
  import Calendar from './Calendar.svelte';
</script>

<div class="w-full bg-black/30">
  <div class="grid lg:grid-cols-2">
    <!-- Left: Pricing Card -->
    <div class="lg:border-r border-border/50 p-8 lg:p-16">
			<Calendar />
    </div>
		
    <!-- Right: Form -->
    <div class="flex flex-col gap-6 p-8 lg:p-16">
			<PricingCard />
			<!-- <div class="lg:border-r border-border/50 p-8 lg:p-16"> -->
				BookingTestimonial
			<!-- </div > -->
      <!-- <SpaceForm showHeader={false} /> -->
    </div>
  </div>
</div>