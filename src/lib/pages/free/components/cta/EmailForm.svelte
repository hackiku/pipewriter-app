<!-- src/lib/pages/free/components/cta/EmailForm.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Check, Mail, X } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { contentStore } from '../../stores/contentStore';
  import { exportStore } from '../../stores/exportStore';

  export let buttonText = "Send My Template";
  export let size: "sm" | "default" = "default";
  export let wrap = false;

  // Fun writer email placeholders for animation
  const writerEmails = [
    "virginia@woolf.com",
    "franz@kafka.dev",
    "jorge@borges.ar",
    "ursula@leguin.net",
    "gabriel@marquez.co",
    "oscar@wilde.uk",
    "haruki@murakami.jp",
    "maya@angelou.us",
    "italo@calvino.it",
    "jorge@borges.ar"
  ];

  let email = '';
  let isSubmitting = false;
  let isSubmitted = false;
  let errorMessage = '';
  let placeholder = writerEmails[0];
  let currentIndex = 0;

  // Animate email placeholder
  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % writerEmails.length;
      placeholder = writerEmails[currentIndex];
    }, 1400);

    return () => clearInterval(interval);
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!email || isSubmitting) return;
    
    isSubmitting = true;
    errorMessage = '';

    try {
      const exportResponse = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          content: $contentStore.content,
          format: $exportStore.selectedFormat
        }),
      });

      const result = await exportResponse.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      isSubmitted = true;
      email = '';
      
    } catch (error) {
      console.error('Export error:', error);
      errorMessage = error instanceof Error ? error.message : 'Failed to send content';
    } finally {
      isSubmitting = false;
    }
  }

  function resetForm() {
    isSubmitted = false;
    email = '';
    errorMessage = '';
  }

  // Tailwind classes
  const formClass = `w-full flex 
    ${wrap ? "flex-col" : "flex-col sm:flex-row"} 
    gap-3 
    ${size === "default" ? "max-w-2xl" : "max-w-xl"}`;

  const inputClass = `w-full rounded-lg border border-gray-200 dark:border-gray-800 
    bg-white dark:bg-gray-950 
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
    transition-shadow 
    ${size === "default" ? "px-6 py-3 text-lg" : "px-4 py-2 text-base"}`;

  const buttonClass = `w-full rounded-lg text-white font-medium 
    bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
    relative group overflow-hidden 
    hover:shadow-md hover:shadow-primary/10 
    focus:outline-none focus:ring-2 focus:ring-primary 
    transition-all duration-300 
    disabled:opacity-50 disabled:cursor-not-allowed 
    ${size === "default" ? "px-6 py-3 text-lg" : "px-4 py-2 text-base"}`;
</script>

{#if !isSubmitted}
  <form on:submit={handleSubmit} class={formClass}>
    <div class="sm:flex-1 relative">
      <input
        type="email"
        placeholder={placeholder}
        bind:value={email}
        class={inputClass}
        required
      />
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Mail 
          class="text-gray-400/30 dark:text-gray-500/30" 
          size={size === "default" ? 24 : 20} 
        />
      </div>
    </div>

    <div class={wrap ? "w-full" : "w-full sm:w-auto"}>
      <button
        type="submit"
        class={buttonClass}
        disabled={!email.trim() || isSubmitting}
      >
        <span class="relative z-10">
          {isSubmitting ? 'Sending...' : buttonText}
        </span>
        <div 
          class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </button>
    </div>
  </form>

  {#if errorMessage}
    <p class="text-red-500 mt-2 text-sm" transition:fade>
      {errorMessage}
    </p>
  {/if}
{:else}
  <div 
    class="w-full p-6 rounded-lg bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
           text-white text-center relative 
           {size === 'default' ? 'max-w-2xl' : 'max-w-xl'}"
    transition:fade={{ duration: 300 }}
  >
    <button
      on:click={resetForm}
      class="absolute top-2 right-2 text-white/70 hover:text-white 
             focus:outline-none transition-colors"
      aria-label="Close"
    >
      <X size={20} />
    </button>

    <div class="flex items-center justify-center mb-3">
      <Check size={24} class="mr-2" />
      <h3 class={size === "default" ? "text-xl font-semibold" : "text-lg"}>
        Content sent!
      </h3>
    </div>
    
    <p class={size === "sm" ? "text-sm" : ""}>
      Check your inbox for your template!
    </p>
  </div>
{/if}