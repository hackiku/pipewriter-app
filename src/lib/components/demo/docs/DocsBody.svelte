<!-- src/lib/components/demo/docs/DocsBody.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  
  // Sample sections that can be inserted
  const sampleSections = {
    hero: {
      title: "Write Straight to Product",
      subtitle: "Design in words. Preview in code.",
      cta: "Get Started"
    },
    features: {
      items: [
        "90+ copy-paste UI elements",
        "Pro-grade templates",
        "Dark mode built-in"
      ]
    },
    pricing: {
      plans: [
        "Starter: $49/mo",
        "Pro: $99/mo",
        "Enterprise: Custom"
      ]
    }
  };
</script>

<div class="max-w-[850px] mx-auto py-12 px-8">
  <div class="prose prose-zinc max-w-none">
    <!-- Initial content -->
    <h1>SaaS Landing Page Copy</h1>
    <p class="text-zinc-500">Click "Insert" then choose a layout template to begin...</p>
    
    <!-- Dynamic sections will be inserted here -->
    <div class="space-y-8">
      <!-- We'll implement section rendering based on Frame selection -->
    </div>
  </div>
</div>