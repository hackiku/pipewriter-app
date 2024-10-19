<!-- $lib/iframe/components/OutlineButton.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import type { LucideIcon } from 'lucide-svelte';
  import { Info } from 'lucide-svelte';

  interface OutlineButtonProps {
    icon?: typeof LucideIcon;
    label: string;
    onClick?: () => void;
  }

  export let icon: OutlineButtonProps['icon'] = Info;
  export let label: OutlineButtonProps['label'];
  export let onClick: OutlineButtonProps['onClick'] = () => {};
</script>

<Button
  variant="outline"
  class="w-full text-xs h-full"
  on:click={onClick}
>
  <svelte:component this={icon} class="h-4 w-4 mr-2" />
  {label}
</Button>