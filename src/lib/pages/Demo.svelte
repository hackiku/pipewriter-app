<!-- src/lib/pages/Demo.svelte -->
<script lang="ts">
  import { Sparkles } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import DemoDropper from "./DemoDropper.svelte";
  import LoomVideo from "$lib/components/marketing/LoomVideo.svelte";
  
  let eyebrowText = "Type + Prototype";
  let headlineText = "Wireframes for Writers in Google Docs";
  let subheadlineText = "10× Your Copy Decks";
  let descriptionText = "Create beautiful wireframes directly in Google Docs. Perfect for copywriters and content designers who want to present their work professionally.";

  function handleInput(event: Event, binding: 'eyebrow' | 'headline' | 'subheadline' | 'description') {
    const target = event.target as HTMLElement;
    if (binding === 'eyebrow') eyebrowText = target.innerText;
    if (binding === 'headline') headlineText = target.innerText;
    if (binding === 'subheadline') subheadlineText = target.innerText;
    if (binding === 'description') descriptionText = target.innerText;
  }

  function handleElementSelect(elementId: string) {
    if (elementId === 'blurbs-3' && typeof window !== 'undefined' && (window as any).showBlurbs) {
      (window as any).showBlurbs();
    }
    if (elementId === 'zz-left' && typeof window !== 'undefined' && (window as any).showZigZagLeft) {
      (window as any).showZigZagLeft();
    }
    if (elementId === 'zz-right' && typeof window !== 'undefined' && (window as any).showZigZagRight) {
      (window as any).showZigZagRight();
    }
  }
</script>

<!-- Hero Section -->
<section class="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-20 lg:pt-40">
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

    <p
      class="text-xl text-muted-foreground outline-none"
      contenteditable="true"
      on:input={(e) => handleInput(e, 'description')}
    >
      {descriptionText}
    </p>

    <div class="w-full flex justify-start">
      <EarlyAccessButton size="lg" source="hero-home" />
    </div>
  </div>

  <!-- Sliding Dropper -->
  <div 
    class="fixed right-0 top-20 bottom-0 w-[500px] transition-transform duration-300 ease-out hover:translate-x-0 translate-x-[80%] hover:shadow-xl"
    style="z-index: 50;"
  >
    <div class="relative h-full">
      <!-- Hover area indicator -->
      <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background/50 to-transparent" />
      
      <DemoDropper 
        columns={3} 
        rows={3} 
        maxWidth="100%" 
        onElementSelect={handleElementSelect} 
      />
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="mt-32">
  <h2 
    class="text-4xl text-center sm:text-5xl font-semibold mb-12 outline-none"
    contenteditable="true"
    on:input={(e) => handleInput(e, 'subheadline')}
  >
    {subheadlineText}
  </h2>

  <div class="py-8">
    <LoomVideo />
  </div>
</section>

<style>
  :global([contenteditable="true"]:hover) {
    outline: 2px solid rgb(var(--primary) / 0.2);
    border-radius: 4px;
  }
  :global([contenteditable="true"]:focus) {
    outline: 2px solid rgb(var(--primary) / 0.4);
    border-radius: 4px;
  }
</style>