<!-- src/lib/components/nav/Nav.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from '$app/environment';
  import Logo from "./Logo.svelte";
  import MobileNav from "./MobileNav.svelte";
  import ModeToggle from "./ModeToggle.svelte";
  import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
  import { mainNavItems } from "$data/navigation";

  let isMenuOpen = false;
  let isVisible = true;
  let lastScrollY = 0;

  onMount(() => {
    if (!browser) return;

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

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300
         max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
  class:translate-y-4={isVisible}
  class:translate-y-[-100%]={!isVisible}
>
  <!-- Gradient glow container -->
  <div class="relative rounded-full">
    <!-- Subtle gradient glow -->
    <div
      class="absolute inset-0 rounded-full opacity-50 dark:opacity-30 blur-xl -z-10"
      style="
        background: radial-gradient(
          circle at 50% 50%,
          rgba(54, 68, 254, 0.08),
          rgba(179, 69, 237, 0.08),
          transparent 70%
        );
      "
    />

    <!-- Main nav content -->
    <div
      class="bg-background/70 backdrop-blur-md border border-border/5 
             shadow-sm rounded-full px-1 md:px-4"
    >
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <!-- Desktop Navigation -->
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
        <div class="hidden md:flex items-center gap-4">
          <ModeToggle />
          <BuyButton
            size="default"
            iconOnly={false}
            text="Early Access"
            source="nav"
          />
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden flex items-center gap-2">
          <ModeToggle />
          <MobileNav bind:isMenuOpen {mainNavItems} />
        </div>
      </div>
    </div>
  </div>
</nav>