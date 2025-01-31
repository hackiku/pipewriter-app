<!-- src/lib/components/cta/pricing/ProductStat.svelte -->
<script lang="ts">
  export let count: string | number;
  export let icon: string;
  export let iconAlt: string;
  export let size: "sm" | "md" | "lg" = "md";
  export let variant: "default" | "primary" | "muted" = "default";
  
  const sizeClasses = {
    sm: "h-8 px-3 text-xl",
    md: "h-10 px-4 text-2xl",
    lg: "h-12 px-5 text-3xl"
  };
  
  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7"
  };
  
  const variants = {
    default: "bg-card border",
    primary: "bg-primary/5 border border-primary/10",
    muted: "bg-muted border-muted-foreground/20"
  };
</script>

<div class="flex items-center gap-2 rounded-full {sizeClasses[size]} {variants[variant]}">
  <span class="font-semibold {variant === 'primary' ? 'text-primary' : ''}">{count}</span>
  <img src={icon} alt={iconAlt} class="{iconSizes[size]} opacity-80" />
</div>