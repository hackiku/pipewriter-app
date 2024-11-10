<!-- src/lib/iframe/features/ai/PromptDropdown.svelte -->
<script lang="ts">
  import { slide } from "svelte/transition";
  import { ChevronUp, X, Trash2, Settings } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Checkbox from "$lib/components/ui/checkbox";
  import { cn } from "$lib/utils";
  import { promptStore, activePrompt, masterPrompt, currentIndex } from '../../stores/promptStore';
  import { promptStatus, isProcessing } from '../../stores/promptStatus';

  let showPromptSelect = false;
  let showMasterEditor = false;
  const totalPrompts = 5;

  function handlePromptSelect(index: number) {
    promptStore.setCurrentIndex(index);
  }

  function updatePromptTitle(value: string) {
    if ($activePrompt) {
      promptStore.updatePrompt({
        ...$activePrompt,
        title: value
      });
    }
  }

  function updatePromptContent(value: string) {
    if ($activePrompt) {
      promptStore.updatePrompt({
        ...$activePrompt,
        content: value
      });
    }
  }

  function handleRemovePrompt() {
    if ($activePrompt) {
      promptStore.deletePrompt($activePrompt.id);
      showPromptSelect = false;
    }
  }

  function toggleMasterPrompt(checked: boolean) {
    promptStore.updateMasterPrompt({
      ...$masterPrompt,
      enabled: checked
    });
  }

  function updateMasterPrompt(title: string, content: string) {
    promptStore.updateMasterPrompt({
      ...$masterPrompt,
      title,
      content
    });
  }

  $: buttonClass = cn(
    "w-full justify-between h-9",
    $activePrompt && "border-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900",
    showPromptSelect && "border-red-500 bg-red-50 dark:bg-red-900/10"
  );
</script>

<div class="w-full space-y-2">
  <!-- Main Dropdown Button -->
  <Button
    variant="outline"
    class={buttonClass}
    on:click={() => showPromptSelect = !showPromptSelect}
    disabled={$isProcessing}
  >
    <span class="text-sm font-medium">
      {$activePrompt ? $activePrompt.title : "Select prompt..."}
    </span>
    {#if $activePrompt}
      <X class="h-4 w-4" />
    {:else}
      <ChevronUp class={cn(
        "h-4 w-4 transition-transform duration-200",
        !showPromptSelect && "rotate-180"
      )} />
    {/if}
  </Button>

  <!-- Dropdown Panel -->
  {#if showPromptSelect}
    <div
      class="space-y-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      transition:slide={{ duration: 150, axis: "y" }}
    >
      <!-- Editor -->
      <div class="space-y-2">
        <input
          type="text"
          value={$activePrompt?.title ?? ''}
          on:input={(e) => updatePromptTitle(e.currentTarget.value)}
          class="w-full text-sm font-medium bg-transparent border-b border-gray-200 
                 dark:border-gray-700 focus:outline-none focus:border-primary px-1 py-1"
          placeholder="Prompt title..."
        />
        
        <textarea
          value={$activePrompt?.content ?? ''}
          on:input={(e) => updatePromptContent(e.currentTarget.value)}
          class="w-full h-24 p-2 text-sm bg-white/50 dark:bg-gray-900/50 rounded 
                 border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-primary"
          placeholder="Enter your prompt..."
        />

        <!-- Numbered Steps -->
        <div class="flex justify-center gap-1.5">
          {#each Array(totalPrompts) as _, i}
            <Button
              variant={$currentIndex === i ? "default" : "outline"}
              size="sm"
              class="h-7 w-7 rounded-full p-0"
              on:click={() => handlePromptSelect(i)}
            >
              {i + 1}
            </Button>
          {/each}
        </div>
      </div>

      <!-- Master Prompt -->
      <div class="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
        <div class="flex items-center gap-2">
          <Checkbox.Root
            checked={$masterPrompt.enabled}
            onCheckedChange={toggleMasterPrompt}
            class="h-4 w-4"
            id="master-prompt"
          >
            <Checkbox.Indicator>
              <div class="h-4 w-4 bg-primary"></div>
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label for="master-prompt" class="text-sm select-none">
            Include master
          </label>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          class="h-8 w-8 p-0"
          on:click={() => showMasterEditor = !showMasterEditor}
        >
          <Settings class="h-4 w-4" />
        </Button>
      </div>

      <!-- Master Editor -->
      {#if showMasterEditor}
        <div class="space-y-2 pt-1" transition:slide>
          <input
            type="text"
            value={$masterPrompt.title}
            on:input={(e) => updateMasterPrompt(e.currentTarget.value, $masterPrompt.content)}
            class="w-full text-sm font-medium bg-transparent border-b border-gray-200 opacity-50
                   dark:border-gray-700 focus:outline-none focus:border-primary px-1 py-1"
            placeholder="Master prompt title..."
          />
          
          <textarea
            value={$masterPrompt.content}
            on:input={(e) => updateMasterPrompt($masterPrompt.title, e.currentTarget.value)}
            class="w-full h-20 p-2 text-sm bg-gray-50/50 dark:bg-gray-800/50 rounded opacity-50
                   border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-primary"
            placeholder="Master prompt content..."
          />
        </div>
      {/if}

      <!-- Remove Button -->
      {#if $activePrompt && !$activePrompt.isDefault}
        <Button
          variant="destructive"
          class="w-full justify-between h-8 mt-3"
          on:click={handleRemovePrompt}
        >
          <div class="flex items-center gap-2">
            <Trash2 class="h-4 w-4" />
            <span>Remove prompt</span>
          </div>
          <X class="h-4 w-4" />
        </Button>
      {/if}
    </div>
  {/if}
</div>