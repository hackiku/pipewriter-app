<!-- src/lib/components/cta/pricing/cards/ContactCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Copy } from "lucide-svelte";
  
  const email = "ivan@pipewriter.io";
  let copyText = "Copy";
  
  function copyEmail() {
    navigator.clipboard.writeText(email);
    copyText = "Copied!";
    setTimeout(() => {
      copyText = "Copy";
    }, 2000);
  }
</script>

<div class="p-6 rounded-xl border bg-zinc-950 space-y-2">
  <p class="text-sm text-muted-foreground">
    Questions, support, work stuff:
  </p>
  
  <div class="flex items-center gap-4">
    <a 
      href="mailto:{email}"
      class="flex-1 text-xl font-medium bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
             bg-clip-text text-transparent hover:opacity-80 transition-opacity"
    >
      {email}
    </a>
    <Button 
      variant="outline" 
      size="sm" 
      on:click={copyEmail}
      class="shrink-0"
    >
      <Copy class="w-4 h-4 mr-2" />
      {copyText}
    </Button>
  </div>
</div>