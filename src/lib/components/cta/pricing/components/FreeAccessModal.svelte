<!-- src/lib/components/cta/pricing/components/FreeAccessModal.svelte -->
<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { X } from "lucide-svelte";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  
  export let open = false;
  const DOC_URL = "https://docs.google.com/document/d/1VsjRgy_dAccHhRF2iG_jEknv8bQn6t47wX3GD-_uoaQ/";
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0" />
    <Dialog.Content class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[95vw] translate-x-[-50%] translate-y-[-50%] gap-6 p-8 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 sm:rounded-lg md:w-[600px] bg-background">
      <Dialog.Close class="absolute right-6 top-6">
        <X class="h-4 w-4" />
      </Dialog.Close>

      <div class="space-y-6">
        <!-- Header & Form -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold">Get the Free Google Doc</h2>
          <p class="text-muted-foreground">
            Access the Drive folder with the free doc, tutorials and scripts.
          </p>
          <EmailForm 
            buttonText="Access Drive"
            size="sm"
            wrap={false}
            source="pricing-free-modal"
          />
        </div>

        <!-- Direct Access -->
        <div class="space-y-2">
          <div class="h-px bg-border" />
          <p class="text-sm text-center text-muted-foreground">
            Or check out the doc directly
          </p>
          <Button variant="outline" class="w-full rounded-full" asChild>
            <a href={DOC_URL} target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-center gap-2">
              <img src="/tools/gdocs.svg" alt="Google Docs" class="w-4 h-4 opacity-80" />
              <span>Open Doc</span>
            </a>
          </Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>