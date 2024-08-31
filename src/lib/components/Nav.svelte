<!-- $lib/components/Nav.svelte -->
<script lang="ts">
import { toggleMode } from "mode-watcher";
import { Button } from "$lib/components/ui/button";
import { Badge } from "$lib/components/ui/badge";
import { Sun, Moon } from "lucide-svelte";
import ContactModal from "./ContactModal.svelte";

let isOpen = false;
let showContactModal = false;

const toggleMenu = () => {
  isOpen = !isOpen;
};

const navItems = [
  // { href: '/app', label: 'App' },
  // { href: '/contact', label: 'Contact' },
];
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm
	mx-4 sm:mx-6 md:mx-16 lg:mx-24 xl:mx-44">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    
		<a href="/">
			<div class="flex items-center gap-1">
				<div>✍️</div>
				<h1 class="text-lg font-semibold">Pipewriter</h1>
				<Badge variant="outline">beta</Badge>
			</div>
		</a>

    <div class="hidden md:flex items-center space-x-4">
      {#each navItems as { href, label }}
        <a {href} class="text-sm font-medium text-muted-foreground hover:text-foreground">{label}</a>
      {/each}
      <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <Button 
        on:click={() => showContactModal = true} 
        variant="outline" 
        class="border-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED] border-[#3644FE] hover:text-white hover:bg-gradient-to-r hover:from-[#3644FE] hover:to-[#B345ED] transition-all"
      >
        Contact
      </Button>
    </div>

    <button class="md:hidden" on:click={toggleMenu}>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </div>

  {#if isOpen}
    <div class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        {#each navItems as { href, label }}
          <a {href} class="block px-3 py-2 text-base font-medium text-foreground">{label}</a>
        {/each}
        <button on:click={toggleMode} class="block w-full text-left px-3 py-2 text-base font-medium text-foreground">
          Toggle Theme
        </button>
        <button 
          on:click={() => showContactModal = true}
          class="block w-full text-left px-3 py-2 text-base font-medium text-foreground"
        >
          Contact
        </button>
      </div>
    </div>
  {/if}
</nav>

{#if showContactModal}
  <ContactModal on:close={() => showContactModal = false} />
{/if}