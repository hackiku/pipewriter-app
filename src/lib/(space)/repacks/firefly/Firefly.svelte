<!-- src/lib/(space)/repacks/firefly/Firefly.svelte -->
<script lang="ts">
  import Breadcrumbs from "../../components/Breadcrumbs.svelte";
  // import Breadcrumbs from "$lib/(space)/components/Breadcrumbs.svelte";
  import Nav from "./components/Nav.svelte";
  import Hero from "./sections/Hero.svelte";
  import Vehicles from "./sections/Vehicles.svelte";
  import News from "./sections/News.svelte";
  import Careers from "./sections/Careers.svelte";
  import Music from "./sections/Music.svelte";
  // import MusicPlayer from "./components/music/MusicPlayer.svelte";

  const breadcrumbs = [
    { label: "Space", href: "/space" },
    { label: "Repacks", href: "/space/repacks" },
    { label: "Firefly Aerospace" }
  ];
</script>

<main class="relative bg-black text-white ">

  <!-- <div class="fixed inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.7),transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.7),transparent_2px)] bg-[length:40px_40px] pointer-events-none" /> -->

	<!-- Breadcrumbs -->
  <!-- <div class="container py-6">
    <Breadcrumbs items={breadcrumbs} />
  </div> -->
	<Nav />
  
	<!-- Main Content -->
  <main>
    <Hero />
    <Vehicles />

		<Music />

		<News />
    <!-- <Careers /> -->

  </main>
</main>