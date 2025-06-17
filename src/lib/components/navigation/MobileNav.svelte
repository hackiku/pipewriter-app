<!-- src/lib/components/navigation/MobileNav.svelte -->
<script lang="ts">
  import { slide } from 'svelte/transition';
  import { Menu, X } from "lucide-svelte";
  import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
  import ModeToggle from "./ModeToggle.svelte";
  import LogoSystem from "../branding/LogoSystem.svelte";
  
  export let isMenuOpen: boolean;
  export let mainNavItems: Array<{
    href: string;
    label: string;
    onClick?: () => void;
  }>;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  // Close menu when clicking outside or on nav items
  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<!-- Toggle Button -->
<button 
  on:click={toggleMenu}
  class="relative p-2 hover:text-[#3644FE] dark:hover:text-[#B345ED]
         transition-colors duration-200 rounded-lg hover:bg-foreground/5"
  aria-label="Toggle mobile menu"
  aria-expanded={isMenuOpen}
>
  {#if isMenuOpen}
    <X class="w-6 h-6" />
  {:else}
    <Menu class="w-6 h-6" />
  {/if}
</button>

<!-- Mobile Menu -->
{#if isMenuOpen}
  <!-- Backdrop -->
  <div 
    class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
    on:click={closeMenu}
    transition:slide={{ duration: 200 }}
  />
  
  <!-- Menu Panel -->
  <div 
    transition:slide={{ duration: 200 }}
    class="md:hidden absolute top-full right-0 left-0 mt-2 mx-4 
           bg-background/95 backdrop-blur-sm border border-border 
           shadow-xl rounded-2xl overflow-hidden z-50"
  >
    <!-- Header with logo -->
    <div class="flex items-center justify-between p-6 border-b border-border/50">
      <LogoSystem size="sm" variant="square" />
      <button 
        on:click={closeMenu}
        class="p-2 hover:bg-muted rounded-lg transition-colors"
        aria-label="Close menu"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation items -->
    <nav class="p-2">
      {#each mainNavItems as item}
        <a
          href={item.href}
          class="flex items-center px-4 py-3 text-lg font-medium text-foreground 
                 hover:bg-muted rounded-xl transition-colors duration-200"
          on:click={(e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
            closeMenu();
          }}
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <!-- CTA Section -->
    <div class="p-4 border-t border-border/50 bg-muted/20">
      <BuyButton 
        size="default"  
        fullWidth={true}
        iconOnly={false}
        text="Get Started"
        source="nav-mobile"
        className="w-full"
      />
    </div>
  </div>
{/if}