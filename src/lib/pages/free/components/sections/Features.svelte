<!-- src/lib/pages/free/components/sections/Features.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { Editable, Styles } from '../editor';
  import { editorStore } from '../../stores/editorStore';
  
  export let content: {
    blurbs: Array<{
      emoji: string;
      title: string;
      description: string;
    }>;
  };
  export let visible = false;

  let firstHeading: HTMLElement;
  
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
        editorStore.setEditingField('features-0-title');
      }, 500);
    }
  });
</script>

{#if visible}
  <div class="container mx-auto px-8 md:px-20">
    <div 
      class="grid grid-cols-1 md:grid-cols-3 gap-16"
      in:fade={{ duration: 300 }}
    >
      {#each content.blurbs as blurb, i}
        <div 
          class="flex flex-col text-left space-y-3"
          in:fly={{ y: 20, duration: 300, delay: 150 * (i + 1), easing: quintOut }}
        >
          <Styles sectionId={`features-${i}-emoji`}>
            <Editable
              path={['features', 'blurbs', i, 'emoji']}
              value={blurb.emoji}
              class="mb-2 font-bold text-3xl text-primary/80"
            />
          </Styles>
          
          <Styles sectionId={`features-${i}-title`}>
            <Editable
              path={['features', 'blurbs', i, 'title']}
              value={blurb.title}
              class="text-2xl font-regular"
            />
          </Styles>
          
          <Styles sectionId={`features-${i}-description`}>
            <Editable
              path={['features', 'blurbs', i, 'description']}
              value={blurb.description}
              class="text-lg text-muted-foreground"
            />
          </Styles>
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