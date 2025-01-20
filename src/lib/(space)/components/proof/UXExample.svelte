<!-- src/lib/(space)/components/proof/UXExample.svelte -->
<script lang="ts">
  import { XCircle, CheckCircle } from 'lucide-svelte';
  import type { UXExampleVariant } from '../../types';

  export let good: UXExampleVariant;
  export let bad: UXExampleVariant;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let yOffset = 0;
  export let className = '';
  
  const sizeClasses = {
    sm: 'w-48 h-32',
    md: 'w-72 h-48',
    lg: 'w-96 h-64'
  };
</script>

<div class="relative">
  <!-- Bad Example -->
  <div class="relative rounded-xl bg-card border overflow-hidden transition-all mb-4
              {sizeClasses[size]} {className}"
       style="transform: translateY({yOffset}px)">
    <div class="absolute inset-0 bg-gradient-to-br 
                from-muted/50 to-muted/30" />
    
    <div class="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-[90%]">
      {#each bad.points as point}
        <span class="px-2 py-1 rounded-full text-xs
                    bg-destructive/10 text-destructive
                    flex items-center gap-1 backdrop-blur-sm">
          <XCircle class="w-3 h-3" />
          {point.label}
        </span>
      {/each}
    </div>
  </div>

  <!-- Good Example -->
  <div class="relative rounded-xl bg-card border overflow-hidden transition-all
              {sizeClasses[size]} {className}">
    <div class="absolute inset-0 bg-gradient-to-br 
                from-muted/50 to-muted/30" />
    
    <div class="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-[90%]">
      {#each good.points as point}
        <span class="px-2 py-1 rounded-full text-xs
                    bg-primary/10 text-primary
                    flex items-center gap-1 backdrop-blur-sm">
          <CheckCircle class="w-3 h-3" />
          {point.label}
        </span>
      {/each}
    </div>
  </div>
</div>