<!-- src/lib/components/cta/pricing/cards/ContactCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Copy, Building2 } from "lucide-svelte";
  
  const email = "ivan@pipewriter.io";
  let copyText = "";
  
  function copyEmail() {
    navigator.clipboard.writeText(email);
    copyText = "Copied!";
    setTimeout(() => {
      copyText = "";
    }, 2000);
  }
</script>

<div class="p-6 rounded-xl border bg-zinc-950/70 hover:bg-zinc-950/90
            transition-all duration-300 backdrop-blur-sm
            hover:shadow-lg hover:shadow-primary/5">
  <div class="flex items-start justify-between gap-4">
    <!-- Contact Info -->
    <div class="space-y-4">
      <div class="space-y-1">
        <p class="text-sm text-muted-foreground">
          Need enterprise or agency solution?
        </p>
        <div class="flex items-center gap-2">
          <a href="mailto:{email}"
             class="text-lg font-medium bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                    bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            {email}
          </a>
          <Button variant="ghost" size="sm" on:click={copyEmail}
                  class="h-7 px-2 hover:bg-white/5">
            <Copy class="w-3 h-3" />
            <span class="sr-only">Copy email</span>
            {#if copyText}
              <span class="ml-1 text-xs">{copyText}</span>
            {/if}
          </Button>
        </div>
      </div>
    </div>

    <!-- Enterprise Icon -->
    <div class="text-primary/20">
      <Building2 class="w-6 h-6" />
    </div>
  </div>
</div>