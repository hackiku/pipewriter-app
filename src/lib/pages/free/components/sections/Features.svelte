<!-- src/lib/pages/free/components/sections/Features.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { Editable, Styles } from '../editor';
  import { editorStore } from '../../stores/editorStore';
  
  export let content: {
    headline: string;
    blurbs: Array<{
      emoji: string;
      title: string;
      description: string;
    }>;
  };
  export let visible = false;
  export let id = 'features-section';

  let titleElements: Record<number, HTMLElement> = {};
  
  onMount(() => {
    if (visible && titleElements[0]) {
      setTimeout(() => {
        titleElements[0].focus();
        const range = document.createRange();
        range.selectNodeContents(titleElements[0]);
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
  <section {id} class="xxx_py-24">
    <div class="container mx-auto px-8 md:px-20">
      <!-- Section Headline -->
      <Styles sectionId="features-headline">
        <h2 class="text-4xl font-semibold tracking-tight text-center mb-16">
          <Editable
            path={['features', 'headline']}
            value={content.headline}
            className="outline-none"
          />
        </h2>
      </Styles>

      <!-- Blurbs Grid -->
      <div 
        class="grid grid-cols-1 md:grid-cols-3 gap-16"
        in:fade={{ duration: 300 }}
      >
        {#each content.blurbs as blurb, i}
          <div 
            class="flex flex-col text-left space-y-3"
            in:fly={{ y: 20, duration: 300, delay: 150 * (i + 1), easing: quintOut }}
          >
            <!-- Emoji -->
            <Styles sectionId={`features-${i}-emoji`}>
              <div class="mb-2 font-bold text-3xl text-primary/80">
                <Editable
                  path={['features', 'blurbs', i, 'emoji']}
                  value={blurb.emoji}
                  className="outline-none"
                />
              </div>
            </Styles>
            
            <!-- Title -->
            <Styles sectionId={`features-${i}-title`}>
              <h3 class="text-2xl font-regular">
                <Editable
                  bind:this={titleElements[i]}
                  path={['features', 'blurbs', i, 'title']}
                  value={blurb.title}
                  className="outline-none"
                />
              </h3>
            </Styles>
            
            <!-- Description -->
            <Styles sectionId={`features-${i}-description`}>
              <p class="text-lg text-muted-foreground">
                <Editable
                  path={['features', 'blurbs', i, 'description']}
                  value={blurb.description}
                  className="outline-none"
                />
              </p>
            </Styles>
          </div>
        {/each}
      </div>
    </div>
  </section>
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