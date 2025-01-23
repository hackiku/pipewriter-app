<!-- src/lib/pages/pricing/sections/compare/Compare.svelte -->
<script lang="ts">
  import CompareTable from './CompareTable.svelte';
  import CompareCTA from './CompareCTA.svelte';
  import { features } from '../../data/features';
</script>

<section class="py-24 container mx-auto px-4">
  <div class="space-y-12">
    <CompareTable {features} />
    <CompareCTA />
  </div>
</section>