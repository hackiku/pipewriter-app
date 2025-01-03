<!-- $lib/components/BackgroundButton.svelte -->

<script lang="ts">
  import { Grid } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { cn } from "$lib/utils";

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

  let selectedSize = "md";
  let selectedOpacity = "medium";
  let gradientEnabled = true;

  function updateBackground(type: string, value: string | boolean) {
    if (type === "size") selectedSize = value as string;
    if (type === "opacity") selectedOpacity = value as string;
    if (type === "gradient") gradientEnabled = value as boolean;
    
    // Dispatch event to update background pattern
    dispatch("update", {
      size: selectedSize,
      opacity: selectedOpacity,
      gradient: gradientEnabled
    });
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline" size={iconOnly ? "icon" : "sm"} class={cn(
      "relative",
      iconOnly ? "w-10" : "gap-2"
    )}>
      <Grid class="h-[1.2rem] w-[1.2rem]" />
      {#if !iconOnly}
        <span>Background</span>
      {/if}
    </Button>
  </DropdownMenu.Trigger>
  
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Grid Size</DropdownMenu.Label>
    {#each gridSizes as size}
      <DropdownMenu.CheckboxItem
        checked={selectedSize === size.value}
        onCheckedChange={() => updateBackground("size", size.value)}
      >
        {size.label}
      </DropdownMenu.CheckboxItem>
    {/each}
    
    <DropdownMenu.Separator />
    
    <DropdownMenu.Label>Opacity</DropdownMenu.Label>
    {#each opacityLevels as level}
      <DropdownMenu.CheckboxItem
        checked={selectedOpacity === level.value}
        onCheckedChange={() => updateBackground("opacity", level.value)}
      >
        {level.label}
      </DropdownMenu.CheckboxItem>
    {/each}
    
    <DropdownMenu.Separator />
    
    <DropdownMenu.CheckboxItem
      checked={gradientEnabled}
      onCheckedChange={(checked) => updateBackground("gradient", checked)}
    >
      Fade Gradient
    </DropdownMenu.CheckboxItem>
  </DropdownMenu.Content>
</DropdownMenu.Root>