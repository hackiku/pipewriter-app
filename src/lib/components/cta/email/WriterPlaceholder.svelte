<!-- lib/components/cta/email/WriterPlaceholder.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let typingSpeed = 100;  // ms per character
  export let deleteSpeed = 50;   // ms per character when deleting
  export let pauseDuration = 1500; // pause at end before deleting
  
  const writerEmails = [
    "hank@moody.ny",
		"jk@rollin.co.uk",
    "ernie@hemingway.gg",
		"david@ogilvy.piano",
		"greta@gerwig.bb",
    "grrm@martin.blog",
		"dan@harmon.pickle",
		"chiara@ferrænti.it",
		"dino@campana.it",
		// "quentin@tarantino.ft",
  ];

  let currentEmailIndex = 0;
  let displayText = '';
  let isTyping = true;
  let showCursor = true;

  onMount(() => {
    let timeoutId: number;
    
    async function typeEmail() {
      const targetEmail = writerEmails[currentEmailIndex];
      
      // Typing phase
      for (let i = 0; i <= targetEmail.length; i++) {
        displayText = targetEmail.slice(0, i);
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, typingSpeed);
        });
      }
      
      // Pause at end
      await new Promise(resolve => {
        timeoutId = setTimeout(resolve, pauseDuration);
      });
      
      // Deleting phase
      for (let i = targetEmail.length; i >= 0; i--) {
        displayText = targetEmail.slice(0, i);
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, deleteSpeed);
        });
      }
      
      // Move to next email
      currentEmailIndex = (currentEmailIndex + 1) % writerEmails.length;
      
      // Small pause before typing next
      await new Promise(resolve => {
        timeoutId = setTimeout(resolve, 200);
      });
      
      // Continue the cycle
      typeEmail();
    }
    
    // Cursor blink animation
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 530);
    
    // Start typing
    typeEmail();
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(cursorInterval);
    };
  });
</script>

<span class="text-gray-400/50 dark:text-gray-500/50 font-mono">
  {displayText}<span class="animate-pulse" class:opacity-100={showCursor} class:opacity-0={!showCursor}>|</span>
</span>

<style>
  /* Smooth cursor blink */
  .animate-pulse {
    transition: opacity 0.1s ease-in-out;
  }
</style>