<!-- src/lib/pages/space/content/Hero.svelte -->
<script lang="ts">
  import { Send, ArrowRight } from "lucide-svelte";
  import SpaceButton from "../components/cta/SpaceButton.svelte";
  import ChuteMath from "../components/chute/ChuteMath.svelte";
</script>

<section class="relative min-h-[80vh] flex items-start pt-28 md:pt-32 overflow-hidden">
  <!-- Editorial Grid Background -->
  <div class="absolute inset-0 pointer-events-none">
    <div
      class="absolute inset-0
           bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]
           bg-[size:8.33%_8.33%]"
    />
    <div
      class="absolute inset-0
           bg-gradient-to-b from-transparent via-background/50 to-background"
    />
  </div>

  <div class="container relative z-10">
    <div class="grid grid-cols-12 gap-8">
      <!-- Left Content -->
      <div class="col-span-12 lg:col-span-6 lg:col-start-2">
        <h1 class="text-5xl sm:text-5xl md:text-7xl font-regular leading-tight mb-6">
          Landing Pages for the
					Space Age
        </h1>

        <p class="text-2xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          Full-airspeed Website redesigns for space startups. Full-throttle UX.
        </p>

        <div class="flex items-center gap-8">
          <SpaceButton size="lg" />
          
          <a 
            href="/space/repacks" 
            class="inline-flex items-center gap-2 text-lg
                   text-muted-foreground hover:text-white transition-all
                   group relative"
          >
            <span class="relative z-10">
              Repacks
              <span class="inline-block transition-transform group-hover:translate-x-1">
                <ArrowRight class="w-5 h-5 inline" />
              </span>
            </span>
            
            <!-- Gradient glow on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100
                        bg-gradient-to-r from-indigo-600/20 to-purple-600/20 
                        blur-lg transition-opacity -z-10" />
            
            <!-- Hover underline with gradient -->
            <div class="absolute bottom-0 left-0 right-0 h-px 
                        bg-gradient-to-r from-indigo-600 to-purple-600
                        transform scale-x-0 group-hover:scale-x-100
                        transition-transform origin-left" />
          </a>
        </div>
      </div>

      <!-- Right Animation -->
      <div class="relative col-span-12 lg:col-span-3 lg:col-start-8">
        <div class="absolute z-10 inline-flex items-center gap-1.5 px-3 py-1 m-8
                   rounded-full bg-primary/10 text-primary border border-primary/20">
          <Send class="w-4 h-4" />
          <span class="text-xl font-medium">Chute Repack</span>
        </div>

        <!-- ChuteMath Component -->
        <ChuteMath />
      </div>
    </div>
  </div>
</section>