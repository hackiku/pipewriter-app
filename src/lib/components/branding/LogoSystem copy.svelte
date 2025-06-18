<!-- src/lib/components/branding/LogoSystem.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { mode } from 'mode-watcher';
  
  // Props for customization
  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  export let variant: 'auto' | 'square' | 'full' = 'auto';
  export let href: string | null = '/';
  export let className = '';
  
  // Responsive breakpoint detection
  let isMobile = false;
  let mounted = false;
  
  const sizes = {
    xs: 'h-6',
    sm: 'h-7', 
    md: 'h-8',
    lg: 'h-10'
  };
  
  // Determine which logo to show
  $: logoVariant = variant === 'auto' 
    ? (isMobile ? 'square' : 'full')
    : variant;
  
  // Logo paths with proper dark/light mode support
  $: logoSrc = (() => {
    if (logoVariant === 'square') {
      return '/logos/pipewriter/pipewriter-square-logo.svg';
    }
    
    // For full logos, choose based on theme
    if ($mode === 'dark') {
      return '/logos/pipewriter/pipewriter-dark-logo-white-text.svg';
    } else {
      return '/logos/pipewriter/pipewriter-light-logo-full.svg';
    }
  })();
  
  onMount(() => {
    mounted = true;
    
    const checkMobile = () => {
      isMobile = window.innerWidth < 768; // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  });
</script>

{#if mounted}
  {#if href}
    <a 
      {href}
      class="inline-block hover:opacity-80 transition-opacity duration-200 {className}"
      aria-label="Pipewriter - Home"
    >
      <img
        src={logoSrc}
        alt="Pipewriter"
        class="object-contain {sizes[size]}"
        loading="eager"
      />
    </a>
  {:else}
    <div class="inline-block {className}">
      <img
        src={logoSrc}
        alt="Pipewriter"
        class="object-contain {sizes[size]}"
        loading="eager"
      />
    </div>
  {/if}
{:else}
  <!-- Loading placeholder to prevent layout shift -->
  <div class="inline-block {sizes[size]} aspect-[4/1] bg-transparent {className}">
  </div>
{/if}