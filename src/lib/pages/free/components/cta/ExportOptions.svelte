<!-- src/lib/pages/free/components/cta/ExportOptions.svelte -->
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Button } from "$lib/components/ui/button";
  import { FileText, Code, FileJson, FileDown } from "lucide-svelte";
  import { exportStore, type ExportFormat } from '../../stores/exportStore';

  const options: Array<{
    id: ExportFormat;
    label: string;
    icon: any;
    description: string;
  }> = [
    { 
      id: 'text', 
      label: 'Plain Text', 
      icon: FileText,
      description: 'Basic text format with minimal styling'
    },
    { 
      id: 'html', 
      label: 'HTML', 
      icon: Code,
      description: 'HTML with Tailwind CSS classes'
    },
    { 
      id: 'react', 
      label: 'React', 
      icon: FileJson,
      description: 'React components with styling'
    },
    { 
      id: 'markdown', 
      label: 'Markdown', 
      icon: FileDown,
      description: 'Standard Markdown format'
    }
  ];
</script>

<div class="flex items-center justify-center gap-2">
  {#each options as option}
    <Tooltip.Root openDelay={0} closeDelay={0}>
      <Tooltip.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant={$exportStore.selectedFormat === option.id ? "default" : "outline"}
          size="icon"
          class="w-10 h-10"
          on:click={() => exportStore.setFormat(option.id)}
        >
          <svelte:component this={option.icon} class="w-4 h-4" />
          <span class="sr-only">{option.label}</span>
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="top" sideOffset={10}>
        <div class="text-center">
          <p class="font-medium">{option.label}</p>
          <p class="text-xs text-muted-foreground">{option.description}</p>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  {/each}
</div>