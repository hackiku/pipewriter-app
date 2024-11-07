<!-- $lib/iframe/components/AiPromptDropdown.svelte -->
<script lang="ts">
  import { slide } from "svelte/transition";
  import { ChevronUp, X, Check, Plus } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Checkbox from "$lib/components/ui/checkbox";
  import { cn } from "$lib/utils";
  import { promptStore, activePrompt, type Prompt } from '../stores/promptStore';

  export let disabled = false;

  let showOptions = false;

  function truncateText(text: string, length = 60) {
    return text.length > length ? text.slice(0, length) + "..." : text;
  }

  function handlePromptEdit(prompt: Prompt, field: keyof Prompt, value: string) {
    promptStore.updatePrompt({
      ...prompt,
      [field]: value
    });
  }

  function handleDeletePrompt(promptId: string) {
    promptStore.deletePrompt(promptId);
  }

  function handlePromptSelect(promptId: string) {
    promptStore.setActivePrompt(promptId);
  }

  function handleUsePromptChange(checked: boolean) {
    promptStore.setUsePrompt(checked);
  }

  $: store = $promptStore;
</script>

<div class="relative">
  <!-- Prompt Dropdown -->
  {#if showOptions}
    <div
      class="absolute bottom-full mb-1 w-full p-2 bg-white dark:bg-gray-800 
             rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg"
      transition:slide={{ duration: 150, axis: "y" }}
    >
      <div class="flex flex-col gap-2">
        {#each store.prompts as prompt (prompt.id)}
          <div
            class={cn(
              "relative rounded-lg border p-3 transition-all duration-200",
              store.activePromptId === prompt.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
              "cursor-pointer"
            )}
            on:click={() => handlePromptSelect(prompt.id)}
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1">
                {#if store.activePromptId === prompt.id}
                  <input
                    type="text"
                    class="w-full mb-2 p-1 text-sm font-medium bg-transparent border-b 
                           border-gray-200 dark:border-gray-700 focus:outline-none
                           focus:border-primary transition-colors"
                    value={prompt.title}
                    on:input={(e) => handlePromptEdit(prompt, 'title', e.currentTarget.value)}
                  />
                  <textarea
                    class="w-full h-24 p-2 text-sm bg-white dark:bg-gray-900 rounded 
                           border border-gray-200 dark:border-gray-700 focus:ring-1 
                           focus:ring-primary transition-colors"
                    value={prompt.content}
                    on:input={(e) => handlePromptEdit(prompt, 'content', e.currentTarget.value)}
                  />
                {:else}
                  <h3 class="text-sm font-medium mb-1">{prompt.title}</h3>
                  <p class="text-xs text-muted-foreground leading-relaxed">
                    {truncateText(prompt.content, 100)}
                  </p>
                {/if}
              </div>
              
              {#if store.activePromptId === prompt.id}
                <!-- Delete/Check Button -->
                <button
                  class="mt-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                         group transition-colors"
                  on:click|stopPropagation={() => handleDeletePrompt(prompt.id)}
                >
                  <Check class="h-4 w-4 text-primary group-hover:hidden" />
                  <X class="h-4 w-4 text-red-500 hidden group-hover:block" />
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Main Controls -->
  <div class="flex items-center gap-2">
    <Button
      variant="outline"
      class={cn(
        "flex-1 justify-between px-3 h-8",
        store.usePrompt && "border-primary bg-primary/5"
      )}
      on:click={() => showOptions = !showOptions}
      {disabled}
    >
      <span class="text-sm truncate">
        {$activePrompt ? $activePrompt.title : "Select prompt..."}
      </span>
      <ChevronUp
        class={cn(
          "h-4 w-4 transition-transform duration-200",
          showOptions && "rotate-180"
        )}
      />
    </Button>

    <Checkbox.Root
      checked={store.usePrompt}
      onCheckedChange={handleUsePromptChange}
      class="h-8 w-8 border rounded-md data-[state=checked]:border-primary"
      disabled={!$activePrompt || disabled}
    >
      <Checkbox.Indicator>
        <Plus class="h-4 w-4" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  </div>
</div>