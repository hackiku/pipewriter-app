<!-- src/lib/pages/landing/sections/features/AiPipeline.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Code, Cpu, FileCode } from 'lucide-svelte';

  let container: HTMLElement;
  let activeStep = 0;
  
  const steps = [
    { icon: FileCode, label: "Google Doc" },
    { icon: Cpu, label: "AI Processing" },
    { icon: Code, label: "Production Code" }
  ];

  onMount(() => {
    const interval = setInterval(() => {
      activeStep = (activeStep + 1) % steps.length;
    }, 2000);

    return () => clearInterval(interval);
  });

  $: isActive = (i: number) => activeStep === i;
  $: isPast = (i: number) => activeStep > i;
</script>

<div bind:this={container} class="relative rounded-xl overflow-hidden bg-black border border-zinc-800">
  <!-- Pipeline Steps -->
  <div class="p-8 flex items-center justify-between">
    {#each steps as step, i}
      <div class="flex flex-col items-center gap-3 relative z-10">
        <!-- Icon Circle -->
        <div class="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 
                    flex items-center justify-center transition-all duration-300
                    {isActive(i) ? 'scale-110 bg-primary bg-opacity-20' : ''}">
          <svelte:component 
            this={step.icon} 
            class="w-8 h-8 transition-colors duration-300
                   {isActive(i) ? 'text-primary' : 'text-zinc-500'}"
          />
        </div>
        
        <!-- Label -->
        <span class="text-sm text-zinc-500">{step.label}</span>
      </div>

      <!-- Connector Line -->
      {#if i < steps.length - 1}
        <div class="flex-1 h-px bg-zinc-800 mx-4">
          <div 
            class="h-full bg-primary transition-all duration-1000" 
            style="width: {isPast(i) ? '100%' : '0%'}"
          />
        </div>
      {/if}
    {/each}
  </div>

  <!-- Code Preview -->
  <div class="p-8 border-t border-zinc-800 font-mono text-sm">
    {#if activeStep === 0}
      <div class="text-zinc-500">
        <span class="text-primary"># Google Doc Export</span><br />
        Wireframe content ready for processing...
      </div>
    {:else if activeStep === 1}
      <div class="text-zinc-500">
        <span class="text-primary"># AI Processing</span><br />
        Generating components and styles...
      </div>
    {:else}
      <div class="text-zinc-500">
        <span class="text-primary"># Generated Code</span><br />
        {'<Component'}<br />
        {'  className="flex items-center..."'}<br />
        {'  variants={fadeIn}'}<br />
        {'/>'}<br />
      </div>
    {/if}
  </div>

  <!-- Animated Gradient -->
  <div class="absolute inset-0 bg-gradient-to-r from-primary to-transparent to-primary bg-opacity-5 animate-gradient" />
</div>

<style>
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 8s ease infinite;
  }
</style>