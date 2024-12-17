<!-- $lib/components/cta/EarlyAccess.svelte -->
<script lang="ts">
  import CartButton from "./CartButton.svelte";
  import Timer from "./Timer.svelte";
  import { ExternalLink } from "lucide-svelte";
  
  export let embedded = false;
  export let showEmbed = true;
</script>

<div class="w-full {embedded ? 'max-w-5xl' : 'w-full'}">
  <!-- Sticky Header -->
  <div class="sticky top-0 bg-background/80 backdrop-blur-sm z-10 -mx-6 px-6 pb-6 pt-4 border-b">
    <div class="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 mb-6">
      <div class="flex-1 text-center md:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                    bg-primary/10 text-primary border border-primary/20 mb-4">
          <Timer />
          <span class="text-sm font-medium">until price increase</span>
        </div>
        
        <h2 class="text-3xl font-bold mb-2">
          Early Access for <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED]">$59</span>
          <span class="text-muted-foreground line-through ml-2">$99</span>
        </h2>
        <p class="text-lg text-muted-foreground max-w-xl">
          Join the first wave of copywriters using AI-powered design tools. Price increases Jan 31st.
        </p>
      </div>
      
      <div class="w-full md:w-auto">
        <CartButton 
          size={embedded ? "default" : "lg"}
          text="Add to Cart" 
          showIcon={true}
          className="w-full md:w-auto"
        />
      </div>
    </div>
  </div>
  
  {#if showEmbed}
    <!-- Scrollable Content Area -->
    <div class="relative overflow-hidden bg-background">
      <div class="h-[calc(100vh-22rem)] overflow-y-auto">
        <!-- Gumroad Preview Content -->
        <div class="w-full aspect-[4/3] rounded-lg overflow-hidden">
          <div class="w-full h-full bg-black/5 backdrop-blur-sm 
                      border border-white/10 flex items-center justify-center">
            <span class="text-sm text-muted-foreground">Gumroad Embed Preview</span>
          </div>
        </div>

        <div class="mt-8 text-center">
          <a 
            href="https://pipewriter.gumroad.com/l/wires-for-writers"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md
                   text-sm font-medium text-muted-foreground 
                   hover:text-foreground transition-colors
                   border border-border hover:border-foreground/20"
          >
            Open in Gumroad
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  {/if}
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