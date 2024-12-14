<!-- src/lib/pages/ai/Process.svelte -->
<script lang="ts">
  const steps = [
    {
      number: '01',
      title: 'Write in Google Docs',
      description: 'Create wireframes directly in your document with our plugin.',
    },
    {
      number: '02',
      title: 'Export to HTML',
      description: 'One click to convert your wireframe into semantic HTML.',
    },
    {
      number: '03',
      title: 'Ship to Production',
      description: 'Production-ready code with optimized Tailwind styles.',
    },
    {
      number: '04',
      title: 'Customize & Deploy',
      description: 'Tweak your design and push live with confidence.',
    }
  ];
</script>

<section class="py-24 bg-gray-50 dark:bg-gray-900/50">
  <div class="container">
    <h2 class="text-3xl font-bold mb-16">How It Works</h2>
    
    <div class="relative">
      <!-- Scroll Container -->
      <div class="overflow-x-auto pb-8">
        <div class="flex gap-6 w-fit snap-x snap-mandatory">
          {#each steps as step}
            <div 
              class="snap-start shrink-0 w-[calc(100vw-4rem)] md:w-[400px] bg-background 
                     rounded-xl p-8 border shadow-sm hover:shadow-md transition-shadow"
            >
              <span class="text-6xl font-bold text-primary/20">{step.number}</span>
              <h3 class="text-2xl font-semibold mt-4 mb-3">{step.title}</h3>
              <p class="text-muted-foreground">{step.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Gradient Overlay -->
      <div class="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-50 dark:from-gray-900/50 to-transparent pointer-events-none"></div>
    </div>
  </div>
</section>

<style>
  /* Hide scrollbar but keep functionality */
  .overflow-x-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
</style>