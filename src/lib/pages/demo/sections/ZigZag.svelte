<!-- src/lib/pages/demo/ZigZag.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import EditableStyles from "./EditableStyles.svelte";
  import { editingStore } from "$lib/stores/editingStore";

  export let visible = false;
  export let direction: 'left' | 'right' = 'left';
  export let heading = 'Perfect For';
  export let subheading = 'Copywriters, UX Writers, Content Designers';
  export let description = 'Get professional-grade templates that actually look sick. With 70+ wireframe elements, dark mode, and UX patterns built in.';

  const delays = {
    heading: direction === 'left' ? 150 : 300,
    content: direction === 'left' ? 300 : 150
  };

  function handleEditStart(id: string) {
    editingStore.startEditing(id);
  }

  function handleEditStop() {
    editingStore.stopEditing();
  }
</script>

{#if visible}
  <div 
    class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-8"
    in:fade={{ duration: 300 }}
  >
    <!-- Text Content -->
    <div 
      class="flex flex-col space-y-6 md:max-w-[100%] px-8 md:px-12 {direction === 'right' ? 'md:order-2' : ''}"
      in:fly={{ x: direction === 'left' ? -20 : 20, duration: 300, delay: delays.content, easing: quintOut }}
    >
      <div class="space-y-4">
        <EditableStyles elementId="zigzag-{direction}-heading">
          <h3 
            class="text-sm font-medium outline-none text-muted-foreground"
            contenteditable="true"
            bind:innerText={heading}
            on:focus={() => handleEditStart(`zigzag-${direction}-heading`)}
            on:blur={handleEditStop}
          >
            {heading}
          </h3>
        </EditableStyles>
        
        <EditableStyles elementId="zigzag-{direction}-subheading">
          <h2 
            class="text-4xl md:text-5xl font-semibold leading-tight outline-none"
            contenteditable="true"
            bind:innerText={subheading}
            on:focus={() => handleEditStart(`zigzag-${direction}-subheading`)}
            on:blur={handleEditStop}
          >
            {subheading}
          </h2>
        </EditableStyles>
      </div>

      <EditableStyles elementId="zigzag-{direction}-description">
        <p 
          class="text-lg md:text-xl text-muted-foreground outline-none"
          contenteditable="true"
          bind:innerText={description}
          on:focus={() => handleEditStart(`zigzag-${direction}-description`)}
          on:blur={handleEditStop}
        >
          {description}
        </p>
      </EditableStyles>
    </div>

    <!-- Media Container with Gradient Shadow -->
    <div 
      class="relative {direction === 'right' ? 'md:order-1' : ''}"
      in:fly={{ x: direction === 'left' ? 20 : -20, duration: 300, delay: delays.heading, easing: quintOut }}
    >
      <!-- Striped Gradient Shadow -->
      <div 
        class="absolute -right-2 -top-2 -left-2 -bottom-2 rounded-2xl overflow-hidden"
        style="
          background: repeating-linear-gradient(
            45deg,
            rgba(54, 68, 254, 0.35),
            rgba(179, 69, 237, 0.15) 25%,
            transparent 25%,
            transparent 50%
          );
          background-size: 32px 32px;
          transform: rotate(-0deg);
        "
      />

      <!-- Main Media Container -->
      <div class="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-tr from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <img
          src="/demo/videos/wireframing-demo.webp"
          alt="Wireframing demo"
          class="w-full h-full object-cover"
        />
        
        <!-- Subtle Gradient Overlay -->
        <div 
          class="absolute inset-0"
          style="
            background: linear-gradient(
              45deg,
              transparent 70%,
              rgba(54, 68, 254, 0.1) 85%,
              rgba(179, 69, 237, 0.15)
            )
          "
        />

        <!-- Tools Pill -->
        <div class="absolute -bottom-4 -left-4 flex items-center gap-4 px-6 py-3 bg-background rounded-full shadow-lg border">
          <img src="/tools/google-docs.svg" alt="Google Docs" class="w-8 h-8">
          <div class="w-px h-6 bg-border"></div>
          <img src="/tools/google-apps-script.svg" alt="Google Apps Script" class="w-8 h-8">
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Optional: Add a subtle animation to the striped shadow on hover */
  @keyframes slideStripes {
    from { background-position: 0 0; }
    to { background-position: 32px 32px; }
  }

  .relative:hover > div:first-child {
    animation: slideStripes 2s linear infinite;
  }
</style>