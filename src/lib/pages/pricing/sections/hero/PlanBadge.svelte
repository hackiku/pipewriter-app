<!-- src/lib/pages/pricing/sections/hero/PlanBadge.svelte -->
<script lang="ts">
 export let text: string;
 export let variant: 'primary' | 'secondary' = 'primary';

 const variants = {
   primary: 'bg-primary/10 text-primary border-primary/20',
   secondary: 'bg-zinc-900/50 text-zinc-300 border-zinc-800'
 };
</script>

<div class="inline-flex items-center px-3 py-1 text-sm font-medium border rounded-full {variants[variant]}">
 <span class="mr-1.5">✨</span>
 {text}
</div>