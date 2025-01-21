<!-- src/lib/pages/product/components/Hero.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  import { FileText, Sparkles } from 'lucide-svelte';
  import BackgroundPattern from '$lib/components/BackgroundPattern.svelte';
  import { Button } from "$lib/components/ui/button";
  
  let visible = false;

  // Show animations after mount
  import { onMount } from 'svelte';
  onMount(() => {
    visible = true;
  });

  function scrollToProducts() {
    const element = document.querySelector('#google-docs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<section class="relative min-h-[85vh] flex items-center">
  <!-- Background Pattern -->
  <div class="absolute inset-0 pointer-events-none">
    <BackgroundPattern size="lg" opacity="high" gradient={true} />
  </div>

  <div class="container relative z-10 pt-32">
    <div class="max-w-3xl mx-auto text-center space-y-8">
      {#if visible}
        <!-- Beta Badge -->
        <div 
          in:fly={{ y: 20, duration: 400 }}
          class="inline-flex items-center gap-1.5 px-3 py-1 
                 rounded-full bg-primary/10 text-primary 
                 border border-primary/20"
        >
          <Sparkles class="w-4 h-4" />
          <span class="text-sm font-medium">Pipewriter Product Suite</span>
        </div>


        <!-- Main Headline -->
        <h1 
          in:fly={{ y: 20, duration: 400, delay: 200 }}
          class="text-4xl sm:text-5xl md:text-7xl font-semibold"
        >
          Wireframes for Writers
        </h1>

        <!-- Subheadline -->
        <p 
          in:fly={{ y: 20, duration: 400, delay: 300 }}
          class="text-xl sm:text-2xl text-muted-foreground"
        >
          Writer-first wireframing tools for copywriters and UX writers.<br class="hidden sm:inline" />
          Design without leaving Google Docs.
        </p>

        <!-- CTA Section -->
        <div 
          in:fly={{ y: 20, duration: 400, delay: 400 }}
          class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button size="lg" class="h-12 px-6">
            <FileText class="w-5 h-5 mr-2" />
            Start Writing Free
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            class="h-12 px-6"
            on:click={scrollToProducts}
          >
            See How It Works
          </Button>
        </div>

        <!-- Subtle Stats -->
        <div 
          in:fly={{ y: 20, duration: 400, delay: 500 }}
          class="pt-8 flex justify-center gap-8 text-sm text-muted-foreground"
        >
          <div>
            <span class="font-semibold">87+</span> Pre-made Components
          </div>
          <div>
            <span class="font-semibold">100+</span> Active Writers
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div 
          in:fly={{ y: 20, duration: 400, delay: 600 }}
          class="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50"
        >
          <div class="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div class="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  /* Prevent iOS rubber-banding but keep normal scrolling */
  :global(html) {
    scroll-behavior: smooth;
    overscroll-behavior-y: none;
  }
</style>