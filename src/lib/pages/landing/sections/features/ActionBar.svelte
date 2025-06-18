<!-- src/lib/pages/landing/sections/features/ActionBar.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import { Play, ArrowRight } from "lucide-svelte";
  import { processSteps } from "./processData";
  import WriterShoutout from "./WriterShoutout.svelte";
  
  export let currentStep: number = 0;
  export let onStepChange: (index: number) => void;
  export let onFullVideo: () => void;

  function handleGetStarted() {
    window.location.href = '/waitlist';
  }

  function handleStepClick(index: number) {
    onStepChange(index);
    
    // Smooth scroll to the corresponding preview section
    const targetElement = document.querySelector(`[data-step="${index}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }
</script>

<!-- Sticky Action Bar -->
<div class="sticky bottom-0 left-0 right-0 z-40 ">
  
  <!-- Desktop: Unified container with matching columns to PreviewSection -->
  <div class="hidden md:block">
    <div class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      <div class="max-w-7xl mx-auto">
        <!-- Single unified container with no bottom border -->
        <div class="bg-neutral-200 dark:bg-neutral-900 border-2 border-border border-b-0 rounded-t-2xl backdrop-blur-sm overflow-hidden">
          <!-- Content matches PreviewSection grid -->
          <!-- <div class="grid grid-cols-7 gap-12"> -->
            <!-- <div class="col-span-2 p-6">
              <WriterShoutout />
            </div> -->
            
            <!-- Right column (5/7) - Action Bar -->
            <div class="col-span-5">
              <!-- Rounded Progress Bar -->
              

              <!-- Action Bar Content -->
              <div class="px-6 py-4">
                <div class="flex items-center justify-between">
                  
                  <!-- Left: Step Icons -->
                  <div class="flex items-center gap-3">
                    {#each processSteps as step, index}
                      <button
                        class={cn(
                          "w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold transition-all duration-200",
                          currentStep === index
                            ? "bg-primary border-primary text-primary-foreground shadow-lg"
                            : index < currentStep
                            ? "bg-primary/20 border-primary text-primary"
                            : "border-muted-foreground/30 text-muted-foreground hover:bg-muted hover:border-primary/30"
                        )}
                        on:click={() => handleStepClick(index)}
                      >
                        {index + 1}
                      </button>
                    {/each}
                  </div>

                  <!-- Right: Action Buttons -->
                  <div class="flex items-center gap-4">
                    <!-- Watch Demo -->
                    <button
                      class={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                        "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
                        "text-white shadow-lg hover:shadow-xl hover:shadow-primary/25",
                        "transition-all duration-200 hover:scale-105 active:scale-95"
                      )}
                      on:click={() => onFullVideo()}
                    >
                      <Play class="w-4 h-4" />
                      <span>Watch Demo</span>
                    </button>

                    <!-- Try Pipewriter -->
                    <button
                      class={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                        "border border-border hover:border-primary/30",
                        "bg-background hover:bg-muted transition-all duration-200",
                        "hover:scale-105 active:scale-95"
                      )}
                      on:click={handleGetStarted}
                    >
                      <span>Try Pipewriter</span>
                      <ArrowRight class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>



							<div class="px-6 pt- pb-2">
                <div class="h-1 bg-border/30 rounded-full">
                  <div 
                    class="h-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] rounded-full transition-all duration-500"
                    style="width: {((currentStep + 1) / processSteps.length) * 100}%"
                  ></div>
                </div>
              </div>
            </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile: Two-row layout with same button copy as desktop -->
  <div class="md:hidden">
    <div class="bg-neutral-200 dark:bg-neutral-900 border-2 border-border border-b-0 rounded-t-2xl =mx-4">
      
      <!-- Rounded Progress Bar -->
      <div class="px-4 pt-4">
        <div class="h-1 bg-border/30 rounded-full">
          <div 
            class="h-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] rounded-full transition-all duration-500"
            style="width: {((currentStep + 1) / processSteps.length) * 100}%"
          ></div>
        </div>
      </div>

      <!-- Mobile Action Bar Content - Two rows -->
      <div class="px-4 py-3">
        <!-- Row 1: Step numbers -->
        <div class="flex items-center gap-2 mb-3">
          {#each processSteps as step, index}
            <button
              class={cn(
                "w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-200",
                currentStep === index
                  ? "bg-primary border-primary text-primary-foreground"
                  : index < currentStep
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-muted-foreground/30 text-muted-foreground"
              )}
              on:click={() => handleStepClick(index)}
            >
              {index + 1}
            </button>
          {/each}
        </div>
        
        <!-- Row 2: Action buttons - same copy as desktop -->
        <div class="flex items-center gap-2 justify-between">
          <!-- Watch Demo - Same copy as desktop -->
          <button
            class={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
              "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
              "text-white shadow-lg",
              "transition-all duration-200 active:scale-95"
            )}
            on:click={() => onFullVideo()}
          >
            <Play class="w-4 h-4" />
            <span>Watch Demo</span>
          </button>

          <!-- Try Pipewriter - Same copy as desktop -->
          <button
            class="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
						border border-border hover:border-primary/30
						bg-background hover:bg-muted transition-all duration-200
						active:scale-95"
            on:click={handleGetStarted}
          >
            <span>Try Free</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>

</div>