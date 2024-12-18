<!-- src/lib/pages/Demo.svelte -->
<script lang="ts">
  import { Sparkles } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import DemoDropper from "./DemoDropper.svelte";
  
  let eyebrowText = "Type + Prototype";
  let headlineText = "Wireframes for Writers in Google Docs";
  
  // Make text editable
  function handleInput(event: Event, binding: 'eyebrow' | 'headline') {
    const target = event.target as HTMLElement;
    if (binding === 'eyebrow') eyebrowText = target.innerText;
    if (binding === 'headline') headlineText = target.innerText;
  }
</script>

<!-- Main Content -->
<div class="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-20 lg:pt-40">
  <!-- Text Content -->
  <div class="flex flex-col items-start space-y-8 lg:w-[45%]">
    <div
      class="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary border border-primary/20"
    >
      <Sparkles class="w-4 h-4" />
      <span 
        class="text-sm font-medium outline-none"
        contenteditable="true"
        on:input={(e) => handleInput(e, 'eyebrow')}
      >{eyebrowText}</span>
    </div>

    <h1
      class="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight outline-none"
      contenteditable="true"
      on:input={(e) => handleInput(e, 'headline')}
    >
      {headlineText}
    </h1>

    <div class="w-full flex justify-start">
      <EarlyAccessButton size="lg" source="hero-home" />
    </div>
  </div>

  <!-- Dropper Preview -->
  <div class="relative flex-1 lg:max-w-[500px] min-h-[300px] lg:min-h-[400px]">
    <DemoDropper />
  </div>
</div>