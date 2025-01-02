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
            src="/placeholder-chute.svg" 
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

<!-- src/lib/components/space/placholder-chute.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 711">
  <!-- Artistic parachute placeholder -->
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#9333EA;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <path d="M200,50 
           C50,150 0,300 0,400
           C150,350 250,350 400,400
           C400,300 350,150 200,50Z" 
        fill="url(#grad1)" 
        opacity="0.8">
    <animate 
      attributeName="d" 
      dur="4s"
      repeatCount="indefinite"
      values="
        M200,50 C50,150 0,300 0,400 C150,350 250,350 400,400 C400,300 350,150 200,50Z;
        M200,50 C100,150 50,300 50,400 C175,350 225,350 350,400 C350,300 300,150 200,50Z;
        M200,50 C50,150 0,300 0,400 C150,350 250,350 400,400 C400,300 350,150 200,50Z"
    />
  </path>
  
  <!-- Lines -->
  <g opacity="0.6" stroke="url(#grad1)" stroke-width="2">
    <line x1="200" y1="400" x2="200" y2="700" />
    <line x1="180" y1="400" x2="180" y2="690" />
    <line x1="220" y1="400" x2="220" y2="690" />
  </g>
</svg>