<!-- $lib/iframe/components/RoundButton.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import { Loader2 } from "lucide-svelte";
  import type { LucideIcon } from 'lucide-svelte';

  export let variant: 'default' | 'ghost' | 'outline' = 'ghost';
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = undefined;
  export let disabled = false;
  export let className = '';
  export let icon: typeof LucideIcon | undefined = undefined;
  export let color: string | undefined = undefined;
  export let gradient = false;
  export let selected = false;
  export let loading = false;
  export let tooltipContent: string | undefined = undefined;

  const sizeClasses = {
    xs: 'min-h-6 min-w-6 h-6 w-6',
    sm: 'min-h-7 min-w-7 h-7 w-7',
    md: 'min-h-8 min-w-8 h-8 w-8',
    lg: 'min-h-10 min-w-10 h-10 w-10',
    xl: 'min-h-12 min-w-12 h-12 w-12'
  };

  const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6',
    default: 'h-full w-full p-1.5'
  };

  $: buttonStyle = gradient 
    ? "background: linear-gradient(45deg, #FF0000, #00FF00, #0000FF);"
    : color ? `background-color: ${color};` : undefined;

  $: buttonClass = cn(
    // Base classes - always perfectly round
    'relative flex items-center justify-center rounded-full',
    'transition-all duration-200',
    
    // Size control
    size ? sizeClasses[size] : 'w-full h-full min-w-full min-h-full',
    
    // States
    'hover:scale-105 active:scale-95',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
    selected && 'ring-2 ring-primary ring-offset-1',
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'animate-pulse',
    
    className
  );

  // Ensure icon fits within button while maintaining aspect ratio
  $: iconClass = cn(
    'shrink-0',
    size ? iconSizes[size] : iconSizes.default,
    color && "text-white"
  );
</script>

{#if tooltipContent}
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button
        {variant}
        {disabled}
        class={buttonClass}
        style={buttonStyle}
        on:click
      >
        {#if loading}
          <Loader2 class={cn("animate-spin", iconSizes[size || 'default'])} />
        {:else if icon}
          <svelte:component this={icon} class={iconClass} />
        {:else}
          <slot />
        {/if}
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>{tooltipContent}</p>
    </Tooltip.Content>
  </Tooltip.Root>
{:else}
  <Button
    {variant}
    {disabled}
    class={buttonClass}
    style={buttonStyle}
    on:click
  >
    {#if loading}
      <Loader2 class={cn("animate-spin", iconSizes[size || 'default'])} />
    {:else if icon}
      <svelte:component this={icon} class={iconClass} />
    {:else}
      <slot />
    {/if}
  </Button>
{/if}