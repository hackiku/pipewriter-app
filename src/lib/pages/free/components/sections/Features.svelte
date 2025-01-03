<!-- src/lib/pages/free/components/sections/Features.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Editable, Styles } from '../editor';
  import { contentStore, getFieldValue } from '../../stores/contentStore';
  
  export let visible = false;
  export let id = 'features-section';

  // Get values reactively with fallbacks
  $: headlineText = getFieldValue($contentStore.content, ['features', 'headline']) || 'Write 10× Copy Decks';
  $: blurbs = Array.from({ length: 3 }).map((_, i) => ({
    emoji: getFieldValue($contentStore.content, ['features', 'blurbs', i, 'emoji']) || '⚡️',
    title: getFieldValue($contentStore.content, ['features', 'blurbs', i, 'title']) || 'Feature Title',
    description: getFieldValue($contentStore.content, ['features', 'blurbs', i, 'description']) || 'Feature description'
  }));
</script>

{#if visible}
  <section {id} class="container mx-auto px-4 md:px-8">
    <!-- Section Headline -->
    <Styles sectionId="features-headline">
      <h2 class="text-4xl font-semibold tracking-tight text-center mb-16">
        <Editable
          path={['features', 'headline']}
          value={headlineText}
          className="outline-none"
        />
      </h2>
    </Styles>

    <!-- Blurbs Grid -->
    <div 
      class="grid grid-cols-1 md:grid-cols-3 gap-16"
      in:fade={{ duration: 300 }}
    >
      {#each blurbs as blurb, i}
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
  </section>
{/if}