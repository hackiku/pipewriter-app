<!-- src/lib/pages/demo/CTA.svelte -->
<!-- CTA.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import EditableStyles from "../EditableStyles.svelte";
  import { editingStore } from "$lib/stores/editingStore";
  import { demoStore } from '$lib/stores/demoStore';
  import { Button } from "$lib/components/ui/button";
  import { Sparkles } from "lucide-svelte";
  
  export let visible = false;
  
  // Get CTA content from store
  $: content = $demoStore.content.cta;

  function handleInput(event: Event, field: string) {
    const target = event.target as HTMLElement;
    demoStore.updateContent(['cta', field], target.innerText);
  }

  function handleEditStart(id: string) {
    editingStore.startEditing(id);
  }

  function handleEditStop() {
    editingStore.stopEditing();
  }
</script>

{#if visible}
  <div 
    class="py-24 container mx-auto max-w-3xl text-center space-y-8"
    in:fade={{ duration: 300 }}
  >
    <div class="relative" in:fly={{ y: 20, duration: 300, delay: 150, easing: quintOut }}>
      <div class="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 blur-xl" aria-hidden="true" />
      
      <EditableStyles elementId="cta-headline">
        <h2 
          class="relative text-4xl md:text-5xl font-semibold leading-tight outline-none"
          contenteditable="true"
          bind:innerText={content.headline}
          on:input={(e) => handleInput(e, 'headline')}
          on:focus={() => handleEditStart('cta-headline')}
          on:blur={handleEditStop}
        />
      </EditableStyles>
    </div>

    <div class="relative z-10" in:fly={{ y: 20, duration: 300, delay: 300, easing: quintOut }}>
      <EditableStyles elementId="cta-button">
        <Button size="lg" class="h-12 px-6 text-base font-medium rounded-full">
          <Sparkles class="w-4 h-4 mr-2" />
          <span
            contenteditable="true"
            bind:innerText={content.buttonText}
            on:input={(e) => handleInput(e, 'buttonText')}
            on:focus={() => handleEditStart('cta-button')}
            on:blur={handleEditStop}
          />
        </Button>
      </EditableStyles>
    </div>
  </div>
{/if}