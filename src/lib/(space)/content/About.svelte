<!-- src/lib/pages/space/content/About.svelte -->
<script lang="ts">
  import { Rocket, Code, Send } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  
  let showMore = false;
</script>

<div class="relative">
  <!-- Tilted Images -->
  <div class="absolute -left-24 -top-12 w-64 h-64 rotate-[-6deg] opacity-80">
    <img
      src="/api/placeholder/400/400"
      alt="Space coding setup"
      class="w-full h-full object-cover rounded-lg shadow-xl bg-blue-300/5"
    />
  </div>
  
  <div class="absolute -right-24 bottom-24 w-64 h-64 rotate-[8deg] opacity-80">
    <img
      src="/api/placeholder/400/400"
      alt="Mission control desk"
      class="w-full h-full object-cover rounded-lg shadow-xl bg-blue-300/5"
    />
  </div>

  <div class="container pt-24 pb-12 relative">
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
</div>