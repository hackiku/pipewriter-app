<!-- $lib/iframe/layout/BottomBar.svelte -->
<script lang="ts">
  import { ExternalLink, HelpCircle, FileText } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import { showAboutModal } from '../stores/aboutStore';

  const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1k3ZaPn-J_xHSUV0YrpyvAvNuD-uFsuu_";
  const BG_STYLE = 'bg-white dark:bg-slate-900';
  
  const docLinks = [
    {
      title: "Empty Doc",
      desc: "Start with a blank document",
      url: "https://docs.google.com/document/d/1YuT5oGw27bMY4myZsBAbzBYelhy_CSSBUihjWipypYw/edit"
    },
    {
      title: "Normal Template",
      desc: "Light mode with basic elements",
      url: "https://docs.google.com/document/d/1X-mEWo2wuRcVZdA8Y94cFMpUO6tKm8GLxY3ZA8lyulk/edit"
    },
    {
      title: "Full Template",
      desc: "Complete template with examples",
      url: "https://docs.google.com/document/d/1uMdieQCJeBQCvkHs7w9ZiVeEB2_cglkF7ZLgeqvxL0U/edit"
    },
    {
      title: "Dark Mode",
      desc: "Dark theme template",
      url: "https://docs.google.com/document/d/1FU1sZ4KdeAv_VcvDexzq6D4F0tffXnuVYAVVeVxz-ik/edit"
    }
  ];

  function openUrl(url: string) {
    window.open(url, '_blank');
  }

  function toggleAboutModal() {
    showAboutModal.update(n => !n);
  }

  $: buttonClass = cn(
    "transition-all duration-200 relative z-10",
    $showAboutModal
      ? `w-9 h-11 mb-1 rounded-b-full ${BG_STYLE}
         border-b border-l border-r border-gray-300 dark:border-gray-600
         after:content-[''] after:absolute after:top-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-inherit`
      : "w-9 h-9 rounded-full -mt-1 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
  );
</script>

<div class="w-full px-3 h-12 flex items-center justify-between">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button 
        variant="ghost" 
        builders={[builder]}
        class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group px-0"
      >
        <span>Docs</span>
        <ExternalLink size={14} class="opacity-50 group-hover:opacity-100 transition-opacity" />
      </Button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content side="top" align="start" class="w-64">
      <DropdownMenu.Label>Templates</DropdownMenu.Label>
      <DropdownMenu.Separator />

      <DropdownMenu.Group>
        {#each docLinks as link}
          <DropdownMenu.Item on:click={() => openUrl(link.url)}>
            <div class="flex items-start gap-2">
              <FileText class="h-4 w-4 mt-0.5" />
              <div class="flex flex-col">
                <span>{link.title}</span>
                <span class="text-xs text-muted-foreground">{link.desc}</span>
              </div>
            </div>
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Group>

      <DropdownMenu.Separator />
      
      <DropdownMenu.Item on:click={() => openUrl(DRIVE_FOLDER_URL)}>
        <div class="flex items-center gap-2">
          <ExternalLink class="h-4 w-4" />
          <span>Open Drive Folder</span>
        </div>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>

  <a 
    href="https://drive.google.com/drive/folders/11-7g4bqX7uj_BKNlllo425kg1pAALSoL"
    target="_blank"
    class="text-xs"
  >
    Master
  </a>

  <!-- Help Button -->
  <div class="-mt-[1px] flex items-center z-50">
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          class={buttonClass}
          on:click={toggleAboutModal}
        >
          <HelpCircle class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Help & About</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </div>
</div>