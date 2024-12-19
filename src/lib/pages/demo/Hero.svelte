<!-- src/lib/pages/demo/Hero.svelte -->
<script lang="ts">
  import { Sparkles } from "lucide-svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import WriteStatusButton from "./WriteButton.svelte";
  import EditableStyles from "./EditableStyles.svelte";
  import { editingStore } from "$lib/stores/editingStore";
  import { demoStore } from '$lib/stores/demoStore';

  export let eyebrowText = "Type + Prototype";
  export let headlineText = "Wireframes for Writers in Google Docs";
  
  let headlineElement: HTMLElement;
  
  function handleInput(event: Event, binding: 'eyebrow' | 'headline') {
    const target = event.target as HTMLElement;
    demoStore.updateContent(['hero', binding], target.innerText);
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
      
      // Start editing mode
      editingStore.startEditing('hero-headline');
    }
  }

  function handleEditStart(id: string) {
    editingStore.startEditing(id);
  }

  function handleEditStop() {
    editingStore.stopEditing();
  }
</script>

<div class="flex flex-col items-start space-y-4 md:w-3/4 lg:w-[45vw]">
  <EditableStyles elementId="hero-eyebrow">
    <div
      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
    >
      <Sparkles class="w-4 h-4" />
      <span 
        class="text-sm font-medium outline-none"
        contenteditable="true"
        on:input={(e) => handleInput(e, 'eyebrow')}
        on:focus={() => handleEditStart('hero-eyebrow')}
        on:blur={handleEditStop}
      >{eyebrowText}</span>
    </div>
  </EditableStyles>

  <EditableStyles elementId="hero-headline">
    <h1
      bind:this={headlineElement}
      class="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight outline-none"
      contenteditable="true"
      on:input={(e) => handleInput(e, 'headline')}
      on:focus={() => handleEditStart('hero-headline')}
      on:blur={handleEditStop}
    >
      {headlineText}
    </h1>
  </EditableStyles>

  <div class="w-full flex justify-start gap-4 pt-6">
    <EarlyAccessButton size="lg" source="hero-home" />
    <WriteStatusButton onClick={focusHeadline} />
  </div>
</div>