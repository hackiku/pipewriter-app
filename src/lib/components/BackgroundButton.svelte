<!-- $lib/components/BackgroundButton.svelte -->
<script lang="ts">
  import { Grid } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { cn } from "$lib/utils";
  import { backgroundStore } from "$lib/stores/backgroundStore";

  export let iconOnly = false;
  
  const gridSizes = [
    { value: "xs", label: "Extra Small (12px)" },
    { value: "sm", label: "Small (24px)" },
    { value: "md", label: "Medium (48px)" },
    { value: "lg", label: "Large (64px)" },
    { value: "xl", label: "Extra Large (96px)" }
  ];

  const opacityLevels = [
    { value: "low", label: "Low (3%)" },
    { value: "medium", label: "Medium (8%)" },
    { value: "high", label: "High (12%)" }
  ];

  $: selectedSize = $backgroundStore.size;
  $: selectedOpacity = $backgroundStore.opacity;
  $: gradientEnabled = $backgroundStore.gradient;

  function updateBackground(type: string, value: string | boolean) {
    backgroundStore.update(state => {
      if (type === "size") return { ...state, size: value as "xs" | "sm" | "md" | "lg" | "xl" };
      if (type === "opacity") return { ...state, opacity: value as "low" | "medium" | "high" };
      if (type === "gradient") return { ...state, gradient: value as boolean };
      return state;
    });
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button 
      variant="outline" 
      size={iconOnly ? "icon" : "sm"} 
      builders={[builder]}
      class={cn(
        "relative",
        iconOnly ? "w-10" : "gap-2"
      )}
    >
      <Grid class="h-[1.2rem] w-[1.2rem]" />
      {#if !iconOnly}
        <span>Background</span>
      {/if}
    </Button>
  </DropdownMenu.Trigger>
  
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Group>
      <DropdownMenu.Label>Grid Size</DropdownMenu.Label>
      {#each gridSizes as size}
        <DropdownMenu.CheckboxItem 
          checked={selectedSize === size.value}
          onCheckedChange={() => updateBackground("size", size.value)}
        >
          {size.label}
        </DropdownMenu.CheckboxItem>
      {/each}
    </DropdownMenu.Group>
    
    <DropdownMenu.Separator />
    
    <DropdownMenu.Group>
      <DropdownMenu.Label>Opacity</DropdownMenu.Label>
      {#each opacityLevels as level}
        <DropdownMenu.CheckboxItem 
          checked={selectedOpacity === level.value}
          onCheckedChange={() => updateBackground("opacity", level.value)}
        >
          {level.label}
        </DropdownMenu.CheckboxItem>
      {/each}
    </DropdownMenu.Group>
    
    <DropdownMenu.Separator />
    
    <DropdownMenu.CheckboxItem
      checked={gradientEnabled}
      onCheckedChange={(checked) => updateBackground("gradient", checked)}
    >
      Fade Gradient
    </DropdownMenu.CheckboxItem>
  </DropdownMenu.Content>
</DropdownMenu.Root>