<!-- src/lib/pages/ai/Process.svelte -->
<script lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import { Maximize2 } from 'lucide-svelte';

  const steps = [
    {
      number: '1',
      title: 'Wireframe in Docs',
      image: 'demo/screenshots/pipewriter-wireframe.png'
    },
    {
      number: '2',
      title: 'Export to HTML',
      image: 'demo/screenshots/claude-prompt.png'
    },
    {
      number: '3',
      title: 'Prompt AI',
      image: 'demo/screenshots/live-html-page.png'
    }
  ];
</script>

<section class="py-24">
  <div class="container">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {#each steps as step}
          <div class="relative">
            <!-- Artistic Number -->
            <div class="absolute -top-16 left-0 right-0 select-none pointer-events-none overflow-hidden">
              <span class="text-[12rem] font-bold text-gray-100 dark:text-gray-800/50 leading-none">
                {step.number}
              </span>
            </div>
            
            <!-- Image Card with Title -->
            <div class="relative">
              <!-- Title Overlay -->
              <div class="absolute -top-4 left-0 right-0 z-10">
                <h3 class="text-xl md:text-2xl font-semibold bg-background/95 backdrop-blur-sm w-fit px-4 py-2 rounded-lg shadow-sm mx-auto">
                  {step.title}
                </h3>
              </div>

              <!-- Image with Dialog -->
              <Dialog>
                <DialogTrigger>
                  <div class="relative group">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      class="w-full rounded-lg shadow-sm transition-all duration-200 group-hover:shadow-md"
                    />
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 rounded-lg flex items-center justify-center">
                      <Maximize2 class="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent class="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{step.title}</DialogTitle>
                  </DialogHeader>
                  <img 
                    src={step.image} 
                    alt={step.title}
                    class="w-full rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  :global(.group) {
    cursor: pointer;
  }
</style>