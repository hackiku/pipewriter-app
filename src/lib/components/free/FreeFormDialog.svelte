<!-- $lib/components/free/FreeFormDialog.svelte -->
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { X } from "lucide-svelte";
  import { formattedContent } from '$lib/stores/demoStore';
  import TextEditor from './TextEditor.svelte';
  import EmailForm from '../EmailForm.svelte';
</script>

<AlertDialog.Content class="max-w-[95vw] w-[1000px] h-[85vh] p-6">
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
      <TextEditor 
        value={$formattedContent}
        readonly={true}
      />

      <div class="flex flex-col justify-center max-w-md mx-auto w-full gap-6">
        <div class="space-y-2">
          <h2 class="text-2xl font-bold">Get Your Free Template</h2>
          <p class="text-muted-foreground">
            We'll send you a Google Docs template with your content.
          </p>
        </div>

        <EmailForm
          buttonText="Send My Template"
          wrap={true}
        />
        
        <p class="text-sm text-muted-foreground">
          By submitting, you agree to receive updates. Unsubscribe anytime.
        </p>
      </div>
    </div>
  </div>
</AlertDialog.Content>
