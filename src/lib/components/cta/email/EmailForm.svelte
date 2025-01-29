<!-- $lib/components/cta/email/EmailForm.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import * as Icon from 'lucide-svelte';
  import type { SubscribeResponse } from '$lib/server/subscribe';
  import WriterPlaceholder from './WriterPlaceholder.svelte';
  import { styles, defaultProps, type Size } from './styles';

  export let buttonText = defaultProps.buttonText;
  export let size: Size = defaultProps.size;
  export let wrap = defaultProps.wrap;
  export let source = defaultProps.source;
  export let className = defaultProps.className;

  let email = '';
  let isSubmitting = false;
  let isSubmitted = false;
  let errorMessage = '';
  let isButtonHovered = false;

  $: isButtonActive = email.trim().length > 0 || isButtonHovered;


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
        body: JSON.stringify({ email, source }),
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
  <form 
    on:submit={handleSubmit} 
    class={styles.form({ wrap, size, className })}
  >
    <div class="sm:flex-1 items-center relative">
      <input
        type="email"
        bind:value={email}
        class={styles.input(size)}
        required
      />
      <div class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon.Mail 
          class="text-gray-300 dark:text-gray-700" 
          size={size === "default" ? 20 : 18}
        />
      </div>
      {#if !email}
        <div class="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden">
          <WriterPlaceholder />
        </div>
      {/if}
    </div>

    <div class={wrap ? "w-full" : "w-full sm:w-auto"}>
      <button
        type="submit"
        class={styles.button(size, wrap)}
        disabled={!email.trim() || isSubmitting}
        on:mouseenter={() => isButtonHovered = true}
        on:mouseleave={() => isButtonHovered = false}
      >
        <div class="flex items-center justify-center gap-2 transition-all duration-200"
             class:translate-x-[-8px]={isButtonActive}>
          <span class="relative">{isSubmitting ? 'Subscribing...' : buttonText}</span>
          <div 
            class="transform transition-all duration-200 opacity-0 absolute"
            style="right: -1em"
            class:opacity-100={isButtonActive}
          >
            <Icon.ArrowRight size={20} />
          </div>
        </div>
      </button>
    </div>
  </form>

  {#if errorMessage}
    <p class="text-red-500 mt-2 text-sm">{errorMessage}</p>
  {/if}

{:else}
  <div 
    class={styles.success(size)}
    transition:fade={{ duration: 300 }}
  >
    <button
      on:click={resetForm}
      class="absolute top-2 right-2 text-white/70 hover:text-white 
             focus:outline-none transition-colors"
      aria-label="Close"
    >
      <Icon.X size={20} />
    </button>
    <div class="flex items-center justify-center mb-3">
      <Icon.Check size={24} class="mr-2" />
      <h3 class={size === "default" ? "text-xl font-semibold" : "text-lg"}>
        You're in!
      </h3>
    </div>
    <p class={size === "default" ? "" : "text-sm"}>
      Check your inbox for a welcome message and exciting updates.
    </p>
  </div>
{/if}