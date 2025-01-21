<!-- src/lib/(space)/content/features/Features.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Problem from './Problem.svelte';
  import Process from './Process.svelte';
  import ExampleWrapper from './ExampleWrapper.svelte';
  
  let mode: 'floating' | 'fixed' = 'floating';
  let activeStep = 0;
  let container: HTMLElement;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          
          // Switch to fixed mode when Process section comes into view
          mode = rect.top < viewportHeight * 0.3 ? 'fixed' : 'floating';
        }
      },
      { threshold: [0, 0.3, 0.7, 1] }
    );

    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  });
</script>

<div class="relative" bind:this={container}>
  <!-- Background Examples Layer -->
  <ExampleWrapper {mode} {activeStep} />
  
  <!-- Content Layer -->
  <div class="relative z-10">
    <Problem />
    
    <!-- Process Section -->
    <div class="mt-[50vh]">
      <Process bind:activeStep />
    </div>
  </div>
</div>