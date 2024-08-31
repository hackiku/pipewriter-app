<!-- $lib/components/EmailForm.svelte -->

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Check } from 'lucide-svelte';

  let email = '';
  let isSubmitting = false;
  let isSubmitted = false;
  let errorMessage = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    errorMessage = '';

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        isSubmitted = true;
      } else {
        const data = await response.json();
        errorMessage = data.error || 'An error occurred. Please try again.';
      }
    } catch (error) {
      console.error('Subscription error:', error);
      errorMessage = 'An error occurred. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

{#if !isSubmitted}
  <form on:submit={handleSubmit} class="w-full max-w-2xl flex flex-col sm:flex-row gap-4">
    <div class="sm:w-2/3">
      <input
        type="email"
        placeholder="ernie@hemingway.me"
        bind:value={email}
        class="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
        required
      />
    </div>
    <div class="sm:w-1/3">
      <button
        type="submit"
        class="w-full px-8 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-xl whitespace-nowrap"
        disabled={!email.trim() || isSubmitting}
      >
        {isSubmitting ? 'Subscribing...' : 'Loop me in'}
      </button>
    </div>
  </form>
  {#if errorMessage}
    <p class="text-red-500 mt-2">{errorMessage}</p>
  {/if}
{:else}
  <div 
    class="w-full max-w-2xl p-6 rounded-lg bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white text-center"
    transition:fade={{ duration: 300 }}
  >
    <div class="flex items-center justify-center mb-4">
      <Check size={32} class="mr-2" />
      <h3 class="text-2xl font-bold">You're in the loop!</h3>
    </div>
    <p class="text-lg">Check your inbox for a welcome message and exciting updates.</p>
  </div>
{/if}