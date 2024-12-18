<!-- src/lib/pages/Demo.svelte -->
<!-- src/lib/pages/Demo.svelte -->
<script lang="ts">
  import { Sparkles } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import DemoDropper from "./DemoDropper.svelte";
  
  let eyebrowText = "Type + Prototype";
  let headlineText = "Wireframes for Writers in Google Docs";
  
  function handleInput(event: Event, binding: 'eyebrow' | 'headline') {
    const target = event.target as HTMLElement;
    if (binding === 'eyebrow') eyebrowText = target.innerText;
    if (binding === 'headline') headlineText = target.innerText;
  }

  function handleElementSelect(elementId: string) {
    if (elementId === 'blurbs-3') {
      if (typeof window !== 'undefined' && (window as any).showBlurbs) {
        (window as any).showBlurbs();
      }
    }
    if (elementId === 'zz-left') {
      if (typeof window !== 'undefined' && (window as any).showZigZagLeft) {
        (window as any).showZigZagLeft();
      }
    }
    if (elementId === 'zz-right') {
      if (typeof window !== 'undefined' && (window as any).showZigZagRight) {
        (window as any).showZigZagRight();
      }
    }
  }
</script>

<div class="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-20 lg:pt-40">
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

  <div class="relative flex-1 lg:max-w-[500px] min-h-[300px] lg:min-h-[400px]">
    <DemoDropper columns={3} rows={3} maxWidth="100%" onElementSelect={handleElementSelect} />
  </div>
</div>