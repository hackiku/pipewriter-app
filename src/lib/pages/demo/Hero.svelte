<!-- src/lib/pages/demo/Hero.svelte -->
<script lang="ts">
  import { Sparkles, Edit2 } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import { onMount } from "svelte";
  
  export let eyebrowText = "Type + Prototype";
  export let headlineText = "Wireframes for Writers in Google Docs";
  
  let headlineElement: HTMLElement;
  
  function handleInput(event: Event, binding: 'eyebrow' | 'headline') {
    const target = event.target as HTMLElement;
    if (binding === 'eyebrow') eyebrowText = target.innerText;
    if (binding === 'headline') headlineText = target.innerText;
  }

  function focusHeadline() {
    if (headlineElement) {
      headlineElement.focus();
      // Move cursor to end of "Docs"
      const text = headlineElement.textContent || "";
      const docsIndex = text.indexOf("Docs") + 4;
      
      // Create range and selection
      const range = document.createRange();
      const sel = window.getSelection();
      
      // Set range to end of "Docs"
      range.setStart(headlineElement.firstChild!, docsIndex);
      range.setEnd(headlineElement.firstChild!, docsIndex);
      
      // Apply selection
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }
</script>

<div class="flex flex-col items-start space-y-8 md:w-3/4 lg:w-[45vw]">
  <div
    class="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary border border-primary/20"
  >
    <Sparkles class="w-4 h-4" />
    <span 
      class="text-sm font-medium outline-none transition-all duration-300"
      contenteditable="true"
      on:input={(e) => handleInput(e, 'eyebrow')}
    >{eyebrowText}</span>
  </div>

  <h1
    bind:this={headlineElement}
    class="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight outline-none transition-all duration-300"
    contenteditable="true"
    on:input={(e) => handleInput(e, 'headline')}
  >
    {headlineText}
  </h1>

  <div class="w-full flex justify-start gap-4">
    <EarlyAccessButton size="lg" source="hero-home" />
    <Button 
      variant="outline" 
      size="lg" 
      class="group flex items-center gap-2 h-12"
      on:click={focusHeadline}
    >
      <span>Write for free</span>
      <Edit2 
        class="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" 
      />
    </Button>
  </div>
</div>

<style>
  :global([contenteditable="true"]:hover) {
    border: 2px dashed transparent;
    border-image: linear-gradient(to right, #3644FE, #B345ED) 1;
    border-radius: 4px;
  }
  
  :global([contenteditable="true"]:focus) {
    border: 2px dashed transparent;
    border-image: linear-gradient(to right, #B345ED, #3644FE) 1;
    border-radius: 4px;
    background: linear-gradient(to right, rgba(54,68,254,0.05), rgba(179,69,237,0.05));
  }

  /* Mobile optimization */
  @media (max-width: 768px) {
    :global([contenteditable="true"]) {
      cursor: text;
      -webkit-tap-highlight-color: rgba(179,69,237,0.1);
    }
  }
</style>