<!-- $lib/components/ElementsDropper.svelte -->

<script lang="ts">
import { Button } from "$lib/components/ui/button";
import * as Sheet from "$lib/components/ui/sheet";
import { sections } from '$lib/stores/sections';

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
</script>

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