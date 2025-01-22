<!-- src/lib/(space)/content/about/About.svelte -->
<script lang="ts">
  import { Rocket } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import ProjectsMarquee from "../products/ProjectsMarquee.svelte";
  import Astronaut from "./Astronaut.svelte";
  
  let showMore = false;
</script>

<div class="relative min-h-[120vh] border border-red-800">
  <!-- Fixed Background - creates depth -->
  <div class="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

  <!-- Hero Container with Astronaut -->
  <div class="sticky -top-12 h-[100vh] overflow-hidden">
    <!-- Astronaut with Tailwind transforms -->
    <div class="absolute -left-12 -top-12 w-[32rem] h-[32rem] 
                transform -rotate-6 
                motion-safe:animate-float 
                translate-y-0 hover:translate-y-4 
                transition-transform duration-1000">
      <Astronaut />
			<!-- Mission Control Image -->
    </div>
		<div class="absolute -right-12 top-[80vh] w-64 h-64 
								transform rotate-6
								motion-safe:animate-float-delayed
								translate-y-0 hover:translate-y-4
								transition-transform duration-1000">
			<img
				src="/api/placeholder/400/400"
				alt="Mission control desk"
				class="w-full h-full object-cover rounded-lg shadow-xl bg-blue-300/5"
			/>
		</div>
  </div>



  <!-- Content Container -->
  <div class="relative z-10 -mt-[20vh]">
    <div class="container">
      <div class="max-w-xl mx-auto space-y-8">
        <!-- Section Heading -->
        <div class="flex flex-col items-center text-center gap-4 mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 
                      rounded-full bg-primary/10 text-primary 
                      border border-primary/20">
            <Rocket class="w-4 h-4" />
            <span class="text-sm font-medium">My Projects</span>
          </div>
          <h2 class="text-3xl">Building Tools for the Space Age</h2>
        </div>

        <!-- Brief -->
        <p class="text-2xl text-balance leading-relaxed">
          I'm Ivan 👋 copywriter turned dev.
          I love building techy products like Pipewriter here,
          and a bunch of side projects and flight training.
        </p>

        <!-- Expanded Story -->
        {#if showMore}
          <div class="space-y-6 text-muted-foreground">
            <p>
              My journey started in SaaS copywriting, where I helped technical founders 
              communicate complex products. This evolved into UX writing and eventually 
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



    <!-- Projects Marquee -->
    <div class="mt-24">
      <ProjectsMarquee />
    </div>
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-6deg); }
    50% { transform: translateY(-20px) rotate(-6deg); }
  }

  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(8deg); }
    50% { transform: translateY(-15px) rotate(8deg); }
  }

  :global(.animate-float) {
    animation: float 6s ease-in-out infinite;
  }

  :global(.animate-float-delayed) {
    animation: float-delayed 8s ease-in-out infinite;
    animation-delay: -2s;
  }
</style>