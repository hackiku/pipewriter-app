<!-- src/lib/(space)/content/features/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { Edit, Rocket, Code } from 'lucide-svelte';
  import StackIcons from '../../components/proof/StackIcons.svelte';
  import SpaceButton from '../../components/cta/SpaceButton.svelte';

  export let activeStep = 0;
  let containerRef: HTMLElement;
  let visible = false;

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

  // Calculate active step based on scroll
  $: {
    if (containerRef) {
      const rect = containerRef.getBoundingClientRect();
      const stepHeight = rect.height / steps.length;
      const relativeScroll = -rect.top;
      
      activeStep = Math.max(0, Math.min(
        Math.floor(relativeScroll / stepHeight),
        steps.length - 1
      ));
    }
  }
</script>

<div class="container max-w-7xl mx-auto" bind:this={containerRef}>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
    <!-- Left: Steps with Icons -->
    <div class="space-y-44 relative">
      {#if visible}
        {#each steps as step, i}
          <div 
            in:fly={{ y: 20, duration: 400, delay: i * 200 }}
            class="relative {i === activeStep ? 'opacity-100' : 'opacity-50'}
                   transition-opacity duration-300"
          >
            <div class="flex gap-6">
              <!-- Icon with Connector Line -->
              <div class="relative">
                <div class="w-12 h-12 rounded-full bg-primary/10 
                           flex items-center justify-center shrink-0
                           transition-all duration-300
                           {i === activeStep ? 'scale-110 rotate-12' : ''}">
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

              <!-- Content -->
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
</div>

<!-- Final Card Section -->
<div class="bg-zinc-950/[0.05] dark:bg-white/[0.03] relative rounded-t-[3rem]
            mt-24">
  <div class="container py-24 text-center">
    <StackIcons />
    <div class="mt-12">
      <SpaceButton size="lg" text="Book Chute Repack" />
    </div>
  </div>
</div>
