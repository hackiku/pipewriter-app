<!-- src/lib/pages/free/components/sections/ZigzagLeft.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Editable, Styles } from '../editor';
  import { contentStore, getFieldValue } from '../../stores/contentStore';
  
  export let visible = false;
  export let id = 'zigzag-left-section';

  // Get values reactively with fallbacks
  $: headingText = getFieldValue($contentStore.content, ['zigzag-left', 'heading']) || 'DOCS APP';
  $: subheadingText = getFieldValue($contentStore.content, ['zigzag-left', 'subheading']) || 'Writey app in Google Docs';
  $: descriptionText = getFieldValue($contentStore.content, ['zigzag-left', 'description']) || 'Native Docs sidebar app makes wireframing as fast as typing a paragraph.';

  // Product metrics data
  const products = [
    {
      number: '80',
      icon: '/tools/google-docs.svg',
      iconAlt: 'Google Docs',
      description: 'Copy-paste ready layouts'
    },
    {
      number: '8',
      icon: '/tools/google-apps-script.svg',
      iconAlt: 'Apps Script',
      description: 'Open source Apps Scripts'
    }
  ];
</script>

{#if visible}
  <div 
    class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
    in:fade={{ duration: 300 }}
  >
    <!-- Text Content -->
    <div 
      class="flex flex-col space-y-8 md:max-w-[100%] px-8 md:px-12"
      in:fly={{ x: -20, duration: 300, delay: 150, easing: quintOut }}
    >
      <div class="space-y-4">
        <Styles sectionId="zigzag-left-heading">
          <h3 class="text-sm font-medium text-muted-foreground">
            <Editable
              path={['zigzag-left', 'heading']}
              value={headingText}
              className="outline-none"
            />
          </h3>
        </Styles>
        
        <Styles sectionId="zigzag-left-subheading">
          <h2 class="text-4xl md:text-5xl font-medium leading-tight">
            <Editable
              path={['zigzag-left', 'subheading']}
              value={subheadingText}
              className="outline-none"
            />
          </h2>
        </Styles>
      </div>

      <!-- Product Metrics Grid -->
      <div class="grid grid-cols-1 gap-6">
        {#each products as product}
          <div class="flex items-center gap-4">
            <div class="flex items-center h-16 px-6 rounded-full bg-primary/5 border border-primary/10">
              <span class="text-4xl font-bold text-primary mr-2">{product.number}</span>
              <span class="text-4xl font-light text-primary/40">×</span>
              <div class="flex items-center justify-center w-12 h-12">
                <img src={product.icon} alt={product.iconAlt} class="w-8 h-8">
              </div>
            </div>
            <p class="text-lg text-muted-foreground">{product.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Media Container -->
    <div 
      class="relative aspect-video"
      in:fly={{ x: 20, duration: 300, delay: 300, easing: quintOut }}
    >
      <img
        src="/demo/videos/wireframing-demo.webp"
        alt="Wireframing demo"
        class="w-full h-full object-cover rounded-xl"
      />
    </div>
  </div>
{/if}
