<!-- src/lib/pages/landing/sections/pricing/Compare.svelte -->

<script lang="ts">
  import CompareTable from './CompareTable.svelte';
  import { features } from '$data/pricing/comparison';
</script>

<section class="py-12 container mx-auto">
  <div class="max-w-[1400px] mx-auto">
    <CompareTable {features} />
  </div>
</section>