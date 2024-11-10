<!-- $lib/iframe/features/ai/AiPromptDropdown.svelte -->
<script lang="ts">
  import { slide } from "svelte/transition";
  import { ChevronUp, X, Check, Plus } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Checkbox from "$lib/components/ui/checkbox";
  import { cn } from "$lib/utils";
  import { promptStore, activePrompt, type Prompt } from '../../stores/promptStore';

  export let isProcessing = false;
  export let showDropdown = false;

  function truncateText(text: string, length = 60) {
    return text.length > length ? text.slice(0, length) + "..." : text;
  }

  function handlePromptEdit(prompt: Prompt, field: keyof Prompt, value: string) {
    promptStore.updatePrompt({
      ...prompt,
      [field]: value
    });
  }

  function handleDeletePrompt(prompt: Prompt, event: MouseEvent) {
    event.stopPropagation();
    promptStore.deletePrompt(prompt.id);
  }

  function handlePromptSelect(promptId: string) {
    promptStore.setActivePrompt(promptId);
    showDropdown = false;
  }

  function handleUsePromptChange(checked: boolean) {
    promptStore.setUsePrompt(checked);
  }

  $: store = $promptStore;
</script>

<div class="relative">
  {#if showDropdown}
    <div
      class="absolute bottom-full mb-2 w-full p-4 bg-white dark:bg-gray-800 
             rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg"
      transition:slide={{ duration: 150, axis: "y" }}
    >
      <div class="flex flex-col gap-2">
        {#each store.prompts as prompt (prompt.id)}
          <div
            class={cn(
              "group relative rounded-lg border p-3 transition-colors duration-200",
              store.activePromptId === prompt.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
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
                  <p class="text-xs text-muted-foreground">
                    {truncateText(prompt.content)}
                  </p>
                {/if}
              </div>
              
              {#if store.activePromptId === prompt.id}
                <button
                  class="mt-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                         group transition-colors"
                  on:click={(e) => handleDeletePrompt(prompt, e)}
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
        "flex-1 justify-between h-8 px-3",
        store.usePrompt && "border-primary bg-primary/5"
      )}
      on:click={() => showDropdown = !showDropdown}
      disabled={isProcessing}
    >
      <span class="text-sm truncate">
        {$activePrompt ? $activePrompt.title : "Select prompt..."}
      </span>
      <ChevronUp
        class={cn(
          "h-4 w-4 transition-transform duration-200",
          showDropdown && "rotate-180"
        )}
      />
    </Button>

    <Checkbox.Root
      checked={store.usePrompt}
      onCheckedChange={handleUsePromptChange}
      class="h-8 w-8 border rounded-md data-[state=checked]:border-primary"
      disabled={!$activePrompt || isProcessing}
    >
      <Checkbox.Indicator>
        <Plus class="h-4 w-4" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  </div>
</div>