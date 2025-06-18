<!-- src/lib/pages/landing/sections/samples/Samples.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import BeforeAfterSlider from "./BeforeAfterSlider.svelte";

  // Simple sample data - 3 projects, manual tags
  const samples = [
    {
      id: "redocly",
      company: "Redocly",
      logo: "/logos/redocly.svg",
      tag: "web copy",
      beforeImage: "",
      afterImage: ""
    },
    {
      id: "orizon",
      company: "Orizon", 
      logo: "/logos/orizon.svg",
      tag: "ux agency",
      beforeImage: "",
      afterImage: ""
    },
    {
      id: "omicron",
      company: "Omicron",
      logo: "/logos/color/omicron.svg",
      tag: "awwwards",
      beforeImage: "",
      afterImage: ""
    },
  ];

  // State
  let currentSample = 0;
  let autoRotateInterval: number;

  onMount(() => {
    startAutoRotate();
    return () => {
      if (autoRotateInterval) clearInterval(autoRotateInterval);
    };
  });

  // Auto-rotate samples
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    
    autoRotateInterval = setInterval(() => {
      currentSample = (currentSample + 1) % samples.length;
    }, 5000);
  }

  // Handle tab click
  function handleTabClick(index: number) {
    currentSample = index;
    startAutoRotate();
  }

  // Current sample data
  $: currentSampleData = samples[currentSample];
</script>

<div class="space-y-0">
  <!-- Slider Wrapper -->
  <div class={cn(
    "relative rounded-3xl overflow-hidden p-3",
    "border-2 border-border bg-gradient-to-br from-muted/20 to-muted/40",
    "shadow-lg"
  )}>
    <BeforeAfterSlider
      beforeImage={currentSampleData.beforeImage}
      afterImage={currentSampleData.afterImage}
      beforeLabel="Google Docs"
      afterLabel="Live Website"
    />
  </div>

  <!-- Tab Containers -->
  <div class="flex justify-center gap-4 px-4">
    {#each samples as sample, index}
      <div class={cn(
        "transition-all duration-300",
        currentSample === index ? "pt-0 -mt-[2px]" : "pt-4 -mt-[2px]"
      )}>
        <Button
          variant="ghost"
          size="sm"
          class={cn(
            "h-full flex-col gap-2 px-4 py-3",
            "border-2 transition-all duration-300",
            currentSample === index 
              ? "border-l border-r border-b border-t-0 border-border bg-background shadow-md opacity-100 rounded-t-none rounded-b-2xl" 
              : "border-border bg-card hover:bg-muted opacity-50 hover:opacity-75 rounded-2xl"
          )}
          on:click={() => handleTabClick(index)}
        >
          <img 
            src={sample.logo} 
            alt="{sample.company} logo" 
            class="__w-8 h-10 object-contain" 
          />
          <span class="text-[0.7em] font-medium">{sample.tag}</span>
        </Button>
      </div>
    {/each}
  </div>
</div>