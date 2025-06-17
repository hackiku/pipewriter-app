<!-- src/lib/components/navigation/Nav.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from '$app/environment';
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
  <!-- Gradient glow container -->
  <div class="relative rounded-full">
    <!-- Subtle gradient glow -->
    <div
      class="absolute inset-0 rounded-full opacity-30 dark:opacity-30 blur-xl -z-10"
      style="
        background: radial-gradient(
          circle at 50% 50%,
          rgba(54, 68, 254, 0.08),
          rgba(179, 69, 237, 0.08),
          transparent 70%
        );
      "
    />

    <!-- Main nav container -->
    <div
      class="bg-white/40 dark:bg-black/40 backdrop-blur-[6px] border border-border/5 
             shadow-sm rounded-full transition-all duration-300"
      class:rounded-2xl={isMenuOpen && isMobile}
      class:px-1={!isMenuOpen}
      class:md:px-4={!isMenuOpen}
      class:p-4={isMenuOpen && isMobile}
    >
      <!-- Top bar (always visible) -->
      <div class="flex items-center justify-between py-3 px-4">
        <!-- Logo - use square when mobile menu is open, otherwise auto -->
        <LogoSystem 
          size="md" 
          variant={isMenuOpen && isMobile ? 'square' : 'auto'}
          className="flex-shrink-0" 
        />

        <!-- Desktop Navigation (hidden on mobile) -->
        <div class="hidden md:flex items-center gap-6">
          {#each mainNavItems as item}
            <a
              href={item.href}
              class="text-muted-foreground hover:text-foreground font-medium 
                     transition-colors duration-200"
              on:click={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
            >
              {item.label}
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

      <!-- Mobile Menu (expandable content) -->
      {#if isMenuOpen && isMobile}
        <div 
          transition:slide={{ duration: 200 }}
          class="border-t border-border/20 pt-4"
        >
          <!-- Navigation items -->
          <nav class="space-y-2 mb-6">
            {#each mainNavItems as item}
              <a
                href={item.href}
                class="block px-4 py-3 text-lg font-medium text-foreground 
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
  </div>
</nav>