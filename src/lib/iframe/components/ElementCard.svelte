<!-- $lib/iframe/components/ElementCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import type { ElementObject } from "../elements";
  import type { ThemeType } from "../stores";
  import { onMount } from 'svelte';

  export let element: ElementObject;
  export let onSelect: (id: string) => void;
  export let theme: ThemeType;

  // Initialize with a definitive state
  let mounted = false;
  onMount(() => {
    mounted = true;
  });

  function handleClick() {
    onSelect(element.id);
  }

  // Base theme styles without cn function initially
  const themeStyles = {
    light: "bg-white border-solid border-gray-200",
    gray: "bg-gray-100 border-gray-200",
    dark: "bg-gray-900 border-gray-700"
  };

  // Get theme class directly without cn initially
  $: themeClass = mounted 
    ? cn(themeStyles[theme]) 
    : themeStyles[theme];

  // Simplified image source handling
  $: imgSrc = theme === 'dark' && element.id.includes('-dark')
    ? `elements/${element.id}.svg`
    : `elements/${element.id.replace('-dark', '')}.svg`;

  $: shouldInvert = theme === 'dark' && !element.id.includes('-dark');

  // Base button classes without potential race conditions
  const baseButtonClasses = "w-full h-full p-0 rounded-lg overflow-hidden border transition-all duration-200 ease-in-out hover:translate-x-[-8%] hover:rotate-[-10deg] hover:shadow-md origin-bottom-left";
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button
      variant="ghost"
      class={mounted 
        ? cn(baseButtonClasses, themeClass)
        : `${baseButtonClasses} ${themeClass}`}
      on:click={handleClick}
    >
      <img
        src={imgSrc}
        alt={element.alt}
        class={mounted 
          ? cn("w-full h-full object-cover", shouldInvert && "opacity-50 invert")
          : `w-full h-full object-cover ${shouldInvert ? 'opacity-50 invert' : ''}`}
      />
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>{element.description}</p>
  </Tooltip.Content>
</Tooltip.Root>