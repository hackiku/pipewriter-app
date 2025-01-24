<!-- $lib/(space)/content/products/TechBadge.svelte -->
<script lang="ts">
  export let icon: string;
  export let name: string;
  export let size: 'sm' | 'md' = 'sm';
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8'
  };
</script>

<div class="group relative">
  <div class="flex items-center justify-center {sizeClasses[size]}
              rounded-full bg-primary/10 transition-colors
              group-hover:bg-primary/20">
    <img
      src={icon}
      alt={name}
      class="w-3/4 h-3/4 object-contain"
    />
  </div>
  
  <!-- Simple Tooltip -->
  <div class="absolute -bottom-1 translate-y-full left-1/2 -translate-x-1/2
              pointer-events-none opacity-0 group-hover:opacity-100
              transition-all duration-200 z-10">
    <span class="text-xs bg-popover px-2 py-1 rounded-md whitespace-nowrap
                 border border-border/50 shadow-sm">
      {name}
    </span>
  </div>
</div>