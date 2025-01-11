<!-- src/lib/(space)/repacks/firefly/components/Nav.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import PrimaryButton from './cta/PrimaryButton.svelte';
  import { bookModalStore } from '../stores/bookModalStore';
  import { Menu, X } from 'lucide-svelte';

  const links = [
    { href: '/about', label: 'ABOUT' },
    { href: '/launch', label: 'LAUNCH' },
    { href: '/lunar', label: 'LUNAR' }, 
    { href: '/missions', label: 'MISSIONS' },
    { href: '/careers', label: 'CAREERS' }
  ];

  let isMenuOpen = false;
  let isVisible = true;
  let lastScrollY = 0;

  $: isActive = (href: string) => $page.url.pathname.startsWith(href);
  
  function handleBookClick() {
    bookModalStore.open();
    if (isMenuOpen) isMenuOpen = false;
  }

  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (Math.abs(scrollDelta) > 50) {
        isVisible = scrollDelta < 0 || currentScrollY < 100;
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div 
  class="fixed top-0 inset-x-0 z-50 transition-transform duration-300"
  class:translate-y-0={isVisible}
  class:translate-y-[-100%]={!isVisible}
>
  <header class="bg-black/80 backdrop-blur-md border-b border-[#F5FF00]/50">
    <nav class="container flex items-center justify-between h-20">
      <!-- Logo -->
      <a href="/space/repacks/firefly" class="flex items-center gap-2">
        <img 
          src="/space/repacks/firefly/firefly-logo-small.svg" 
          alt="Firefly Aerospace"
          class="h-8 w-auto brightness-200"
        />
      </a>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-8">
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

      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden p-2 text-zinc-400 hover:text-[#F5FF00] transition-colors"
        on:click={() => isMenuOpen = !isMenuOpen}
      >
        {#if isMenuOpen}
          <X class="w-6 h-6" />
        {:else}
          <Menu class="w-6 h-6" />
        {/if}
      </button>

      <!-- CTA -->
      <div class="hidden md:block">
        <PrimaryButton on:click={handleBookClick} class="text-sm">
          BOOK A RIDE
        </PrimaryButton>
      </div>
    </nav>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div 
        class="md:hidden border-t border-[#F5FF00]/20 bg-black/95"
        transition:slide={{ duration: 200 }}
      >
        <nav class="container py-6 space-y-6">
          <ul class="space-y-4">
            {#each links as { href, label }}
              <li>
                <a 
                  {href}
                  class="block text-lg tracking-wider transition-colors hover:text-[#F5FF00]"
                  class:text-[#F5FF00]={isActive(href)}
                  class:text-zinc-400={!isActive(href)}
                  on:click={() => isMenuOpen = false}
                >
                  {label}
                </a>
              </li>
            {/each}
          </ul>

          <!-- Mobile CTA -->
          <PrimaryButton 
            on:click={handleBookClick}
            class="w-full justify-center"
          >
            BOOK A RIDE
          </PrimaryButton>
        </nav>
      </div>
    {/if}
  </header>
</div>

<!-- Spacer to prevent content from going under fixed nav -->
<div class="h-20" />