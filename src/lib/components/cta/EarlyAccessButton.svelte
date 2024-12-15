<!-- $lib/components/cta/EarlyAccessButton.svelte -->
<script lang="ts">
  import { ArrowRight } from "lucide-svelte";
  import { cn } from '$lib/utils';
  
  export let size: "sm" | "default" | "lg" = "default";
  export let className = "";

  const sizes = {
    sm: "h-8 text-sm px-4",
    default: "h-10 text-base px-6",
    lg: "h-12 text-lg px-8"
  };
</script>

<a
  href="/early"
  class={cn(
    // Base styles
    "relative inline-flex items-center justify-center",
    "font-medium rounded-lg",
    "bg-gradient-to-br from-primary to-primary-600",
    "text-white",
    // Hover effects
    "hover:from-primary-600 hover:to-primary",
    "hover:shadow-lg hover:shadow-primary/20",
    "transition-all duration-300",
    // Size variants
    sizes[size],
    className
  )}
>
  <span class="flex items-center gap-2">
    Early Access
    <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </span>
</a>