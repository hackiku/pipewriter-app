<!-- $lib/components/Nav.svelte -->
<script lang="ts">
	import { toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Sun, Moon } from "lucide-svelte";
	import EarlyButton from "./EarlyButton.svelte";
	import CartButton from "./cta/CartButton.svelte";
	import ContactModal from "./ContactModal.svelte";
	import { onMount } from 'svelte';

	let showContactModal = false;
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
			
			// Only trigger hide/show after 50px scroll and not at the very top
			if (Math.abs(scrollDelta) > 50) {
				isVisible = scrollDelta < 0 || currentScrollY < 100;
				lastScrollY = currentScrollY;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
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
        <a 
          href="/about"
          class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </a>
        <button 
          on:click={() => showContactModal = true}
          class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Contact
        </button>
        
        <Button on:click={toggleMode} variant="outline" size="icon" class="w-10">
          <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>

        <CartButton text="Buy" className="w-auto" />
        <!-- <EarlyButton className="w-auto" /> -->
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden flex items-center gap-2">
        <Button on:click={toggleMode} variant="outline" size="icon">
          <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>

        <button class="p-2" on:click={toggleMenu}>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div class="md:hidden px-4 py-2 border-t">
        <div class="space-y-2">
          <a 
            href="/about"
            class="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
          >
            About
          </a>
          <button 
            on:click={() => showContactModal = true}
            class="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
          >
            Contact
          </button>
          <div class="px-3">
            <EarlyButton className="w-full" />
          </div>
        </div>
      </div>
    {/if}
  </div>
</nav>

{#if showContactModal}
  <ContactModal on:close={() => showContactModal = false} />
{/if}
