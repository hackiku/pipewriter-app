<!-- src/lib/components/demo/app/tabs/PromptTab.svelte -->
<script lang="ts">
  const prompt = `Write a landing page hero section that establishes trust and clarity.
Use a descriptive headline that explains the product's main benefit.
Add a supporting subheadline that provides context...`;
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <!-- Prompt Input -->
  <div class="bg-zinc-900 rounded-lg p-4">
    <div class="font-mono text-sm">
      <div class="text-emerald-500/70">// AI Prompt</div>
      <div class="text-white/70 whitespace-pre-wrap">{prompt}</div>
      <div class="text-white/40 mt-2">... rest will be generated</div>
    </div>
  </div>

  <!-- Generated Output -->
  <div class="bg-zinc-900/50 rounded-lg p-4 border border-white/10">
    <div class="font-mono text-sm space-y-2">
      <div class="text-blue-400/70">// Generated HTML</div>
      <div class="text-white/60">Parsing content structure...</div>
      <div class="text-white/40">Converting to semantic HTML...</div>
    </div>
  </div>
</div>