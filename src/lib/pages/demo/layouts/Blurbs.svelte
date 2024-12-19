<!-- $lib/pages/demo/layouts/Blurbs.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import EditableStyles from "./EditableStyles.svelte";
  import { editingStore } from "$lib/stores/editingStore";
  import { demoStore } from '$lib/stores/demoStore';
  
  export let visible = false;
  export let headline: string;
  export let blurbs: Array<{ emoji: string; title: string; description: string; }>;
  export let onUpdate: (index: number, field: string, value: string) => void;
  export let onHeadlineUpdate: (value: string) => void;

  let firstHeading: HTMLElement;

  function bindRef(node: HTMLElement, isFirst: boolean) {
    if (isFirst) firstHeading = node;
  }

  onMount(() => {
    if (visible && firstHeading) {
      setTimeout(() => {
        firstHeading.focus();
        const range = document.createRange();
        range.selectNodeContents(firstHeading);
        range.collapse(false);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        editingStore.startEditing('blurb-0-title');
      }, 500);
    }
  });

  function handleInput(event: Event, index: number, field: string) {
    const target = event.target as HTMLElement;
    onUpdate(index, field, target.innerText);
  }

  function handleEditStart(id: string) {
    editingStore.startEditing(id);
  }

  function handleEditStop() {
    editingStore.stopEditing();
  }
</script>

{#if visible}
  <div class="container mx-auto px-20">
    <div 
      class="grid grid-cols-1 md:grid-cols-3 gap-16"
      in:fade={{ duration: 300 }}
    >
      {#each $demoStore.content.features.blurbs as blurb, i}
        <div 
          class="flex flex-col text-left space-y-3"
          in:fly={{ y: 20, duration: 300, delay: 150 * (i + 1), easing: quintOut }}
        >
          <EditableStyles elementId="blurb-{i}-emoji">
            <div 
              class="mb-2 font-bold text-3xl text-primary/80 outline-none"
              contenteditable="true"
              bind:innerText={blurb.emoji}
              on:input={(e) => handleInput(e, i, 'emoji')}
              on:focus={() => handleEditStart(`blurb-${i}-emoji`)}
              on:blur={handleEditStop}
            >
              {blurb.emoji}
            </div>
          </EditableStyles>
          
          <EditableStyles elementId="blurb-{i}-title">
            <h3 
              class="text-2xl font-regular outline-none"
              contenteditable="true"
              use:bindRef={i === 0}
              bind:innerText={blurb.title}
              on:input={(e) => handleInput(e, i, 'title')}
              on:focus={() => handleEditStart(`blurb-${i}-title`)}
              on:blur={handleEditStop}
            >
              {blurb.title}
            </h3>
          </EditableStyles>
          
          <EditableStyles elementId="blurb-{i}-description">
            <p 
              class="text-lg text-muted-foreground outline-none"
              contenteditable="true"
              bind:innerText={blurb.description}
              on:input={(e) => handleInput(e, i, 'description')}
              on:focus={() => handleEditStart(`blurb-${i}-description`)}
              on:blur={handleEditStop}
            >
              <!-- {blurb.description} -->
            </p>
          </EditableStyles>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  /* Selection styling */
  ::selection {
    background: rgb(var(--primary) / 0.2);
  }

  /* Fix emoji selection */
  [contenteditable="true"]:first-child::selection {
    background: transparent;
  }

  @media (max-width: 768px) {
    [contenteditable="true"] {
      -webkit-tap-highlight-color: rgb(var(--primary) / 0.1);
    }
  }
</style>