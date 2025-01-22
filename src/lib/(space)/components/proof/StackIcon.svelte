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
  class="flex flex-col items-center gap-3 group"
>
  <div class="w-16 h-16 rounded-xl bg-card border p-3
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-110 group-hover:rotate-3
              group-hover:shadow-lg group-hover:border-primary/20">
    <img
      src={icon}
      alt={name}
      class="w-full h-full object-contain"
      on:error={handleError}
    />
  </div>
  <span class="text-sm font-medium">{name}</span>
  <span class="text-xs text-muted-foreground opacity-0
               group-hover:opacity-100 transition-opacity">
    {description}
  </span>
</a>