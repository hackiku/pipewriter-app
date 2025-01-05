<!-- lib/pages/producthunt/ProductHunt.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import BackgroundPattern from '$lib/components/BackgroundPattern.svelte';
  import SupportSection from './cta/SupportSection.svelte';
  import SupportButton from './cta/SupportButton.svelte';

	import ComingSoon from '$lib/components/ComingSoon.svelte';
  
  let visible = false;
  let heroHeight: number;

  onMount(() => {
    visible = true;
    
    // Calculate ideal hero height to show peek of next section
    const setHeroHeight = () => {
      const vh = window.innerHeight;
      const minHeight = 600; // Minimum hero height
      const peekAmount = 120; // How much of next section to show
      heroHeight = Math.max(minHeight, vh - peekAmount);
    };

    setHeroHeight();
    window.addEventListener('resize', setHeroHeight);
    return () => window.removeEventListener('resize', setHeroHeight);
  });
</script>


<ComingSoon />

<main class="bg-background text-foreground relative overflow-x-hidden min-h-screen">
  <!-- Background Pattern -->
  <div class="fixed inset-0 pointer-events-none">
    <BackgroundPattern size="lg" opacity="high" gradient={true} />
  </div>

  <!-- Hero Section -->
  <section 
    class="relative pt-32 flex items-center"
    style="min-height: {heroHeight}px"
  >
    <div class="container max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
      <div class="max-w-3xl mx-auto text-center space-y-8">
        {#if visible}
          <div in:fly={{ y: 20, duration: 400 }}>
            <img 
              src="/logos/producthunt.svg" 
              alt="Product Hunt"
              class="w-44 h-24 mx-auto -rotate-6 -mb-4 hover:scale-110 transition-transform" 
            />
          </div>

          <h1 
            in:fly={{ y: 20, duration: 400, delay: 100 }}
            class="text-4xl sm:text-5xl md:text-7xl font-medium leading-tight"
          >
            Help Launch Pipewriter on Product Hunt
          </h1>

          <p 
            in:fly={{ y: 20, duration: 400, delay: 200 }}
            class="text-2xl md:text-3xl font-medium text-muted-foreground"
          >
            Join 100+ writers who'll help us reach #1 on launch day
          </p>

          <!-- Subtle scroll indicator -->
          <div 
            in:fly={{ y: 20, duration: 400, delay: 300 }}
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

  <!-- Support Section with Sticky Form -->
  <div id="support-form">
    <SupportSection />
  </div>

  <!-- CTA Section -->
  <section class="relative py-32 lg:py-44">
    <div class="container max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
      {#if visible}
        <div 
          in:fly={{ y: 20, duration: 400 }}
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12"
        >
          <div class="max-w-2xl">
            <h2 class="text-4xl font-medium">
              Ready to help us launch?
            </h2>
            <p class="text-xl text-muted-foreground mt-4">
              Your support in the first 4 hours makes all the difference.
            </p>
          </div>
          <div class="flex-shrink-0 w-full lg:w-auto">
            <SupportButton size="lg" className="w-full lg:w-auto" />
          </div>
        </div>
      {/if}
    </div>
  </section>
</main>

<style>
  html {
    scroll-behavior: smooth;
    /* Prevent iOS rubber-banding but keep normal scrolling */
    overscroll-behavior-y: none;
  }

  /* Ensure smooth anchor scrolling on Safari */
  html:not(.no-js) {
    scroll-behavior: smooth;
  }

  /* Better mobile form interactions */
  @media (max-width: 1024px) {
    :global(#support-form) {
      scroll-margin-top: 32px;
    }
  }
</style>