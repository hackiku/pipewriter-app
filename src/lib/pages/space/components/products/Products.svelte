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
  <div class="relative mt-24 flex flex-col items-center">
    {#each products as product, i}
      <div class="w-full relative {i !== 0 ? '-mt-[8rem] sm:-mt-[18rem]' : ''}">
        <ProductCard {product} index={i} />
      </div>
    {/each}
  </div>
</div>