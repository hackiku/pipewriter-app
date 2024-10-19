<!-- $lib/iframe/components/ElementCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import type { ElementObject } from '../elements';

  export let element: ElementObject;
  export let onSelect: (id: string) => void;
  export let theme: 'light' | 'gray' | 'dark' = 'light';

  function handleClick() {
    onSelect(element.id);
  }

  $: themeClasses = {
    light: "bg-white border-dashed border-gray-400",
    gray: "bg-gray-100 border-gray-100",
    dark: "bg-gray-950 border-gray-700 "
  };

  $: buttonClasses = cn(
    "w-full h-full p-0 rounded-lg overflow-hidden",
    themeClasses[theme],
    "border",
		"transition-all duration-200 ease-in-out",
    "hover:translate-x-[-8%] hover:rotate-[-10deg]",
    "hover:shadow-md",
    "origin-bottom-left"
  );

  $: imgClasses = cn(
    "w-full h-full object-cover",
    theme === 'dark' ? "opacity-50 invert" : "opacity-100"
  );
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button
      variant="ghost"
      class={buttonClasses}
      on:click={handleClick}
    >
      <img 
        src={element.src.replace(/-dark\.svg$/, '.svg')} 
        alt={element.alt} 
        class={imgClasses} 
      />
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>{element.description}</p>
  </Tooltip.Content>
</Tooltip.Root>