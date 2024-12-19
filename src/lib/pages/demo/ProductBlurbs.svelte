<!-- src/lib/pages/demo/ProductBlurbs.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { demoContent } from './data';
  import EditableStyles from './EditableStyles.svelte';
  import { editingStore } from "$lib/stores/editingStore";
  
  export let visible = false;

  function handleEditStart(id: string) {
    editingStore.startEditing(id);
  }

  function handleEditStop() {
    editingStore.stopEditing();
  }
</script>

{#if visible}
  <div class="container mx-auto px-4 md:px-20">
    <div 
      class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16"
      in:fade={{ duration: 300 }}
    >
      {#each demoContent.products.features as feature, i}
        <div 
          class="group relative flex flex-col items-center rounded-xl bg-background hover:bg-muted/50 transition-colors"
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
                on:focus={() => handleEditStart(`product-${i}-pill`)}
                on:blur={handleEditStop}
              >
                {feature.multiplier}
              </div>
              
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
              on:focus={() => handleEditStart(`product-${i}-description`)}
              on:blur={handleEditStop}
            >
              {feature.description}
            </p>
          </EditableStyles>

          <!-- Hover effect indicator -->
          <div class="absolute inset-0 border-2 border-primary/0 rounded-xl transition-colors group-hover:border-primary/10" />
        </div>
      {/each}
    </div>
  </div>
{/if}