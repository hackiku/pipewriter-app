<!-- src/lib/(space)/content/features/Process.svelte -->
<script lang="ts">
  import { processSteps } from "../../data/process";
  let steps = processSteps;
</script>

<div class="relative">
  <!-- Connecting Line -->
  <div class="absolute left-8 top-12 bottom-0 w-px bg-border/50" />
  
  <!-- Process Steps -->
  <div class="space-y-[40vh]">
    {#each steps as step, i}
      {#if i === steps.length - 1}
        <!-- Last step with tab folder styling -->
        <div class="relative -mx-8 
                    bg-zinc-950/[0.05] dark:bg-white/[0.03]
                    rounded-t-[2.5rem] border-t border-x border-border/50">
          <div class="grid grid-cols-[auto_1fr] gap-8 items-start p-8">
            <div class="relative z-10 w-16 h-16 rounded-full 
                        bg-muted/30 border border-border/50
                        flex items-center justify-center
                        hover:scale-105 hover:rotate-12 
                        transition-all duration-300">
              <svelte:component this={step.icon} class="w-6 h-6 text-primary/80" />
            </div>
            <div class="mt-3">
              <h4 class="text-2xl leading-relaxed">
                {step.title} 
                <span class="text-muted-foreground">{step.subtitle}</span>
              </h4>
            </div>
          </div>
        </div>
      {:else}
        <div class="grid grid-cols-[auto_1fr] gap-8 items-start">
          <div class="relative z-10 w-16 h-16 rounded-full 
                      bg-muted/30 border border-border/50
                      flex items-center justify-center
                      hover:scale-105 hover:rotate-12 
                      transition-all duration-300">
            <svelte:component this={step.icon} class="w-6 h-6 text-primary/80" />
          </div>
          <div class="mt-3">
            <h4 class="text-2xl leading-relaxed">
              {step.title} 
              <span class="text-muted-foreground">{step.subtitle}</span>
            </h4>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>