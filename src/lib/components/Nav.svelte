<!-- $lib/components/Nav.svelte -->
<script lang="ts">
	import { toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Sun, Moon } from "lucide-svelte";
	import EarlyButton from "./EarlyButton.svelte";
	import ContactModal from "./ContactModal.svelte";

	let showContactModal = false;
	let isMenuOpen = false;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};
</script>

<nav class="fixed top-4 left-0 right-0 z-50 bg-background shadow-sm rounded-full 
            px-1 md:px-4 mx-4 sm:mx-6 md:mx-16 lg:mx-24 xl:mx-44">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-1">
      <div>✍️</div>
      <h1 class="text-lg font-semibold">Pipewriter</h1>
      <Badge variant="outline" class="font-normal">beta</Badge>
    </a>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-4">
      <button 
        on:click={() => showContactModal = true}
        class="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Contact
      </button>
      
      <Button on:click={toggleMode} variant="outline" size="icon" class="w-10">
        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>

      <EarlyButton className="w-auto" />
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
</nav>

{#if showContactModal}
  <ContactModal on:close={() => showContactModal = false} />
{/if}