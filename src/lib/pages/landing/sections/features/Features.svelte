<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import DemoVideo from './DemoVideo.svelte';
  import DriveFolder from './DriveFolder.svelte';
  import Blurbs from './Blurbs.svelte';
  import AiPipeline from './AiPipeline.svelte';
  import { FileText, Database, Sparkles } from 'lucide-svelte';

  const features = [
    {
      icon: FileText,
      title: "Wireframes where you write",
      description: "Build website layouts right in Google Docs. No switching apps, no learning curve - just write and watch your ideas take shape.",
      component: DemoVideo
    },
    {
      icon: Database,
      title: "Template system",
      description: "Copy-paste from our library of UX patterns. Every component perfectly formatted for Google Docs, ready to customize.",
      component: DriveFolder
    }
  ];
</script>

<div class="container max-w-7xl">
  <!-- Features with demos -->
  {#each features as feature, i}
    <div class="mb-32">
      <!-- Feature content -->
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-6">
          <div class="inline-flex items-center justify-center w-16 h-16 
                      rounded-full bg-primary/10 mb-4">
            <svelte:component this={feature.icon} 
                            class="w-8 h-8 text-primary" />
          </div>
          
          <h3 class="text-4xl font-medium leading-tight">
            {feature.title}
          </h3>
          
          <p class="text-xl text-muted-foreground">
            {feature.description}
          </p>
        </div>

        <!-- Demo component -->
        <div class="relative -z-10 lg:translate-x-12">
          <svelte:component this={feature.component} />
        </div>
      </div>

      <!-- Add Blurbs after first feature -->
      {#if i === 0}
        <Blurbs />
      {/if}
    </div>
  {/each}

  <!-- AI Pipeline Section -->
  <div class="relative py-24 -mx-8 px-8 bg-zinc-950">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="space-y-6">
        <div class="inline-flex items-center justify-center w-16 h-16 
                    rounded-full bg-primary/10 mb-4">
          <Sparkles class="w-8 h-8 text-primary" />
        </div>
        
        <h3 class="text-4xl font-medium leading-tight">
          AI-powered exports
        </h3>
        
        <p class="text-xl text-white/70">
          Export your wireframes into production-ready code with any LLM. 
          Supports React, Svelte, and pure HTML/CSS with Tailwind.
        </p>
      </div>

      <div class="relative">
        <AiPipeline />
      </div>
    </div>
  </div>
</div>