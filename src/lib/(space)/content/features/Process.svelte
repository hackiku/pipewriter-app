<!-- src/lib/(space)/content/features/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Edit, Rocket, Code } from 'lucide-svelte';
  import ExampleGroup from './ExampleGroup.svelte';
  import { spaceStore } from '../../stores/spaceStore';
  import { uxExamples } from '../../data/examples';
  
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
  
  // Calculate scroll progress for example groups
  $: scrollProgress = containerRef ? 
    Math.max(0, Math.min(1, 
      ($spaceStore.scrollY - containerRef.offsetTop) / window.innerHeight
    )) : 0;

  // Group 1: Slow fade out
  $: group1Style = `
    opacity: ${Math.max(0, 1 - scrollProgress * 1.2)};
    transform: translate3d(
      ${Math.sin(scrollProgress * Math.PI) * 2}vw,
      ${-scrollProgress * 30}vh,
      0
    );
  `;

  // Group 2: Fade in and lock to process section
  $: group2Progress = Math.max(0, Math.min(1, (scrollProgress - 0.3) * 2));
  $: group2Style = `
    opacity: ${group2Progress};
    transform: translate3d(0, ${group2Progress * -10}vh, 0);
  `;

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
  <!-- Example Groups Container -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <!-- Group 1: Problem phase -->
    <div 
      class="absolute left-[10%] top-[20%] transition-all duration-300 ease-out
             lg:left-[5%] lg:top-[15%]"
      style={group1Style}
    >
      <ExampleGroup example={uxExamples[0]} />
    </div>

    <!-- Group 2: Process phase -->
    <div 
      class="absolute right-0 top-0 w-full lg:w-[45%] h-[40vh] lg:h-[70vh]
             transition-all duration-300 ease-out"
      style={group2Style}
    >
      <!-- Control area -->
      <div class="absolute inset-0 bg-red-800/20" />
      <!-- Example group -->
      <div class="absolute right-[10%] top-1/2 -translate-y-1/2">
        <ExampleGroup example={uxExamples[1]} />
      </div>
    </div>
  </div>

  <!-- Process Content -->
  <div class="container relative">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
      <div class="lg:col-span-3 space-y-[75vh] pt-[45vh] lg:pt-0">
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
  </div>
</div>

<style>
  .transition-all {
    will-change: transform, opacity;
  }
</style>