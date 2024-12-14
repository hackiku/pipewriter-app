<!-- src/lib/pages/ai/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  const steps = [
    {
      number: '1',
      title: 'Write wireframes naturally in Google Docs with headings and lists',
      image: 'demo/screenshots/pipewriter-wireframe.png'
    },
    {
      number: '2',
      title: 'Export your document to clean, semantic HTML with one click',
      image: 'demo/screenshots/claude-prompt.png'
    },
    {
      number: '3',
      title: 'Get production-ready code with Tailwind styling and components',
      image: 'demo/screenshots/live-html-page.png'
    }
  ];

  let currentStep = 0;
  let stepElements: HTMLElement[] = [];

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = stepElements.findIndex(el => el === entry.target);
          if (index !== -1) currentStep = index;
        }
      });
    }, {
      threshold: 0.7,
      rootMargin: '-20% 0px -20% 0px'
    });

    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<section class="py-32">
  <div class="container">
    <div class="max-w-6xl mx-auto">
      <div class="relative flex">
        <!-- Left Column: Text -->
        <div class="w-5/12 sticky top-32 h-fit">
          {#each steps as step, i}
            <div 
              bind:this={stepElements[i]}
              class="mb-48 last:mb-0 transition-opacity duration-500"
              class:opacity-30={currentStep !== i}
            >
              <span class="text-8xl font-bold text-gray-200 dark:text-gray-800">
                {step.number}
              </span>
              <h3 class="text-2xl font-semibold mt-4">
                {step.title}
              </h3>
            </div>
          {/each}
        </div>

        <!-- Right Column: Images -->
        <div class="w-7/12 pl-16">
          {#each steps as step, i}
            <div 
              class="mb-48 last:mb-0 transition-all duration-500"
              class:opacity-30={currentStep !== i}
              class:translate-y-4={currentStep !== i}
            >
              <img 
                src={step.image} 
                alt={step.title}
                class="w-full rounded-lg shadow-sm"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Final Step -->
<div class="container mb-32">
  <div class="max-w-3xl mx-auto">
    <div class="flex items-start gap-8">
      <span class="text-8xl font-bold text-gray-200 dark:text-gray-800">4</span>
      <h2 class="text-2xl font-semibold mt-8">
        Transform your writing workflow into production websites
      </h2>
    </div>
  </div>
</div>

<style>
  .sticky {
    position: sticky;
  }
</style>