<!-- src/lib/(space)/content/features/Process.svelte -->
<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { processSteps } from "../../data/process";

  let steps = processSteps;
</script>

<div class="relative">
  <!-- Connecting Line -->
  <div class="absolute left-8 top-12 bottom-0 w-px bg-border/50" />
  
  <!-- Process Steps -->
  <div class="space-y-[40vh] mb-6">
    {#each steps as step, i}
      <div class="relative grid grid-cols-[auto_1fr] gap-8 items-start">
        <!-- Icon Circle -->
        <div class="relative z-10 w-16 h-16 rounded-full 
                    bg-muted/30 border border-border/50
                    flex items-center justify-center
                    transition-all duration-300
                    hover:scale-105 hover:rotate-12">
          <svelte:component this={step.icon} 
            class="w-6 h-6 text-primary/80" />
        </div>

        <!-- Content -->
        <div class="space-y-16 mt-3">
          <!-- Title -->
          <h4 class="text-2xl leading-relaxed">
            {step.title} 
            <span class="text-muted-foreground">{step.subtitle}</span>
          </h4>

          <!-- Tags -->
          <!-- <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {#each step.tags as tag}
              <Badge 
                variant="secondary"
                class="justify-center py-1 text-foreground/40 text-center text-xs font-medium
                       bg-background/70 dark:bg-muted/60 hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20
                       hover:text-indigo-600 dark:hover:text-purple-400
                       transition-all duration-300"
              >
                {tag}
              </Badge>
            {/each}
          </div> -->

          <!-- Tab Connection (only on last item) -->
          {#if i === steps.length - 1}
            <div class="absolute -bottom-6 inset-x-0 h-28
                       bg-zinc-950/[0.05] dark:bg-white/[0.03]
                       rounded-t-[2.5rem] border-t border-x border-border/50" />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>