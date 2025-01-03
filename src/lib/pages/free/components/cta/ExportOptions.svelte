<!-- src/lib/pages/free/components/cta/ExportOptions.svelte -->
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Button } from "$lib/components/ui/button";
  import { FileText, Code, FileJson, FileDown, Layout } from "lucide-svelte";
  import { exportStore, type ExportFormat } from '../../stores/exportStore';

  const options: Array<{
    id: ExportFormat;
    label: string;
    icon: any;
    description: string;
  }> = [
    { 
      id: 'text', 
      label: 'Text', 
      icon: FileText,
      description: 'Simple formatted text'
    },
    { 
      id: 'html', 
      label: 'HTML', 
      icon: Code,
      description: 'Basic HTML with sections'
    },
    { 
      id: 'tailwind', 
      label: 'Tailwind', 
      icon: Layout,
      description: 'HTML with Tailwind styles'
    },
    { 
      id: 'react', 
      label: 'React', 
      icon: FileJson,
      description: 'React + Tailwind component'
    },
    { 
      id: 'markdown', 
      label: 'MD', 
      icon: FileDown,
      description: 'Markdown format'
    }
  ];
</script>

<div class="w-full max-w-md mx-auto px-4">
  <div class="p-2 rounded-lg bg-muted/20 backdrop-blur-sm flex items-center justify-center gap-2">
    {#each options as option}
      <Tooltip.Root openDelay={0} closeDelay={0}>
        <Tooltip.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant={$exportStore.selectedFormat === option.id ? "default" : "ghost"}
            size="icon"
            class="w-10 h-10 rounded-md"
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
</div>