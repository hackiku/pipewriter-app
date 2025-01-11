<!-- src/lib/(space)/repacks/firefly/components/Nav.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import PrimaryButton from './cta/PrimaryButton.svelte';

  const links = [
    { href: '/about', label: 'ABOUT' },
    { href: '/launch', label: 'LAUNCH' },
    { href: '/lunar', label: 'LUNAR' }, 
    { href: '/missions', label: 'MISSIONS' },
    { href: '/careers', label: 'CAREERS' }
  ];

  $: isActive = (href: string) => $page.url.pathname.startsWith(href);
</script>

<header class="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md">
  <nav class="container flex items-center justify-between h-20 border-b border-[#F5FF00]/50">
    <!-- Logo -->
    <a href="/space/repacks/firefly" class="flex items-center gap-2">
      <img 
        src="/space/repacks/firefly/firefly-logo-small.svg" 
        alt="Firefly Aerospace"
        class="h-8 w-auto brightness-200"
      />
    </a>

    <!-- Main Nav -->
    <ul class="flex items-center gap-8">
      {#each links as { href, label }}
        <li>
          <a 
            {href}
            class="text-sm tracking-wider transition-colors hover:text-[#F5FF00]"
            class:text-[#F5FF00]={isActive(href)}
            class:text-zinc-400={!isActive(href)}
          >
            {label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- CTA -->
    <PrimaryButton href="/book" class="text-sm">
      BOOK A RIDE
    </PrimaryButton>
  </nav>
</header>

<!-- Spacer to prevent content from going under fixed nav -->
<div class="h-20" />