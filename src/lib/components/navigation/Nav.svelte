<!-- src/lib/components/navigation/Nav.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import { Menu, X } from "lucide-svelte";
  import LogoSystem from "../branding/LogoSystem.svelte";
  import ModeToggle from "./ModeToggle.svelte";
  import { GetStartedButton } from "$lib/components/cta/signin";
  import { mainNavItems } from "$data/navigation";

  export let showMarketplaceButton = false;

  let isMenuOpen = false;
  let isVisible = true;
  let lastScrollY = 0;
  let isMobile = false;

  // Check if current page matches nav item - using $page directly for better reactivity
  function isActivePage(href: string, currentPath: string): boolean {
    // Handle root path exactly
    if (href === '/') {
      return currentPath === '/';
    }
    
    // For other paths, check exact match or sub-path match
    if (currentPath === href) {
      return true;
    }
    
    // Check if current path starts with href followed by '/' to avoid partial matches
    // e.g., /about matches /about/team but not /about-us
    return currentPath.startsWith(href + '/');
  }

  onMount(() => {
    if (!browser) return;

    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (Math.abs(scrollDelta) > 50) {
        isVisible = scrollDelta < 0 || currentScrollY < 100;
        lastScrollY = currentScrollY;
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<nav
  class="fixed -top-2 left-0 right-0 z-50 transition-all duration-300
         max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
  class:translate-y-4={isVisible}
  class:translate-y-[-100%]={!isVisible}
>
  <!-- Main nav container -->
  <div
    class="bg-white dark:bg-neutral-950 border-[1.5px] border-border rounded-3xl sm:rounded-full transition-all duration-300 pl-1 md:pl-4"
  >
    <!-- Top bar (always visible) -->
    <div class="flex items-center justify-between py-3 px-4">
      <!-- Logo - smaller on mobile -->
      <LogoSystem 
        size={isMobile ? 'sm' : 'md'} 
        variant="full"
        className="flex-shrink-0" 
      />

      <!-- Desktop Navigation - centered to screen -->
      <div class="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {#each mainNavItems as item}
          {@const isActive = isActivePage(item.href, $page.url.pathname)}
          <a
            href={item.href}
            class="relative font-medium transition-colors duration-200 py-2
                   {isActive 
                     ? 'text-foreground' 
                     : 'text-muted-foreground hover:text-foreground'}"
            on:click={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
          >
            {item.label}
            
            <!-- Active indicator line -->
            {#if isActive}
              <div class="absolute bottom-0.5 left-0 right-0 h-0.5 
                          bg-foreground rounded-full transition-all duration-300"></div>
              <!-- <div class="absolute bottom-1 left-0 right-0 h-0.5 
                          bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                          rounded-full transition-all duration-300"></div> -->
            {/if}
          </a>
        {/each}
      </div>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-3">
        <ModeToggle />
        <GetStartedButton
          size="default"
          text="Get Started"
          source="nav"
        />
      </div>

      <!-- Mobile Actions -->
      <div class="md:hidden flex items-center gap-2">
        <ModeToggle />
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
      </div>
    </div>
    
    <!-- Mobile Menu (expanded within the same container) -->
    {#if isMenuOpen && isMobile}
      <div 
        transition:slide={{ duration: 250 }}
        class="border-t border-border/20 pt-4 px-4 pb-4"
      >
        <!-- Navigation items -->
        <nav class="space-y-2 mb-6">
          {#each mainNavItems as item}
            {@const isActive = isActivePage(item.href, $page.url.pathname)}
            <a
              href={item.href}
              class="block px-4 py-3 text-lg font-medium rounded-xl transition-colors duration-200
                     {isActive 
                       ? 'text-foreground bg-primary/10 border border-primary/20' 
                       : 'text-foreground hover:bg-muted'}"
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
        <div class="pt-4 border-t border-border/20">
          <GetStartedButton 
            size="default"  
            fullWidth={true}
            text="Get Started"
            source="nav-mobile"
            className="w-full"
          />
        </div>
      </div>
    {/if}
  </div>
</nav>