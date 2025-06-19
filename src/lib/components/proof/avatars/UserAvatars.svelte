<!-- src/lib/components/proof/avatars/UserAvatars.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Mail } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  const GROUPS = {
    reading: {
      count: '190+',
      label: 'reading',
      images: [
        '/people/writers/steena-marie-pierce.jpeg',
        '/people/writers/beatrice-bianchi.jpeg',
        '/people/writers/zaine-morgan.jpg',
        '/people/writers/esma-akalin.jpeg',
      ]
    },
    writing: {
      count: '20-ish',
      label: 'writing',
      images: [
        '/people/team/ivan-karaman.png',
        '/people/writers/eoin-cronolly.jpeg',
        '/people/writers/matthew-szymanski.png',
        '/people/writers/giorgi-chkoidze.jpeg',
      ]
    }
  } as const;

  export let initialMode: keyof typeof GROUPS = 'reading';
  export let switchInterval = 3000;
  export let className = '';

  let currentMode = initialMode;
  let mounted = false;

  onMount(() => {
    mounted = true;
    const interval = setInterval(() => {
      if (mounted) {
        currentMode = currentMode === 'reading' ? 'writing' : 'reading';
      }
    }, switchInterval);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  });
</script>

<div class="flex flex-col items-center gap-2 {className}"> 
  <div class="flex -space-x-2">
    {#each [0,1,2,3] as i}
      <div class="w-6 h-6 rounded-full ring-2 ring-background overflow-hidden">
        {#key currentMode}
          <img
            src={GROUPS[currentMode].images[i]}
            alt="Community member"
            class="w-full h-full object-cover"
            in:fade={{ duration: 300 }}
          />
        {/key}
      </div>
    {/each}
    
    <!-- <div class="flex items-center ml-2">
      <Mail class="w-3.5 h-3.5 text-muted-foreground" />
    </div> -->
  </div>

  <div class="text-center">
    {#key currentMode}
      <p class="text-sm text-muted-foreground whitespace-nowrap"
         in:fade={{ duration: 300 }}>
        <span class="font-medium text-foreground">{GROUPS[currentMode].count}</span> 
        {GROUPS[currentMode].label}
      </p>
    {/key}
  </div>
</div>