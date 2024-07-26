<script lang="ts">
import { fade } from 'svelte/transition';
import { Button } from "$lib/components/ui/button";
import * as Sheet from "$lib/components/ui/sheet";
import { sections } from '$lib/stores/sections';

import Hero from '$lib/sections/Hero.svelte';
import Blurbs from '$lib/sections/Blurbs.svelte';
import ZigZag from '$lib/sections/ZigZag.svelte';
import Logos from '$lib/sections/Logos.svelte';

function addHero() {
  sections.update(s => [...s, {
    type: 'hero',
    data: { title: "New Hero Section", subtitle: "Add your content here" }
  }]);
}

function addBlurbs() {
  sections.update(s => [...s, {
    type: 'blurbs',
    data: {
      items: [
        { title: "New Feature", content: "Describe your feature" },
        { title: "Another Feature", content: "Describe another feature" },
        { title: "Last Feature", content: "Describe the last feature" }
      ]
    }
  }]);
}

function addZigZag() {
  sections.update(s => [...s, {
    type: 'zigzag',
    data: {
      title: "New ZigZag Section",
      content: "Add your content here",
      imageUrl: "https://via.placeholder.com/500",
      reverse: false
    }
  }]);
}


function addLogos() {
  sections.update(s => [...s, {
    id: Date.now(),
    type: 'logos',
    data: {
      title: "You'll be in good company",
      logos: [
        { name: 'Logo 1', color: '#FF5733' },
        { name: 'Logo 2', color: '#33FF57' },
        { name: 'Logo 3', color: '#3357FF' },
        { name: 'Logo 4', color: '#FF33F1' },
        { name: 'Logo 5', color: '#33FFF1' },
        { name: 'Logo 6', color: '#F1FF33' },
      ]
    }
  }]);
}


function removeSection(index: number) {
  sections.update(s => s.filter((_, i) => i !== index));
}

function handleDragOver(event) {
  event.preventDefault();
}
</script>

<main class="flex flex-col min-h-screen bg-background text-foreground pt-24">
  <Sheet.Root>
    <Sheet.Trigger class="fixed top-20 right-4 z-10">
      <Button variant="outline">Add Elements</Button>
    </Sheet.Trigger>
    <Sheet.Content side="right" class="w-64">
      <Sheet.Header>
        <Sheet.Title>Add Elements</Sheet.Title>
      </Sheet.Header>
      <div class="flex flex-col gap-2 p-4">
        <Button on:click={addHero}>Add Hero</Button>
        <Button on:click={addBlurbs}>Add Blurbs</Button>
        <Button on:click={addZigZag}>Add ZigZag</Button>
        <Button on:click={addLogos}>Add Logos</Button>
      </div>
    </Sheet.Content>
  </Sheet.Root>

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
</main>