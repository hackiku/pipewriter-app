<!-- lib/components/cta/email/WriterPlaceholder.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let duration = 2800;  // Doubled from your 1400 for smoother feel
  
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

  let currentIndex = 0;
  let placeholder = writerEmails[0];

  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % writerEmails.length;
      placeholder = writerEmails[currentIndex];
    }, duration);

    return () => clearInterval(interval);
  });
</script>

<span 
  class="text-gray-400/50 dark:text-gray-500/50 transition-opacity duration-1000"
  in:fade={{ duration: 1000 }}
  out:fade={{ duration: 1000 }}
>
  {placeholder}
</span>
