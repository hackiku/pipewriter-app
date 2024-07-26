<script lang="ts">
import { onMount } from 'svelte';
import { Button } from "$lib/components/ui/button";
import * as Sheet from "$lib/components/ui/sheet";
import AppNav from "$lib/AppNav.svelte";

let heroText = "Welcome to Pipewriter";
let heroSubtext = "Create beautiful wireframes in minutes";
let blurbs = [
  { title: "Easy to Use", content: "Intuitive drag-and-drop interface" },
  { title: "Responsive", content: "Looks great on all devices" },
  { title: "Customizable", content: "Tailor to your specific needs" }
];

function handleDragOver(event) {
  event.preventDefault();
}

</script>

<AppNav />

<main class="flex flex-col min-h-screen bg-background text-foreground">
  <Sheet.Root>
    <Sheet.Trigger class="absolute top-20 right-4">
      <Button variant="outline">Add Elements</Button>
    </Sheet.Trigger>
    <Sheet.Content side="right" class="w-64">
      <Sheet.Header>
        <Sheet.Title>Add Elements</Sheet.Title>
      </Sheet.Header>
      <div class="flex flex-col gap-2 p-4">
        <Button>Add Hero</Button>
        <Button>Add Zigzag</Button>
        <Button>Add Blurb</Button>
      </div>
    </Sheet.Content>
  </Sheet.Root>

  <div class="flex-1 p-4" on:dragover={handleDragOver}>
    <!-- Hero Section -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4">
        <textarea bind:value={heroText} class="w-full bg-transparent text-center resize-none"></textarea>
      </h1>
      <p class="text-xl">
        <textarea bind:value={heroSubtext} class="w-full bg-transparent text-center resize-none"></textarea>
      </p>
    </div>

    <!-- Blurbs -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each blurbs as blurb, index}
        <div class="p-6 bg-secondary rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-2">
            <textarea bind:value={blurb.title} class="w-full bg-transparent resize-none"></textarea>
          </h2>
          <p>
            <textarea bind:value={blurb.content} class="w-full bg-transparent resize-none"></textarea>
          </p>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  textarea {
    overflow: hidden;
  }
</style>