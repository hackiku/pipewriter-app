<!-- $lib/components/Nav.svelte -->
<script lang="ts">
	import { toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Sun, Moon, Menu, X } from "lucide-svelte";
	import EarlyAccessButton from "./cta/EarlyAccessButton.svelte";
	import { onMount } from 'svelte';

	let isMenuOpen = false;
	let isVisible = true;
	let lastScrollY = 0;

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

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const navItems = [
		{ href: "/product", label: "Product" },
		{ href: "/about", label: "About" },
		{ href: "/ai", label: "AI" },
		{ href: "/blog", label: "Blog" },
	];
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
     class:translate-y-4={isVisible}
     class:translate-y-[-100%]={!isVisible}>
  <div class="bg-background shadow-sm rounded-full px-1 md:px-4 mx-4 sm:mx-6 md:mx-16 lg:mx-24 xl:mx-44">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-1">
        <div>✍️</div>
        <h1 class="text-lg font-semibold">Pipewriter</h1>
        <Badge variant="outline" class="font-normal">beta</Badge>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6">
        {#each navItems as item}
          <a 
            href={item.href}
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.label}
          </a>
        {/each}
        
        <EarlyAccessButton 
					size="sm" 
					source="nav"
					className="font-bold bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white" 
				/>

        <Button on:click={toggleMode} variant="outline" size="icon" class="w-10">
          <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden flex items-center gap-2">
        <Button on:click={toggleMode} variant="outline" size="icon">
          <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
          {#each navItems as item}
            <a 
              href={item.href}
              class="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
            >
              {item.label}
            </a>
          {/each}
          <div class="px-3">
            <EarlyAccessButton size="sm" className="w-full font-bold bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white" />
          </div>
        </div>
      </div>
    {/if}
  </div>
</nav>