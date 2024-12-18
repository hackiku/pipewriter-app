<!-- src/lib/pages/demo/ZigZag.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { ArrowRight } from 'lucide-svelte';
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
    class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-12"
    in:fade={{ duration: 300 }}
  >
    <!-- Text Content -->
    <div 
      class="flex flex-col space-y-6 {direction === 'right' ? 'md:order-2' : ''}"
      in:fly={{ x: direction === 'left' ? -20 : 20, duration: 300, delay: delays.content, easing: quintOut }}
    >
      <div class="space-y-3">
        <EditableStyles elementId="zigzag-{direction}-heading">
          <h3 
            class="text-lg font-medium text-muted-foreground outline-none" 
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
            class="text-3xl font-semibold outline-none"
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
          class="text-lg text-muted-foreground outline-none"
          contenteditable="true"
          bind:innerText={description}
          on:focus={() => handleEditStart(`zigzag-${direction}-description`)}
          on:blur={handleEditStop}
        >
          {description}
        </p>
      </EditableStyles>

      <!-- <div class="flex items-center gap-2 group cursor-pointer">
        <span class="font-medium">Learn more</span>
        <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div> -->
    </div>

    <!-- Media Container with Gradient Shadow -->
    <div 
      class="relative {direction === 'right' ? 'md:order-1' : ''}"
      in:fly={{ x: direction === 'left' ? 20 : -20, duration: 300, delay: delays.heading, easing: quintOut }}
    >
      <!-- Striped Gradient Shadow -->
      <div 
        class="absolute -right-4 -top-4 w-full h-full rounded-2xl overflow-hidden"
        style="
          background: repeating-linear-gradient(
            45deg,
            rgba(54, 68, 254, 0.2),
            rgba(179, 69, 237, 0.2) 25%,
            transparent 25%,
            transparent 50%
          );
          background-size: 24px 24px;
          transform: rotate(-2deg);
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
      </div>
    </div>
  </div>
{/if}

<style>
  /* Optional: Add a subtle animation to the striped shadow on hover */
  @keyframes slideStripes {
    from { background-position: 0 0; }
    to { background-position: 24px 24px; }
  }

  .relative:hover > div:first-child {
    animation: slideStripes 2s linear infinite;
  }
</style>