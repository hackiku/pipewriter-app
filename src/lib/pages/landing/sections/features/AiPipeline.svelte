<!-- src/lib/pages/landing/sections/features/AiPipeline.svelte -->
<script lang="ts">
  import { Sparkles } from 'lucide-svelte';
  import ExportPreview from './ExportPreview.svelte';
  import { landingStore } from '../../stores/landingStore';

  const steps = [
    {
      id: 'doc',
      title: 'Write & Design',
      description: 'Design your product directly in Google Docs using our UX components and templates.'
    },
    {
      id: 'process',
      title: 'AI Processing',
      description: 'Our AI analyzes your document structure and converts it into clean, semantic code.'
    },
    {
      id: 'code',
      title: 'Ship Product',
      description: 'Get production-ready code that works with React, Svelte, or pure HTML/CSS.'
    }
  ] as const;
</script>

<div class="relative overflow-hidden">
  <!-- Brand Gradient Background -->
  <div class="absolute inset-0 bg-gradient-to-r from-[#3644FE] to-[#B345ED] opacity-[0.03]" />
  
  <!-- Content -->
  <div class="relative container max-w-7xl py-32">
    <!-- Center Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center justify-center w-16 h-16 
                  rounded-full bg-primary bg-opacity-10 mb-8">
        <Sparkles class="w-8 h-8 text-primary" />
      </div>
      
      <h2 class="text-4xl md:text-5xl font-medium">
        Export Writing to Live Product
      </h2>
    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-4 gap-16">
      <!-- Steps List -->
      <div class="lg:pt-8 space-y-12">
        {#each steps as step}
          <button
            class="text-left space-y-2 w-full group"
            on:click={() => landingStore.setExportStep(step.id)}
          >
            <h3 class="text-xl font-medium transition-colors
                       {$landingStore.activeExportStep === step.id ? 
                         'text-primary' : 'text-muted-foreground group-hover:text-primary'}" >
              {step.title}
            </h3>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </button>
        {/each}
      </div>

      <!-- Preview Area -->
      <div class="lg:col-span-3">
        <ExportPreview />
      </div>
    </div>
  </div>
</div>