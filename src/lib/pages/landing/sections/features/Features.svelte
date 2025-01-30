<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import { PenTool, FileCode, Zap, Sparkles } from "lucide-svelte";

  const steps = [
    {
      title: "Write & Design Together",
      subtitle: "in your favorite text editor",
      icon: PenTool,
      description: "Build wireframes as you write copy - no more switching between apps. Get your ideas out fast while they're hot."
    },
    {
      title: "Template Power",
      subtitle: "84+ conversion-optimized components",
      icon: Sparkles,
      description: "Pre-built UX patterns that just work. From hero sections to pricing tables, all copy-pasteable right in Google Docs."
    },
    {
      title: "Instant Handoffs",
      subtitle: "from text to production code",
      icon: Zap,
      description: "Export straight to React, Svelte, or HTML. No more manual handoffs or confusing design tools - just clean code that's ready to ship."
    }
  ];
</script>

<div class="relative">
  <!-- Fixed Product Display -->
  <div class="sticky top-[20vh] z-30 w-full lg:w-[45%] h-[60vh] lg:ml-auto p-8">
    <div class="w-full h-full rounded-xl border bg-card/30 backdrop-blur-sm
                shadow-xl overflow-hidden">
      <!-- Placeholder for product shot/animation -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10" />
      <div class="absolute inset-0 flex items-center justify-center text-muted-foreground">
        Product Demo
      </div>
    </div>
  </div>

  <!-- Process Steps -->
  <div class="container relative">
    <!-- Opening Statement -->
    <div class="lg:w-1/2 mb-32 pt-12">
      <h3 class="text-2xl md:text-3xl leading-relaxed">
        Writing great UX shouldn't require a design degree.
        <span class="text-muted-foreground">
          Pipewriter brings the power of visual design right to your Google Doc,
          where the magic of writing happens.
        </span>
      </h3>
    </div>

    <!-- Steps -->
    <div class="relative lg:w-1/2 space-y-[40vh]">
      <!-- Connecting Line -->
      <div class="absolute left-8 top-12 bottom-0 w-px bg-border/50" />
      
      {#each steps as step, i}
        <div class="relative {i === steps.length - 1 ? 'pb-24' : ''}">
          <div class="grid grid-cols-[auto_1fr] gap-8 items-start">
            <!-- Icon -->
            <div class="relative z-10 w-16 h-16 rounded-full 
                        bg-muted/30 border border-border/50
                        flex items-center justify-center
                        hover:scale-105 hover:rotate-12 
                        transition-all duration-300">
              <svelte:component 
                this={step.icon} 
                class="w-6 h-6 text-primary/80" 
              />
            </div>
            
            <!-- Content -->
            <div class="space-y-3 pt-3">
              <h4 class="text-2xl leading-relaxed">
                {step.title}
                <span class="text-muted-foreground"> {step.subtitle}</span>
              </h4>
              <p class="text-muted-foreground leading-relaxed max-w-lg">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>