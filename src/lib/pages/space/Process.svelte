<!-- src/lib/pages/space/Process.svelte -->
<script lang="ts">
  import { Rocket, Edit, Code } from "lucide-svelte";

  const steps = [
    {
      icon: Edit,
      title: "1. Write First, Design Later",
      description: "Start with content in Google Docs. Use our space-optimized templates and components to create a solid content architecture."
    },
    {
      icon: Rocket,
      title: "2. Space-Grade Wireframes",
      description: "Transform your content into interactive wireframes. Built-in components for mission timelines, payload specs, and technical documentation."
    },
    {
      icon: Code,
      title: "3. Production Code",
      description: "Get clean, semantic code in React, Vue, or Svelte. No WordPress, no Webflow - just pure, modern frameworks your developers will love."
    }
  ];
</script>

<div class="container">
  <div class="grid md:grid-cols-3 gap-8">
    {#each steps as step}
      <div class="relative p-6 rounded-xl border bg-card">
        <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <svelte:component this={step.icon} class="w-6 h-6 text-primary" />
        </div>
        
        <h3 class="text-xl font-semibold mb-2">{step.title}</h3>
        <p class="text-muted-foreground">{step.description}</p>
      </div>
    {/each}
  </div>
</div>

