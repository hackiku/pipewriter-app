<!-- $lib/pages/demo/sections/layouts/ProductBlurbs.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { demoStore } from '$lib/stores/demoStore';
  import { editingStore } from "$lib/stores/editingStore";
  import EditableStyles from '../EditableStyles.svelte';
  
  export let visible = false;
  export let features = $demoStore.content.products.features;
  export let headline = $demoStore.content.products.headline;

  function handleEditStart(id: string) {
    editingStore.startEditing(id);
  }

  function handleEditStop() {
    editingStore.stopEditing();
  }

  function handleInput(event: Event, index: number, field: string) {
    const target = event.target as HTMLElement;
    demoStore.updateContent(['products', 'features', index.toString(), field], target.innerText);
  }

  function handleHeadlineInput(event: Event) {
    const target = event.target as HTMLElement;
    demoStore.updateContent(['products', 'headline'], target.innerText);
  }
</script>

{#if visible}
  <div class="container mx-auto px-4 md:px-20 space-y-12">
    <!-- Added Headline -->
    <EditableStyles elementId="product-headline">
      <h2 
        class="text-3xl md:text-4xl font-semibold text-center outline-none"
        contenteditable="true"
        bind:innerText={headline}
        on:input={handleHeadlineInput}
        on:focus={() => handleEditStart('product-headline')}
        on:blur={handleEditStop}
      >
        {headline}
      </h2>
    </EditableStyles>

    <div 
      class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16"
      in:fade={{ duration: 300 }}
    >
      {#each features as feature, i}
        <div 
          class="relative flex flex-col items-center rounded-xl bg-background"
          in:fly={{ y: 20, duration: 300, delay: 150 * (i + 1), easing: quintOut }}
        >
          <!-- Number + Icon Pill -->
          <EditableStyles elementId="product-{i}-pill">
            <div 
              class="flex items-center h-16 mb-6 px-6 rounded-full bg-primary/5 border border-primary/10"
            >
              <div 
                class="text-4xl font-bold text-primary mr-2"
                contenteditable="true"
                bind:innerText={feature.multiplier}
                on:input={(e) => handleInput(e, i, 'multiplier')}
                on:focus={() => handleEditStart(`product-${i}-pill`)}
                on:blur={handleEditStop}
              />
              
              <span class="text-4xl font-light text-primary/40">×</span>
              
              <div class="flex items-center justify-center w-12 h-12">
                <img
                  src={feature.tool.icon}
                  alt={feature.tool.name}
                  class="w-8 h-8"
                  onerror="this.innerText = {feature.tool.fallback}"
                />
              </div>
            </div>
          </EditableStyles>

          <!-- Description -->
          <EditableStyles elementId="product-{i}-description">
            <p 
              class="text-xl text-center font-medium outline-none"
              contenteditable="true"
              bind:innerText={feature.description}
              on:input={(e) => handleInput(e, i, 'description')}
              on:focus={() => handleEditStart(`product-${i}-description`)}
              on:blur={handleEditStop}
            />
          </EditableStyles>
        </div>
      {/each}
    </div>
  </div>
{/if}