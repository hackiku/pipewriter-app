<!-- src/lib/components/demo/docs/mock-ui/Body.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Section } from '../types';
  
  // Types for our sections
  type SectionType = 'zigzag-left' | 'zigzag-right' | 'horizontal-blurbs';
  
  export let sections: Section[] = [];
  
  // Default content for new sections
  const defaultContent = {
    'zigzag-left': {
      title: 'Zigzag left',
      description: 'Paragraph 10-45 words.',
      imageUrl: '/api/placeholder/400/300'
    },
    'zigzag-right': {
      title: 'Zigzag right',
      description: 'Paragraph 10-40 words.',
      imageUrl: '/api/placeholder/400/300'
    },
    'horizontal-blurbs': {
      items: [
        { title: 'Feature One', description: 'Short feature description here.' },
        { title: 'Feature Two', description: 'Another concise description.' },
        { title: 'Feature Three', description: 'Final feature highlight.' }
      ]
    }
  };
  
  function handleContentEdit(event: Event, sectionId: string, field: string) {
    const target = event.target as HTMLElement;
    // Dispatch content change event
    // To be implemented when sidebar is ready
  }
</script>

<div class="max-w-3xl mx-auto py-24 px-20">
  <div class="prose prose-zinc dark:prose-invert max-w-none">
    <!-- Initial content -->
    <h1 class="text-4xl font-semibold mb-6 text-zinc-900 dark:text-white">
      Looks like this in Docs 
    </h1>
    
    <p class="text-xl text-zinc-500 dark:text-zinc-400 mb-12">
      Click "Insert" then choose a layout to begin...
    </p>
    
    <!-- Dynamic sections -->
    <div class="space-y-16">
      {#each sections as section (section.id)}
        <div transition:fade>
          {#if section.type === 'zigzag-left'}
            <div class="flex items-center gap-12">
              <div class="w-1/2">
                <h2 
                  contenteditable="true"
                  class="text-2xl font-semibold mb-4"
                  on:input={(e) => handleContentEdit(e, section.id, 'title')}
                >
                  {section.title || defaultContent['zigzag-left'].title}
                </h2>
                <p 
                  contenteditable="true"
                  class="text-zinc-600 dark:text-zinc-400"
                  on:input={(e) => handleContentEdit(e, section.id, 'description')}
                >
                  {section.description || defaultContent['zigzag-left'].description}
                </p>
              </div>
              <div class="w-1/2">
                <img 
                  src={section.imageUrl || defaultContent['zigzag-left'].imageUrl}
                  alt="Placeholder"
                  class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                />
              </div>
            </div>
          {/if}
          
          {#if section.type === 'zigzag-right'}
            <div class="flex items-center gap-12">
              <div class="w-1/2">
                <img 
                  src={section.imageUrl || defaultContent['zigzag-right'].imageUrl}
                  alt="Placeholder"
                  class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                />
              </div>
              <div class="w-1/2">
                <h2 
                  contenteditable="true"
                  class="text-2xl font-semibold mb-4"
                  on:input={(e) => handleContentEdit(e, section.id, 'title')}
                >
                  {section.title || defaultContent['zigzag-right'].title}
                </h2>
                <p 
                  contenteditable="true"
                  class="text-zinc-600 dark:text-zinc-400"
                  on:input={(e) => handleContentEdit(e, section.id, 'description')}
                >
                  {section.description || defaultContent['zigzag-right'].description}
                </p>
              </div>
            </div>
          {/if}
          
          {#if section.type === 'horizontal-blurbs'}
            <div class="grid grid-cols-3 gap-8">
              {#each defaultContent['horizontal-blurbs'].items as item, i}
                <div>
                  <h3 
                    contenteditable="true"
                    class="text-xl font-semibold mb-2"
                    on:input={(e) => handleContentEdit(e, section.id, `title-${i}`)}
                  >
                    {item.title}
                  </h3>
                  <p 
                    contenteditable="true"
                    class="text-zinc-600 dark:text-zinc-400"
                    on:input={(e) => handleContentEdit(e, section.id, `description-${i}`)}
                  >
                    {item.description}
                  </p>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- <style>
  :global(.dark) .prose {
    --tw-prose-body: theme(colors.zinc.300);
    --tw-prose-headings: theme(colors.white);
    --tw-prose-links: theme(colors.blue.400);
  }
  
  [contenteditable="true"]:hover {
    outline: 2px solid theme(colors.blue.500/20);
    border-radius: 4px;
  }
  
  [contenteditable="true"]:focus {
    outline: 2px solid theme(colors.blue.500);
    border-radius: 4px;
  }
</style> -->