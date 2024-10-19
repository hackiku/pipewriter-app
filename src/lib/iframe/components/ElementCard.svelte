<!-- $lib/iframe/components/ElementCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import type { ElementObject } from '../elements';

  export let element: ElementObject;
  export let onSelect: (id: string) => void;
  export let bgColor: string = "bg-white";
  export let borderColor: string = "";
  export let borderWidth: string = "";

  function handleClick() {
    onSelect(element.id);
  }

  $: buttonClasses = cn(
    "w-full h-full p-0 rounded-lg overflow-hidden",
    bgColor,
    borderColor,
    borderWidth,
    "transition-transform duration-200 ease-in-out",
    "hover:translate-x-[-8%] hover:rotate-[-10deg]",
    "hover:shadow-md",
    "origin-bottom-left"
  );
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button
      variant="ghost"
      class={buttonClasses}
      on:click={handleClick}
    >
      <img src={element.src} alt={element.alt} class="w-full h-full object-cover" />
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>{element.description}</p>
  </Tooltip.Content>
</Tooltip.Root>