<!-- src/lib/(space)/content/about/FounderCards.svelte -->
<script lang="ts">
  import { Pen, Wand2, Code, Rocket } from 'lucide-svelte';

  const journey = [
    {
      icon: Pen,
      title: "Technical Writer",
      period: "2017-2020",
      description: "Building content systems for B2B tech"
    },
    {
      icon: Wand2,
      title: "UX Designer",
      period: "2020-2022",
      description: "Making complex products feel simple"
    },
    {
      icon: Code,
      title: "Full-Stack Dev",
      period: "2022-2023",
      description: "Shipping tools people actually want"
    },
    {
      icon: Rocket,
      title: "Space Tech",
      period: "2023+",
      description: "Engineering the final frontier"
    }
  ];
</script>

<div class="w-full mt-16">
  <!-- Horizontal Track -->
  <div class="relative hidden md:block">
    <div class="absolute left-0 right-0 top-24 h-px bg-border/10">
      <!-- Progress Line -->
      <div class="absolute inset-y-0 left-0 w-3/4 bg-primary/20" />
      
      <!-- Stage Dots -->
      {#each journey as _, i}
        <div 
          class="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60"
          style="left: {(i * 100) / (journey.length - 1)}%"
        />
      {/each}
    </div>
  </div>

  <!-- Cards Grid -->
  <div class="grid md:grid-cols-4 gap-8 md:gap-4">
    {#each journey as stage}
      <div class="group space-y-4">
        <div class="relative z-10 w-12 h-12 rounded-full 
                    bg-muted/5 border border-border/20
                    flex items-center justify-center
                    transition-all duration-300">
          <svelte:component this={stage.icon} class="w-5 h-5 text-primary/60" />
        </div>
        <div class="space-y-1">
          <div class="flex items-baseline gap-2">
            <h3 class="text-base font-medium">{stage.title}</h3>
            <span class="text-xs text-muted-foreground">{stage.period}</span>
          </div>
          <p class="text-sm text-muted-foreground">{stage.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>