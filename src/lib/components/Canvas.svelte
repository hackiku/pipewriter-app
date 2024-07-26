<!-- $lib/components/Canvas.svelte -->

<script lang="ts">
import { fade } from 'svelte/transition';
import { sections } from '$lib/stores/sections';
import Hero from '$lib/sections/Hero.svelte';
import Blurbs from '$lib/sections/Blurbs.svelte';
import ZigZag from '$lib/sections/ZigZag.svelte';
import Logos from '$lib/sections/Logos.svelte';

function removeSection(index: number) {
  sections.update(s => s.filter((_, i) => i !== index));
}

function handleDragOver(event) {
  event.preventDefault();
}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex-1 p-4" on:dragover={handleDragOver}>
  {#each $sections as section, index (index)}
    <div transition:fade>
      {#if section.type === 'hero'}
        <Hero data={section.data} on:remove={() => removeSection(index)} />
      {:else if section.type === 'blurbs'}
        <Blurbs data={section.data} on:remove={() => removeSection(index)} />
      {:else if section.type === 'zigzag'}
        <ZigZag data={section.data} on:remove={() => removeSection(index)} />
      {:else if section.type === 'logos'}
        <Logos data={section.data} on:remove={() => removeSection(index)} />
      {/if}
    </div>
  {/each}
</div>