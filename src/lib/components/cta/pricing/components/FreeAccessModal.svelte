<!-- src/lib/components/cta/pricing/components/FreeAccessModal.svelte -->
<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { X, ArrowRight, Check } from "lucide-svelte";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  
  export let open = false;
  const DOC_URL = "https://docs.google.com/document/d/1VsjRgy_dAccHhRF2iG_jEknv8bQn6t47wX3GD-_uoaQ/";

  const features = [
    "Sample UX wireframe template",
    "Mini UI components library (tables)",
    "Basic wire to HTML script",
    "Script setup guide"
  ];
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0" />
    <Dialog.Content 
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[95vw] 
             translate-x-[-50%] translate-y-[-50%]
             shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 
             rounded-lg md:w-[600px] bg-background"
    >


      <!-- ESC Button -->
      <div class="absolute top-3 right-3 z-20">
        <div class="border rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
          <button
            class="px-3 py-1.5 text-muted-foreground hover:text-foreground
                   flex items-center gap-2 rounded-lg"
            on:click={() => open = false}
          >
            <span class="text-sm">ESC</span>
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div class="p-6 md:p-8 space-y-6">
          <h2 class="text-2xl font-bold">Get the Free Wireframe Kit</h2>
          
          <ul class="space-y-2">
            {#each features as feature}
              <li class="flex items-center gap-2 text-muted-foreground">
                <Check class="w-4 h-4 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            {/each}
          </ul>

					<div class="flex flex-col gap-4 inset-0 md:pr-12">

						<EmailForm 
							size="sm"
            	source="pricing-free-modal"
            	buttonText="Access Drive"
            	isDocDelivery={true}
            	wrap={false}
            	format="gdoc"
						/>
						
						<p class="text-xs text-center text-foreground/30">
							Enter the email you use Docs with for Drive access. This also gets you product updates. Unsubscribe anytime.
						</p>
					</div>
						
          <div class="space-y-3">
            <div class="h-px bg-border" />
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted-foreground">
                Just want the template?
              </span>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href={DOC_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 text-muted-foreground 
                         hover:text-foreground group"
                >
                  <img class="w-4 h-4 opacity-70 group-hover:opacity-100" src="/tools/gdocs.svg" alt="Google Docs"/>
                  <span>Open Doc</span>
                  <ArrowRight class="w-3 h-3 opacity-70 group-hover:opacity-100 
                                  group-hover:translate-x-0.5 transition-all" />
                </a>
              </Button>
            </div>
          </div>
      </div>

    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>