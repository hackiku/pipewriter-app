<!-- src/lib/pages/free/components/sections/Hero.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Sparkles } from "lucide-svelte";
  import { Editable, Styles } from '../editor';
  import ExportButton from "../cta/ExportButton.svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import WriteButton from "../cta/WriteButton.svelte";
  import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte";
  import { contentStore, getFieldValue } from '../../stores/contentStore';
  import { editorStore } from '../../stores/editorStore';
  
  export let visible = true;
  export let id = 'hero-section';

  // Reference to headline element
  let headlineElement: HTMLElement;

  // Get values reactively from the content store
  $: eyebrowText = getFieldValue($contentStore.content, ['hero', 'eyebrow']);
  $: headlineText = getFieldValue($contentStore.content, ['hero', 'headline']);
  $: subheadText = getFieldValue($contentStore.content, ['hero', 'subhead']);

  // Track active state from editor store
  $: isActive = $editorStore.activeSection === 'hero';

  // Function to focus headline
  function focusHeadline() {
    if (headlineElement) {
      headlineElement.focus();
      editorStore.setEditingField('hero-headline');
    }
  }
</script>

{#if visible}
<section 
  {id}
  class="container mx-auto px-4"
  in:fade={{ duration: 300 }}
>
  <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
    <div class="lg:w-[45%]">
      <div class="flex flex-col items-start space-y-4 md:w-3/4 lg:w-[45vw]">
        <!-- Eyebrow -->
        <Styles sectionId="hero-eyebrow">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles class="w-4 h-4" />
            <div class="text-sm font-medium tracking-tight">
              <Editable
                path={['hero', 'eyebrow']}
                value={eyebrowText}
                className="outline-none"
              />
            </div>
          </div>
        </Styles>

        <!-- Headline -->
<!-- Headline -->
<Styles sectionId="hero-headline">
  <h1 
    class="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.1] tracking-tight"
  >
    <Editable
      path={['hero', 'headline']}
      value={headlineText}
      className="outline-none"
      bind:elementRef={headlineElement}
    />
  </h1>
</Styles>
        <Styles sectionId="hero-subhead">
          <p class="text-xl text-muted-foreground">
            <Editable
              path={['hero', 'subhead']}
              value={subheadText}
              className="outline-none"
            />
          </p>
        </Styles>

        <div class="w-full flex justify-start gap-4 pt-4">
          <EarlyAccessButton
            size="sm"
            source="hero-home"
            className="font-normal"
            iconOnly={false}
            showPrice={false}
            text="Get the Drive"
          />
            <WriteButton size="lg" bind:headlineElement />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-12">
    <LogosMarquee />
  </div>
</section>
{/if}