<!-- src/lib/pages/free/components/sections/CTA.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Button } from "$lib/components/ui/button";
  import { Sparkles } from "lucide-svelte";
  import { Editable, Styles } from '../editor';
  import ExportButton from "../cta/ExportButton.svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  
  export let content: {
    headline: string;
    buttonText: string;
  };
  export let visible = false;
  export let id = 'cta-section';
</script>

{#if visible}
  <div 
    class="py-24 container mx-auto max-w-3xl text-center space-y-8"
    in:fade={{ duration: 300 }}
  >
    <Styles sectionId="cta-headline">
      <div class="relative" in:fly={{ y: 20, duration: 300, delay: 150, easing: quintOut }}>
        <div class="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 blur-xl" aria-hidden="true" />
        
        <Editable
          path={['cta', 'headline']}
          value={content.headline}
          class="relative text-4xl md:text-5xl font-semibold leading-tight"
        />
      </div>
    </Styles>

    <div 
      class="relative z-10 space-y-6" 
      in:fly={{ y: 20, duration: 300, delay: 300, easing: quintOut }}
    >
      <!-- Action Buttons -->
      <div class="flex justify-center gap-4">
        <EarlyAccessButton size="lg" source="cta-section" />
        <ExportButton text="Export" showReset={true} />
      </div>

      <!-- Button Text -->
      <Styles sectionId="cta-button">
        <Editable
          path={['cta', 'buttonText']}
          value={content.buttonText}
          class="text-sm text-muted-foreground"
        />
      </Styles>
    </div>
  </div>
{/if}