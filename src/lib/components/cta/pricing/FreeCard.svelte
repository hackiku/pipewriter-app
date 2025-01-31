<!-- src/lib/components/cta/pricing/FreeCard.svelte -->
<script lang="ts">
  import { FileText } from 'lucide-svelte';
</script>

<a 
  href="https://docs.google.com/document/d/xyz"
  target="_blank"
  rel="noopener noreferrer"
  class="block p-8 bg-card/30 rounded-xl border border-dashed 
         hover:bg-card/50 transition-all duration-300
         group"
>
  <div class="flex items-center gap-3 mb-3">
    <img src="/tools/google-docs.svg" alt="Google Docs" class="w-5 h-5 opacity-80" />
    <span class="text-sm font-medium text-muted-foreground">Google Docs</span>
  </div>

  <h3 class="text-xl font-medium mb-1 group-hover:text-primary transition-colors">
    Free UX Writing Template
  </h3>

  <div class="flex items-center text-primary mt-4 text-sm font-medium">
    <span class="group-hover:underline">Open in Google Docs</span>
    <FileText class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
  </div>
</a>
