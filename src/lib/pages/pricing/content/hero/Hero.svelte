<!-- lib/pages/pricing/content/hero/Hero.svelte -->
<script lang="ts">
  import PlanToggle from './PlanToggle.svelte';
  import PlanBadge from './PlanBadge.svelte';
  
  let isAnnual = true;
</script>

<section class="py-24 container mx-auto px-4">
  <div class="text-center space-y-6 max-w-3xl mx-auto">
    <PlanBadge text="Beta Launch Special" />
    <h1 class="text-4xl md:text-5xl font-light">
      Tools for the Next Space Race
    </h1>
    <p class="text-xl text-zinc-400">
      Whether you're writing landing pages or launching rockets, 
      we've got your tools ready for lift-off
    </p>
    <PlanToggle bind:isAnnual />
  </div>
</section>