<!-- src/lib/components/demo/app/tabs/DocTab.svelte -->
<script lang="ts">
  // Placeholder for Google Docs preview
</script>

<div class="flex items-center justify-center h-full">
  <div class="relative w-full max-w-3xl aspect-[4/3] rounded-lg border border-white/10 bg-zinc-900/50">
    <img 
      src="/demo/images/gdocs-placeholder.webp" 
      alt="Google Docs Editor"
      class="w-full h-full object-cover opacity-75"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <p class="text-white/40">Google Docs preview loading...</p>
    </div>
  </div>
</div>