<!-- src/lib/components/cta/buy/AddToCart.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ShoppingCart } from "lucide-svelte";

  export let text = "Add to Cart";
  export let showPrice = false;
  export let price = "— $97";
  export let source = "generic"; // For analytics

  function handleCheckout() {
    window.location.href = "https://app.gumroad.com/checkout?product=qmifdo&quantity=1";
  }
</script>

<Button variant="ghost" class="w-full group" on:click={handleCheckout}>
  <ShoppingCart class="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
  <span class="opacity-50 group-hover:opacity-100 transition-opacity">
    {text} {showPrice ? price : ''}
  </span>
</Button>