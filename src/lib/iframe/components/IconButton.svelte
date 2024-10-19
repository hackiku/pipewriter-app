<!-- $lib/iframe/components/IconButton.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";

  export let icon: typeof import('lucide-svelte').LucideIcon;
  export let selected = false;
  export let tooltip: string | undefined = undefined;
  export let onClick: () => void;

  $: buttonClass = cn(
    "p-2 rounded-full transition-colors duration-200",
    "hover:bg-gray-200 dark:hover:bg-gray-700",
    selected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
    !selected && "text-foreground"
  );
</script>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        class={buttonClass}
        on:click={onClick}
      >
        <svelte:component this={icon} class="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    {#if tooltip}
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    {/if}
  </Tooltip>
</TooltipProvider>