<!-- src/lib/pages/free/components/sections/CTA.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Sparkles } from "lucide-svelte";
  import { Editable, Styles } from '../editor';
  import ExportButton from "../cta/ExportButton.svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  import { contentStore, getFieldValue } from '../../stores/contentStore';
  
  export let visible = false;
  export let id = 'cta-section';

  // Get values reactively with fallbacks
  $: headlineText = getFieldValue($contentStore.content, ['cta', 'headline']) || 'Beta Launch Special';
  $: subheadingText = getFieldValue($contentStore.content, ['cta', 'subheading']) || 'Join now';
  $: buttonText = getFieldValue($contentStore.content, ['cta', 'buttonText']) || 'Get Started';
  $: noteText = getFieldValue($contentStore.content, ['cta', 'note']) || '';
</script>

{#if visible}
  <section {id} class="container mx-auto px-4 md:px-8" in:fade={{ duration: 300 }}>
    <div class="max-w-3xl mx-auto text-center space-y-8">
      <Styles sectionId="cta-headline">
        <div class="relative" in:fly={{ y: 20, duration: 300, delay: 150, easing: quintOut }}>
          <div class="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 blur-xl" aria-hidden="true" />
          
          <h2 class="relative">
            <Editable
              path={['cta', 'headline']}
              value={headlineText}
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]"
            />
          </h2>
        </div>
      </Styles>

      <div class="space-y-8" in:fly={{ y: 20, duration: 300, delay: 300, easing: quintOut }}>
        <!-- Subheading -->
        <Styles sectionId="cta-subheading">
          <p class="relative">
            <Editable
              path={['cta', 'subheading']}
              value={subheadingText}
              className="text-xl text-muted-foreground"
            />
          </p>
        </Styles>

        <!-- Action Buttons -->
        <div class="flex justify-center gap-4">
          <EarlyAccessButton size="lg" source="cta-section" />
          <ExportButton text={buttonText} showReset={true} />
        </div>

        <!-- Note -->
        {#if noteText}
          <Styles sectionId="cta-note">
            <p class="relative">
              <Editable
                path={['cta', 'note']}
                value={noteText}
                className="text-sm text-muted-foreground opacity-70"
              />
            </p>
          </Styles>
        {/if}
      </div>
    </div>
  </section>
{/if}