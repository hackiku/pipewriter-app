<!-- src/lib/(space)/content/features/ExampleCard.svelte -->
<script lang="ts">
  import { XCircle, CheckCircle } from 'lucide-svelte';
  
  export let example: {
    title: string;
    points: { label: string }[];
  };
  export let type: 'good' | 'bad' = 'good';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let highlighted = false;
  
  const sizeClasses = {
    sm: 'w-48 h-32',
    md: 'w-72 h-48',
    lg: 'w-96 h-64'
  };

  $: containerClass = `
    relative rounded-xl bg-card border overflow-hidden 
    transition-all duration-300
    ${sizeClasses[size]}
    ${highlighted ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/20' : ''}
  `;

  $: pointClass = type === 'good' ? 
    'bg-primary/10 text-primary' : 
    'bg-destructive/10 text-destructive';

  $: Icon = type === 'good' ? CheckCircle : XCircle;
</script>

<div class={containerClass}>
  <!-- Gradient Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30" />
  
  <!-- Points -->
  <div class="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-[90%]">
    {#each example.points as point}
      <span class="px-2 py-1 rounded-full text-xs
                  {pointClass}
                  flex items-center gap-1 backdrop-blur-sm">
        <Icon class="w-3 h-3" />
        {point.label}
      </span>
    {/each}
  </div>
</div>