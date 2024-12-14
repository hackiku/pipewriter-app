<!-- src/lib/pages/ai/GumroadSection.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import PricingBar from './PricingBar.svelte';
  
  let isSticky = false;
  let pricingBarElement: HTMLElement;
  
  onMount(() => {
    const handleScroll = () => {
      if (!pricingBarElement) return;
      const rect = pricingBarElement.getBoundingClientRect();
      isSticky = rect.top <= 0;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="relative">
  <!-- Pricing Bar -->
  <div bind:this={pricingBarElement}>
    <PricingBar {isSticky} />
  </div>

  <!-- Gumroad Embed -->
  <div class="container py-24">
    <div class="max-w-4xl mx-auto">
      <div class="relative bg-background rounded-xl border shadow-lg">
        <!-- Gumroad content -->
        <div class="h-[800px] overflow-hidden relative">
          <div class="h-full overflow-y-auto">
            <div class="p-8">
              <script src="https://gumroad.com/js/gumroad-embed.js"></script>
              <div class="gumroad-product-embed">
                <a href="https://pipewriter.gumroad.com/l/wires-for-writers">Loading...</a>
              </div>
            </div>
          </div>
          
          <!-- Gradient Overlay -->
          <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
            <div class="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h3 class="text-xl font-semibold mb-4">Ready to transform your writing workflow?</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Hide scrollbar but keep functionality */
  .overflow-y-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
</style>