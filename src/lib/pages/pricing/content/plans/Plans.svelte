<!-- lib/pages/pricing/content/plans/Plans.svelte -->
<script lang="ts">
  import PlanCard from './PlanCard.svelte';
  import { plans } from '../../data/plans';
</script>

<section class="py-24 container mx-auto px-4">
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each plans as plan}
      <PlanCard {plan} />
    {/each}
  </div>
</section>