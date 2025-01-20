<!-- src/lib/(space)/components/proof/UXExample.svelte -->
<script lang="ts">
  import { XCircle, CheckCircle } from 'lucide-svelte';

  export let points: {
    label: string;
    isGood: boolean;
  }[] = [];
  
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let className = '';
  
  const sizeClasses = {
    sm: 'w-48 h-32',
    md: 'w-72 h-48',
    lg: 'w-96 h-64'
  };
</script>

<div class="relative rounded-xl bg-card border overflow-hidden transition-all
            {sizeClasses[size]} {className}">
  <!-- Editorial-style Image Placeholder -->
  <div class="absolute inset-0 bg-gradient-to-br 
              from-muted/50 to-muted/30" />
  
  <!-- Pills Container -->
  <div class="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-[90%]">
    {#each points as point}
      <span class="px-2 py-1 rounded-full text-xs
                  {point.isGood ? 'bg-primary/10 text-primary' : 
                                'bg-destructive/10 text-destructive'}
                  flex items-center gap-1 backdrop-blur-sm">
        <svelte:component this={point.isGood ? CheckCircle : XCircle} 
                         class="w-3 h-3" />
        {point.label}
      </span>
    {/each}
  </div>
</div>