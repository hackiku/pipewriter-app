<!-- $lib/components/EmailForm.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Check, X } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import type { SubscribeResponse } from '$lib/server/subscribe';

  const writerEmails = [
    "ernie@hemingway.gg",
    "franz@kafka.dev",
    "fyodor@dostoevsky.ru",
    "margaret@atwood.ca",
    "jane@austen.io",
    "james@joyce.ie",
    "italo@calvino.it",
    "albert@camus.dz",
    "hank@moody.ny",
    "isabel@allende.cl",
    "edgar@poe.xyz",
  ];

  let email = '';
  let isSubmitting = false;
  let isSubmitted = false;
  let errorMessage = '';
  let placeholder = writerEmails[0];
  let currentIndex = 0;

  onMount(() => {
    // Rotate placeholder every 700ms
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % writerEmails.length;
      placeholder = writerEmails[currentIndex];
    }, 700);

    return () => clearInterval(interval);
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!email || isSubmitting) return;
    
    isSubmitting = true;
    errorMessage = '';

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'Website'
        }),
      });

      const result: SubscribeResponse = await response.json();
      
      if (result.success) {
        isSubmitted = true;
        email = '';
      } else {
        errorMessage = result.message;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      errorMessage = 'An error occurred. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }

  function resetForm() {
    isSubmitted = false;
    email = '';
    errorMessage = '';
  }
</script>

{#if !isSubmitted}
  <form on:submit={handleSubmit} class="w-full max-w-2xl flex flex-col sm:flex-row gap-3">
    <div class="sm:w-2/3">
      <input
        type="email"
        placeholder={placeholder}
        bind:value={email}
        class="w-full px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800
               bg-white dark:bg-gray-950
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
               text-lg transition-shadow"
        required
      />
    </div>
    <div class="sm:w-1/3">
      <button
        type="submit"
        class="w-full px-6 py-3 rounded-lg text-white font-medium text-lg
               bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
               relative group overflow-hidden
               hover:shadow-md hover:shadow-primary/10 
               focus:outline-none focus:ring-2 focus:ring-primary 
               transition-all duration-300
               disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!email.trim() || isSubmitting}
      >
        <span class="relative z-10">
          {isSubmitting ? 'Subscribing...' : 'Loop me in'}
        </span>
        <div class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        />
      </button>
    </div>
  </form>
  {#if errorMessage}
    <p class="text-red-500 mt-2 text-sm">{errorMessage}</p>
  {/if}
{:else}
  <div 
    class="w-full max-w-2xl p-6 rounded-lg bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
           text-white text-center relative"
    transition:fade={{ duration: 300 }}
  >
    <button
      on:click={resetForm}
      class="absolute top-2 right-2 text-white/70 hover:text-white focus:outline-none
             transition-colors"
      aria-label="Close"
    >
      <X size={20} />
    </button>
    <div class="flex items-center justify-center mb-3">
      <Check size={24} class="mr-2" />
      <h3 class="text-xl font-semibold">You're in!</h3>
    </div>
    <p>Check your inbox for a welcome message and exciting updates.</p>
  </div>
{/if}