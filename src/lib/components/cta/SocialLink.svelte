<!-- src/lib/components/cta/SocialLink.svelte -->
<script lang="ts">
  import { type LucideIcon } from 'lucide-svelte';

  export let href: string;
  export let icon: LucideIcon;
  export let label: string;
  export let size: number = 20;
</script>

<a
  {href}
  class="text-muted-foreground hover:text-foreground transition-colors"
  aria-label={label}
  target="_blank"
  rel="noopener noreferrer"
>
  <svelte:component
    this={icon}
    size={size}
    class="hover:scale-110 transition-transform duration-200"
  />
</a>