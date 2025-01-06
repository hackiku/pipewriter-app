<!-- src/lib/pages/free/components/sections/ZigzagRight.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Editable, Styles } from '../editor';
  import { contentStore, getFieldValue } from '../../stores/contentStore';
  
  export let visible = false;
  export let id = 'zigzag-right-section';

  // Get values reactively with fallbacks
  $: headingText = getFieldValue($contentStore.content, ['zigzag-right', 'heading']) || 'UX for Writers';
  $: subheadingText = getFieldValue($contentStore.content, ['zigzag-right', 'subheading']) || 'Write content + experience';
  $: descriptionText = getFieldValue($contentStore.content, ['zigzag-right', 'description']) || 'Tables are dead. Long live proper wireframe components that update everywhere. Pre-formatted for that sweet agency look.';
</script>

{#if visible}
  <div 
    class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
    in:fade={{ duration: 300 }}
  >
    <!-- Media Container with Gradient Background -->
    <div 
      class="relative md:order-1"
      in:fly={{ x: -20, duration: 300, delay: 150, easing: quintOut }}
    >
      <!-- Striped Gradient Background -->
      <div 
        class="absolute -inset-4 rounded-2xl overflow-hidden opacity-40"
        style="
          background: repeating-linear-gradient(
            45deg,
            rgba(54, 68, 254, 0.15),
            rgba(179, 69, 237, 0.08) 10%,
            transparent 10%,
            transparent 20%
          );
          background-size: 40px 40px;
        "
      />

      <!-- Main Media Container -->
      <div class="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-tr from-muted/50 to-muted">
        <img
          src="/demo/videos/wireframing-demo.webp"
          alt="Wireframing demo"
          class="w-full h-full object-cover"
        />
        
        <!-- Gradient Overlay -->
        <div 
          class="absolute inset-0"
          style="background: linear-gradient(45deg, transparent 70%, rgba(54, 68, 254, 0.1) 85%, rgba(179, 69, 237, 0.15))"
        />
      </div>
    </div>

    <!-- Text Content -->
    <div 
      class="flex flex-col space-y-6 md:max-w-[100%] px-8 md:px-12 md:order-2"
      in:fly={{ x: 20, duration: 300, delay: 300, easing: quintOut }}
    >
      <div class="space-y-4">
        <Styles sectionId="zigzag-right-heading">
          <h3 class="text-sm font-medium text-muted-foreground">
            <Editable
              path={['zigzag-right', 'heading']}
              value={headingText}
              className="outline-none"
            />
          </h3>
        </Styles>
        
        <Styles sectionId="zigzag-right-subheading">
          <h2 class="text-4xl md:text-5xl font-medium leading-tight">
            <Editable
              path={['zigzag-right', 'subheading']}
              value={subheadingText}
              className="outline-none"
            />
          </h2>
        </Styles>
      </div>

      <Styles sectionId="zigzag-right-description">
        <p class="text-lg md:text-xl text-muted-foreground">
          <Editable
            path={['zigzag-right', 'description']}
            value={descriptionText}
            className="outline-none"
          />
        </p>
      </Styles>
    </div>
  </div>
{/if}

<style>
  @keyframes slideStripes {
    from { background-position: 0 0; }
    to { background-position: 40px 40px; }
  }

  .relative:hover > div:first-child {
    animation: slideStripes 2s linear infinite;
  }
</style>