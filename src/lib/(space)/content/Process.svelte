<!-- src/lib/(space)/content/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { Edit, Rocket, Code } from 'lucide-svelte';
  import UXExample from '../components/proof/UXExample.svelte';
  import StackIcons from '../components/proof/StackIcons.svelte';
  import SpaceButton from '../components/cta/SpaceButton.svelte';
  import { spaceStore } from '../stores/spaceStore';

  const steps = [
    {
      icon: Edit,
      content: `Conversion copywriting <span class="text-muted-foreground">that turns visitors into mission partners</span>`,
      proofs: {
        bad: {
          size: 'lg' as const,
          points: [
            { label: 'Generic copy', isGood: false },
            { label: 'Wrong terminology', isGood: false }
          ]
        },
        good: {
          size: 'lg' as const,
          points: [
            { label: 'Clear value props', isGood: true },
            { label: 'Industry terminology', isGood: true }
          ]
        }
      }
    },
    {
      icon: Rocket,
      content: `On-brand design <span class="text-muted-foreground">that feels like mission control</span>`,
      proofs: {
        bad: {
          size: 'lg' as const,
          points: [
            { label: 'Slow loading', isGood: false },
            { label: 'Desktop only', isGood: false }
          ]
        },
        good: {
          size: 'lg' as const,
          points: [
            { label: 'Space aesthetic', isGood: true },
            { label: 'Mobile-first', isGood: true }
          ]
        }
      }
    },
    {
      icon: Code,
      content: `Your code stack <span class="text-muted-foreground">with clean components your engineers will love</span>`,
      proofs: {
        bad: {
          size: 'lg' as const,
          points: [
            { label: 'Legacy code', isGood: false },
            { label: 'No documentation', isGood: false }
          ]
        },
        good: {
          size: 'lg' as const,
          points: [
            { label: 'Production-ready', isGood: true },
            { label: 'Well documented', isGood: true }
          ]
        }
      }
    }
  ];

  let visible = false;
  let activeStep = 0;
  let containerRef: HTMLElement;
  let examplesContainer: HTMLElement;
  let scrollProgress = 0;

  // Track which examples to show
  $: showBadExample = scrollProgress < 0.7;
  $: showGoodExample = scrollProgress > 0.3;

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

  // Calculate active step and scroll progress
  $: {
    if (containerRef && examplesContainer) {
      const rect = containerRef.getBoundingClientRect();
      const examplesRect = examplesContainer.getBoundingClientRect();
      const stepHeight = rect.height / steps.length;
      const relativeScroll = -rect.top;
      
      activeStep = Math.max(0, Math.min(
        Math.floor(relativeScroll / stepHeight),
        steps.length - 1
      ));

      scrollProgress = Math.min(Math.max(
        (window.innerHeight - examplesRect.top) / (window.innerHeight * 0.75),
        0
      ), 1);
    }
  }

  // Calculate transform for examples
  function getExampleStyles(isGood: boolean) {
    const baseTransform = isGood ? 
      'translate3d(0, 10%, 0)' : 
      'translate3d(0, -10%, 0)';
    
    const hoverTransform = isGood ?
      'translate3d(0, 5%, 0) scale(1.02)' :
      'translate3d(0, -5%, 0) scale(1.02)';
    
    return `
      transform: ${baseTransform};
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.4s ease;
      &:hover {
        transform: ${hoverTransform};
      }
    `;
  }
</script>

<div class="relative" bind:this={containerRef}>
  <div class="container max-w-7xl mx-auto">
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

      <!-- Right: UX Examples -->
      <div class="lg:sticky lg:top-32 h-[70vh] lg:h-auto
                  fixed bottom-0 left-0 right-0 lg:relative
                  bg-gradient-to-t from-background to-transparent lg:bg-none
                  pointer-events-none"
           bind:this={examplesContainer}>
        <div class="relative h-full">
          {#if visible && steps[activeStep]}
            <div class="absolute inset-0 flex flex-col gap-8 justify-center 
                       items-end pointer-events-auto">
              <!-- Bad Example -->
              {#if showBadExample}
                <div in:fly|local={{ x: 50, duration: 600 }}
                     out:fade|local={{ duration: 300 }}
                     class="w-full flex justify-end transform hover:z-10"
                     style={getExampleStyles(false)}>
                  <UXExample {...steps[activeStep].proofs.bad} 
                           className="shadow-xl" />
                </div>
              {/if}
              
              <!-- Good Example -->
              {#if showGoodExample}
                <div in:fly|local={{ x: -50, duration: 600 }}
                     out:fade|local={{ duration: 300 }}
                     class="w-full flex justify-end transform hover:z-10"
                     style={getExampleStyles(true)}>
                  <UXExample {...steps[activeStep].proofs.good}
                           className="shadow-xl" />
                </div>
              {/if}
            </div>
          {/if}
        </div>
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
</div>

<style>
  .relative {
    z-index: 1;
  }
  .bg-zinc-950\/\[0\.05\] {
    z-index: 3;
  }
</style>