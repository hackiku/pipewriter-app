<!-- src/lib/pages/landing/sections/samples/SampleTabs.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  
  interface Sample {
    id: string;
    name: string;
    company: string;
    description: string;
    logo?: string;
    beforeImage?: string;
    afterImage?: string;
  }
  
  const {
    samples,
    currentSample = 0,
    onSampleChange
  }: {
    samples: Sample[];
    currentSample: number;
    onSampleChange: (index: number) => void;
  } = $props();
  
  let tabsContainer: HTMLDivElement;
  let activeTabElement: HTMLButtonElement | null = null;
  let autoRotateInterval: number;
  
  // Spring animation for tab movement
  const tabPosition = spring({ x: 0, width: 0 }, {
    stiffness: 0.2,
    damping: 0.8
  });
  
  // Auto-rotate samples
  onMount(() => {
    startAutoRotate();
    return () => {
      if (autoRotateInterval) clearInterval(autoRotateInterval);
    };
  });
  
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    
    autoRotateInterval = setInterval(() => {
      const nextIndex = (currentSample + 1) % samples.length;
      onSampleChange(nextIndex);
    }, 5000); // Auto-change every 5 seconds
  }
  
  function handleTabClick(index: number) {
    onSampleChange(index);
    // Reset auto-rotate timer when user interacts
    startAutoRotate();
  }
  
  // Update tab position animation when currentSample changes
  $effect(() => {
    if (tabsContainer && currentSample >= 0) {
      const tabElements = tabsContainer.querySelectorAll('[data-tab]') as NodeListOf<HTMLButtonElement>;
      const activeTab = tabElements[currentSample];
      
      if (activeTab) {
        activeTabElement = activeTab;
        const containerRect = tabsContainer.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        
        tabPosition.set({
          x: tabRect.left - containerRect.left,
          width: tabRect.width
        });
      }
    }
  });
  
  // Logo placeholder function
  function getLogoPlaceholder(company: string): string {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600', 
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-orange-500 to-orange-600'
    ];
    
    const index = samples.findIndex(s => s.company === company);
    return colors[index % colors.length];
  }
  
  // Tab connection styles - the leftmost tab gets the "connected" look
  function getTabStyles(index: number): string {
    const isActive = index === currentSample;
    const isLeftmost = index === 0;
    
    if (isActive && isLeftmost) {
      // Connected tab style - like the app tabs
      return `relative z-10 rounded-t-3xl bg-background border-b-0 border-l border-r border-t 
              border-border shadow-lg transform translate-y-1`;
    }
    
    if (isActive) {
      // Active but not leftmost - highlight style
      return `relative z-20 bg-primary/10 border border-primary/20 rounded-2xl
              transform scale-105 shadow-lg`;
    }
    
    // Inactive tab
    return `relative z-0 bg-card hover:bg-muted border border-border rounded-2xl
            hover:border-primary/20 transition-all duration-200`;
  }
</script>

<div class="space-y-0 relative">
  <!-- Tabs Container -->
  <div 
    bind:this={tabsContainer}
    class="flex gap-4 px-4 relative"
  >
    <!-- Animated background indicator (optional alternative to individual tab styling) -->
    <!-- <div 
      class="absolute top-0 bottom-0 bg-primary/5 border border-primary/20 rounded-2xl
             transition-all duration-300 ease-out z-0"
      style="left: {$tabPosition.x}px; width: {$tabPosition.width}px;"
    ></div> -->
    
    {#each samples as sample, index}
      <button
        data-tab={index}
        class="flex-1 p-4 transition-all duration-300 ease-out {getTabStyles(index)}
               hover:shadow-md group"
        on:click={() => handleTabClick(index)}
        disabled={currentSample === index}
      >
        <div class="flex flex-col items-center space-y-3">
          <!-- Logo/Icon -->
          {#if sample.logo}
            <img src={sample.logo} alt="{sample.company} logo" class="w-12 h-12 rounded-xl" />
          {:else}
            <div class="w-12 h-12 rounded-xl {getLogoPlaceholder(sample.company)}
                        flex items-center justify-center text-white font-bold text-lg
                        group-hover:scale-105 transition-transform">
              {sample.company.charAt(0)}
            </div>
          {/if}
          
          <!-- Content -->
          <div class="text-center space-y-1">
            <h4 class="font-semibold text-sm text-foreground 
                       {currentSample === index ? 'text-primary' : 'group-hover:text-primary'}
                       transition-colors">
              {sample.company}
            </h4>
            <p class="text-xs text-muted-foreground">
              {sample.name}
            </p>
            
            <!-- Active indicator dot -->
            {#if currentSample === index}
              <div class="flex justify-center mt-2">
                <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            {/if}
          </div>
        </div>
      </button>
    {/each}
  </div>
  
  <!-- Connection indicator for leftmost tab -->
  {#if currentSample === 0}
    <div class="absolute top-full left-4 w-24 h-1 bg-background border-l border-r border-border
                transform -translate-y-0.5 z-0"></div>
  {/if}
  
  <!-- Navigation dots (mobile alternative) -->
  <div class="flex justify-center gap-2 mt-6 sm:hidden">
    {#each samples as _, index}
      <button
        class="w-2 h-2 rounded-full transition-all duration-300
               {index === currentSample 
                 ? 'bg-primary w-6' 
                 : 'bg-muted hover:bg-primary/50'
               }"
        on:click={() => handleTabClick(index)}
        aria-label="View sample {index + 1}"
      />
    {/each}
  </div>
</div>

<style>
  /* Ensure smooth transitions for tab movement */
  [data-tab] {
    transform-origin: center;
    will-change: transform;
  }
  
  /* Optional: Add slight shadow to connected tab to emphasize depth */
  .connected-tab {
    box-shadow: 
      0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }
</style>