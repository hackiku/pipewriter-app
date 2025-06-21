<!-- src/lib/pages/landing/sections/features/FreeGoogleDoc.svelte -->
<script lang="ts">
  import { fade } from "svelte/transition";
  import { ExternalLink, FileText, Download } from "lucide-svelte";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
  
  export const FREE_GDOC_URL = "https://docs.google.com/document/d/1Ni_Rvrmw-PHkehFWDufj8idoVKHd_hOBPxsdYNT5Exk/edit?usp=sharing";
  
  let dialogOpen = false;
  
  function openGoogleDoc() {
    window.open(FREE_GDOC_URL, '_blank', 'noopener,noreferrer');
  }
  
  function handleTriggerClick() {
    dialogOpen = true;
  }
</script>

<!-- Trigger Button -->
<Button 
  on:click={handleTriggerClick}
  class="w-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
         hover:from-[#3644FE]/90 hover:to-[#B345ED]/90
         text-white border-0 rounded-xl py-6 px-6 text-base font-semibold
         shadow-lg hover:shadow-xl transition-all duration-200
         hover:scale-[1.02] active:scale-[0.98]"
>
  <div class="flex items-center gap-3">
    <FileText class="w-5 h-5" />
    <div class="text-left">
      <div class="font-bold">Try Free Demo Doc</div>
      <div class="text-sm font-normal opacity-90">
        See Pipewriter in action
      </div>
    </div>
  </div>
</Button>

<!-- Modal Dialog -->
<Dialog.Root bind:open={dialogOpen}>
  <!-- Custom Dark Overlay -->
  {#if dialogOpen}
    <div 
      class="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
      on:click={() => dialogOpen = false}
      transition:fade={{ duration: 200 }}
    />
  {/if}
  
  <Dialog.Content 
    class="max-w-3xl w-[95vw] h-fit p-0 border-0 bg-transparent fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    hideClose={true}
  >
    <!-- Custom Close Button -->
    <div class="absolute top-1 right-1 z-50">
      <button
        on:click={() => dialogOpen = false}
        class="flex items-center gap-2 px-3 py-2 bg-background border border-border 
               rounded-xl shadow-lg hover:bg-muted transition-colors text-sm font-mono"
      >
        <span class="hidden sm:inline text-muted-foreground">ESC</span>
        <span class="text-foreground">✕</span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="bg-neutral-950 rounded-2xl shadow-2xl overflow-hidden">
      <!-- Image Section -->
      <div class="relative">
        <!-- Screenshot -->
        <img 
          src="/samples/mdash/mdash-sample-smaller.webp" 
          alt="Free Pipewriter Google Doc demo" 
          class="w-full h-auto object-cover object-top max-h-[70vh] md:max-h-[65vh]"
        />
        
        <!-- Desktop: Gradient overlay with content -->
        <div class="hidden md:block">
          <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          
          <!-- Content over gradient -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <div class="flex items-end justify-between">
              <div>
                <h3 class="text-xl font-bold text-white mb-1">
                  Get the Pipewriter Free Demo
                </h3>
              </div>
              
              <div class="flex items-center gap-3">
                <Button 
                  on:click={openGoogleDoc}
                  variant="default"
                  size="sm"
                  class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:opacity-90 text-white border-0"
                >
                  <ExternalLink class="w-4 h-4 mr-2 text-white" />
                  <span class="text-white">Open Google Doc</span>
                </Button>
                
                <Button 
                  on:click={() => window.open('/samples/mdash/live_mdash.html', '_blank')}
                  variant="outline"
                  size="sm"
                  class="border-white text-white hover:bg-white hover:text-black"
                >
                  <span>Live Demo</span>
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile: Content Section (No gradient on image) -->
      <div class="md:hidden bg-neutral-950 p-4 space-y-4">
        <h3 class="text-lg font-bold text-white text-center">
          Get the Pipewriter Free Demo
        </h3>
        
        <div class="flex items-center gap-3 justify-center">
          <Button 
            on:click={openGoogleDoc}
            variant="default"
            size="sm"
            class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:opacity-90 text-white border-0"
          >
            <ExternalLink class="w-4 h-4 mr-2 text-white" />
            <span class="text-white">Open Google Doc</span>
          </Button>
          
          <Button 
            on:click={() => window.open('/samples/mdash/live_mdash.html', '_blank')}
            variant="outline"
            size="sm"
            class="border-white text-white hover:bg-white hover:text-black"
          >
            <span>Live Demo</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>

      <!-- Email Form Section -->

			<hr class="border-neutral-500/40"/>

      <div class="bg-neutral-950 py-4 px-4 md:px-6 pb-4 md:pb-6 space-y-4">
        <h4 class="text-lg text-white font-semibold text-center">
          Subscribe for more <span class="text-gray-400 font-normal">(optional)</span>
        </h4>
        
        <EmailForm 
          buttonText="Join Waitlist"
          size="default"
          wrap={false}
          source="Free Doc Modal"
          className="max-w-sm mx-auto"
        />
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>