<!-- src/lib/pages/demo/CTA.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import EditableStyles from "./EditableStyles.svelte";
  import { editingStore } from "$lib/stores/editingStore";
  import { Button } from "$lib/components/ui/button";
  import { Sparkles } from "lucide-svelte";
  import { demoContent } from "./data";

  export let visible = false;

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
    <!-- Headline with gradient background -->
    <div 
      class="relative"
      in:fly={{ y: 20, duration: 300, delay: 150, easing: quintOut }}
    >
      <!-- Gradient background effect -->
      <div 
        class="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 blur-xl" 
        aria-hidden="true"
      />
      
      <EditableStyles elementId="cta-headline">
        <h2 
          class="relative text-4xl md:text-5xl font-semibold leading-tight outline-none"
          contenteditable="true"
          on:focus={() => handleEditStart('cta-headline')}
          on:blur={handleEditStop}
        >
          {demoContent.cta.headline}
        </h2>
      </EditableStyles>
    </div>

    <!-- Button with sparkles -->
    <div 
      class="relative z-10"
      in:fly={{ y: 20, duration: 300, delay: 300, easing: quintOut }}
    >
      <Button 
        size="lg" 
        class="h-12 px-6 text-base font-medium rounded-full"
      >
        <Sparkles class="w-4 h-4 mr-2" />
        {demoContent.cta.buttonText}
      </Button>
    </div>
  </div>
{/if}

<style>
  /* Selection styling */
  ::selection {
    background: rgb(var(--primary) / 0.2);
  }

  /* Mobile tap highlight */
  @media (max-width: 768px) {
    [contenteditable="true"] {
      -webkit-tap-highlight-color: rgb(var(--primary) / 0.1);
    }
  }
</style>