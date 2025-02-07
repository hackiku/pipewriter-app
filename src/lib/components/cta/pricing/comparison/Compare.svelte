 <!-- src/lib/components/cta/pricing/compare/Compare.svelte -->

<script lang="ts">
  import CompareTable from './CompareTable.svelte';
  // import CompareCTA from './CompareCTA.svelte';
  import { features } from '$data/pricing/comparison';
</script>

<section class="py-24 container mx-auto px-4">
  <div class="space-y-12">
    <CompareTable {features} />
    <!-- <CompareCTA /> -->
  </div>
</section>