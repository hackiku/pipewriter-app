<!-- src/lib/(space)/content/about/About.svelte -->
<script lang="ts">
  import { Rocket } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import Astronaut from "./Astronaut.svelte";
  import { onMount } from 'svelte';
  
  let showMore = false;
  let container: HTMLElement;
  let parallaxElements: HTMLElement[];
  let ticking = false;
  
  // Parallax speeds
  const SPEEDS = {
    astronaut: 2, // Much slower movement
    missionControl: 4, // Much slower for car
    text: 0.25 // Slightly faster than normal scroll
  };
  
  onMount(() => {
    parallaxElements = Array.from(document.querySelectorAll('[data-parallax]'));
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const containerRect = container.getBoundingClientRect();
          const scrollProgress = -containerRect.top / (containerRect.height - window.innerHeight);
          
          parallaxElements.forEach(element => {
            const speed = Number(element.dataset.parallax);
            // Increased multiplier for more dramatic movement
            const yOffset = scrollProgress * 300 / speed;
            element.style.transform = `translate3d(0, ${yOffset}px, 0)`;
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="relative min-h-[150vh] _overflow-hidden" bind:this={container}>
  <!-- Parallax Container -->
  <div class="absolute inset-0">
    <!-- Astronaut -->
    <div 
      class="absolute left-0 top-[0vh] w-[80vw] sm:w-[calc(60vw-5em)] max-w-2xl z-10"
      data-parallax={SPEEDS.astronaut}
      style="will-change: transform"
    >
      <div class="w-full pb-[100%] relative">
        <div class="absolute inset-0">
          <Astronaut />
        </div>
      </div>
    </div>

    <!-- Profile Image -->
    <div
      class="absolute right-8 top-[95vh] w-[45vw] sm:w-[30vw] max-w-md aspect-square
             transform rotate-6"
      data-parallax={SPEEDS.missionControl}
      style="will-change: transform"
    >
      <img
        src="/api/placeholder/400/400"
        alt="Mission control desk"
        class="w-full h-full object-cover rounded-lg 
               shadow-xl bg-blue-300/5"
      />
    </div>
    <div
      class="absolute right-[20%] top-[85vh] w-[35vw] sm:w-[25vw] max-w-sm aspect-square
             transform -rotate-6"
      data-parallax={SPEEDS.missionControl}
      style="will-change: transform"
    >
      <img
        src="/api/placeholder/400/400"
        alt="Mission control desk"
        class="w-full h-full object-cover rounded-lg 
               shadow-xl bg-blue-300/5"
      />
    </div>
  </div>

  <!-- Content Container -->
  <div class="relative min-h-[120vh] flex items-center">
    <div class="container">
      <div class="ml-auto w-full max-w-xl pr-8 md:pr-16 space-y-6">
        <!-- Brief -->
        <p class="text-xl md:text-2xl lg:text-3xl font-light leading-loose tracking-wide">
					Hi! I'm Ivan 👋 tech copywriter turned developer.
          I love building products that make the techy accessible and viral, for users and for myself.
        </p>

        <!-- Expanded Story -->
        {#if showMore}
          <div class="space-y-8 text-xl text-muted-foreground">
            <p>
              Started out writing for SaaS startups, helping technical founders 
              communicate complexity. This evolved into UX writing and eventually 
              full-stack development as I built Pipewriter to solve common content workflow problems.
            </p>
            
            <p>
              On the side, I'm pursuing my PPL(A) and an aerospace engineering master's, 
              channeling my lifelong fascination with flight into practical knowledge. 
              This intersection of technical writing, software, and aerospace led me to build 
              tools that make space tech more accessible.
            </p>
          </div>
        {/if}

        <Button 
          variant="ghost" 
          on:click={() => showMore = !showMore}
          class="text-primary"
        >
          {showMore ? 'Show Less' : 'Read More'}
        </Button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Remove the float animations since we're using parallax */
</style>