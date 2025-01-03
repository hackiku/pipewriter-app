<!-- src/lib/pages/free/components/cta/FreeFormDialog.svelte -->
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { X, RotateCcw } from "lucide-svelte";
  import { editorStore, visibleSections } from '../../stores/editorStore';
  import TextEditor from './TextEditor.svelte';
  import EmailForm from '$lib/components/cta/EmailForm.svelte';
  import { Button } from "$lib/components/ui/button";

  export let showReset = false;
</script>

<AlertDialog.Portal>
  <AlertDialog.Overlay class="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0" />
  <AlertDialog.Content class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[95vw] max-h-[95vh] translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 sm:rounded-lg md:w-[1000px] bg-background">
    <AlertDialog.Cancel class="absolute right-6 top-6 z-50">
      <div class="group relative inline-flex items-center">
        <button class="h-8 rounded-full border bg-background hover:bg-muted transition-all duration-200 overflow-hidden">
          <div class="flex items-center px-2 gap-2">
            <X class="w-4 h-4" />
            <span class="pr-1 text-xs text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              esc
            </span>
          </div>
        </button>
      </div>
    </AlertDialog.Cancel>

    <div class="h-full flex items-center justify-center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-semibold">Your UX copy</h3>
          <TextEditor 
            content={$editorStore.content}
            sections={$visibleSections}
          />
        </div>

        <div class="flex flex-col justify-center max-w-md mx-auto w-full gap-6">
          <div class="space-y-2">
            <h2 class="text-2xl font-bold">Export your wire's content</h2>
            <p class="text-muted-foreground">
              We'll send you a Google Docs template with your content.
            </p>
          </div>

          <EmailForm
            buttonText="Send My Template"
            wrap={true}
          />
          
          {#if showReset}
            <Button 
              variant="ghost" 
              size="sm"
              on:click={() => editorStore.reset()}
              class="w-full"
            >
              <RotateCcw class="w-4 h-4 mr-2" />
              Reset Content
            </Button>
          {/if}

          <p class="text-sm text-muted-foreground">
            By submitting, you agree to receive updates. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Portal>