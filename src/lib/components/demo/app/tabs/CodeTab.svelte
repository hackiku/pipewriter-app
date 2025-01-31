<!-- src/lib/components/demo/app/tabs/CodeTab.svelte -->
<script lang="ts">
  // Sample generated code
  const code = `<!DOCTYPE html>

<body class="bg-zinc-950 text-white">
  <main class="min-h-screen">
    <section class="relative pt-32">
      <div class="container px-4 mx-auto">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl font-medium mb-6">
            Write Straight to Product
          </h1>
          <p class="text-xl text-zinc-400">
            Design in words. Preview in code.
          </p>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`;
</script>

<div class="max-w-4xl mx-auto">
  <div class="font-mono text-sm rounded-lg border border-white/10 overflow-hidden">
    <!-- Code Header -->
    <div class="bg-zinc-900 px-4 py-2 border-b border-white/10">
      <div class="flex items-center justify-between">
        <div class="text-white/40">index.html</div>
        <button class="text-white/60 hover:text-white transition-colors text-xs">
          Download
        </button>
      </div>
    </div>
    
    <!-- Code Content -->
    <div class="bg-zinc-900/50 p-4 overflow-auto">
      <pre class="text-white/70 whitespace-pre">{code}</pre>
    </div>
  </div>
</div>