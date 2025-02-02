<!-- src/lib/components/dev/ViewportSize.svelte -->
<script lang="ts">
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  let windowWidth = 0;
  let windowHeight = 0;
  let isCollapsed = false;

  onMount(() => {
    const updateSize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  });

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
</script>

{#if dev}
  <div class="fixed top-4 right-4 z-[9999] flex items-center gap-2">
    <!-- Toggle button -->

    <!-- Size indicator -->
    {#if !isCollapsed}
      <div class="rounded-lg border bg-background/95 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <!-- Current dimensions -->
          <span class="tabular-nums">
            {windowWidth}x{windowHeight}
          </span>

          <!-- Divider -->
          <span class="text-border">|</span>

          <!-- Breakpoint indicators -->
          <div class="space-x-1">
            <!-- Base/xs (< 640px) -->
            <span class="inline sm:hidden">base</span>
            
            <!-- sm (640px - 767px) -->
            <span class="hidden sm:inline md:hidden">sm</span>
            
            <!-- md (768px - 1023px) -->
            <span class="hidden md:inline lg:hidden">md</span>
            
            <!-- lg (1024px - 1279px) -->
            <span class="hidden lg:inline xl:hidden">lg</span>
            
            <!-- xl (1280px - 1535px) -->
            <span class="hidden xl:inline 2xl:hidden">xl</span>
            
            <!-- 2xl (1536px - 1799px) -->
            <span class="hidden 2xl:inline 3xl:hidden">2xl</span>
            
            <!-- 3xl (1800px - 2099px) -->
            <span class="hidden 3xl:inline 4xl:hidden">3xl</span>
            
            <!-- 4xl (2100px - 2399px) -->
            <span class="hidden 4xl:inline 5xl:hidden">4xl</span>
            
            <!-- 5xl (≥ 2400px) -->
            <span class="hidden 5xl:inline">5xl</span>
          </div>

          <!-- Direction indicator -->
          <!-- <span class="hidden sm:inline-block">
            <span class="rotate-90 inline-block text-xs">⇄</span>
          </span> -->
        </div>
      </div>
    {/if}
		    <button
      class="flex h-9 w-9 items-center justify-center rounded-lg border bg-background/95 hover:bg-accent transition-colors"
      on:click={toggleCollapse}
      aria-label={isCollapsed ? "Expand viewport size" : "Collapse viewport size"}
    >
      {#if isCollapsed}
        <ChevronLeft class="h-4 w-4 text-muted-foreground" />
      {:else}
        <ChevronRight class="h-4 w-4 text-muted-foreground" />
      {/if}
    </button>

  </div>
{/if}