<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import type { LucideIcon } from 'lucide-svelte';
  import { Info } from 'lucide-svelte';

  interface IconButtonProps {
    icon?: typeof LucideIcon;
    selected?: boolean;
    tooltip?: string;
    onClick?: () => void;
  }

  export let icon: IconButtonProps['icon'] = Info;
  export let selected: IconButtonProps['selected'] = false;
  export let tooltip: IconButtonProps['tooltip'] = undefined;
  export let onClick: IconButtonProps['onClick'] = () => {};

  $: buttonClass = cn(
    "p-2 rounded-full transition-colors duration-200",
    "hover:bg-gray-200 dark:hover:bg-gray-700",
    "border-none",
    selected ? "bg-primary text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground" : "text-foreground"
  );
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button
      variant="ghost"
      size="icon"
      class={buttonClass}
      on:click={onClick}
    >
      <svelte:component this={icon} class="h-4 w-4" />
    </Button>
  </Tooltip.Trigger>
  {#if tooltip}
    <Tooltip.Content>
      <p>{tooltip}</p>
    </Tooltip.Content>
  {/if}
</Tooltip.Root>