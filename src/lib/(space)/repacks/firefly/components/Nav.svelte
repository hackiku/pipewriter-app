<!-- src/lib/(space)/repacks/firefly/components/Nav.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import PrimaryButton from './cta/PrimaryButton.svelte';
  import { bookModalStore } from '../stores/bookModalStore';
  import { Menu, X } from 'lucide-svelte';

  const links = [
    { href: '/firefly/about', label: 'ABOUT' },
    { href: '/firefly/launch', label: 'LAUNCH' },
    { href: '/firefly/lunar', label: 'LUNAR' }, 
    { href: '/firefly/missions', label: 'MISSIONS' },
    { href: '/firefly/careers', label: 'CAREERS' }
  ];

  let isMenuOpen = false;
  let isVisible = true;
  let lastScrollY = 0;

  $: isActive = (href: string) => $page.url.pathname.startsWith(href);
  
  function handleBookClick() {
    bookModalStore.open();
    if (isMenuOpen) isMenuOpen = false;
  }

  // Container-scoped scroll handling
  onMount(() => {
    const container = document.querySelector('.firefly-container');
    if (!container) return;

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const currentScrollY = target.scrollTop;
      const scrollDelta = currentScrollY - lastScrollY;

      if (Math.abs(scrollDelta) > 50) {
        isVisible = scrollDelta < 0 || currentScrollY < 100;
        lastScrollY = currentScrollY;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  });
</script>

<div class="relative w-full z-10">
  <header class="bg-black/80 backdrop-blur-md border-b border-[#F5FF00]/50">
    <nav class="flex items-center justify-between h-16 px-4">
      <!-- Logo -->
      <a href="/firefly" class="flex items-center gap-2">
        <img 
          src="/firefly/logo.svg" 
          alt="Firefly Aerospace"
          class="h-6 w-auto brightness-200"
        />
      </a>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-6">
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
          <X class="w-5 h-5" />
        {:else}
          <Menu class="w-5 h-5" />
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
        <nav class="py-4 px-4 space-y-4">
          <ul class="space-y-3">
            {#each links as { href, label }}
              <li>
                <a 
                  {href}
                  class="block text-base tracking-wider transition-colors hover:text-[#F5FF00]"
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