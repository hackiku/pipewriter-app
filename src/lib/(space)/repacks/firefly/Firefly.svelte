<!-- src/lib/(space)/repacks/firefly/Firefly.svelte -->
<script lang="ts">
  import Nav from "./components/Nav.svelte";
  import Hero from "./sections/Hero.svelte";
  import Vehicles from "./sections/Vehicles.svelte";
  import News from "./sections/News.svelte";
  import Music from "./sections/Music.svelte";
  import BookModal from "./components/cta/BookModal.svelte";
  import { bookModalStore } from "./stores/bookModalStore";

  // If we need to clean up the store on unmount
  import { onDestroy } from "svelte";
  onDestroy(() => {
    bookModalStore.reset();
  });
</script>

<!-- Root layout with black background -->
<div class="relative min-h-screen bg-black text-white">
  <Nav />
  
  <!-- Main Content -->
  <main>
    <Hero />
    <Vehicles />
    <Music />
    <News />
  </main>

  <!-- Modals -->
  <BookModal />
</div>