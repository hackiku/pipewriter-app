<!-- src/lib/(space)/components/navigation/Breadcrumbs.svelte -->
<script lang="ts">
  import { ChevronRight } from 'lucide-svelte';
  
  export let items: Array<{
    label: string;
    href?: string;
  }>;
</script>

<nav class="flex items-center gap-2 text-sm text-muted-foreground p-3">
  {#each items as item, i}
    {#if i > 0}
      <ChevronRight class="w-4 h-4 text-muted-foreground/50" />
    {/if}
    
    {#if item.href}
      <a 
        href={item.href} 
        class="hover:text-foreground transition-colors"
      >
        {item.label}
      </a>
    {:else}
      <span class="text-foreground">{item.label}</span>
    {/if}
  {/each}
</nav>