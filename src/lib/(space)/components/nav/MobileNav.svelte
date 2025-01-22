<!-- src/lib/(space)/components/nav/MobileNav.svelte -->
<script lang="ts">
  import { slide } from 'svelte/transition';
  import { Menu, X } from "lucide-svelte";
  import { spaceStore } from '../../stores/spaceStore';
  import { spaceDrawerStore } from '$lib/stores/spaceDrawerStore';
  import ModeToggle from "./ModeToggle.svelte";
  import LanguageSelector from "./LanguageSelector.svelte";
  
  export let isMenuOpen: boolean;
  
  const links = [
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
  ];

  function toggleMenu() {
    spaceStore.toggleMenu();
  }
  
  function handleBookClick() {
    spaceDrawerStore.open('nav');
    spaceStore.toggleMenu();
  }
</script>

<!-- Toggle Button -->
<button 
  on:click={toggleMenu}
  class="relative w-10 h-10 rounded-full 
         hover:bg-muted/20 transition-colors duration-200
         flex items-center justify-center"
  aria-label="Toggle mobile menu"
>
  {#if isMenuOpen}
    <X class="w-5 h-5" />
  {:else}
    <Menu class="w-5 h-5" />
  {/if}
</button>

<!-- Mobile Menu Overlay -->
{#if isMenuOpen}
  <div 
    transition:slide={{ duration: 200 }}
    class="fixed inset-0 top-[72px] z-50 
           bg-background/80 backdrop-blur-md"
  >
    <div class="container px-4 py-6 space-y-8">
      <!-- Navigation Links -->
      <nav class="space-y-6">
        {#each links as { href, label }}
          <a 
            {href} 
            on:click={toggleMenu}
            class="block text-2xl font-light hover:text-primary
                   transition-colors duration-200"
          >
            {label}
          </a>
        {/each}
      </nav>

      <!-- Book Action -->
      <div class="pt-4 border-t border-border/10">
        <button
          on:click={handleBookClick}
          class="w-full py-4 px-6 rounded-lg
                 bg-gradient-to-r from-indigo-600 to-purple-600
                 text-white font-medium text-lg
                 hover:from-purple-600 hover:to-indigo-600
                 transition-all duration-300"
        >
          Book Repack
        </button>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between pt-4 border-t border-border/10">
        <LanguageSelector />
        <ModeToggle />
      </div>

      <!-- Space Stats -->
      <div class="pt-4 border-t border-border/10 space-y-2">
        <div class="flex items-center justify-between text-sm text-muted-foreground">
          <span>Projects Shipped</span>
          <span class="font-mono">42</span>
        </div>
        <div class="flex items-center justify-between text-sm text-muted-foreground">
          <span>Average Conversion Lift</span>
          <span class="font-mono">+147%</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Prevent body scroll when menu is open */
  :global(body.menu-open) {
    overflow: hidden;
  }
</style>