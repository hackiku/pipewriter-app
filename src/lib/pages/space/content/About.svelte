<!-- src/lib/pages/space/About.svelte -->

<script lang="ts">
  import { Rocket, Code, Send } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  
  let showMore = false;
</script>

<div class="rounded-t-3xl">
  <div class="container py-24">
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- TLDR Version -->
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

  <!-- Products Intro -->
  <div class="container pb-12">
    <h3 class="text-center text-2xl font-semibold mb-8">Building for the Space Age</h3>
    <!-- Products component goes here -->
  </div>
</div>
