<!-- $lib/components/cta/EarlyAccess.svelte -->
<script lang="ts">
  import CartButton from "./CartButton.svelte";
  import { Button } from "$lib/components/ui/button";
  
  export let embedded = false;
  export let showEmbed = true;
</script>

<div class="w-full {embedded ? 'max-w-5xl' : 'w-full'}">
  <!-- CTA Section -->
  <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8">
    <div class="flex-1">
      <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED] mb-2">
        Writer-First Wireframing
      </h2>
      <p class="text-lg text-muted-foreground">
        Join the first wave of copywriters using AI-powered design tools
      </p>
    </div>
    
    <div class="w-full sm:w-auto">
      <CartButton 
        size={embedded ? "default" : "lg"}
        text="Add to Cart" 
        showIcon={true}
        className="w-full sm:w-auto"
      />
    </div>
  </div>
  
  {#if showEmbed}
    <!-- Scrollable Gumroad Embed -->
    <div class="relative w-full">
      <div class="w-full aspect-[4/3] rounded-lg overflow-hidden">
        <div class="w-full h-full bg-black/5 backdrop-blur-sm 
                    border border-white/10 flex items-center justify-center">
          <span class="text-sm text-muted-foreground">Gumroad Embed Preview</span>
        </div>
      </div>
    </div>
  {/if}
</div>