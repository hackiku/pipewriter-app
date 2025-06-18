<!-- src/lib/components/dev/ViewportSize.svelte -->
<script lang="ts">
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';

  let windowWidth = 0;
  let windowHeight = 0;
  let showDimensions = false;

  onMount(() => {
    const updateSize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  });

  function toggleDimensions() {
    showDimensions = !showDimensions;
  }
</script>

{#if dev}
  <button
    class="fixed bottom-10 -right-2 z-[9999] 
           rounded-lg border bg-background/95 px-3 py-2 
           backdrop-blur supports-[backdrop-filter]:bg-background/60
           hover:bg-accent transition-colors"
    on:click={toggleDimensions}
  >
    <div class="flex items-center gap-2 font-mono text-sm text-muted-foreground">
      {#if showDimensions}
        <!-- Pixel dimensions -->
        <span class="tabular-nums">
          {windowWidth}x{windowHeight} |
        </span>
				<span class="inline sm:hidden">xs</span>
				<span class="hidden sm:inline md:hidden">sm</span>
				<span class="hidden md:inline lg:hidden">md</span>
				<span class="hidden lg:inline xl:hidden">lg</span>
				<span class="hidden xl:inline 2xl:hidden">xl</span>
				<span class="hidden 2xl:inline 3xl:hidden">2xl</span>
				<span class="hidden 3xl:inline 4xl:hidden">3xl</span>
				<span class="hidden 4xl:inline 5xl:hidden">4xl</span>
				<span class="hidden 5xl:inline">5xl</span>
				
				
      {:else}
        <!-- Breakpoint indicators -->
        <span class="inline sm:hidden">xs</span>
        <span class="hidden sm:inline md:hidden">sm</span>
        <span class="hidden md:inline lg:hidden">md</span>
        <span class="hidden lg:inline xl:hidden">lg</span>
        <span class="hidden xl:inline 2xl:hidden">xl</span>
        <span class="hidden 2xl:inline 3xl:hidden">2xl</span>
        <span class="hidden 3xl:inline 4xl:hidden">3xl</span>
        <span class="hidden 4xl:inline 5xl:hidden">4xl</span>
        <span class="hidden 5xl:inline">5xl</span>
      {/if}
    </div>
  </button>
{/if}