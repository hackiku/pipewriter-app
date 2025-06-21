<!-- routes/(website)/about/+page.svelte -->
<!-- // import AboutPage from "$lib/pages/about/AboutPage.svelte"; -->

<script lang="ts">
	import { Sparkles } from "lucide-svelte";
</script>

<svelte:head>
  <title>About - Pipewriter</title>
  <meta name="description" content="About Pipewriter - Coming Soon" />
</svelte:head>

<section class="relative pt-24 md:pt-16 pb-24 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 min-h-screen flex items-center">
  <!-- Background elements -->
  <div class="fixed inset-0 pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
  </div>

  <div class="max-w-7xl mx-auto w-full relative z-10">
    
    <!-- Desktop Layout: Text centered, Cat on right -->
    <div class="hidden md:flex items-center justify-center min-h-[80vh] relative">
      
      <!-- Hang in There Cat - Behind and to the right -->
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-auto rotate-12 opacity-80 z-0">
        <img 
          src="/fun/hang-in-there.webp" 
          alt="" 
          class="w-full h-auto object-contain"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <!-- Central Text Content -->
      <div class="text-center relative z-10 max-w-2xl">
        <!-- Icon -->
        <div class="flex justify-center mb-8">
          <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#3644FE]/30 to-[#B345ED]/30 
                      flex items-center justify-center shadow-lg">
            <Sparkles class="w-8 h-8 text-foreground/60" />
          </div>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#171717] dark:text-[#CFCFCF]">
          About Page Coming Soon
        </h1>

        <!-- Subhead -->
        <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8
				bg-gradient-to-r from-[#3644FE]/30 to-[#B345ED]/30 py-2 px-5 rounded-2xl">
          I'm solo-founding in here. Hold on to your horses a weeeee bit 🤏 more.
        </p>

        <!-- Home Link -->
        <a 
          href="/"
          class="inline-flex items-center gap-2 text-lg font-medium 
                 bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED]
                 hover:underline transition-all duration-200"
        >
          ← Back to Home
        </a>
      </div>
    </div>

    <!-- Mobile Layout: Text on top, Cat below -->
    <div class="md:hidden text-center space-y-12">
      
      <!-- Text Content -->
      <div>
        <!-- Icon -->
        <div class="flex justify-center mb-8">
          <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#3644FE]/30 to-[#B345ED]/30 
                      flex items-center justify-center shadow-lg">
            <Sparkles class="w-8 h-8 text-foreground/60" />
          </div>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl font-bold tracking-tight mb-6 text-[#171717] dark:text-[#CFCFCF]">
          About Page Coming Soon
        </h1>

        <!-- Subhead -->
        <p class="text-xl text-muted-foreground leading-relaxed mb-8">
          I'm solo-founding in here. Hold on to your horses a weeeee bit 🤏 more.
        </p>

        <!-- Home Link -->
        <a 
          href="/"
          class="inline-flex items-center gap-2 text-lg font-medium 
                 bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED]
                 hover:underline transition-all duration-200"
        >
          ← Back to Home
        </a>
      </div>

      <!-- Cat Image Below on Mobile -->
      <div class="flex justify-center">
        <div class="w-44 h-auto rotate-6">
          <img 
            src="/fun/hang-in-there.webp" 
            alt="" 
            class="w-full h-auto object-contain opacity-90"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>

  </div>
</section>