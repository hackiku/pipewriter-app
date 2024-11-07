<!-- $lib/iframe/layout/AppAbout.svelte -->

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { HelpCircle, X } from 'lucide-svelte';
  import { showAboutModal } from '../stores/aboutStore';
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import EmailCapture from '../components/EmailCapture.svelte';

  const BG_STYLE = 'bg-white dark:bg-slate-900';

  function closeModal() {
    showAboutModal.set(false);
  }

  function toggleModal() {
    showAboutModal.update(n => !n);
  }

  $: buttonClass = cn(
    "transition-all duration-200 relative z-10",
    $showAboutModal
      ? `w-10 h-[calc(3rem+1px)] rounded-b-full ${BG_STYLE}
         border-b border-l border-r border-gray-300 dark:border-gray-600
         after:content-[''] after:absolute after:top-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-inherit`
      : "w-10 h-10 rounded-full mt-2 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
  );
</script>

<div class="flex flex-col w-full relative">
  <!-- Modal Content -->
  {#if $showAboutModal}
    <div
      class={cn(
        `absolute bottom-full w-full py-6 px-6
         rounded-t-lg border border-gray-300 dark:border-gray-600
         flex flex-col ${BG_STYLE}`,
      )}
      transition:fade={{ duration: 200 }}
    >
      <!-- Close button -->
      <button 
        on:click={closeModal}
        class="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <X class="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>

      <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        About Pipewriter
      </h2>
      
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        This app is designed to enhance your workflow. Explore, learn, and make the most of your experience with us.
      </p>

      <!-- Email Component -->
      <div class="mb-4">
        <EmailCapture />
      </div>

      <!-- Video Container -->
      <div class="w-full aspect-video mb-4">
        <iframe
          class="w-full h-full rounded-md"
          src="https://www.youtube.com/embed/gNY2bkmYpXY"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <a href="https://example.com/tutorials" class="text-primary hover:underline text-sm">
        More tutorials
      </a>
    </div>
  {/if}

  <!-- Help Button -->
  <div class="flex justify-end items-center">
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          class={buttonClass}
          on:click={toggleModal}
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