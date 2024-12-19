<!-- $lib/pages/demo/layouts/Hero.svelte -->

<script lang="ts">
  import { Sparkles } from "lucide-svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import WriteButton from "../WriteButton.svelte";
  import EditableStyles from "../EditableStyles.svelte";
  import { editingStore } from "$lib/stores/editingStore";
  import { demoStore } from '$lib/stores/demoStore';

  export let visible = false;
  export let eyebrow: string;
  export let headline: string;
  
  let headlineElement: HTMLElement;
  
  function handleInput(event: Event, binding: 'eyebrow' | 'headline') {
    const target = event.target as HTMLElement;
    demoStore.updateContent(['hero', binding], target.innerText);
  }

  function focusHeadline() {
    if (headlineElement) {
      headlineElement.focus();
      editingStore.startEditing('hero-headline');
    }
  }
</script>

{#if visible}
<section class="pt-20 lg:pt-40 min-h-[calc(100vh-5rem)]">
	<div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
    <div class="lg:w-[45%]">
      <div class="flex flex-col items-start space-y-4 md:w-3/4 lg:w-[45vw]">
        <EditableStyles elementId="hero-eyebrow">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles class="w-4 h-4" />
            <span 
              class="text-sm font-medium outline-none"
              contenteditable="true"
              on:input={(e) => handleInput(e, 'eyebrow')}
              on:focus={() => editingStore.startEditing('hero-eyebrow')}
              on:blur={() => editingStore.stopEditing()}
            >{eyebrow}</span>
          </div>
        </EditableStyles>

        <EditableStyles elementId="hero-headline">
          <h1
            bind:this={headlineElement}
            class="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight outline-none"
            contenteditable="true"
            on:input={(e) => handleInput(e, 'headline')}
            on:focus={() => editingStore.startEditing('hero-headline')}
            on:blur={() => editingStore.stopEditing()}
          >{headline}</h1>
        </EditableStyles>

        <div class="w-full flex justify-start gap-4 pt-6">
          <EarlyAccessButton size="lg" source="hero-home" />
          <WriteButton onClick={focusHeadline} />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-12">
    <LogosMarquee />
  </div>
</section>
{/if}