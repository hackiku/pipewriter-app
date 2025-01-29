<!-- src/lib/(space)/repacks/firefly/Firefly.svelte -->
<script lang="ts">
  import Nav from "./components/Nav.svelte";
  import Hero from "./sections/Hero.svelte";
  import Vehicles from "./sections/Vehicles.svelte";
  import News from "./sections/News.svelte";
  import Music from "./sections/Music.svelte";
  import BookModal from "./components/cta/BookModal.svelte";
  import FireflyLights from "./components/FireflyLights.svelte";
  import { bookModalStore } from "./stores/bookModalStore";
  import SpaceButton from "$lib/(space)/components/nav/SpaceButton.svelte";

  import { onDestroy } from "svelte";
  onDestroy(() => {
    bookModalStore.reset();
  });
</script>

<!-- Container-relative layout -->
<div class="relative h-full w-full bg-black text-white">
  <!-- Ambient Lights (container-scoped) -->
  <!-- <FireflyLights count={75} /> -->
  
  <Nav />
  
  <!-- Main Content -->
  <main class="relative">
    <Hero />
    <Vehicles />
    <Music />
    <News />
  </main>

  <!-- Modals -->
  <BookModal />
</div>

<SpaceButton />