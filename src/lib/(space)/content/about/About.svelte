<!-- src/lib/(space)/content/about/About.svelte -->
<script lang="ts">
  import { Rocket } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import ProjectsMarquee from "../products/ProjectsMarquee.svelte";
  import Astronaut from "./Astronaut.svelte";
  
  let showMore = false;
  let y: number;
</script>

<svelte:window bind:scrollY={y} />

<div class="relative bg-red-900">
  <!-- Parallax Astronaut -->
  <div 
    class="absolute -left-24 top-0 w-80 h-80 opacity-90"
    style="transform: translate3d(0, {y * 0.1}px, 0) rotate(-6deg);"
  >
    <Astronaut />
  </div>
  
  <!-- Parallax Mission Control Image -->
  <div 
    class="absolute -right-24 bottom-24 w-64 h-64 opacity-80"
    style="transform: translate3d(0, {y * -0.1}px, 0) rotate(8deg);"
  >
    <img
      src="/api/placeholder/400/400"
      alt="Mission control desk"
      class="w-full h-full object-cover rounded-lg shadow-xl bg-blue-300/5"
    />
  </div>

  <div class="container pt-24 pb-12 relative">
    <div class="max-w-xl mx-auto space-y-8">
      <!-- Section Heading -->
      <div class="flex flex-col items-center text-center gap-4 mb-12">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
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