<!-- lib/components/cta/CartButton.svelte -->
<script lang="ts">
  import { ShoppingCart } from 'lucide-svelte';

  export let text = "Add to Cart";
  export let className = "";
</script>

<button 
  class="group relative w-full h-14 rounded-full overflow-hidden {className}"
  on:click
>
  <!-- Gradient Border -->
  <div class="absolute inset-0 bg-gradient-to-r from-[#3644FE] to-[#B345ED]" />
  
  <!-- Inner Content with Glass Effect -->
  <div class="absolute inset-[1px] rounded-full 
              bg-black/40 backdrop-blur-sm
              flex items-center justify-center gap-3
              transition-colors hover:bg-black/60">
    <ShoppingCart class="w-5 h-5 text-white" />
    <span class="text-base font-medium text-white">{text}</span>
  </div>
</button>