<!-- lib/components/cta/pricing/ProductStat.svelte -->
<script lang="ts">
  import { Layout, Box } from 'lucide-svelte';
  
  export let count: string | number = '';
  export let icon: 'docs' | 'scripts' | 'components' = 'docs';
  export let label: string = '';

  const icons = {
    docs: '/tools/gdocs.svg',
    scripts: '/tools/appsscript.svg',
    components: Layout // Lucide icon for UI components
  };
</script>

<div class="flex flex-col items-center gap-1.5 px-2 bg-muted-foreground/10 rounded-full border">
  <div class="flex items-center gap-1 text-muted-foreground/50">
    
		{#if typeof icons[icon] === 'string'}
			<img src={icons[icon]} alt={label} class="w-4 h-4 opacity-80" />
		{:else}
			<svelte:component this={icons[icon]} class="w-4 h-" />
		{/if}
    
		{#if count}
      <span class="text-md font-medium">{count}</span>
    {/if}

  </div>
  {#if label}
    <span class="text-xs text-muted-foreground">{label}</span>
  {/if}
</div>