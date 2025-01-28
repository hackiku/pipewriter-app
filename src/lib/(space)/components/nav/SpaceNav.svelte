<!-- src/lib/(space)/components/nav/SpaceNav.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { spaceStore } from '../../stores/spaceStore';
  import Logo from "./Logo.svelte";
  import MobileNav from "./MobileNav.svelte";
  import LanguageSelector from "./LanguageSelector.svelte";
  import ModeToggle from "./ModeToggle.svelte";
  import SpaceButton from "./SpaceButton.svelte";

  let isVisible: boolean;
  let isMenuOpen: boolean;
  
  spaceStore.subscribe(state => {
    isVisible = state.isNavVisible;
    isMenuOpen = state.isMenuOpen;
  });

  onMount(() => {
    const handleScroll = () => {
      spaceStore.updateScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
  class:translate-y-4={isVisible}
  class:translate-y-[-100%]={!isVisible}
>
  <div class="container py-2 flex justify-between items-center
						max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
						<!-- px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44"> -->
    <Logo />

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-6">
      <LanguageSelector />
      <ModeToggle />
      <SpaceButton size="md"/>
    </div>

    <!-- Mobile Navigation -->
    <div class="md:hidden">
      <MobileNav {isMenuOpen} />
    </div>
  </div>
</nav>