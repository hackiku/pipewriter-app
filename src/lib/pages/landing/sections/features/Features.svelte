<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import { PenTool, FileCode, Layout } from "lucide-svelte";

  const features = [
    {
      icon: PenTool,
      title: "The Sidebar App",
      description: "Write lightspeed landing pages ⚡️ Put together webpage wireframes in minutes and send writer's block on its way."
    },
    {
      icon: Layout,
      title: "84+ UI Elements",
      description: "Pre-made components to copy-paste. From simple buttons to complex navigation patterns, all in your Google Doc."
    },
    {
      icon: FileCode,
      title: "Export to Code",
      description: "Turn your docs into HTML, React, or Svelte components. No more manual handoffs to engineering."
    }
  ];
</script>

<div class="container">
  <div class="max-w-2xl mx-auto text-center mb-16">
    <h2 class="text-3xl md:text-4xl font-medium mb-6">
      Design Superpowers in Google Docs
    </h2>
    <p class="text-xl text-muted-foreground">
      All the tools you need to create professional UX deliverables, right where you already write.
    </p>
  </div>

  <div class="grid md:grid-cols-3 gap-12">
    {#each features as feature}
      <div class="space-y-4">
        <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <svelte:component this={feature.icon} class="w-6 h-6 text-primary" />
        </div>
        <h3 class="text-xl font-medium">{feature.title}</h3>
        <p class="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    {/each}
  </div>
</div>