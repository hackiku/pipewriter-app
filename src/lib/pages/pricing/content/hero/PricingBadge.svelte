<!-- src/lib/pages/pricing/content/hero/PricingBadge.svelte -->
<script lang="ts">
  export let text: string;
</script>

<div 
  class="inline-flex items-center gap-1.5 px-3 py-1 
         rounded-full bg-primary/10 text-primary 
         border border-primary/20"
>
  <span class="text-sm font-medium">{text}</span>
</div>