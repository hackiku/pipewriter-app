<!-- src/lib/pages/ai/Process.svelte -->
<script lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import { Maximize2 } from "lucide-svelte";

  const steps = [
    {
      number: "1",
      title: "Wireframe in Docs",
      image: "demo/screenshots/pipewriter-wireframe.png",
    },
    {
      number: "2",
      title: "Export to HTML",
      image: "demo/screenshots/claude-prompt.png",
    },
    {
      number: "3",
      title: "Prompt AI",
      image: "demo/screenshots/live-html-page.png",
    },
  ];
</script>

<div class="container">
  <!-- Process Line Container -->
  <div class="relative">
    <!-- Desktop Process Line -->
    <div class="hidden lg:block absolute left-0 right-0 top-0">
      <div class="max-w-6xl mx-auto px-6 relative">
        <!-- Main Line -->
        <div class="absolute top-0 left-[16.67%] right-[16.67%] h-px">
          <div class="relative w-full h-full">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
          </div>
        </div>
        
        <!-- Process Dots -->
        <div class="flex justify-between mx-[16.67%]">
          {#each steps as _, i}
            <div class="relative">
              <div class="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 rounded-full bg-background border-2 border-gray-500/30" />
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Mobile/Tablet Process Line -->
    <div class="lg:hidden absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-px">
      <div class="relative h-full">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/30 to-transparent" />
        
        <!-- Mobile Process Dots -->
        <div class="absolute inset-0 flex flex-col justify-between">
          {#each steps as _, i}
            <div class="relative left-1/2 -translate-x-1/2">
              <div class="w-3 h-3 rounded-full bg-background border-2 border-gray-500/30" />
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8">
        {#each steps as step}
          <div class="relative">
            <!-- Artistic Number -->
            <div class="absolute -top-32 left-0 right-0 select-none pointer-events-none overflow-hidden">
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
</div>

<style>
  :global(.group) {
    cursor: pointer;
  }
</style>