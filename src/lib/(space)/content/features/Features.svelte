<!-- src/lib/(space)/content/features/Features.svelte -->
<script lang="ts">
  import Process from './Process.svelte';
  import ExampleGroup from './ExampleGroup.svelte';
  import TechStack from './TechStack.svelte';
  import { spaceStore } from '../../stores/spaceStore';
  import { uxExamples } from '../../data/examples';
  
  let featureSection: HTMLElement;
  
  // Simple scroll progress relative to section
  $: scrollProgress = featureSection ? 
    ($spaceStore.scrollY - featureSection.offsetTop) / window.innerHeight : 0;

  // Statement scrolls slower than groups
  $: statementY = -scrollProgress * 30;

  // Group 1: Upper third, starts with statement
  $: group1Style = `
    opacity: ${Math.min(1, Math.max(0, 0.5 + scrollProgress))};
    transform: translate3d(
      ${Math.sin(scrollProgress * Math.PI) * 2}vw,
      ${-scrollProgress * 45}vh,
      0
    );
  `;

  // Group 2: Bottom third to process target
  $: group2Progress = Math.max(0, Math.min(1, (scrollProgress - 0.3) * 2));
  $: group2Style = `
    opacity: ${group2Progress};
    transform: translate3d(
      0,
      ${Math.min(80, group2Progress * 60)}vh,
      0
    );
  `;
</script>

<div 
  class="relative min-h-[200vh]" 
  bind:this={featureSection}
>
  <!-- Fixed Layer -->
  <div class="fixed inset-0 pointer-events-none">
    <!-- Problem Statement -->
    <div 
      class="absolute w-full top-[35vh] transform-gpu transition-transform duration-500"
      style="transform: translate3d(0, {statementY}vh, 0)"
    >
      <div class="container max-w-xl mx-auto">
        <p class="text-2xl md:text-3xl text-center leading-relaxed">
          Your rockets rock hard but your website feels like 1969?
          <span class="text-muted-foreground">Modern space companies 
          need a web presence that matches their technical innovation.</span>
        </p>
      </div>
    </div>

    <!-- Group 1: Top left -->
    <div 
      class="absolute transition-all duration-500 ease-out
             left-[5%] md:left-[10%] top-[20vh]"
      style={group1Style}
    >
      <ExampleGroup example={uxExamples[0]} />
    </div>

    <!-- Group 2: To process area -->
    <div 
      class="absolute transition-all duration-500 ease-out
             right-[5%] md:right-[10%] top-[65vh]"
      style={group2Style}
    >
      <ExampleGroup example={uxExamples[1]} />
    </div>
  </div>

  <!-- Scrollable Content -->
  <div class="relative">
    <div class="h-[150vh]" /> <!-- Space for problem section -->
    <Process />
    <TechStack />
  </div>
</div>