<!-- src/lib/pages/ai/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let currentStep = 1;
  let intervalId: NodeJS.Timer;

  onMount(() => {
    // Auto-advance steps every 4 seconds
    intervalId = setInterval(() => {
      currentStep = currentStep === 3 ? 1 : currentStep + 1;
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const steps = [
    {
      title: 'Write in Google Docs',
      description: 'Use our Docs plugin to create wireframes and UX content directly in your favorite editor',
      icon: '📝'
    },
    {
      title: 'Export to HTML',
      description: 'Convert your wireframe into clean, semantic HTML with a single click',
      icon: '🔄'
    },
    {
      title: 'Ship to Production',
      description: 'Get production-ready code with optimized Tailwind styles',
      icon: '🚀'
    }
  ];
</script>

<section class="py-24 bg-gray-50 dark:bg-gray-900/50">
  <div class="container">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-16">How It Works</h2>
      
      <div class="relative">
        <!-- Process Steps -->
        <div class="flex justify-between items-center mb-8">
          {#each steps as step, i}
            <div 
              class="relative flex-1 text-center" 
              class:text-primary={currentStep === i + 1}
              class:text-muted-foreground={currentStep !== i + 1}
            >
              <!-- Step Number -->
              <div 
                class="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl
                       transition-colors duration-300"
                class:bg-primary={currentStep === i + 1}
                class:bg-muted={currentStep !== i + 1}
              >
                {step.icon}
              </div>
              
              <!-- Step Title -->
              <h3 class="font-semibold mb-2">
                {step.title}
              </h3>
              
              <!-- Step Description -->
              <p class="text-sm hidden md:block">
                {step.description}
              </p>
            </div>
            
            {#if i < steps.length - 1}
              <!-- Connector Line -->
              <div class="flex-grow mx-4 h-0.5 bg-muted"></div>
            {/if}
          {/each}
        </div>
        
        <!-- Preview Area -->
        <div class="w-full aspect-video bg-muted rounded-xl overflow-hidden">
          <!-- Placeholder for step previews -->
          <div class="w-full h-full flex items-center justify-center">
            <div 
              class="w-3/4 h-3/4 bg-background rounded-lg shadow-lg"
              transition:fade
            >
              <!-- Add actual preview content here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>