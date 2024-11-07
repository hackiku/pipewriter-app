<!-- src/lib/iframe/components/AiPromptDropdown.svelte -->

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { ChevronUp, Plus, Check } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Checkbox from "$lib/components/ui/checkbox";
  import { cn } from "$lib/utils";
  import { fade } from "svelte/transition";

	interface Prompt {
		title: string;
		text: string;
		full: string;
	}

	let selectedPrompt: Prompt | null = null;

	// export let selectedPrompt: string | null = null;
  export let usePrompt = false;
  export let disabled = false;

  const dispatch = createEventDispatcher();
  let showOptions = false;
  let editingIndex: number | null = null;

  const defaultPrompts = [
    {
      title: "Landing Page",
      text: "Generate a landing page with a hero section, 3 feature cards, and a CTA button...",
      full: "Generate a landing page with a hero section that highlights the main value proposition, followed by 3 feature cards displaying key benefits, and end with a prominent call-to-action button. Use clear headings and concise copy."
    },
    {
      title: "Product Features",
      text: "Create a product features section with benefit-focused headings and descriptions...",
      full: "Create a product features section with benefit-focused headings and descriptions. Include 4-6 key features, each with a clear heading and supporting text that emphasizes user value. Format as HTML."
    },
    {
      title: "Blog Post",
      text: "Write a blog post structure with clear headings, subheadings, and body text...",
      full: "Write a blog post structure with clear headings, subheadings, and body text. Include an engaging introduction, 3-4 main sections with descriptive headings, and a conclusion. Format using semantic HTML."
    }
  ];

  let prompts = [...defaultPrompts];
  let editablePrompt = "";

  function truncateText(text: string, length = 60) {
    return text.length > length ? text.slice(0, length) + "..." : text;
  }

	// function handlePromptSelect(event: CustomEvent) {
	// 	selectedPrompt = event.detail.prompt;
	// }

  function handlePromptSelect(index: number) {
    if (editingIndex === index) {
      return;
    }
    editingIndex = index;
    editablePrompt = prompts[index].full;
    selectedPrompt = editablePrompt;
    dispatch("select", { prompt: editablePrompt });
  }

  function handlePromptChange() {
    if (editingIndex !== null) {
      prompts[editingIndex] = {
        ...prompts[editingIndex],
        full: editablePrompt,
        text: truncateText(editablePrompt)
      };
      selectedPrompt = editablePrompt;
      dispatch("change", { prompt: editablePrompt });
    }
  }

  function togglePromptUse(checked: boolean) {
    usePrompt = checked;
    dispatch("toggleUse", { usePrompt });
  }
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
        {#each prompts as prompt, i}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class={cn(
              "relative rounded-lg border p-3 transition-all duration-200",
              editingIndex === i
                ? "border-primary bg-primary/5"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
              "cursor-pointer"
            )}
            on:click={() => handlePromptSelect(i)}
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1">
                <h3 class="text-sm font-medium mb-1">{prompt.title}</h3>
                {#if editingIndex === i}
                  <textarea
                    class="w-full h-24 p-2 text-sm bg-white dark:bg-gray-900 rounded border border-gray-200 
                           dark:border-gray-700 focus:ring-1 focus:ring-primary"
                    bind:value={editablePrompt}
                    on:input={handlePromptChange}
                  />
                {:else}
                  <p class="text-sm text-muted-foreground">
                    {prompt.text}
                  </p>
                {/if}
              </div>
              {#if editingIndex === i}
                <div class="mt-1">
                  <Check class="h-4 w-4 text-primary" />
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Main Controls -->
  <div class="flex items-center gap-2">
    <!-- Dropdown Toggle -->
    <Button
      variant="outline"
      class={cn(
        "flex-1 justify-between px-3 h-8",
        usePrompt && "border-primary bg-primary/5"
      )}
      on:click={() => showOptions = !showOptions}
      {disabled}
    >
		
      <span class="text-sm truncate">
			  {selectedPrompt ? truncateText(selectedPrompt.text, 40) : "Select prompt..."}
        
        <!-- {selectedPrompt ? truncateText(selectedPrompt, 40) : "Select prompt..."} -->
      </span>
      <ChevronUp
        class={cn(
          "h-4 w-4 transition-transform duration-200",
          showOptions && "rotate-180"
        )}
      />
    </Button>

    <!-- Use Prompt Toggle -->
    <Checkbox.Root
      checked={usePrompt}
      onCheckedChange={togglePromptUse}
      class="h-8 w-8 border rounded-md data-[state=checked]:border-primary"
      disabled={!selectedPrompt || disabled}
    >
      <Checkbox.Indicator>
        <Plus class="h-4 w-4" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  </div>
</div>