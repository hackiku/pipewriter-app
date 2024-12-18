<!-- $lib/components/cta/FreeForm.svelte -->
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import EmailForm from "./EmailForm.svelte";
  import { X } from "lucide-svelte";
  import { demoContent } from "$lib/pages/demo/data";
  
  // Format the demo content for the textarea
  const formattedContent = [
    `# ${demoContent.hero.headline}`,
    demoContent.hero.eyebrow,
    '',
    `## ${demoContent.features.headline}`,
    ...demoContent.features.blurbs.map(blurb => 
      `### ${blurb.title}\n${blurb.description}`
    ),
    '',
    `## ${demoContent.zigzags.left.heading}`,
    demoContent.zigzags.left.subheading,
    demoContent.zigzags.left.description,
    '',
    `## ${demoContent.zigzags.right.heading}`,
    demoContent.zigzags.right.subheading,
    demoContent.zigzags.right.description
  ].join('\n');
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="sm">
      Get Free Template
    </Button>
  </AlertDialog.Trigger>
  
  <AlertDialog.Content class="max-w-[95vw] w-[1000px] h-[85vh] p-6">
    <!-- Close Button -->
    <AlertDialog.Cancel class="absolute right-6 top-6 z-50">
      <div class="group relative inline-flex items-center">
        <button class="h-8 rounded-full border bg-background hover:bg-muted transition-all duration-200 overflow-hidden">
          <div class="flex items-center px-2 gap-2">
            <X class="w-4 h-4" />
            <span class="pr-1 text-xs text-muted-foreground opacitsy-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              esc
            </span>
          </div>
        </button>
      </div>
    </AlertDialog.Cancel>

    <!-- Main Content -->
    <div class="h-full flex items-center justify-center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <!-- Left Column: Text Content -->
        <div class="flex flex-col gap-4">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Your Content</h3>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <div class="rounded-full border p-1.5">
                <img src="tools/google-docs.svg" alt="Google Docs" class="w-4 h-4" />
              </div>
              <span>Will be formatted as a Google Docs wireframe</span>
            </div>
          </div>
          <Textarea 
            class="flex-1 min-h-[400px] font-mono text-sm text-muted-foreground [&_strong]:text-foreground [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground"
            value={formattedContent}
          />
        </div>

        <!-- Right Column: Form -->
        <div class="flex flex-col justify-center max-w-md mx-auto w-full gap-6">
          <div class="space-y-2">
            <h2 class="text-2xl font-bold">Get Your Free Template</h2>
            <p class="text-muted-foreground">
              We'll send you a Google Docs template with your content pre-formatted as wireframes.
            </p>
          </div>

          <EmailForm
            buttonText="Send My Template"
            wrap={true}
          />
          
          <p class="text-sm text-muted-foreground">
            By submitting, you agree to receive product updates and marketing emails. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>

<style>
  :global(.alert-dialog-content) {
    margin: 1.5rem !important;
    padding: 1.5rem !important;
  }
  
  :global(.alert-dialog-overlay) {
    background: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(4px) !important;
  }
</style>