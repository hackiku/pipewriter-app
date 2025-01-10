<!-- src/lib/pages/space/components/products/Products.svelte -->
<script lang="ts">
  import { onDestroy } from 'svelte';
  import { products } from '../../data/products';
  import { spaceStore } from '../../stores/spaceStore';
  import ProductCard from './ProductCard.svelte';
  
  onDestroy(() => {
    spaceStore.setActiveProduct(null);
  });
</script>

<div class="container max-w-4xl mx-auto">
  <div class="relative space-y-4">
    {#each products as product, i}
      <ProductCard {product} index={i} />
    {/each}
  </div>
</div>
