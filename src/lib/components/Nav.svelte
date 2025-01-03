<!-- $lib/components/Nav.svelte -->
<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Sun, Moon, Menu, X } from "lucide-svelte";
  import EarlyAccessButton from "./cta/EarlyAccessButton.svelte";
  import BackgroundButton from "./BackgroundButton.svelte";
  import ExportButton from "$lib/pages/free/components/cta/ExportButton.svelte";
  // import BackgroundPattern from "./BackgroundPattern.svelte";
  import { contactModalStore } from "$lib/stores/contactModalStore";
  import { onMount } from "svelte";
  import { mainNavItems } from '$lib/data/navigation';

  let isMenuOpen = false;
  let isVisible = true;
  let lastScrollY = 0;
  let showContactModal = false;


  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };


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

<!-- Background Pattern -->
	<!-- <div class="fixed inset-0 pointer-events-none">
		<BackgroundPattern size="lg" opacity="high" gradient={true} />
	</div> -->

<!-- <BackgroundPattern 
  size={patternSize}
  opacity={patternOpacity}
  gradient={patternGradient}
/> -->

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  class:translate-y-4={isVisible}
  class:translate-y-[-100%]={!isVisible}
>
  <div
    class="bg-background/80 backdrop-blur-sm shadow-sm rounded-full px-1 md:px-4 mx-4 sm:mx-6 md:mx-16 lg:mx-24 xl:mx-44"
  >
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-1">
        <div>✍️</div>
        <h1 class="text-lg font-semibold">Pipewriter</h1>
        <Badge variant="outline" class="font-normal">beta</Badge>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-3.5">
        {#each mainNavItems as item}
          <a
            href={item.href}
            class="text-muted-foreground hover:text-foreground transition-colors w-fit"
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

        <BackgroundButton iconOnly={true} />
        <EarlyAccessButton size="sm" source="nav" className="font-normal" iconOnly={true} />
        <ExportButton iconOnly={true} />

        <Button
          on:click={toggleMode}
          variant="outline"
          size="icon"
          class="w-10"
        >
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden flex items-center gap-2">
        <Button on:click={toggleMode} variant="outline" size="icon">
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>

        <button class="p-2" on:click={toggleMenu}>
          {#if isMenuOpen}
            <X class="w-6 h-6" />
          {:else}
            <Menu class="w-6 h-6" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div class="md:hidden px-4 py-2 border-t">
        <div class="space-y-2">
          {#each mainNavItems as item}
            <a
              href={item.href}
              class="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
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
          
          <div class="px-3 space-y-2">
            <ExportButton iconOnly={false} />
            <BackgroundButton iconOnly={false} />
            <EarlyAccessButton
              size="md"
              source="nav-mobile"
              className="w-full font-normal"
            />
          </div>
        </div>
      </div>
    {/if}
  </div>
</nav>