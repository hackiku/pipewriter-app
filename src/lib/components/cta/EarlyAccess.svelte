<!-- src/lib/components/cta/EarlyAccess.svelte -->
<script lang="ts">
  import CartButton from "./CartButton.svelte";
  import Timer from "./Timer.svelte";
  import GumroadEmbed from "./GumroadEmbed.svelte";
  import { ExternalLink } from "lucide-svelte";
  
  export let embedded = false;
  export let showEmbed = true;
</script>

<div class="w-full {embedded ? 'max-w-5xl' : 'w-full'}">
  <!-- Sticky Header -->
  <div class="sticky top-0 bg-background/80 backdrop-blur-sm z-10 -mx-6 px-6 py-1 border-b">
    <div class="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 mb-6">
      <div class="flex-1 text-center md:text-left">
        <!-- <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                    bg-primary/10 text-primary border border-primary/20 mb-4">
          <Timer showText={true} />
        </div> -->
        
        <h2 class="text-3xl font-bold mb-2">
          Early Access Forever for <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED]">$59</span>
          <span class="text-muted-foreground line-through ml-2">$99</span>
        </h2>
        <p class="text-lg text-muted-foreground max-w-xl">
          Join the first wave of copywriters using AI-powered design tools. Price increases Jan 31st.
        </p>
      </div>
      
      <div class="w-full md:w-auto flex flex-col items-center gap-4">
        <CartButton 
          size={embedded ? "default" : "lg"}
          text="Add to Cart" 
          showIcon={true}
          className="w-full md:w-auto"
        />
        
        <div class="flex flex-col items-center gap-2">
          <Timer showText={false} />
          <a 
            href="https://pipewriter.gumroad.com/l/wires-for-writers"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2
                   text-sm font-medium text-muted-foreground 
                   hover:text-foreground transition-colors"
          >
            Open in Gumroad
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </div>
  
  {#if showEmbed}
    <!-- Gumroad Embed Area -->
    <div class="relative overflow-hidden bg-background">
      <GumroadEmbed height="calc(100vh - 12rem)" showGradient={true} />
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