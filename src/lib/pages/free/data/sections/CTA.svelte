<!-- src/lib/pages/app/components/sections/CTA.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Button } from "$lib/components/ui/button";
  import { Sparkles } from "lucide-svelte";
  import EditableField from '../editor/EditableField.svelte';
  import { drawerStore } from '$lib/stores/earlyAccessStore';

  export let content: {
    headline: string;
    buttonText: string;
  };
  export let visible = false;

  function handleButtonClick() {
    drawerStore.open('demo');
  }
</script>

{#if visible}
  <div 
    class="py-24 container mx-auto max-w-3xl text-center space-y-8"
    in:fade={{ duration: 300 }}
  >
    <div class="relative" in:fly={{ y: 20, duration: 300, delay: 150, easing: quintOut }}>
      <div class="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 blur-xl" aria-hidden="true" />
      
      <EditableField
        sectionId="cta"
        fieldId="headline"
        value={content.headline}
        className="relative text-4xl md:text-5xl font-semibold leading-tight"
      />
    </div>

    <div class="relative z-10" in:fly={{ y: 20, duration: 300, delay: 300, easing: quintOut }}>
      <Button 
        size="lg" 
        class="h-12 px-6 text-base font-medium rounded-full"
        on:click={handleButtonClick}
      >
        <Sparkles class="w-4 h-4 mr-2" />
        {content.buttonText}
      </Button>
    </div>
  </div>
{/if}