<!-- src/lib/pages/space/content/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Edit, Rocket, Code } from 'lucide-svelte';
  
  let visible = false;
  
  const steps = [
    {
      icon: Edit,
      title: "Write",
      description: "Converting visitors into mission partners."
    },
    {
      icon: Rocket,
      title: "Design",
      description: "Launch-ready UX that feels like mission control."
    },
    {
      icon: Code,
      title: "Ship",
      description: "Clean code your engineers will appreciate."
    }
  ];

  let containerRef: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef);
    return () => observer.disconnect();
  });
</script>

<div class="container grid grid-cols-12 gap-8 lg:gap-16" bind:this={containerRef}>
  <!-- Left: Process Steps -->
  <div class="col-span-12 lg:col-span-5 space-y-44">
    {#if visible}
      {#each steps as step, index}
        <div 
          in:fly={{ y: 20, duration: 400, delay: index * 200 }}
          class="relative"
        >
          <!-- Connector Line -->
          {#if index < steps.length - 1}
            <div class="absolute left-6 top-20 bottom-0 w-px bg-primary/20" />
          {/if}
          
          <div class="flex gap-6">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-full bg-primary/10 
                       flex items-center justify-center shrink-0
                       transition-transform hover:scale-110 hover:rotate-12">
              <svelte:component 
                this={step.icon} 
                class="w-6 h-6 text-primary" 
              />
            </div>

            <!-- Content -->
            <div>
              <h3 class="text-4xl font-bold mb-3">{step.title}</h3>
              <p class="text-xl text-muted-foreground">{step.description}</p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Right: Live Preview -->
  <div class="col-span-12 lg:col-span-7 lg:sticky lg:top-32">
    {#if visible}
      <div 
        in:fly={{ y: 20, duration: 400 }}
        class="aspect-[4/3] rounded-xl border bg-card overflow-hidden"
      >
        <div class="w-full h-8 bg-muted border-b flex items-center px-4 gap-2">
          <div class="flex gap-1.5">
            <div class="w-3 h-3 rounded-full bg-red-500" />
            <div class="w-3 h-3 rounded-full bg-yellow-500" />
            <div class="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div class="text-xs text-muted-foreground">mission-control.space</div>
        </div>
        
        <div class="p-8 space-y-4">
          <div class="h-8 bg-muted/30 rounded-lg w-2/3 animate-pulse" />
          <div class="h-4 bg-muted/30 rounded w-1/2 animate-pulse" />
          <div class="h-4 bg-muted/30 rounded w-1/3 animate-pulse" />
        </div>
      </div>
    {/if}
  </div>
</div>