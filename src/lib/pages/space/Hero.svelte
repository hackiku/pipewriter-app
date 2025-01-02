<!-- src/lib/components/space/Hero.svelte -->
<script lang="ts">
  import { Stars } from "lucide-svelte";
  import SpaceButton from "./SpaceButton.svelte";
  import SpaceDrawer from "./SpaceDrawer.svelte";

  let containerRef: HTMLElement;
  let animationRef: HTMLElement;
</script>

<section 
  bind:this={containerRef}
  class="relative min-h-[90vh] flex items-start pt-32 overflow-hidden"
>
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
        <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-8 
                    rounded-full bg-primary/10 text-primary border border-primary/20">
          <Stars class="w-4 h-4" />
          <span class="text-sm font-medium">Chute Repack Service</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight mb-6">
          Landing Pages for the Space Age
        </h1>
        
        <p class="text-xl text-muted-foreground mb-8 leading-relaxed">
          Transform your technical excellence into a compelling digital presence. 
          Get a complete redesign in pure code, not no-code platforms.
        </p>

        <SpaceDrawer>
          <div slot="trigger">
            <SpaceButton size="lg" />
          </div>
          <div class="p-6">
            <!-- Drawer content handled by SpaceDrawer component -->
          </div>
        </SpaceDrawer>
      </div>

      <!-- Right Animation -->
      <div class="col-span-12 lg:col-span-3 lg:col-start-8">
        <div 
          bind:this={animationRef}
          class="relative aspect-[9/16] w-full"
        >
          <img 
            src="pages/space/chute.svg" 
            alt="Artistic parachute animation"
            class="w-full h-full object-cover"
          />
          
          <!-- Placeholder for actual animation -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
      </div>
    </div>
  </div>
</section>

