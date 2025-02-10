<!-- src/lib/components/nav/MobileNav.svelte -->
<script lang="ts">
  import { slide } from 'svelte/transition';
  import { Menu, X } from "lucide-svelte";
  import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
  import ModeToggle from "./ModeToggle.svelte";
  
  export let isMenuOpen: boolean;
  export let mainNavItems: Array<{
    href: string;
    label: string;
    onClick?: () => void;
  }>;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<!-- Toggle Button -->
<button 
  on:click={toggleMenu}
  class="relative p-2 hover:text-[#3644FE] dark:hover:text-[#B345ED]
         transition-colors duration-200"
  aria-label="Toggle mobile menu"
>
  {#if isMenuOpen}
    <X class="w-6 h-6" />
  {:else}
    <Menu class="w-6 h-6" />
  {/if}
</button>

<!-- Mobile Menu -->
{#if isMenuOpen}
  <div 
    transition:slide={{ duration: 200 }}
    class="md:hidden absolute top-full right-0 w-2/3 mt-2 bg-background/95 
           backdrop-blur-sm border shadow-lg"
  >
    <nav class="flex flex-col py-2">
      {#each mainNavItems as item}
        <a
          href={item.href}
          class="px-4 py-2 text-sm font-medium text-foreground 
                 hover:bg-accent transition-colors duration-200"
          on:click={(e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
            toggleMenu();
          }}
        >
          {item.label}
        </a>
      {/each}

      <div class="px-4 pt-2">
        <BuyButton 
          size="default"  
          fullWidth={true}
          iconOnly={false}
          text="Get Started"
          source="nav-mobile"
        />
      </div>
    </nav>
  </div>
{/if}

<style>
  /* Prevent body scroll when menu is open */
  :global(body) {
    overflow-y: auto;
  }
  :global(body.menu-open) {
    overflow-y: hidden;
  }
</style>