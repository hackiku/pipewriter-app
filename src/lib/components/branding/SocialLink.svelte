<!-- src/lib/components/branding/SocialLink.svelte -->
<script lang="ts">
  export let name: string;
  export let url: string;
  export let svg: string;
  export let ariaLabel: string;
</script>

<a
  href={url}
  class="p-2 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary
         transition-colors duration-200 group"
  aria-label={ariaLabel}
  target="_blank"
  rel="noopener noreferrer"
>
  <img 
    src={svg}
    alt={name}
    class="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
  />
</a>