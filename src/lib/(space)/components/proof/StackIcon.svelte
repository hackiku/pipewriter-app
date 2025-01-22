<!-- src/lib/(space)/components/proof/StackIcon.svelte -->
<script lang="ts">
  export let icon: string;
  export let name: string;
  export let url: string;
  export let description: string;
  export let fallback = '⚡';

  function handleError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.innerText = fallback;
  }
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="relative flex flex-col items-center gap-2 group"
>
  <!-- Icon -->
  <div class="w-12 h-12 rounded-lg bg-card border p-2.5
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-110 group-hover:rotate-3
              group-hover:shadow-lg group-hover:border-primary/20">
    <img
      src={icon}
      alt={name}
      class="w-full h-full object-contain"
      on:error={handleError}
    />
  </div>

  <!-- Name -->
  <span class="text-xs font-medium">{name}</span>
  
  <!-- Tooltip -->
  <div class="absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2 
              pointer-events-none opacity-0 group-hover:opacity-100 
              transition-all duration-200 z-10
              w-32 p-2 rounded-md bg-popover/95 shadow-lg
              border border-border/50
              transform group-hover:-translate-y-1">
    <span class="text-xs text-popover-foreground block text-center">
      {description}
    </span>
    
    <!-- Tooltip arrow -->
    <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 
                w-2 h-2 rotate-45 
                bg-popover border-l border-t border-border/50" />
  </div>
</a>