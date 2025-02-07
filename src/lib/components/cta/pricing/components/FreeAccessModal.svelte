<!-- src/lib/components/cta/pricing/components/FreeAccessModal.svelte -->
<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { X, FileText, Mail } from "lucide-svelte";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  
  export let open = false;
  
  const DOC_URL = "https://docs.google.com/your-template-url";
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0" />
    <Dialog.Content class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[95vw] translate-x-[-50%] translate-y-[-50%] gap-4 p-8 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 sm:rounded-lg md:w-[600px] bg-background">
      <Dialog.Close class="absolute right-6 top-6">
        <X class="h-4 w-4" />
      </Dialog.Close>

      <div class="grid gap-6">
        <div class="space-y-2">
          <h2 class="text-2xl font-bold">Get Your Free UX Template</h2>
          <p class="text-muted-foreground">
            Access our basic UX writing template and start creating better documentation.
          </p>
        </div>

        <div class="grid gap-4">
          <!-- Direct Access -->
          <div class="p-4 rounded-lg border bg-muted/40">
            <h3 class="font-medium mb-2 flex items-center gap-2">
              <FileText class="w-4 h-4" />
              Quick Access
            </h3>
            <p class="text-sm text-muted-foreground mb-3">
              Get instant access to the template without signup.
            </p>
            <Button variant="outline" class="w-full" asChild>
              <a href={DOC_URL} target="_blank" rel="noopener noreferrer">
                Open Template
              </a>
            </Button>
          </div>

          <!-- Email Access -->
          <div class="p-4 rounded-lg border bg-muted/40">
            <h3 class="font-medium mb-2 flex items-center gap-2">
              <Mail class="w-4 h-4" />
              Get Full Access
            </h3>
            <p class="text-sm text-muted-foreground mb-3">
              Get the template + sample microcopy patterns sent to your inbox.
            </p>
            <EmailForm 
              buttonText="Send Template"
              size="sm"
              wrap={true}
              source="pricing-free-modal"
            />
          </div>
        </div>

        <p class="text-xs text-center text-muted-foreground">
          By submitting, you agree to receive occasional updates. Unsubscribe anytime.
        </p>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>