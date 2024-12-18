<!-- src/lib/pages/product/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Frame from '$lib/iframe/Frame.svelte';
  
  interface Step {
    number: string;
    title: string;
    description: string;
    tools: string[];
    type: 'scroll' | 'center';
  }

  const steps: Step[] = [
    {
      number: '1',
      title: 'Write in Google Docs Like a Pro',
      description: 'Build wireframes naturally with headings and lists in your favorite editor. Pre-formatted templates and layouts help you create UX-ready content that looks professional from the start.',
      tools: ['demo/tools/google-docs.svg'],
      type: 'scroll'
    },
    {
      number: '2',
      title: 'Add UX Components On the Fly',
      description: 'Use the Pipewriter sidebar to insert 84+ pre-made UI elements and layouts. From hero sections to feature grids - everything is just one click away.',
      tools: ['demo/tools/google-drive.svg'],
      type: 'scroll'
    },
    {
      number: '3',
      title: 'Export to Production-Ready Code',
      description: 'Transform your document into clean, semantic HTML with one click. Get Tailwind-styled components and proper structure that developers will thank you for.',
      tools: ['demo/tools/google-apps-script.svg'],
      type: 'scroll'
    },
    {
      number: '4',
      title: 'Built as a Modern Web App',
      description: 'The Google Docs app is just the beginning. Get early access to the web version with more features, AI integrations, and team collaboration tools.',
      tools: ['demo/tools/svelte.svg'],
      type: 'center'
    }
  ];

  let currentStep = 0;
  let stepElements: HTMLElement[] = [];
  let observer: IntersectionObserver;

  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = stepElements.findIndex(el => el === entry.target);
          if (index !== -1 && index < 3) currentStep = index;
        }
      });
    }, {
      threshold: 0.6,
      rootMargin: '-20% 0px -20% 0px'
    });

    stepElements.forEach((el, i) => {
      if (i < 3) observer.observe(el); // Only observe first 3 steps
    });

    return () => observer.disconnect();
  });
</script>

<!-- Scrolling Steps Section -->
<section class="relative min-h-screen bg-background overflow-hidden">
  <!-- Background Grid Pattern -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
  </div>

  <!-- Fixed Asset Display for First 3 Steps -->
  <div class="hidden lg:block lg:fixed lg:top-0 lg:right-0 lg:w-1/2 h-screen" 
       class:lg:pointer-events-none={currentStep < 3}>
    <div class="relative w-full h-full flex items-center justify-center px-8">
      <!-- GIF Demo -->
      <div class="w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden bg-black/5 relative">
        <img 
          src="demo/videos/pipewriter-demo.gif"
          alt="Pipewriter demo"
          class="w-full h-full object-cover"
        />
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
      </div>
    </div>
  </div>

  <!-- Mobile Asset Display -->
  <div class="lg:hidden sticky top-0 h-[40vh] bg-background">
    <div class="w-full h-full flex items-center justify-center p-4">
      <div class="w-full max-w-xl aspect-[4/3] rounded-xl overflow-hidden bg-black/5">
        <img 
          src="demo/videos/pipewriter-demo.gif"
          alt="Pipewriter demo"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <!-- Bottom Fade for Mobile -->
    <div class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background to-transparent" />
  </div>

  <!-- Scrolling Content -->
  <div class="relative lg:w-1/2">
    <div class="container py-24">
      <div class="max-w-xl mx-auto space-y-[75vh]">
        {#each steps.slice(0, 3) as step, i}
          <div 
            bind:this={stepElements[i]}
            class="transition-all duration-500 relative"
            class:opacity-30={currentStep !== i}
          >
            <div class="flex items-center gap-4 mb-6">
              <span class="text-7xl sm:text-8xl font-bold text-gray-200 dark:text-gray-800">
                {step.number}
              </span>
              <div class="flex gap-3">
                {#each step.tools as tool}
                  <img src={tool} alt="Tool icon" class="w-8 h-8 object-contain" />
                {/each}
              </div>
            </div>
            
            <h3 class="text-xl sm:text-2xl font-semibold mb-4">
              {step.title}
            </h3>
            <p class="text-base sm:text-lg text-muted-foreground">
              {step.description}
            </p>
          </div>
        {/each}
      </div>

      <!-- Bottom Fade Gradient -->
      <div class="fixed bottom-0 left-0 lg:w-1/2 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  </div>
</section>

<!-- Final Step (Centered) -->
<section class="relative py-32 bg-background">
  <div class="container">
    <div class="max-w-3xl mx-auto text-center mb-16">
      <div class="flex justify-center items-center gap-4 mb-6">
        <span class="text-7xl sm:text-8xl font-bold text-gray-200 dark:text-gray-800">
          {steps[3].number}
        </span>
        <div class="flex gap-3">
          {#each steps[3].tools as tool}
            <img src={tool} alt="Tool icon" class="w-8 h-8 object-contain" />
          {/each}
        </div>
      </div>
      
      <h3 class="text-xl sm:text-2xl font-semibold mb-4">
        {steps[3].title}
      </h3>
      <p class="text-base sm:text-lg text-muted-foreground">
        {steps[3].description}
      </p>
    </div>

    <!-- Frame Demo -->
    <div class="w-[300px] h-[85vh] mx-auto">
      <Frame />
    </div>
  </div>
</section>