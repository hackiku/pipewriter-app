 <!-- src/lib/(space)/content/about/FounderCards.svelte -->

<script lang="ts">
  import { Pen, Code, Wrench, Palette } from 'lucide-svelte';
  
  export let class_ = ''; // Allow positioning via class prop
  
  const journey = [
    {
      icon: Pen,
      title: "Copywriter",
      description: "for software startups"
    },
    {
      icon: Code,
      title: "Front-end dev",
      description: "with automation leanings"
    },
		{
			icon: Wrench,
			title: "Pilot & engineer",
			description: "training PPL and missing school"
		},
		{
			icon: Palette,
			title: "Aerospaceish engineer",
			description: "shipping space apps and missing school 👇"
		}
  ];
</script>

<div class="relative {class_}">
  <!-- Mobile Timeline -->
  <div class="md:hidden relative">
    <!-- Connecting Line with Gradient -->
    <div class="absolute left-6 top-8 bottom-0 w-px">
      <div class="w-full h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
    </div>
    
    <!-- Journey Steps -->
    <div class="space-y-8">
      {#each journey as step}
        <div class="grid grid-cols-[auto_1fr] gap-6 items-start">
          <div class="relative z-10 w-12 h-12 rounded-full 
                      bg-muted/30 border border-border/50
                      flex items-center justify-center
                      hover:scale-105 transition-all duration-300">
            <svelte:component this={step.icon} class="w-5 h-5 text-primary/80" />
          </div>
          <div class="mt-2">
          <p class="text-xl font-medium">
            <span class=" text-foreground">{step.title}</span>
            <span class="text-muted-foreground">{step.description}</span>
          </p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Desktop Horizontal Timeline -->
  <div class="hidden md:block relative">
    <!-- Horizontal Line with Gradient -->
    <div class="absolute left-0 right-0 top-6 h-px">
      <div class="w-full h-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </div>
    
    <!-- Journey Steps -->
    <div class="grid grid-cols-4 gap-8">
      {#each journey as step}
        <div class="space-y-4">
          <div class="relative z-10 w-12 h-12 rounded-full 
                      bg-muted/30 border border-border/50
                      flex items-center justify-center mx-autox
                      hover:scale-105 transition-all duration-300">
            <svelte:component this={step.icon} class="w-5 h-5 text-primary/80" />
          </div>
          <p class="text-xl font-medium">
            <span class=" text-foreground">{step.title}</span>
            <span class="text-muted-foreground">{step.description}</span>
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>