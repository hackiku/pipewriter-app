<!-- src/lib/(space)/components/proof/StackIcon.svelte -->
<script lang="ts">
  export let icon: string;
  export let name: string;
  export let url: string;
  export let description: string;
  export let fallback = '⚡';

  function handleError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.innerText = fallback;
  }
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="relative group"
>
  <!-- Icon Container -->
  <div class="w-16 h-16 rounded-full 
              bg-white/[0.02] backdrop-blur-sm
              border border-white/10 
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-110 group-hover:border-indigo-500/20
              group-hover:shadow-lg group-hover:shadow-indigo-500/10">
    <img
      src={icon}
      alt={name}
      class="w-8 h-8 object-contain"
      on:error={handleError}
    />
  </div>

  <!-- Tooltip -->
  <div class="absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2 
              pointer-events-none opacity-0 group-hover:opacity-100 
              transition-all duration-200 z-10
              w-32 p-2 rounded-md 
              bg-black/80 backdrop-blur-sm
              border border-white/10
              transform group-hover:-translate-y-1">
    <span class="text-xs text-white/90 block text-center font-medium">
      {description}
    </span>
    
    <!-- Tooltip arrow -->
    <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 
                w-2 h-2 rotate-45 
                bg-black/80 border-l border-t border-white/10" />
  </div>
</a>