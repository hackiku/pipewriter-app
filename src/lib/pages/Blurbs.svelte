<!-- src/lib/pages/Blurbs.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let visible = false;
</script>

{#if visible}
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8" in:fade={{ duration: 300 }}>
    <div class="flex flex-col items-center text-center group" in:fly={{ y: 20, duration: 300, delay: 150, easing: quintOut }}>
      <div class="mb-4 font-bold text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        80+
      </div>
      <h3 class="text-xl font-semibold mb-2">UI Elements</h3>
      <p class="text-muted-foreground">Components ready to copy and paste</p>
    </div>

    <div class="flex flex-col items-center text-center group" in:fly={{ y: 20, duration: 300, delay: 300, easing: quintOut }}>
      <div class="mb-4 font-bold text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        📝
      </div>
      <h3 class="text-xl font-semibold mb-2">Native Docs App</h3>
      <p class="text-muted-foreground">Write and wireframe without leaving Google Docs</p>
    </div>

    <div class="flex flex-col items-center text-center group" in:fly={{ y: 20, duration: 300, delay: 450, easing: quintOut }}>
      <div class="mb-4 font-bold text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        ✨
      </div>
      <h3 class="text-xl font-semibold mb-2">Fancy Formatted Docs</h3>
      <p class="text-muted-foreground">Pre-formatted templates that impress clients</p>
    </div>
  </div>
{/if}

