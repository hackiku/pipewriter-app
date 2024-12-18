<!-- $lib/components/cta/FreeForm.svelte -->
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import EmailForm from "./EmailForm.svelte";
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
    <Button builders={[builder]} variant="outline">
      Get Free Template
    </Button>
  </AlertDialog.Trigger>
  
  <AlertDialog.Content class="max-w-[95vw] w-[1200px] p-4 gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Column: Text Content -->
      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Your Content</h3>
          <p class="text-sm text-muted-foreground">Edit your content before generating the template</p>
        </div>
        <Textarea 
          class="flex-1 min-h-[400px] font-mono text-sm"
          value={formattedContent}
        />
      </div>

      <!-- Right Column: Form -->
      <div class="flex flex-col gap-6">
        <div class="space-y-2">
          <h2 class="text-2xl font-bold">Get Your Free Template</h2>
          <p class="text-muted-foreground">
            We'll send you a Google Docs template with your content pre-formatted as wireframes.
          </p>
        </div>

        <EmailForm />
        
        <div class="text-sm text-muted-foreground">
          <p>By submitting, you agree to receive product updates and marketing emails. You can unsubscribe at any time.</p>
        </div>
      </div>
    </div>

    <AlertDialog.Footer class="flex gap-2 justify-end sm:justify-between border-t pt-4 mt-4">
      <AlertDialog.Cancel class="px-4">Cancel</AlertDialog.Cancel>
      <AlertDialog.Action class="px-4">Send My Template</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<style>
  :global(.alert-dialog-content) {
    margin: 1rem !important;
    padding: 1.5rem !important;
  }
  
  :global(.alert-dialog-overlay) {
    background: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(4px) !important;
  }
</style>