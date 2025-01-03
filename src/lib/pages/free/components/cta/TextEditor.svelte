<!-- src/lib/pages/free/components/cta/TextEditor.svelte -->
<script lang="ts">
  import { contentStore, currentContent } from '../../stores/contentStore';
  import ExportOptions from './ExportOptions.svelte';
  
  function handleContentEdit(event: Event, sectionId: string) {
    const target = event.target as HTMLElement;
    const path = target.dataset.path?.split('.') || [];
    if (path.length > 0) {
      contentStore.updateField(sectionId, path, target.innerText);
    }
  }
  
  $: sections = Object.entries($currentContent)
    .map(([id, content]) => ({ id, content }))
    .sort((a, b) => {
      const order = ['hero', 'features', 'testimonials', 'cta'];
      return order.indexOf(a.id) - order.indexOf(b.id);
    });
</script>

<div class="relative h-[500px]">
  <!-- Content Area -->
  <div class="h-full overflow-y-auto pb-20">
    <div 
      class="font-mono text-sm text-muted-foreground whitespace-pre-wrap p-3 rounded-md border bg-muted/5"
    >
      {#each sections as {id, content}}
        {#if id === 'hero'}
          <h1 
            contenteditable="true"
            data-path="headline"
            on:input={(e) => handleContentEdit(e, id)}
            class="text-2xl font-bold mb-2"
          >{content.headline}</h1>
          <p
            contenteditable="true"
            data-path="eyebrow"
            on:input={(e) => handleContentEdit(e, id)}
            class="mb-6"
          >{content.eyebrow}</p>
        {:else if id === 'features'}
          <h2 
            contenteditable="true"
            data-path="headline"
            on:input={(e) => handleContentEdit(e, id)}
            class="text-xl font-semibold mb-4"
          >{content.headline}</h2>
          {#each content.blurbs as blurb, i}
            <div class="mb-4">
              <span
                contenteditable="true"
                data-path={`blurbs.${i}.emoji`}
                on:input={(e) => handleContentEdit(e, id)}
                class="mr-2"
              >{blurb.emoji}</span>
              <span
                contenteditable="true"
                data-path={`blurbs.${i}.title`}
                on:input={(e) => handleContentEdit(e, id)}
                class="font-semibold"
              >{blurb.title}</span>
              <div
                contenteditable="true"
                data-path={`blurbs.${i}.description`}
                on:input={(e) => handleContentEdit(e, id)}
                class="ml-6 text-muted-foreground"
              >{blurb.description}</div>
            </div>
          {/each}
        {:else if id === 'testimonials'}
          <h2 
            contenteditable="true"
            data-path="headline"
            on:input={(e) => handleContentEdit(e, id)}
            class="text-xl font-semibold mb-4"
          >{content.headline}</h2>
          {#each content.cards as card, i}
            <div class="mb-6">
              <p
                contenteditable="true"
                data-path={`cards.${i}.quote`}
                on:input={(e) => handleContentEdit(e, id)}
                class="italic mb-2"
              >"{card.quote}"</p>
              <div class="ml-4">
                <span
                  contenteditable="true"
                  data-path={`cards.${i}.firstName`}
                  on:input={(e) => handleContentEdit(e, id)}
                  class="font-medium"
                >{card.firstName}</span>
                <span
                  contenteditable="true"
                  data-path={`cards.${i}.lastName`}
                  on:input={(e) => handleContentEdit(e, id)}
                  class="font-medium ml-1"
                >{card.lastName}</span>
                <div
                  contenteditable="true"
                  data-path={`cards.${i}.role`}
                  on:input={(e) => handleContentEdit(e, id)}
                  class="text-muted-foreground"
                >{card.role}</div>
              </div>
            </div>
          {/each}
        {:else if id === 'cta'}
          <h2 
            contenteditable="true"
            data-path="headline"
            on:input={(e) => handleContentEdit(e, id)}
            class="text-xl font-semibold mb-2"
          >{content.headline}</h2>
          <p
            contenteditable="true"
            data-path="subheading"
            on:input={(e) => handleContentEdit(e, id)}
            class="mb-2"
          >{content.subheading}</p>
          <p
            contenteditable="true"
            data-path="buttonText"
            on:input={(e) => handleContentEdit(e, id)}
            class="font-medium mb-2"
          >{content.buttonText}</p>
          {#if content.note}
            <p
              contenteditable="true"
              data-path="note"
              on:input={(e) => handleContentEdit(e, id)}
              class="text-muted-foreground italic"
            >{content.note}</p>
          {/if}
        {/if}
        <hr class="my-8 border-muted" />
      {/each}
    </div>
  </div>

  <!-- Bottom Gradient & Export Options -->
  <div class="absolute bottom-0 inset-x-0 h-24 pointer-events-none
              bg-gradient-to-t from-background via-background/80 to-transparent" />
  
  <div class="absolute bottom-4 inset-x-0">
    <ExportOptions />
  </div>
</div>