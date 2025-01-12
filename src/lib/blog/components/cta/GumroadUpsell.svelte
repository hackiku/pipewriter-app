<!-- lib/blog/components/cta/GumroadUpsell.svelte -->
<script lang="ts">
  import CartButton from '$lib/components/cta/CartButton.svelte';
  
  export let price = "$59";
  export let className = "";
</script>

<div class="not-prose my-8 p-6 rounded-xl bg-muted/50 {className}">
  <p class="text-lg mb-4">
    <slot>
      Want to try these components yourself? All blog post code samples are from the 
      actual Pipewriter codebase.
    </slot>
  </p>
  
  <div class="flex items-center gap-4">
    <CartButton {price} />
    <span class="text-sm text-muted-foreground">
      Beta access, all updates included
    </span>
  </div>
</div>