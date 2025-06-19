<!-- src/lib/pages/landing/sections/samples/Samples.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  import BeforeAfterSlider from "./BeforeAfterSlider.svelte";

  // Enhanced sample data with mobile support
  const samples = [
    {
      id: "redocly",
      company: "Redocly",
      logo: "/logos/redocly.svg",
      tag: "API Docs",
      beforeImage: {
        desktop: "",
        mobile: ""
      },
      afterImage: {
        desktop: "",
        mobile: ""
      }
    },
    {
      id: "orizon",
      company: "Orizon", 
      logo: "/logos/orizon.svg",
      tag: "UX Agency",
      beforeImage: {
        desktop: "",
        mobile: ""
      },
      afterImage: {
        desktop: "",
        mobile: ""
      }
    },
    {
      id: "omicron",
      company: "Omicron",
      logo: "/logos/color/omicron.svg",
      tag: "Awwwards",
      beforeImage: {
        desktop: "",
        mobile: ""
      },
      afterImage: {
        desktop: "",
        mobile: ""
      }
    },
  ];

  // State
  let currentSample = 0;
  let autoRotateInterval: number;
  let isMobile = false;

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    startAutoRotate();
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (autoRotateInterval) clearInterval(autoRotateInterval);
    };
  });

  // Auto-rotate samples
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    
    autoRotateInterval = setInterval(() => {
      currentSample = (currentSample + 1) % samples.length;
    }, 6000);
  }

  // Handle tab click
  function handleTabClick(index: number) {
    currentSample = index;
    startAutoRotate();
  }

  // Current sample data
  $: currentSampleData = samples[currentSample];
  $: currentImages = {
    before: isMobile ? currentSampleData.beforeImage.mobile : currentSampleData.beforeImage.desktop,
    after: isMobile ? currentSampleData.afterImage.mobile : currentSampleData.afterImage.desktop
  };
</script>

<div class="space-y-0">
  <!-- Main Slider (no shadow as requested) -->
  <div class={cn(
    "relative rounded-3xl overflow-hidden p-2",
    "border-2 border-border bg-gradient-to-br from-muted/5 to-muted/15"
  )}>
    <BeforeAfterSlider
      beforeImage={currentImages.before}
      afterImage={currentImages.after}
      beforeLabel="Google Docs"
      afterLabel="Live Website"
    />
  </div>

  <!-- Enhanced Tabs -->
  <div class="flex justify-center gap-3 px-4">
    {#each samples as sample, index}
      <div class={cn(
        "transition-all duration-200 ease-out",
        currentSample === index ? "pt-0 -mt-[2px] z-10" : "pt-4 -mt-[2px] z-0"
      )}>
        <button
          class={cn(
            "relative flex flex-col items-center gap-3 px-6 py-4",
            "border-2 transition-all duration-200 group",
            currentSample === index 
              ? "border-l-border border-r-border border-b-border border-t-0 bg-background rounded-t-none rounded-b-3xl" 
              : "border-border bg-card hover:bg-muted/50 rounded-3xl hover:scale-[1.02]"
          )}
          on:click={() => handleTabClick(index)}
        >
          <!-- Logo Container -->
          <div class={cn(
            "relative w-20 h-12 rounded-2xl overflow-hidden transition-all duration-200",
            "flex items-center justify-center ",
            currentSample === index ? "scale-105" : "group-hover:scale-[1.02]"
          )}>
            <img 
              src={sample.logo} 
              alt="{sample.company} logo" 
              class="w-full h-14 object-contain transition-all duration-200"
            />
          </div>
          
          <!-- Company Name -->
          <!-- <div class={cn(
            "font-bold text-lg transition-colors duration-200",
            currentSample === index 
              ? "text-primary" 
              : "text-foreground group-hover:text-primary"
          )}>
            {sample.company}
          </div> -->
          
          <!-- Tag Badge -->
          <div class={cn(
            "px-3 py-1 rounded-full text-[0.6em] font-medium transition-all duration-200",
            currentSample === index
              ? "bg-gradient-to-r from-primary/20 to-primary/30 text-primary border border-primary/30"
              : "bg-muted/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 border border-transparent"
          )}>
            {sample.tag}
          </div>

          <!-- Active Indicator -->
          {#if currentSample === index}
            <div class="absolute -top-1 left-1/2 -translate-x-1/2">
              <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          {/if}

          <!-- Connection Line (for active tab) -->
          {#if currentSample === index}
            <div class="absolute -top-[2px] left-6 right-6 h-[2px] bg-background"></div>
          {/if}
        </button>
      </div>
    {/each}
  </div>

  <!-- Mobile Navigation Dots -->
  <div class="flex justify-center gap-2 mt-6 md:hidden">
    {#each samples as _, index}
      <button
        class={cn(
          "transition-all duration-300 rounded-full",
          index === currentSample 
            ? "w-8 h-3 bg-primary" 
            : "w-3 h-3 bg-muted hover:bg-primary/50"
        )}
        on:click={() => handleTabClick(index)}
        aria-label="View sample {index + 1}"
      />
    {/each}
  </div>
</div>