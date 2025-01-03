<!-- src/lib/pages/free/components/sections/Hero.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Sparkles } from "lucide-svelte";
  import { Editable, Styles } from '../editor';
  import ExportButton from "../cta/ExportButton.svelte";
  import EarlyAccessButton from "$lib/components/cta/EarlyAccessButton.svelte";
  
  export let content: {
    eyebrow: string;
    headline: string;
  };
  export let visible = true;
</script>

{#if visible}
<section 
  class="pt-20 lg:pt-40 min-h-[calc(100vh-5rem)]"
  in:fade={{ duration: 300 }}
>
  <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
    <div class="lg:w-[45%]">
      <div class="flex flex-col items-start space-y-4 md:w-3/4 lg:w-[45vw]">
        <Styles sectionId="hero-eyebrow">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles class="w-4 h-4" />
            <Editable
              path={['hero', 'eyebrow']}
              value={content.eyebrow}
              class="text-sm font-medium"
            />
          </div>
        </Styles>

        <Styles sectionId="hero-headline">
          <Editable
            path={['hero', 'headline']}
            value={content.headline}
            class="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
          />
        </Styles>

        <div class="w-full flex justify-start gap-4 pt-6">
          <EarlyAccessButton size="lg" source="hero-home" />
          <ExportButton text="Export" showReset={true} />
        </div>
      </div>
    </div>
  </div>
</section>
{/if}