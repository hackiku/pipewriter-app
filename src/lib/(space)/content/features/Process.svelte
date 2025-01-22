<!-- src/lib/(space)/content/features/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Edit, Rocket, Code } from 'lucide-svelte';
  
  const steps = [
    {
      icon: Edit,
      content: `Conversion copywriting <span class="text-muted-foreground">that turns visitors into mission partners</span>`,
    },
    {
      icon: Rocket,
      content: `On-brand design <span class="text-muted-foreground">that feels like mission control</span>`,
    },
    {
      icon: Code,
      content: `Your code stack <span class="text-muted-foreground">with clean components your engineers will love</span>`,
    }
  ];

  let containerRef: HTMLElement;
  let visible = false;
  
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

<div class="relative" bind:this={containerRef}>
  <!-- Process Content -->
  <div class="lg:col-span-3 space-y-[50vh] pt-[45vh] lg:pt-0">
    {#if visible}
      {#each steps as step, i}
        <div 
          in:fly={{ y: 20, duration: 400, delay: i * 200 }}
          class="relative"
        >
          <div class="flex gap-6">
            <!-- Icon with Connector Line -->
            <div class="relative">
              <div class="w-12 h-12 rounded-full bg-primary/10 
                         flex items-center justify-center shrink-0
                         transition-all duration-300
                         hover:scale-110 hover:rotate-12">
                <svelte:component 
                  this={step.icon} 
                  class="w-6 h-6 text-primary" 
                />
              </div>
              {#if i < steps.length - 1}
                <div class="absolute left-1/2 top-12 bottom-0 w-px bg-primary/20 
                          transform -translate-x-1/2" />
              {/if}
            </div>

            <div>
              <p class="text-2xl leading-relaxed">
                {@html step.content}
              </p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .transition-all {
    will-change: transform, opacity;
  }
</style>